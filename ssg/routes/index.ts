import { Route } from "vite-plugin-dedale";
import { quizzesResultsRoutes, quizzesRoutes } from "./quizes";

export const routes = () =>
  [...quizzesRoutes, ...quizzesResultsRoutes] satisfies Route[];

export const base = "/quiz";
