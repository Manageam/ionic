"use strict";(self.webpackChunkcom_app_shei_manageam=self.webpackChunkcom_app_shei_manageam||[]).push([[6945],{6945:(D,g,i)=>{i.r(g),i.d(g,{HomePageModule:()=>N});var f=i(8583),u=i(665),s=i(1772),p=i(7456),d=i(4762),S=i(3856),e=i(639),y=i(1289);function x(n,r){if(1&n){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"ion-item",7),e.\u0275\u0275listener("click",function(){const a=e.\u0275\u0275restoreView(t).$implicit;return e.\u0275\u0275nextContext().view(a)}),e.\u0275\u0275elementStart(1,"p",8),e.\u0275\u0275text(2),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd()}if(2&n){const t=r.$implicit;e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(t.topic)}}let C=(()=>{class n{constructor(t,o,l){this.educationService=t,this.modalController=o,this.platform=l,this.searched=[],this.searchText="",this.allTopics=[],this.subs=[]}ngOnInit(){let t=this.educationService.allTopics.subscribe(o=>{this.allTopics=o});this.subs.push(t),t=this.platform.backButton.subscribe(()=>{this.modalController.dismiss()}),this.subs.push(t)}search(){if(this.searched=[],this.searchText.length<1)return;const t=new RegExp(this.searchText,"ig");this.searched=this.allTopics.filter(o=>t.test(o.title)||t.test(o.description)).slice(0,10)}view(t){return(0,d.mG)(this,void 0,void 0,function*(){yield(yield this.modalController.create({component:S.W,componentProps:{topic:t}})).present()})}ngOnDestroy(){this.subs.forEach(t=>t.unsubscribe())}}return n.\u0275fac=function(t){return new(t||n)(e.\u0275\u0275directiveInject(y.P),e.\u0275\u0275directiveInject(s.ModalController),e.\u0275\u0275directiveInject(s.Platform))},n.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["app-search"]],decls:10,vars:2,consts:[[1,"bg-white","text-gray-900"],[1,"ion-no-border","font-geomanist"],[1,"bg-white","flex","w-full","p-4","items-center","border-b","border-gray-200"],["name","search",1,"text-2xl","p-2"],["type","text","placeholder","Search on diabetes...",1,"py-2","w-full","outline-none","search","bg-white",3,"ngModel","ngModelChange"],["name","close",1,"text-2xl","text-accent","p-2",3,"click"],[3,"click",4,"ngFor","ngForOf"],[3,"click"],[1,"px-4","py-2","text-gray-900"]],template:function(t,o){1&t&&(e.\u0275\u0275elementStart(0,"ion-app",0),e.\u0275\u0275elementStart(1,"ion-header",1),e.\u0275\u0275elementStart(2,"div",2),e.\u0275\u0275element(3,"ion-icon",3),e.\u0275\u0275elementStart(4,"input",4),e.\u0275\u0275listener("ngModelChange",function(a){return o.searchText=a})("ngModelChange",function(){return o.search()}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"ion-icon",5),e.\u0275\u0275listener("click",function(){return o.modalController.dismiss()}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(6,"ion-content"),e.\u0275\u0275elementStart(7,"div"),e.\u0275\u0275elementStart(8,"ion-list"),e.\u0275\u0275template(9,x,3,1,"ion-item",6),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd()),2&t&&(e.\u0275\u0275advance(4),e.\u0275\u0275property("ngModel",o.searchText),e.\u0275\u0275advance(5),e.\u0275\u0275property("ngForOf",o.searched))},directives:[s.IonApp,s.IonHeader,s.IonIcon,u.DefaultValueAccessor,u.NgControlStatus,u.NgModel,s.IonContent,s.IonList,f.NgForOf,s.IonItem],styles:[""]}),n})();var v=i(9709),h=i(8384);const c=(0,h.fo)("PushNotifications",{}),I=(0,h.fo)("Device",{web:()=>i.e(7811).then(i.bind(i,7811)).then(n=>new n.DeviceWeb)});var b=i(2340),E=i(1841);let P=(()=>{class n{constructor(t,o){this.http=t,this.userService=o}pushFCMToken({token:t,device_id:o}){const l=this.userService.fetchDetails(),{user_details:{id:a}}=l,m=new FormData;return m.append("fcm_token",t),m.append("user_id",a),m.append("device_id",o),this.http.post(`${b.N.apiUrl}/token?silent=true`,m)}}return n.\u0275fac=function(t){return new(t||n)(e.\u0275\u0275inject(E.eN),e.\u0275\u0275inject(v.K))},n.\u0275prov=e.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"}),n})(),M=(()=>{class n{constructor(t){this.settingService=t}init(){return(0,d.mG)(this,void 0,void 0,function*(){"web"!=h.dV.getPlatform()&&(this.registerPush(),this.registerListeners())})}registerPush(){return(0,d.mG)(this,void 0,void 0,function*(){let t=yield c.checkPermissions();if("prompt"===t.receive&&(t=yield c.requestPermissions()),"granted"!==t.receive)throw new Error("User denied permissions!");yield c.register()})}registerListeners(){return(0,d.mG)(this,void 0,void 0,function*(){const t=(yield I.getId()).uuid;yield c.addListener("registration",o=>{this.settingService.pushFCMToken({token:o.value,device_id:t}).subscribe(),console.info("Registration token: ",o.value)}),yield c.addListener("registrationError",o=>{console.error("Registration error: ",o.error)}),yield c.addListener("pushNotificationActionPerformed",o=>{console.log("Push notification action performed",o.actionId,o.inputValue)})})}}return n.\u0275fac=function(t){return new(t||n)(e.\u0275\u0275inject(P))},n.\u0275prov=e.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var T=i(3171),F=i(8632);const j=[{path:"",component:(()=>{class n{constructor(t,o,l,a){this.userService=t,this.modalController=o,this.router=l,this.fcmService=a,this.user={},this.tip={}}ngOnInit(){this.userService.userDetails().subscribe(t=>{this.user=t}),this.userService.fetchTip().subscribe(t=>{this.tip=t}),this.fcmService.init()}showSearch(){return(0,d.mG)(this,void 0,void 0,function*(){yield(yield this.modalController.create({component:C,cssClass:"modal-70"})).present()})}}return n.\u0275fac=function(t){return new(t||n)(e.\u0275\u0275directiveInject(v.K),e.\u0275\u0275directiveInject(s.ModalController),e.\u0275\u0275directiveInject(p.F0),e.\u0275\u0275directiveInject(M))},n.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["app-home"]],decls:28,vars:3,consts:[[1,"pale-bg-default","min-h-full"],[1,"p-4"],[1,"text-3xl","font-bold","font-calibre"],[1,"font-geomanist"],[1,"bg-white","mt-4","flex","px-2","items-center","rounded",3,"click"],["name","search",1,"text-2xl","p-2"],["type","text",1,"py-4","w-full","text-gray-500"],[1,"px-4","py-2","capitalize","text-xl","font-bold"],[1,"p-4","bg-white","grid","grid-cols-12",3,"click"],[1,"text-center","col-span-3"],["src","/assets/img/tip.svg"],[1,"col-span-9"],[1,"font-bold","mb-1","text-xl","flex","justify-between"],["name","chevron-forward",1,"text-xl"],[1,"text-accentBlue","font-geomanist"],[1,"text-gray-500","font-geomanist"],[1,"py-8","px-4","grid","grid-cols-2","gap-5"]],template:function(t,o){1&t&&(e.\u0275\u0275elementStart(0,"div",0),e.\u0275\u0275elementStart(1,"div",1),e.\u0275\u0275elementStart(2,"p",2),e.\u0275\u0275text(3),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"p",3),e.\u0275\u0275text(5," Let's keep you up to date on your health, learn something new today. "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(6,"div",4),e.\u0275\u0275listener("click",function(){return o.showSearch()}),e.\u0275\u0275element(7,"ion-icon",5),e.\u0275\u0275elementStart(8,"p",6),e.\u0275\u0275text(9,"Search on diabetes..."),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(10,"div"),e.\u0275\u0275elementStart(11,"p",7),e.\u0275\u0275text(12,"Daily health tip"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(13,"a",8),e.\u0275\u0275listener("click",function(){return o.router.navigate(["/education"])}),e.\u0275\u0275elementStart(14,"div",9),e.\u0275\u0275element(15,"img",10),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(16,"div",11),e.\u0275\u0275elementStart(17,"p",12),e.\u0275\u0275elementStart(18,"span"),e.\u0275\u0275text(19),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(20,"ion-icon",13),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(21,"p",14),e.\u0275\u0275text(22,"Learn more About diabetes"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(23,"p",15),e.\u0275\u0275text(24),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(25,"div",16),e.\u0275\u0275element(26,"app-blood-sugar"),e.\u0275\u0275element(27,"app-blood-pressure"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementEnd()),2&t&&(e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1("Hello, ",o.user.name,""),e.\u0275\u0275advance(16),e.\u0275\u0275textInterpolate1("",o.tip.title," "),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate(o.tip.note))},directives:[s.IonIcon,T.$,F.U],styles:[""]}),n})()}];let H=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[[p.Bz.forChild(j)],p.Bz]}),n})();var w=i(1930);let N=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[[f.CommonModule,u.FormsModule,s.IonicModule,H,s.IonicModule,w.K]]}),n})()}}]);