var p=Object.defineProperty;var h=(n,i,r)=>i in n?p(n,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[i]=r;var c=(n,i,r)=>(h(n,typeof i!="symbol"?i+"":i,r),r);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const f=`:host{position:relative;display:block;border:2px solid var(--color-lightish);background-color:var(--color-surface-1);background-image:var(--gradient-8)}.slidesWrapper{display:grid;grid-auto-flow:column;grid-auto-columns:100%;overflow-x:hidden;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}.slidesWrapper:before,.slidesWrapper:after{content:"";position:absolute;inset:0;background:var(--gradient-6);background-size:400% 100%;z-index:-1;animation:animate 20s linear infinite;opacity:.3}.slidesWrapper:after{filter:blur(10px)}@keyframes animate{0%{background-position:0 0}to{background-position:300% 0}}
`;class d extends HTMLElement{constructor(){super(...arguments);c(this,"_items",[]);c(this,"_slidesWrapper",null);c(this,"currentFrame",0)}connectedCallback(){var e;const r=this._createTemplate();this.attachShadow({mode:"open"}),(e=this.shadowRoot)==null||e.appendChild(r),this._items=Array.from(this.children).filter(t=>t.hasAttribute("data-slide"));const s=this._createItemsObserver();this._items.forEach(t=>s.observe(t)),this._update(),this.setAttribute("data-active","")}disconnectedCallback(){}_createTemplate(){const r=document.createElement("template"),s=document.createElement("style");s.textContent=f,this._slidesWrapper=document.createElement("div"),this._slidesWrapper.classList.add("slidesWrapper");const e=document.createElement("slot"),t=r.content;return t.appendChild(s),this._slidesWrapper.appendChild(e),t.appendChild(this._slidesWrapper),t}_createItemsObserver(){return new IntersectionObserver(r=>{r.forEach(({intersectionRatio:s,target:e})=>{if(s>.5){const t=this._items.findIndex(o=>o===e);this.currentFrame=t,this._update()}})},{threshold:.5})}goTo(r){return this.currentFrame=Math.max(0,Math.min(this._items.length-1,r)),this._items[this.currentFrame].scrollIntoView(),this._update(),this.currentFrame}_update(){this._items.forEach((r,s)=>{const e=s===this.currentFrame;r.ariaHidden=(!e).toString()})}}const g=()=>customElements.define("slider-element",d);class b extends HTMLFormElement{constructor(){super(...arguments);c(this,"_slider",new d)}connectedCallback(){const r=this.querySelector('input[type="submit"]');r==null||r.style.setProperty("display","none"),this._slider.innerHTML=this.innerHTML,this._slider.addEventListener("end",()=>{console.log("fin")}),this.innerHTML="",this.appendChild(this._slider),this.addEventListener("change",()=>{var t;const s=this._slider.currentFrame+1,e=(t=this._slider)==null?void 0:t.goTo(s);s>e&&this.submit()})}submit(){const r=this.getAttribute("data-results");if(!r)return;const s=JSON.parse(r),e=new FormData(this),t=new Map;e.forEach(l=>{const a=l.toString(),m=t.get(a)??0;t.set(a,m+1)});const[o]=Array.from(t).reduce((l,a)=>a[1]>l[1]?a:l,["",-1]),u=atob(s[parseInt(o)]);location.href=u}}const y=()=>customElements.define("quiz-element",b,{extends:"form"});g();y();