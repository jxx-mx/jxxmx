import { addHealthCheckPing } from "./_actions";

export default function ProtectedPage() {
  addHealthCheckPing();

  return (
    <div>
      <h1>Protected Page</h1>
    </div>
  );
}
