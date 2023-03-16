import sliderStyle from "../styles/custom-elements/slider.css?inline";

export class Slider extends HTMLElement {
  private _items: HTMLElement[] = [];
  private _progressBar: HTMLProgressElement | null = null;
  private _slidesWrapper: HTMLDivElement | null = null;
  public currentFrame = 0;

  connectedCallback() {
    const template = this._createTemplate();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template);

    this._items = Array.from(this.children).filter((itm) =>
      itm.hasAttribute("data-slide")
    ) as HTMLElement[];
    const observer = this._createItemsObserver();
    this._items.forEach((item) => observer.observe(item));
    this._update();

    this.setAttribute("data-active", "");
  }

  disconnectedCallback() {}

  private _createTemplate() {
    const template = document.createElement("template");
    const style = document.createElement("style");
    style.textContent = sliderStyle;
    this._progressBar = document.createElement("progress");
    this._slidesWrapper = document.createElement("div");
    this._slidesWrapper.classList.add("slidesWrapper");
    const slot = document.createElement("slot");
    const node = template.content;
    node.appendChild(style);
    node.appendChild(this._progressBar);
    this._slidesWrapper.appendChild(slot);
    node.appendChild(this._slidesWrapper);
    return node;
  }

  private _createItemsObserver() {
    return new IntersectionObserver(
      (elements) => {
        elements.forEach(({ intersectionRatio, target }) => {
          if (intersectionRatio > 0.5) {
            const index = this._items.findIndex((itm) => itm === target);
            this.currentFrame = index;
            this._update();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
  }

  goTo(frame: number) {
    this.currentFrame = Math.max(0, Math.min(this._items.length - 1, frame));
    const currentElement = this._items[this.currentFrame];
    currentElement.scrollIntoView();
    this._update();
    return this.currentFrame;
  }

  private _update() {
    this._items.forEach((item, i) => {
      const isCurrent = i === this.currentFrame;
      item.ariaHidden = (!isCurrent).toString();
    });
    this._progressBar?.setAttribute("max", (this._items.length - 1).toString());
    this._progressBar?.setAttribute("value", this.currentFrame.toString());
  }
}

export const defineSliderElement = () =>
  customElements.define("slider-element", Slider);
