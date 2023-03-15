import { Slider } from "./scripts/Slider";
import "./style.css";

customElements.define("slider-element", Slider);

const form = document.querySelector("form");
const slider = document.querySelector<Slider>("slider-element");

const fieldsets = document.querySelectorAll("fieldset");
fieldsets.forEach((el, i) => {
  el.addEventListener("change", () => {
    if (i < fieldsets.length - 1) slider?.goTo(i + 1);
    else {
      if (!form) throw new Error("Form not found on document");
      const formData = Object.fromEntries(new FormData(form));
      const values = [...Object.values(formData)];
      const keys = [...new Set(values)].map(
        (k) => [k, values.filter((v) => v === k).length] as [string, number]
      );
      const sorted = keys.sort((a, b) => b[1] - a[1]);
      console.log(sorted[0][0]);
    }
  });
});
