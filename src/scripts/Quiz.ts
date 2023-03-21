export class Quiz extends HTMLFormElement {
  connectedCallback() {
    this.addEventListener("submit", this.handleSubmit);
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this.handleSubmit);
  }

  handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const dataRaw = this.getAttribute("data-results");
    if (!dataRaw) return;
    const datas = JSON.parse(dataRaw) as string[];
    const formData = new FormData(this);
    const counts = new Map<string, number>();
    formData.forEach((v) => {
      const key = v.toString();
      const count = counts.get(key) ?? 0;
      counts.set(key, count + 1);
    });
    const [key] = Array.from(counts).reduce<[string, number]>(
      (acc, current) => {
        return current[1] > acc[1] ? current : acc;
      },
      ["", -1]
    );
    // atob is deprecated only in node environment
    const url = atob(datas[parseInt(key)]);
    location.href = url;
  };
}

export const defineQuizElement = () =>
  customElements.define("quiz-element", Quiz, { extends: "form" });
