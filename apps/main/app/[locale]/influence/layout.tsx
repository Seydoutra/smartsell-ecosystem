import './influence.css';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="influence-app" data-kin-off="">
      {children}
    </div>
  );
}
