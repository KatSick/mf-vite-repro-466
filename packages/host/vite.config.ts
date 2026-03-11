import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    federation({
      name: "host",
      remotes: {
        remote: {
          type: "module",
          name: "remote",
          entry: "http://localhost:5001/remoteEntry.js",
        },
      },
      dts: false,
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "@repro/design-system": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5002,
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
  preview: {
    port: 5002,
    strictPort: true,
  },
});
