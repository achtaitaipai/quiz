import { url } from "inspector";
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

const [params] = location.href.match(/(?<=\?).+/) ?? [""];
console.log(params);
const searchParams = new URLSearchParams(
  "?color=orange&number=1&ville=B%C3%A9thune"
);
console.log(searchParams.get("ville"));
for (const p of searchParams) {
  console.log(p);
}
// form?.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const formData = new FormData(form!);
//   formData.forEach((el) => {
//     console.log(el);
//   });
// });
