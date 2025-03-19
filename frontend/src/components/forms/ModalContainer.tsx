export default function ModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="modalOverlay">
      <div className="modalContainer">{children}</div>
    </div>
  );
}
