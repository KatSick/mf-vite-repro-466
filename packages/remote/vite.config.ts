import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    federation({
      name: "remote",
      hostInitInjectLocation: "entry",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button",
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
    port: 5001,
    strictPort: true,
    cors: true,
  },
  build: {
    target: "esnext",
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true,
  },
});
