var m=Object.defineProperty;var p=(n,i,s)=>i in n?m(n,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[i]=s;var l=(n,i,s)=>(p(n,typeof i!="symbol"?i+"":i,s),s);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const f=`:host{position:relative;display:block}.slidesWrapper{display:grid;grid-auto-flow:column;grid-auto-columns:100%;overflow-x:hidden;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}
`;class d extends HTMLElement{constructor(){super(...arguments);l(this,"_items",[]);l(this,"_slidesWrapper",null);l(this,"currentFrame",0)}connectedCallback(){var e;const s=this._createTemplate();this.attachShadow({mode:"open"}),(e=this.shadowRoot)==null||e.appendChild(s),this._items=Array.from(this.children).filter(t=>t.hasAttribute("data-slide"));const r=this._createItemsObserver();this._items.forEach(t=>r.observe(t)),this._update(),this.setAttribute("data-active","")}disconnectedCallback(){}_createTemplate(){const s=document.createElement("template"),r=document.createElement("style");r.textContent=f,this._slidesWrapper=document.createElement("div"),this._slidesWrapper.classList.add("slidesWrapper");const e=document.createElement("slot"),t=s.content;return t.appendChild(r),this._slidesWrapper.appendChild(e),t.appendChild(this._slidesWrapper),t}_createItemsObserver(){return new IntersectionObserver(s=>{s.forEach(({intersectionRatio:r,target:e})=>{if(r>.5){const t=this._items.findIndex(o=>o===e);this.currentFrame=t,this._update()}})},{threshold:.5})}goTo(s){return this.currentFrame=Math.max(0,Math.min(this._items.length-1,s)),this._items[this.currentFrame].scrollIntoView(),this._update(),this.currentFrame}_update(){this._items.forEach((s,r)=>{const e=r===this.currentFrame;s.ariaHidden=(!e).toString(),e||s.setAttribute("disabled",""),e&&s.removeAttribute("disabled")})}}const y=()=>customElements.define("slider-element",d);class _ extends HTMLFormElement{constructor(){super(...arguments);l(this,"_slider",new d)}connectedCallback(){const s=this.querySelector('input[type="submit"]');s==null||s.style.setProperty("display","none"),this._slider.innerHTML=this.innerHTML,this._slider.addEventListener("end",()=>{console.log("fin")}),this.innerHTML="",this.appendChild(this._slider),this.addEventListener("change",()=>{var t;const r=this._slider.currentFrame+1,e=(t=this._slider)==null?void 0:t.goTo(r);r>e&&this.submit()})}submit(){const s=this.getAttribute("data-results");if(!s)return;const r=JSON.parse(s),e=new FormData(this),t=new Map;e.forEach(c=>{const a=c.toString(),h=t.get(a)??0;t.set(a,h+1)});const[o]=Array.from(t).reduce((c,a)=>a[1]>c[1]?a:c,["",-1]),u=atob(r[parseInt(o)]);location.href=u}}const b=()=>customElements.define("quiz-element",_,{extends:"form"});y();b();
