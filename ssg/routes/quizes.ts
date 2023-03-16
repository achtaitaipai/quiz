import { readFileSync } from "fs";
import { globSync } from "glob";
import { Route } from "vite-plugin-dedale";
import { parse } from "yaml";
import { Quiz } from "../../types/quiz";
import { marked } from "marked";
import { obfuscate, shuffle } from "./helpers";
import { base } from ".";

const makeResultUrl = (quizTitle: string, resultTitle) =>
  `/quizzes/${quizTitle}/${resultTitle}/`;

const quizzesDatas = globSync("_datas/quizzes/*.yaml").map((file) =>
  parse(readFileSync(file, { encoding: "utf-8" }))
) as Quiz[];

export const quizzesResultsRoutes = quizzesDatas
  .map(({ title, results }) =>
    results.map((result) => {
      const url = makeResultUrl(title, result.title);
      const content = marked(result.result);
      return {
        url,
        template: "quizResult",
        data: {
          content,
          image: result.image,
          title: result.title,
        },
      };
    })
  )
  .flat() satisfies Route[];

export const quizzesRoutes = quizzesDatas.map(
  ({ title, questions, results }) => {
    const quizUrl = `/quizzes/${title}/`;
    const resultsUrl = results.map((r) => `./${r.title}/`);
    const processedQuestions = questions.map(({ question, options }) => {
      return { question, options: shuffle(Object.entries(options)) };
    });
    return {
      url: quizUrl,
      template: "quiz",
      data: {
        title,
        questions: processedQuestions,
        results: resultsUrl.map((r) => obfuscate(r)),
        defaultResult: resultsUrl[0],
      },
    } satisfies Route;
  }
);
