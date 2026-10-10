import { Fragment, type CSSProperties } from 'react';
export function MotionText({ text }: { text: string }) {
  return (
    <span className="motion-text">
      {text.split(/\s+/).map((word, i) => (
        <Fragment key={i}>
          <span className="word-mask">
            <span
              className="motion-word"
              style={{ '--word': Math.min(i, 9) } as CSSProperties}
            >
              {word}
            </span>
          </span>{' '}
        </Fragment>
      ))}
    </span>
  );
}
export function AgencyRibbon() {
  const line = ['STRATÉGIE', 'DESIGN', 'DIGITAL', 'CONTENUS', 'MOUVEMENT'];
  return (
    <div
      className="agency-ribbon"
      aria-label="Stratégie, design, digital, contenus, mouvement"
    >
      <div className="ribbon-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="ribbon-copy" key={copy}>
            {line.map((t) => (
              <span key={t}>
                {t}
                <i>✳</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export function CampaignVisual({ index }: { index: number }) {
  return (
    <svg
      className={`campaign-visual campaign-visual-${index}`}
      viewBox="0 0 600 400"
      aria-hidden="true"
      focusable="false"
    >
      {index === 0 ? (
        <>
          <g className="visual-back">
            <rect
              x="90"
              y="78"
              width="186"
              height="251"
              rx="4"
              fill="#eadfed"
              transform="rotate(-12 180 200)"
            />
            <text
              x="116"
              y="134"
              fill="#692b84"
              fontSize="12"
              letterSpacing="3"
            >
              KALO / LIBRAIRIE
            </text>
            <path
              d="M120 170h95M120 180h95M120 190h63"
              stroke="#692b84"
              opacity=".5"
            />
            <text x="120" y="252" fill="#692b84" fontSize="48" fontWeight="600">
              LIRE.
            </text>
            <path d="M128 276h85" stroke="#692b84" strokeWidth="6" />
          </g>
          <g className="visual-front">
            <path d="M267 78l207 20v240l-207-20z" fill="#291333" />
            <path d="M278 91l196 19v216l-196-19z" fill="#f3e433" />
            <path d="M277 96v210" stroke="#692b84" strokeWidth="4" />
            <text
              x="304"
              y="164"
              fill="#692b84"
              fontSize="17"
              letterSpacing="2"
            >
              KALO.
            </text>
            <text x="300" y="251" fill="#692b84" fontSize="94" fontWeight="650">
              K
            </text>
            <path
              d="M305 278h135M305 287h92"
              stroke="#692b84"
              strokeWidth="2"
            />
            <text x="305" y="312" fill="#692b84" fontSize="8" letterSpacing="1">
              LE CHAMP DES POSSIBLES.
            </text>
          </g>
          <g className="visual-float">
            <circle cx="457" cy="85" r="36" fill="#9760b1" />
            <text x="437" y="99" fill="#f3e433" fontSize="46">
              ✳
            </text>
          </g>
        </>
      ) : index === 1 ? (
        <>
          <g className="visual-back">
            <rect
              x="70"
              y="73"
              width="403"
              height="252"
              rx="9"
              fill="#f8f2e9"
            />
            <rect x="70" y="73" width="403" height="26" rx="9" fill="#c4ad98" />
            <circle cx="84" cy="86" r="3" fill="#f8f2e9" />
            <circle cx="95" cy="86" r="3" fill="#f8f2e9" />
            <circle cx="106" cy="86" r="3" fill="#f8f2e9" />
            <text x="98" y="127" fill="#403229" fontSize="16" fontWeight="600">
              noura.
            </text>
            <text x="98" y="191" fill="#403229" fontSize="29">
              Le geste.
            </text>
            <text x="98" y="224" fill="#403229" fontSize="29">
              La matière.
            </text>
            <rect x="98" y="248" width="91" height="22" rx="4" fill="#403229" />
            <text x="109" y="262" fill="#f8f2e9" fontSize="7">
              EXPLORER ↗
            </text>
            <path
              d="M336 151c-22 19-16 30-37 54-10 17-12 65 34 71 43 6 63-33 46-64-21-21-13-37-21-61z"
              fill="#b9977d"
            />
            <ellipse cx="347" cy="154" rx="12" ry="6" fill="#6d503e" />
            <path d="M310 279h99" stroke="#bba18b" />
          </g>
          <g className="visual-front">
            <rect
              x="399"
              y="154"
              width="106"
              height="198"
              rx="15"
              fill="#403229"
            />
            <rect
              x="406"
              y="163"
              width="92"
              height="177"
              rx="9"
              fill="#ede1d3"
            />
            <rect x="434" y="165" width="37" height="5" rx="3" fill="#403229" />
            <text x="418" y="197" fill="#403229" fontSize="15" fontWeight="600">
              noura.
            </text>
            <path
              d="M443 220c-13 16-25 31-14 51 7 13 29 16 43 2 15-20-7-40-8-53z"
              fill="#b9977d"
            />
            <path d="M419 299h65M419 307h44" stroke="#8e7460" />
            <rect x="419" y="319" width="42" height="9" rx="3" fill="#403229" />
          </g>
        </>
      ) : index === 2 ? (
        <>
          <g className="visual-back">
            <rect
              x="91"
              y="85"
              width="290"
              height="246"
              rx="15"
              fill="#281333"
            />
            <text x="115" y="126" fill="#f3e433" fontSize="24" fontWeight="650">
              AXIS ↗
            </text>
            <path d="M118 159h211" stroke="#9760b1" />
            <text x="117" y="191" fill="#e7d8ed" fontSize="11">
              CHOISIR SON MOUVEMENT
            </text>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect
                  x={117 + i * 73}
                  y="211"
                  width="65"
                  height="82"
                  rx="6"
                  fill={i === 1 ? '#f3e433' : '#513161'}
                />
                <text
                  x={134 + i * 73}
                  y="240"
                  fill={i === 1 ? '#281333' : '#e7d8ed'}
                  fontSize="21"
                >
                  {['↗', '◈', '∿'][i]}
                </text>
                <path
                  d={`M${127 + i * 73} 266h43M${127 + i * 73} 276h29`}
                  stroke={i === 1 ? '#281333' : '#9760b1'}
                />
              </g>
            ))}
          </g>
          <g className="visual-front">
            <rect
              x="366"
              y="151"
              width="131"
              height="198"
              rx="17"
              fill="#e7d8ed"
            />
            <text x="382" y="186" fill="#281333" fontSize="17" fontWeight="600">
              AXIS.
            </text>
            <text x="385" y="237" fill="#692b84" fontSize="52">
              ↗
            </text>
            <text x="382" y="268" fill="#281333" fontSize="10">
              LE COLLECTIF.
            </text>
            <text x="382" y="285" fill="#281333" fontSize="10">
              EN MOUVEMENT.
            </text>
            <rect
              x="382"
              y="308"
              width="97"
              height="23"
              rx="6"
              fill="#692b84"
            />
            <text x="395" y="323" fill="#fff" fontSize="8">
              EXPLORER ↗
            </text>
          </g>
          <g className="visual-float">
            <circle cx="393" cy="97" r="29" fill="#692b84" />
            <text x="378" y="108" fill="#f3e433" fontSize="31">
              ↗
            </text>
          </g>
        </>
      ) : index === 3 ? (
        <>
          <g className="visual-back">
            <rect
              x="75"
              y="72"
              width="218"
              height="259"
              fill="#291333"
              transform="rotate(-8 180 200)"
            />
            <text x="98" y="123" fill="#e7d8ed" fontSize="26">
              SILLAGE
            </text>
            <path
              d="M112 276l104-135M139 282l104-135"
              stroke="#f3e433"
              strokeWidth="15"
            />
            <text x="99" y="308" fill="#e7d8ed" fontSize="9" letterSpacing="1">
              UNE HISTOIRE SE PROLONGE.
            </text>
          </g>
          <g className="visual-front">
            <rect
              x="284"
              y="135"
              width="222"
              height="180"
              rx="8"
              fill="#e7d8ed"
            />
            <text x="310" y="174" fill="#692b84" fontSize="24">
              SILLAGE /
            </text>
            <path
              d="M303 230c25-65 68 68 100 0s53-25 78-26"
              fill="none"
              stroke="#692b84"
              strokeWidth="13"
            />
            <text x="308" y="286" fill="#692b84" fontSize="9" letterSpacing="1">
              ART / CULTURE / RENCONTRE
            </text>
          </g>
          <g className="visual-float">
            <rect
              x="334"
              y="66"
              width="108"
              height="54"
              rx="27"
              fill="#f3e433"
            />
            <text x="352" y="101" fill="#291333" fontSize="25">
              S/ ↗
            </text>
          </g>
        </>
      ) : index === 4 ? (
        <>
          <g className="visual-back">
            <rect x="84" y="72" width="233" height="256" fill="#ece7da" />
            <text x="106" y="111" fill="#293329" fontSize="24">
              FORMA.
            </text>
            <path d="M125 177h139v93H125z" fill="#ba9c7d" />
            <path d="M141 189h108v77H141z" fill="#29232d" />
            <path d="M125 263h19v40h-19M244 263h19v40h-19" fill="#ba9c7d" />
            <text x="106" y="314" fill="#293329" fontSize="9">
              FAIRE PARLER LA MATIÈRE.
            </text>
          </g>
          <g className="visual-front">
            <rect
              x="327"
              y="146"
              width="180"
              height="179"
              rx="4"
              fill="#a28a71"
            />
            <path
              d="M328 199l179 75M328 181l179 75M328 163l179 75"
              stroke="#ece7da"
              strokeWidth="3"
              opacity=".4"
            />
            <text x="347" y="305" fill="#ece7da" fontSize="19">
              MATIÈRE / 01
            </text>
          </g>
        </>
      ) : (
        <>
          <g className="visual-back">
            <rect
              x="76"
              y="99"
              width="431"
              height="216"
              rx="14"
              fill="#293329"
            />
            <text x="103" y="138" fill="#dae2d2" fontSize="25">
              RELAY ↗
            </text>
            <path d="M146 221h310" stroke="#95ac8b" strokeDasharray="5 7" />
            {['DEMANDE', 'CLASSEMENT', 'VALIDATION'].map((t, i) => (
              <g key={t}>
                <rect
                  x={100 + i * 130}
                  y="185"
                  width="115"
                  height="74"
                  rx="9"
                  fill={i === 2 ? '#f3e433' : '#dae2d2'}
                />
                <text x={113 + i * 130} y="213" fill="#293329" fontSize="10">
                  {t}
                </text>
                <text x={113 + i * 130} y="242" fill="#293329" fontSize="23">
                  {['◈', '↗', '✓'][i]}
                </text>
              </g>
            ))}
            <text x="103" y="286" fill="#dae2d2" fontSize="10">
              LE BON GESTE. AU BON MOMENT.
            </text>
          </g>
          <g className="visual-float">
            <rect
              x="351"
              y="62"
              width="153"
              height="48"
              rx="8"
              fill="#f3e433"
            />
            <text x="367" y="91" fill="#293329" fontSize="12">
              CONTRÔLE HUMAIN ✓
            </text>
          </g>
        </>
      )}
    </svg>
  );
}
