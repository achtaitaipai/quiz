import { defineConfig } from "vite";
import { dedale } from "vite-plugin-dedale";
import { routes, base } from "./ssg/routes/index";

export default defineConfig({
  plugins: [
    dedale({
      contentDir: "content",
      templateDir: "views",
      templateEngine: "edge",
      configureTemplateEngine: (env) => {
        return env;
      },
      routes: routes(),
    }),
  ],
  base,
});
