(self.webpackChunkcom_app_shei_manageam=self.webpackChunkcom_app_shei_manageam||[]).push([[7969],{7969:(e,t,n)=>{"use strict";n.r(t),n.d(t,{SigninPageModule:()=>w});var o=n(8583),l=n(665),r=n(3083),i=n(7456),a=n(4762),s=n(639),c=n(4031),d=n(9709);let m=(()=>{class e{constructor(e,t,n){this.modalController=e,this.global=t,this.userService=n,this.user={email:""}}ngOnInit(){}save(){if(!this.user.email)return this.global.alert("ManageAm account","Email address is required!","OK");this.userService.resetPassword(this.user).subscribe(e=>{this.global.alert("ManageAm account",e,"OK"),this.modalController.dismiss()})}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](r.ModalController),s["\u0275\u0275directiveInject"](c.U),s["\u0275\u0275directiveInject"](d.K))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-forgot-password"]],decls:13,vars:1,consts:[[1,"text-gray-900"],[1,"bg-blue-100","px-4","py-6","ion-no-border","text-xl","flex","justify-between","items-center"],[1,"font-bold"],["name","close",1,"bg-gray-500","text-2xl","text-white","rounded-full",3,"click"],[1,"p-4","space-y-4"],["position","stacked",1,"block","font-calibre","w-full"],["type","text","placeholder","Enter password",3,"ngModel","ngModelChange"],[1,"w-full","bg-accentBlue","p-4","font-semibold","text-center","block","text-white","uppercase","rounded-xl","mt-10",3,"click"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"ion-app",0),s["\u0275\u0275elementStart"](1,"ion-header",1),s["\u0275\u0275elementStart"](2,"p",2),s["\u0275\u0275text"](3,"Forgot password?"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](4,"ion-icon",3),s["\u0275\u0275listener"]("click",function(){return t.modalController.dismiss()}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"ion-content"),s["\u0275\u0275elementStart"](6,"div",4),s["\u0275\u0275elementStart"](7,"ion-item"),s["\u0275\u0275elementStart"](8,"ion-label",5),s["\u0275\u0275text"](9,"Account email"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](10,"ion-input",6),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.user.email=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](11,"span",7),s["\u0275\u0275listener"]("click",function(){return t.save()}),s["\u0275\u0275text"](12,"Reset my Account"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275advance"](10),s["\u0275\u0275property"]("ngModel",t.user.email))},directives:[r.IonApp,r.IonHeader,r.IonIcon,r.IonContent,r.IonItem,r.IonLabel,r.IonInput,r.TextValueAccessor,l.NgControlStatus,l.NgModel],styles:[""]}),e})();var u=n(7020);function p(e,t){1&e&&s["\u0275\u0275element"](0,"ion-icon",13)}function g(e,t){1&e&&s["\u0275\u0275element"](0,"ion-icon",14)}const h=[{path:"",component:(()=>{class e{constructor(e,t,n,o,l){this.globalService=e,this.userService=t,this.router=n,this.auth=o,this.modalController=l,this.showPassword=!1,this.data={email:"",password:""}}ngOnInit(){}resetPassword(){return(0,a.mG)(this,void 0,void 0,function*(){const e=yield this.modalController.create({component:m,cssClass:"modal-40"});yield e.present()})}login(){if(!this.data.email||!this.data.password)return this.globalService.alert("Login","Please complete all the require information",["Okay"]);this.userService.login(this.data).subscribe(e=>{console.log(e);const{user_details:t}=e;this.userService.setDetails(e),this.auth.login(t),this.router.navigate(["/"])})}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](c.U),s["\u0275\u0275directiveInject"](d.K),s["\u0275\u0275directiveInject"](i.F0),s["\u0275\u0275directiveInject"](u.$),s["\u0275\u0275directiveInject"](r.ModalController))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-signin"]],decls:23,vars:6,consts:[[1,"min-h-screen","pale-bg-default","grid","items-center"],["src","/assets/img/logo.svg",1,"w-full","p-6","inline-block"],[1,"bg-white","px-6","py-10","m-4","space-y-5","font-geomanist","rounded-xl"],["position","stacked",1,"block","font-calibre","w-full"],["placeholder","Enter your email address","type","text",3,"value","ngModel","ngModelChange"],[1,"relative"],[1,"absolute","right-0","top-10",3,"click"],["name","eye-outline",4,"ngIf"],["name","eye-off-outline",4,"ngIf"],["placeholder","Enter your password",3,"type","ngModel","ngModelChange"],[1,"text-accentBlue","text-right",3,"click"],[1,"w-full","bg-accentBlue","p-4","font-semibold","text-center","block","text-white","uppercase","rounded-xl",3,"click"],["routerLink","/auth/signup",1,"w-full","p-4","text-center","block","text-accentBlue","border","border-accentBlue","uppercase","rounded-xl"],["name","eye-outline"],["name","eye-off-outline"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"ion-app"),s["\u0275\u0275elementStart"](1,"ion-content"),s["\u0275\u0275elementStart"](2,"div",0),s["\u0275\u0275elementStart"](3,"div"),s["\u0275\u0275element"](4,"img",1),s["\u0275\u0275elementStart"](5,"div",2),s["\u0275\u0275elementStart"](6,"ion-item"),s["\u0275\u0275elementStart"](7,"ion-label",3),s["\u0275\u0275text"](8,"Email address"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](9,"ion-input",4),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.data.email=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](10,"ion-item",5),s["\u0275\u0275elementStart"](11,"ion-label",3),s["\u0275\u0275text"](12,"Password"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](13,"span",6),s["\u0275\u0275listener"]("click",function(){return t.showPassword=!t.showPassword}),s["\u0275\u0275template"](14,p,1,0,"ion-icon",7),s["\u0275\u0275template"](15,g,1,0,"ion-icon",8),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](16,"ion-input",9),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.data.password=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](17,"p",10),s["\u0275\u0275listener"]("click",function(){return t.resetPassword()}),s["\u0275\u0275text"](18," Forgot password? "),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](19,"span",11),s["\u0275\u0275listener"]("click",function(){return t.login()}),s["\u0275\u0275text"](20,"Login"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](21,"span",12),s["\u0275\u0275text"](22,"create account"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275advance"](9),s["\u0275\u0275property"]("value",t.data.email)("ngModel",t.data.email),s["\u0275\u0275advance"](5),s["\u0275\u0275property"]("ngIf",t.showPassword),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",!t.showPassword),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("type",t.showPassword?"text":"password")("ngModel",t.data.password))},directives:[r.IonApp,r.IonContent,r.IonItem,r.IonLabel,r.IonInput,r.TextValueAccessor,l.NgControlStatus,l.NgModel,o.NgIf,r.RouterLinkDelegate,i.rH,r.IonIcon],styles:["ion-item[_ngcontent-%COMP%]{--inner-padding-start:0px}"]}),e})()}];let f=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({imports:[[i.Bz.forChild(h)],i.Bz]}),e})(),w=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({imports:[[o.CommonModule,l.FormsModule,r.IonicModule,f]]}),e})()}}]);