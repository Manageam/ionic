"use strict";(self.webpackChunkcom_app_shei_manageam=self.webpackChunkcom_app_shei_manageam||[]).push([[7811],{7811:(S,d,r)=>{r.r(d),r.d(d,{DeviceWeb:()=>m});var a=r(8239),v=r(8384);class m extends v.Uw{getId(){var e=this;return(0,a.Z)(function*(){return{uuid:e.getUid()}})()}getInfo(){var e=this;return(0,a.Z)(function*(){if("undefined"==typeof navigator||!navigator.userAgent)throw e.unavailable("Device API not available in this browser");const i=navigator.userAgent,s=e.parseUa(i);return{model:s.model,platform:"web",operatingSystem:s.operatingSystem,osVersion:s.osVersion,manufacturer:navigator.vendor,isVirtual:!1,webViewVersion:s.browserVersion}})()}getBatteryInfo(){var e=this;return(0,a.Z)(function*(){if("undefined"==typeof navigator||!navigator.getBattery)throw e.unavailable("Device API not available in this browser");let i={};try{i=yield navigator.getBattery()}catch(s){}return{batteryLevel:i.level,isCharging:i.charging}})()}getLanguageCode(){return(0,a.Z)(function*(){return{value:navigator.language}})()}parseUa(e){const i={},s=e.indexOf("(")+1;let c=e.indexOf(") AppleWebKit");-1!==e.indexOf(") Gecko")&&(c=e.indexOf(") Gecko"));const n=e.substring(s,c);if(-1!==e.indexOf("Android")){const t=n.replace("; wv","").split("; ").pop();t&&(i.model=t.split(" Build")[0]),i.osVersion=n.split("; ")[1]}else if(i.model=n.split("; ")[0],"undefined"!=typeof navigator&&navigator.oscpu)i.osVersion=navigator.oscpu;else if(-1!==e.indexOf("Windows"))i.osVersion=n;else{const t=n.split("; ").pop();if(t){const o=t.replace(" like Mac OS X","").split(" ");i.osVersion=o[o.length-1].replace(/_/g,".")}}i.operatingSystem=/android/i.test(e)?"android":/iPad|iPhone|iPod/.test(e)&&!window.MSStream?"ios":/Win/.test(e)?"windows":/Mac/i.test(e)?"mac":"unknown";const w=!!window.InstallTrigger,g=!!window.ApplePaySession,h=!!window.chrome,f=/Edg/.test(e),p=/FxiOS/.test(e),u=/CriOS/.test(e),x=/EdgiOS/.test(e);if(g||h&&!f||p||u||x){let t;t=p?"FxiOS":u?"CriOS":x?"EdgiOS":g?"Version":"Chrome";const o=e.split(" ");for(const l of o)if(l.includes(t)){const _=l.split("/")[1];i.browserVersion=_}}else if(w||f){const l=e.split("").reverse().join("").split("/")[0].split("").reverse().join("");i.browserVersion=l}return i}getUid(){if("undefined"!=typeof window){let e=window.localStorage.getItem("_capuid");return e||(e=this.uuid4(),window.localStorage.setItem("_capuid",e),e)}return this.uuid4()}uuid4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){const i=16*Math.random()|0;return("x"===e?i:3&i|8).toString(16)})}}}}]);