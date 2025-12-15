import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    contentCollections(),
    devtools(),
    // nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      sitemap: {
        enabled: true,
        host: "https://zhuojg.github.io/",
      },
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
      },
      pages: [
        {
          path: "/",
          sitemap: {
            priority: 1,
          },
        },
      ],
    }),
    viteReact(),
  ],
});

export default config;
