import { useRouteError } from "react-router-dom";
import Button from "../components/Buttons/Button";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold system-message">Oops!</h1>
      <p className="mt-2">Sorry, an unexpected error has occurred.</p>
      <p className="mt-2 alt-message">
        <i>{error?.statusText || error?.message || "Unknown error"}</i>
      </p>
      <Button onClick={() => (window.location.href = "/")}>
        Return to Home
      </Button>
    </div>
  );
}
