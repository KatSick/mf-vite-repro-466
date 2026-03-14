import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    federation({
      name: "host",
      hostInitInjectLocation: "entry",
      remotes: {
        remote: {
          type: "module",
          name: "remote",
          entry: "http://localhost:5001/remoteEntry.js",
        },
      },
      dts: false,
      shareStrategy: "loaded-first",
      shared: {
        react: { singleton: true },
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
