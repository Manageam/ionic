(self.webpackChunkcom_app_shei_manageam=self.webpackChunkcom_app_shei_manageam||[]).push([[5174],{5174:(t,e,o)=>{"use strict";o.r(e),o.d(e,{ion_route:()=>a,ion_route_redirect:()=>h,ion_router:()=>N,ion_router_link:()=>O});var n=o(1035),r=o(7278),i=o(5466),s=o(7853);let a=class{constructor(t){(0,n.r)(this,t),this.ionRouteDataChanged=(0,n.e)(this,"ionRouteDataChanged",7),this.url=""}onUpdate(t){this.ionRouteDataChanged.emit(t)}onComponentProps(t,e){if(t===e)return;const o=t?Object.keys(t):[],n=e?Object.keys(e):[];if(o.length===n.length){for(const r of o)if(t[r]!==e[r])return void this.onUpdate(t)}else this.onUpdate(t)}connectedCallback(){this.ionRouteDataChanged.emit()}static get watchers(){return{url:["onUpdate"],component:["onUpdate"],componentProps:["onComponentProps"]}}},h=class{constructor(t){(0,n.r)(this,t),this.ionRouteRedirectChanged=(0,n.e)(this,"ionRouteRedirectChanged",7)}propDidChange(){this.ionRouteRedirectChanged.emit()}connectedCallback(){this.ionRouteRedirectChanged.emit()}static get watchers(){return{from:["propDidChange"],to:["propDidChange"]}}};const c="root",l="forward",u=t=>"/"+t.filter(t=>t.length>0).join("/"),d=t=>{let e,o=[""];if(null!=t){const n=t.indexOf("?");n>-1&&(e=t.substr(n+1),t=t.substr(0,n)),o=t.split("/").map(t=>t.trim()).filter(t=>t.length>0),0===o.length&&(o=[""])}return{segments:o,queryString:e}},f=async(t,e,o,n,i=!1,s)=>{try{const a=p(t);if(n>=e.length||!a)return i;await new Promise(t=>(0,r.c)(a,t));const h=e[n],l=await a.setRouteId(h.id,h.params,o,s);return l.changed&&(o=c,i=!0),i=await f(l.element,e,o,n+1,i,s),l.markVisible&&await l.markVisible(),i}catch(a){return console.error(a),!1}},g=":not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet",p=t=>{if(!t)return;if(t.matches(g))return t;const e=t.querySelector(g);return null!=e?e:void 0},m=(t,e)=>e.find(e=>((t,e)=>{const{from:o,to:n}=e;if(void 0===n)return!1;if(o.length>t.length)return!1;for(let r=0;r<o.length;r++){const e=o[r];if("*"===e)return!0;if(e!==t[r])return!1}return o.length===t.length})(t,e)),w=(t,e)=>{const o=Math.min(t.length,e.length);let n=0;for(let r=0;r<o;r++){const o=t[r],i=e[r];if(o.id.toLowerCase()!==i.id)break;if(o.params){const t=Object.keys(o.params);if(t.length===i.path.length){const e=t.map(t=>`:${t}`);for(let t=0;t<e.length&&e[t].toLowerCase()===i.path[t];t++)n++}}n++}return n},b=(t,e)=>{const o=new C(t);let n,r=!1;for(let i=0;i<e.length;i++){const t=e[i].path;if(""===t[0])r=!0;else{for(const e of t){const t=o.next();if(":"===e[0]){if(""===t)return null;n=n||[],(n[i]||(n[i]={}))[e.slice(1)]=t}else if(t!==e)return null}r=!1}}return r&&r!==(""===o.next())?null:n?e.map((t,e)=>({id:t.id,path:t.path,params:v(t.params,n[e]),beforeEnter:t.beforeEnter,beforeLeave:t.beforeLeave})):e},v=(t,e)=>t||e?Object.assign(Object.assign({},t),e):void 0,y=(t,e)=>{let o=null,n=0;for(const r of e){const e=b(t,r);if(null!==e){const t=R(e);t>n&&(n=t,o=e)}}return o},R=t=>{let e=1,o=1;for(const n of t)for(const t of n.path)":"===t[0]?e+=Math.pow(1,o):""!==t&&(e+=Math.pow(2,o)),o++;return e};class C{constructor(t){this.path=t.slice()}next(){return this.path.length>0?this.path.shift():""}}const P=(t,e)=>e in t?t[e]:t.hasAttribute(e)?t.getAttribute(e):null,k=t=>Array.from(t.children).filter(t=>"ION-ROUTE-REDIRECT"===t.tagName).map(t=>{const e=P(t,"to");return{from:d(P(t,"from")).segments,to:null==e?void 0:d(e)}}),S=t=>D(E(t)),E=t=>Array.from(t.children).filter(t=>"ION-ROUTE"===t.tagName&&t.component).map(t=>{const e=P(t,"component");return{path:d(P(t,"url")).segments,id:e.toLowerCase(),params:t.componentProps,beforeLeave:t.beforeLeave,beforeEnter:t.beforeEnter,children:E(t)}}),D=t=>{const e=[];for(const o of t)L([],e,o);return e},L=(t,e,o)=>{if((t=t.slice()).push({id:o.id,path:o.path,params:o.params,beforeLeave:o.beforeLeave,beforeEnter:o.beforeEnter}),0!==o.children.length)for(const n of o.children)L(t,e,n);else e.push(t)};let N=class{constructor(t){(0,n.r)(this,t),this.ionRouteWillChange=(0,n.e)(this,"ionRouteWillChange",7),this.ionRouteDidChange=(0,n.e)(this,"ionRouteDidChange",7),this.previousPath=null,this.busy=!1,this.state=0,this.lastState=0,this.root="/",this.useHash=!0}async componentWillLoad(){await(p(document.body)?Promise.resolve():new Promise(t=>{window.addEventListener("ionNavWillLoad",t,{once:!0})}));const t=await this.runGuards(this.getPath());if(!0!==t){if("object"==typeof t){const{redirect:e}=t,o=d(e);this.setPath(o.segments,c,o.queryString),await this.writeNavStateRoot(o.segments,c)}}else await this.onRoutesChanged()}componentDidLoad(){window.addEventListener("ionRouteRedirectChanged",(0,r.o)(this.onRedirectChanged.bind(this),10)),window.addEventListener("ionRouteDataChanged",(0,r.o)(this.onRoutesChanged.bind(this),100))}async onPopState(){const t=this.historyDirection();let e=this.getPath();const o=await this.runGuards(e);if(!0!==o){if("object"!=typeof o)return!1;e=d(o.redirect).segments}return this.writeNavStateRoot(e,t)}onBackButton(t){t.detail.register(0,t=>{this.back(),t()})}async canTransition(){const t=await this.runGuards();return!0===t||"object"==typeof t&&t.redirect}async push(t,e="forward",o){t.startsWith(".")&&(t=new URL(t,window.location.href).pathname);let n=d(t);const r=await this.runGuards(n.segments);if(!0!==r){if("object"!=typeof r)return!1;n=d(r.redirect)}return this.setPath(n.segments,e,n.queryString),this.writeNavStateRoot(n.segments,e,o)}back(){return window.history.back(),Promise.resolve(this.waitPromise)}async printDebug(){(t=>{console.group(`[ion-core] ROUTES[${t.length}]`);for(const e of t){const t=[];e.forEach(e=>t.push(...e.path));const o=e.map(t=>t.id);console.debug(`%c ${u(t)}`,"font-weight: bold; padding-left: 20px","=>\t",`(${o.join(", ")})`)}console.groupEnd()})(S(this.el)),(t=>{console.group(`[ion-core] REDIRECTS[${t.length}]`);for(const e of t)e.to&&console.debug("FROM: ",`$c ${u(e.from)}`,"font-weight: bold"," TO: ",`$c ${u(e.to.segments)}`,"font-weight: bold");console.groupEnd()})(k(this.el))}async navChanged(t){if(this.busy)return console.warn("[ion-router] router is busy, navChanged was cancelled"),!1;const{ids:e,outlet:o}=await(async t=>{const e=[];let o,n=window.document.body;for(;o=p(n),o;){const t=await o.getRouteId();if(!t)break;n=t.element,t.element=void 0,e.push(t)}return{ids:e,outlet:o}})(),n=((t,e)=>{let o=null,n=0;for(const r of e){const e=w(t,r);e>n&&(o=r,n=e)}return o?o.map((e,o)=>({id:e.id,path:e.path,params:v(e.params,t[o]&&t[o].params)})):null})(e,S(this.el));if(!n)return console.warn("[ion-router] no matching URL for ",e.map(t=>t.id)),!1;const r=(t=>{const e=[];for(const o of t)for(const t of o.path)if(":"===t[0]){const n=o.params&&o.params[t.slice(1)];if(!n)return null;e.push(n)}else""!==t&&e.push(t);return e})(n);return r?(this.setPath(r,t),await this.safeWriteNavState(o,n,c,r,null,e.length),!0):(console.warn("[ion-router] router could not match path because some required param is missing"),!1)}onRedirectChanged(){const t=this.getPath();t&&m(t,k(this.el))&&this.writeNavStateRoot(t,c)}onRoutesChanged(){return this.writeNavStateRoot(this.getPath(),c)}historyDirection(){var t;const e=window;null===e.history.state&&(this.state++,e.history.replaceState(this.state,e.document.title,null===(t=e.document.location)||void 0===t?void 0:t.href));const o=e.history.state,n=this.lastState;return this.lastState=o,o>n||o>=n&&n>0?l:o<n?"back":c}async writeNavStateRoot(t,e,o){if(!t)return console.error("[ion-router] URL is not part of the routing set"),!1;const n=k(this.el),r=m(t,n);let i=null;if(r){const{segments:o,queryString:n}=r.to;this.setPath(o,e,n),i=r.from,t=o}const s=S(this.el),a=y(t,s);return a?this.safeWriteNavState(document.body,a,e,t,i,0,o):(console.error("[ion-router] the path does not match any route"),!1)}async safeWriteNavState(t,e,o,n,r,i=0,s){const a=await this.lock();let h=!1;try{h=await this.writeNavState(t,e,o,n,r,i,s)}catch(c){console.error(c)}return a(),h}async lock(){const t=this.waitPromise;let e;return this.waitPromise=new Promise(t=>e=t),void 0!==t&&await t,e}async runGuards(t=this.getPath(),e){if(void 0===e&&(e=d(this.previousPath).segments),!t||!e)return!0;const o=S(this.el),n=y(e,o),r=n&&n[n.length-1].beforeLeave,i=!r||await r();if(!1===i||"object"==typeof i)return i;const s=y(t,o),a=s&&s[s.length-1].beforeEnter;return!a||a()}async writeNavState(t,e,o,n,r,i=0,s){if(this.busy)return console.warn("[ion-router] router is busy, transition was cancelled"),!1;this.busy=!0;const a=this.routeChangeEvent(n,r);a&&this.ionRouteWillChange.emit(a);const h=await f(t,e,o,i,!1,s);return this.busy=!1,a&&this.ionRouteDidChange.emit(a),h}setPath(t,e,o){this.state++,((t,e,o,n,r,i,s)=>{const a=((t,e,o)=>{let n=u(t);return e&&(n="#"+n),void 0!==o&&(n+="?"+o),n})([...d(this.root).segments,...n],o,s);r===l?t.pushState(i,"",a):t.replaceState(i,"",a)})(window.history,0,this.useHash,t,e,this.state,o)}getPath(){return((t,e,o)=>{const n=d(this.root).segments,r=o?t.hash.slice(1):t.pathname;return((t,e)=>{if(t.length>e.length)return null;if(t.length<=1&&""===t[0])return e;for(let o=0;o<t.length;o++)if(t[o]!==e[o])return null;return e.length===t.length?[""]:e.slice(t.length)})(n,d(r).segments)})(window.location,0,this.useHash)}routeChangeEvent(t,e){const o=this.previousPath,n=u(t);return this.previousPath=n,n===o?null:{from:o,redirectedFrom:e?u(e):null,to:n}}get el(){return(0,n.i)(this)}},O=class{constructor(t){(0,n.r)(this,t),this.routerDirection="forward",this.onClick=t=>{(0,s.o)(this.href,t,this.routerDirection,this.routerAnimation)}}render(){const t=(0,i.b)(this),e={href:this.href,rel:this.rel,target:this.target};return(0,n.h)(n.H,{onClick:this.onClick,class:(0,s.c)(this.color,{[t]:!0,"ion-activatable":!0})},(0,n.h)("a",Object.assign({},e),(0,n.h)("slot",null)))}};O.style=":host{--background:transparent;--color:var(--ion-color-primary, #3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"}}]);