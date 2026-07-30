import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://guillaumebraillon.fr",
  integrations: [sitemap()],
  devToolbar: {
    enabled: false,
  },
  markdown: {
    processor: unified({
      rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]],
    }),
  },
});
