(self.webpackChunkcom_app_shei_manageam=self.webpackChunkcom_app_shei_manageam||[]).push([[8991],{8991:(e,t,o)=>{"use strict";o.r(t),o.d(t,{startTapClick:()=>s});var n=o(2377);const s=e=>{let t,o,s,v,p=10*-u,m=0;const f=e.getBoolean("animated",!0)&&e.getBoolean("rippleEffect",!0),h=new WeakMap,L=e=>{p=(0,n.o)(e),g(e)},E=()=>{clearTimeout(v),v=void 0,o&&(b(!1),o=void 0)},w=e=>{o||void 0!==t&&null!==t.parentElement||(t=void 0,k(a(e),e))},g=e=>{k(void 0,e)},k=(e,t)=>{if(e&&e===o)return;clearTimeout(v),v=void 0;const{x:s,y:a}=(0,n.p)(t);if(o){if(h.has(o))throw new Error("internal error");o.classList.contains(c)||T(o,s,a),b(!0)}if(e){const t=h.get(e);t&&(clearTimeout(t),h.delete(e));const o=i(e)?0:d;e.classList.remove(c),v=setTimeout(()=>{T(e,s,a),v=void 0},o)}o=e},T=(e,t,o)=>{m=Date.now(),e.classList.add(c);const n=f&&r(e);n&&n.addRipple&&(_(),s=n.addRipple(t,o))},_=()=>{void 0!==s&&(s.then(e=>e()),s=void 0)},b=e=>{_();const t=o;if(!t)return;const n=l-Date.now()+m;if(e&&n>0&&!i(t)){const e=setTimeout(()=>{t.classList.remove(c),h.delete(t)},l);h.set(t,e)}else t.classList.remove(c)},S=document;S.addEventListener("ionScrollStart",e=>{t=e.target,E()}),S.addEventListener("ionScrollEnd",()=>{t=void 0}),S.addEventListener("ionGestureCaptured",E),S.addEventListener("touchstart",e=>{p=(0,n.o)(e),w(e)},!0),S.addEventListener("touchcancel",L,!0),S.addEventListener("touchend",L,!0),S.addEventListener("mousedown",e=>{const t=(0,n.o)(e)-u;p<t&&w(e)},!0),S.addEventListener("mouseup",e=>{const t=(0,n.o)(e)-u;p<t&&g(e)},!0)},a=e=>{if(!e.composedPath)return e.target.closest(".ion-activatable");{const t=e.composedPath();for(let e=0;e<t.length-2;e++){const o=t[e];if(o.classList&&o.classList.contains("ion-activatable"))return o}}},i=e=>e.classList.contains("ion-activatable-instant"),r=e=>{if(e.shadowRoot){const t=e.shadowRoot.querySelector("ion-ripple-effect");if(t)return t}return e.querySelector("ion-ripple-effect")},c="ion-activated",d=200,l=200,u=2500}}]);