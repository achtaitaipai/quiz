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
      form?.submit();
    }
  });
});

// form?.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const formData = new FormData(form!);
//   formData.forEach((el) => {
//     console.log(el);
//   });
// });
