import { execFileSync } from "node:child_process";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import tablatures from "./src/data/tablatures.json";

const site = "https://guillaumebraillon.fr";
const tablaturePages = tablatures.map(({ path }) => new URL(path, site).href);
const commitRef = process.env.VERCEL_GIT_COMMIT_SHA || "HEAD";
const lastCommitDate = execFileSync("git", ["show", "-s", "--format=%cI", commitRef], {
  encoding: "utf8",
}).trim();

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
    define: {
      "import.meta.env.PUBLIC_LAST_COMMIT_DATE": JSON.stringify(lastCommitDate),
    },
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: unified({
      rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]],
    }),
  },
});
