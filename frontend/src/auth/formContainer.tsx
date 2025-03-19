export default function FormContainer(content: { children: React.ReactNode }) {
  return <div className="modalOverlay">{content.children}</div>;
}
