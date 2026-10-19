import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Server code must never end up in the client bundle.
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      // src/server.ts wraps the SSR handler with an error page.
      server: { entry: "server" },
    }),
    // Deployed on Vercel: nitro writes .vercel/output (Build Output API). Build only, as dev serves through Vite.
    ...(command === "build" ? [nitro({ preset: "vercel" })] : []),
    viteReact(),
  ],
  css: { transformer: "lightningcss" },
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
}));
