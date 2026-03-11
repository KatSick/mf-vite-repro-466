import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

const RemoteButton = lazy(() => import("remote/Button"));

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
