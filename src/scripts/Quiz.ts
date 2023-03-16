import { Slider } from "./Slider";

export class Quiz extends HTMLFormElement {
  private _slider = new Slider();

  connectedCallback() {
    const submitElement = this.querySelector<HTMLInputElement>(
      'input[type="submit"]'
    );
    submitElement?.style.setProperty("display", "none");
    this._slider.innerHTML = this.innerHTML;
    this._slider.addEventListener("end", () => {
      console.log("fin");
    });

    this.innerHTML = "";
    this.appendChild(this._slider);

    this.addEventListener("change", () => {
      const nextFrame = this._slider.currentFrame + 1;
      const frame = this._slider?.goTo(nextFrame);
      if (nextFrame > frame) this.submit();
    });
  }

  submit() {
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
  }
}

export const defineQuizElement = () =>
  customElements.define("quiz-element", Quiz, { extends: "form" });
