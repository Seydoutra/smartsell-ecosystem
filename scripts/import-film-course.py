"""Read the supplied Word course. Private output must stay outside the public repo."""
import argparse
import hashlib
import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}


def text(node):
    return "".join(t.text or "" for t in node.findall(".//w:t", NS)).strip()


def read_blocks(source):
    with zipfile.ZipFile(source) as archive:
        body = ET.fromstring(archive.read("word/document.xml")).find("w:body", NS)
    blocks = []
    for node in body:
        if node.tag.endswith("}p"):
            value = text(node)
            if not value:
                continue
            style = node.find("w:pPr/w:pStyle", NS)
            name = style.get("{%s}val" % NS["w"], "") if style is not None else ""
            level = re.search(r"Heading([123])", name, re.I)
            blocks.append({"type": "heading" if level else "text", "text": value, "level": int(level[1]) if level else 0})
        elif node.tag.endswith("}tbl"):
            rows = [["\n".join(text(p) for p in cell.findall("w:p", NS)) for cell in row.findall("w:tc", NS)] for row in node.findall("w:tr", NS)]
            if all(len(row) == 1 for row in rows):
                value = "\n".join(row[0] for row in rows)
                label, _, content = value.partition("\n")
                blocks.append({"type": "prompt" if label.startswith("PROMPT") else "callout", "title": label, "text": content})
            else:
                blocks.append({"type": "table", "rows": rows})
    return blocks


def parse_course(source):
    modules, intro = [], []
    current, mode, group, question = None, "body", "Compréhension", None
    for block in read_blocks(source):
        value = block.get("text", "")
        marker = re.match(r"^MODULE\s+(\d+)\b", value)
        if marker:
            current = {"number": int(marker[1]), "title": "", "blocks": [], "questions": []}
            modules.append(current)
            mode = "body"
            continue
        if current is None:
            intro.append(block)
            continue
        if not current["title"] and block["type"] == "heading":
            current["title"] = value
            continue
        if re.match(r"Quiz (interactif|logique)|Partie [AB] :", value):
            mode = "quiz"
            group = "Logique" if "logique" in value else "Compréhension"
            continue
        label = block.get("title", value)
        if label.startswith("CORRIGÉ (À MASQUER"):
            mode = "answers"
        elif value in ("Corrigé global et barème", "Pour terminer"):
            mode = "body"
        if mode == "body":
            current["blocks"].append(block)
            continue
        for line in (label + "\n" + value if block.get("title") else value).splitlines():
            if mode == "answers":
                match = re.match(r"Question\s+(\d+)\s*:\s*([A-D])\.\s*(.*)", line)
                if match:
                    found = next(q for q in current["questions"] if q["number"] == int(match[1]))
                    found.update(answer=ord(match[2]) - 65, explanation=match[3])
                continue
            match = re.match(r"Question\s+(\d+)\.\s*(.*)", line)
            option = re.match(r"([A-D])\)\s*(.*)", line)
            if match:
                question = {"number": int(match[1]), "group": group, "text": match[2], "options": []}
                current["questions"].append(question)
            elif option and question is not None:
                assert ord(option[1]) - 65 == len(question["options"]), "Options out of order"
                question["options"].append(option[2])
    assert len(modules) == 11, f"Expected 11 modules, got {len(modules)}"
    for i, module in enumerate(modules):
        expected = 20 if i == 10 else 10
        assert module["number"] == i + 1 and module["title"]
        assert len(module["questions"]) == expected, (i, len(module["questions"]))
        assert [q["number"] for q in module["questions"]] == list(range(1, expected + 1))
        assert all(0 <= q.get("answer", -1) < len(q["options"]) and q.get("explanation") for q in module["questions"])
        module["passScore"] = 14 if i == 10 else 10
    return {"version": 1, "sourceSha256": hashlib.sha256(Path(source).read_bytes()).hexdigest(), "language": "fr", "intro": intro, "modules": modules}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--sql-output", type=Path)
    parser.add_argument("--free", action="store_true", help="Allow confirmed learners to self-enrol; invitation-only otherwise")
    args = parser.parse_args()
    repository = Path(__file__).resolve().parent.parent
    if args.output.resolve().is_relative_to(repository):
        parser.error("Private course output must be outside the public repository")
    course = parse_course(args.source)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(course, ensure_ascii=False, indent=2))
    if args.sql_output:
        if args.sql_output.resolve().is_relative_to(repository):
            parser.error("Private SQL output must be outside the public repository")
        payload = json.dumps(course, ensure_ascii=False)
        assert "$smartsell_course$" not in payload
        title = json.dumps({"fr": "Faire un court-métrage avec l’IA", "en": "Create an AI short film"}, ensure_ascii=False)
        args.sql_output.parent.mkdir(parents=True, exist_ok=True)
        args.sql_output.write_text("begin;\nselect private.install_full_course('court-metrage-ia-complet', $title$" + title + "$title$::jsonb, $smartsell_course$" + payload + "$smartsell_course$::jsonb, " + ("true" if args.free else "false") + ");\ncommit;\n")
    print(json.dumps({"modules": len(course["modules"]), "questions": sum(len(m["questions"]) for m in course["modules"]), "sourceSha256": course["sourceSha256"], "titles": [m["title"] for m in course["modules"]]}, ensure_ascii=False))
