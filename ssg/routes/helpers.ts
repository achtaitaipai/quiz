export const shuffle = <T>(array: T[]) => {
  const clone = [...array];
  clone.forEach((_, i) => {
    const indexB = Math.floor(array.length * Math.random());
    const b = clone[indexB];
    const a = clone[i];
    clone[i] = b;
    clone[indexB] = a;
  });
  return clone;
};

export const obfuscate = (str: string) =>
  Buffer.from(str, "binary").toString("base64");
