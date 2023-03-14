import "./style.css";

class Quizz extends HTMLFormElement {
  private _items: HTMLElement[] =[]
  private _previousLink: HTMLAnchorElement | null = null;
  private _nextLink: HTMLAnchorElement | null = null;
  private _currentFrame = 0;

  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute("data-js", "");
    this._items = Array.from(
      this.querySelectorAll<HTMLElement>(".slider_item")
    );
    this._previousLink = this.querySelector<HTMLAnchorElement>(
      '[title="précédent"]'
    );
    this._nextLink = this.querySelector<HTMLAnchorElement>('[title="suivant"]');
    
    this._nextLink?.addEventListener('click',this._nextFrame)
    this._previousLink?.addEventListener('click',this._previousFrame)
    this._setLinks()
  }

  disconnectedCallback(){
    this._nextLink?.removeEventListener('click',this._nextFrame)
    this._previousLink?.removeEventListener('click',this._previousFrame)
  }

  private _nextFrame = (e:MouseEvent) => {
    e.preventDefault()
    this._currentFrame++
    this._setLinks()
    this._items[this._currentFrame]?.scrollIntoView()
  }

  private _previousFrame = (e:MouseEvent)=>{
    e.preventDefault()
    this._currentFrame--
    this._setLinks()
    this._items[this._currentFrame]?.scrollIntoView()
  }

  private _setLinks(){
    const next = this._items[this._currentFrame+1]?.id 
    const previous = this._items[this._currentFrame-1]?.id

    this._nextLink?.setAttribute('href',`#${next}`)
    this._previousLink?.setAttribute('href',`#${previous}`)

  }
}

customElements.define("quizz-component", Quizz, { extends: "form" });
