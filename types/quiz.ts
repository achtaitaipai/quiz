export type Question = {
  question: string;
  options: string[];
};

export type Result = {
  title: string;
  image: string;
  result: string;
  lead: string;
};

export type Quiz = {
  title: string;
  lead: string;
  description: string;
  questions: Question[];
  results: Result[];
};
