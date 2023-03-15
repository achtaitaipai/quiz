import { readFileSync } from "fs";
import { Route } from "vite-plugin-dedale";
import { parse } from "yaml";
import { globSync } from "glob";

type Entrie = {
  question: string;
  answers: { [key: string]: string };
};

type QuizData = {
  title: string;
  url: string;
  entries: Entrie[];
  results: { [key: string]: string };
};

const files = globSync("content/quiz/*.yaml");
const quizDatas = files.map((file) => {
  const raw = readFileSync(file, { encoding: "utf8" });
  const { title, url, entries } = parse(raw) as QuizData;
  return {
    url: `/quiz/${encodeURI(url)}/`,
    template: "index.edge",
    data: {
      title: encodeURI(title),
      entries: entries.map(({ question, answers }) => ({
        question,
        answers: Object.entries(answers).map((el) => {
          console.log(el);
          return {
            text: el[1],
            value: el[0],
          };
        }),
      })),
    },
  } satisfies Route;
});

export const routes = [...quizDatas] satisfies Route[];
