export default function SideItem({
  children,
  clickHandler,
}: {
  children: string;
  clickHandler: () => void;
}) {
  return (
    <div className="sideItem" onClick={clickHandler}>
      {children}
    </div>
  );
}
