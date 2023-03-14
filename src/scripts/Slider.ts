
import sliderStyle from "../styles/custom-elements/slider.css?inline";

export class Slider extends HTMLElement {
  private _items: HTMLElement[] = [];
  private _progressBar: HTMLProgressElement | null = null;
  private _currentFrame = 0;

  constructor() {
    super();
  }

  connectedCallback() {
    const template = this._createTemplate();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template);

    this._items = Array.from(
      this.querySelectorAll<HTMLElement>(".slider_item")
    );
    if (!this.shadowRoot) return;
    this._progressBar = this.shadowRoot.querySelector("progress");
    this._progressBar?.setAttribute("max", (this._items.length - 1).toString());
    this._progressBar?.setAttribute('value',this._currentFrame.toString())
  }
  disconnectedCallback() {
  }

  private _createTemplate() {
    const template = document.createElement("template");
    const style = document.createElement("style");
    style.textContent = sliderStyle;
    const progress = document.createElement('progress')
    const wrapper = document.createElement('div')
    const slot = document.createElement('slot')
    slot.setAttribute('name','content')
    const node = template.content;
    node.appendChild(style);
    node.appendChild(progress)
    wrapper.appendChild(slot)
    node.appendChild(wrapper)
    return node;
  }

  goTo(frame:number){
    this._currentFrame = Math.max(0,(Math.min(this._items.length,frame)))
    this._items[this._currentFrame]?.scrollIntoView();
    this._progressBar?.setAttribute('value',this._currentFrame.toString())
  }
}