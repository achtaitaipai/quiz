var m=Object.defineProperty;var p=(o,r,n)=>r in o?m(o,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[r]=n;var u=(o,r,n)=>(p(o,typeof r!="symbol"?r+"":r,n),n);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();class h extends HTMLFormElement{constructor(){super(...arguments);u(this,"handleSubmit",n=>{n.preventDefault();const i=this.getAttribute("data-results");if(!i)return;const e=JSON.parse(i),t=new FormData(this),s=new Map;t.forEach(a=>{const c=a.toString(),f=s.get(c)??0;s.set(c,f+1)});const[l]=Array.from(s).reduce((a,c)=>c[1]>a[1]?c:a,["",-1]),d=atob(e[parseInt(l)]);location.href=d})}connectedCallback(){this.addEventListener("submit",this.handleSubmit)}disconnectedCallback(){this.removeEventListener("submit",this.handleSubmit)}}const y=()=>customElements.define("quiz-element",h,{extends:"form"});y();
