import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import tablatures from "./src/data/tablatures.json";

const site = "https://guillaumebraillon.fr";
const tablaturePages = tablatures.map(({ path }) => new URL(path, site).href);

export default defineConfig({
  site,
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [sitemap({ customPages: tablaturePages })],
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({
      rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]],
    }),
  },
});
