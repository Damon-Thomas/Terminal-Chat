import Button from "../components/Buttons/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen w-screen">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg">Page Not Found</p>
      </div>
      <a href="/" className="">
        <Button>Go back to home</Button>
      </a>
    </div>
  );
}
