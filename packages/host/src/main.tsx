import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

const RemoteButton = lazy(async () => {
  const mod = await import("remote/Button");
  return {
    default:
      mod.default?.Button ??
      mod.Button ??
      mod.__moduleExports?.Button ??
      mod.default ??
      mod.__moduleExports,
  };
});

function App() {
  return (
    <div>
      <h1>Host App</h1>
      <Suspense fallback={<p>Loading remote button...</p>}>
        <RemoteButton label="Remote Button via MF" />
      </Suspense>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
