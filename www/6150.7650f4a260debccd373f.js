(self.webpackChunkcom_app_shei_manageam=self.webpackChunkcom_app_shei_manageam||[]).push([[6150],{6150:(e,t,n)=>{"use strict";n.r(t),n.d(t,{SignupPageModule:()=>v});var l=n(8583),o=n(665),r=n(3083),i=n(7456),a=n(4762),s=n(639);let d=(()=>{class e{constructor(e){this.modalController=e,this.profile={height:"",weight:"",age:"",gender:""}}ngOnInit(){}save(){const e={};for(let t in this.profile)this.profile[t]&&(e[t]=this.profile[t]);this.modalController.dismiss(e)}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](r.ModalController))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-health-profile"]],decls:30,vars:8,consts:[[1,"text-gray-900"],[1,"bg-blue-100","px-4","py-6","ion-no-border","text-xl","flex","justify-between","items-center"],[1,"font-bold"],["name","close",1,"bg-gray-500","text-2xl","text-white","rounded-full",3,"click"],[1,"py-4","space-y-4"],[1,"grid","grid-cols-2","gap-8","px-4"],["position","stacked",1,"block","font-calibre","w-full"],["placeholder","Choose Gender","interface","popover",1,"w-full",3,"value","ngModel","ngModelChange"],["value","Male"],["value","Female"],["placeholder","Enter age","type","number",3,"value","ngModel","ngModelChange"],[1,"px-4"],["placeholder","Enter weight","type","number",3,"value","ngModel","ngModelChange"],["placeholder","Enter height","type","number",3,"value","ngModel","ngModelChange"],[1,"mx-4","bg-accentBlue","p-4","font-semibold","text-center","block","text-white","uppercase","rounded-xl","mt-10",3,"click"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"ion-app",0),s["\u0275\u0275elementStart"](1,"ion-header",1),s["\u0275\u0275elementStart"](2,"p",2),s["\u0275\u0275text"](3,"Health Profile"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](4,"ion-icon",3),s["\u0275\u0275listener"]("click",function(){return t.modalController.dismiss()}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](5,"ion-content"),s["\u0275\u0275elementStart"](6,"div",4),s["\u0275\u0275elementStart"](7,"div",5),s["\u0275\u0275elementStart"](8,"ion-item"),s["\u0275\u0275elementStart"](9,"ion-label",6),s["\u0275\u0275text"](10,"Gender"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](11,"ion-select",7),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.profile.gender=e}),s["\u0275\u0275elementStart"](12,"ion-select-option",8),s["\u0275\u0275text"](13,"Male"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](14,"ion-select-option",9),s["\u0275\u0275text"](15,"Female"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](16,"ion-item"),s["\u0275\u0275elementStart"](17,"ion-label",6),s["\u0275\u0275text"](18,"Age"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](19,"ion-input",10),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.profile.age=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](20,"ion-item",11),s["\u0275\u0275elementStart"](21,"ion-label",6),s["\u0275\u0275text"](22,"Weight(kg)"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](23,"ion-input",12),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.profile.weight=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](24,"ion-item",11),s["\u0275\u0275elementStart"](25,"ion-label",6),s["\u0275\u0275text"](26,"Height(m)"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](27,"ion-input",13),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.profile.height=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](28,"span",14),s["\u0275\u0275listener"]("click",function(){return t.save()}),s["\u0275\u0275text"](29,"Done"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275advance"](11),s["\u0275\u0275property"]("value",t.profile.gender)("ngModel",t.profile.gender),s["\u0275\u0275advance"](8),s["\u0275\u0275property"]("value",t.profile.age)("ngModel",t.profile.age),s["\u0275\u0275advance"](4),s["\u0275\u0275property"]("value",t.profile.weight)("ngModel",t.profile.weight),s["\u0275\u0275advance"](4),s["\u0275\u0275property"]("value",t.profile.height)("ngModel",t.profile.height))},directives:[r.IonApp,r.IonHeader,r.IonIcon,r.IonContent,r.IonItem,r.IonLabel,r.IonSelect,r.SelectValueAccessor,o.NgControlStatus,o.NgModel,r.IonSelectOption,r.IonInput,r.NumericValueAccessor],styles:[""]}),e})();var c=n(4031),m=n(9709),p=n(7020);function u(e,t){1&e&&s["\u0275\u0275element"](0,"ion-icon",13)}function g(e,t){1&e&&s["\u0275\u0275element"](0,"ion-icon",14)}const h=[{path:"",component:(()=>{class e{constructor(e,t,n,l,o){this.globalService=e,this.modalController=t,this.UserService=n,this.authService=l,this.router=o,this.showPassword=!1,this.data={email:"",password:"",name:""}}ngOnInit(){}register(){return(0,a.mG)(this,void 0,void 0,function*(){if(!this.data.email||!this.data.password||!this.data.name)return this.globalService.alert("Registration","Please complete all the require information",["Okay"]);const e=yield this.modalController.create({component:d,cssClass:"modal-50"});yield e.present();const{data:t}=yield e.onDidDismiss();this.UserService.register(this.data).subscribe(e=>{this.authService.login(e.user_details),this.UserService.getDetails().subscribe(e=>{this.UserService.setDetails(e)}),t?this.UserService.updateDetails(t).subscribe(()=>(0,a.mG)(this,void 0,void 0,function*(){yield this.router.navigate(["/"])})):this.router.navigate(["/"])})})}}return e.\u0275fac=function(t){return new(t||e)(s["\u0275\u0275directiveInject"](c.U),s["\u0275\u0275directiveInject"](r.ModalController),s["\u0275\u0275directiveInject"](m.K),s["\u0275\u0275directiveInject"](p.$),s["\u0275\u0275directiveInject"](i.F0))},e.\u0275cmp=s["\u0275\u0275defineComponent"]({type:e,selectors:[["app-signup"]],decls:25,vars:8,consts:[[1,"min-h-screen","pale-bg-default","grid","items-center"],["src","/assets/img/logo.svg",1,"w-full","p-6","inline-block"],[1,"bg-white","px-6","py-10","m-4","space-y-5","font-geomanist","rounded-xl"],["position","stacked",1,"block","font-calibre","w-full"],["placeholder","Enter first and last names","type","text",3,"value","ngModel","ngModelChange"],["placeholder","Enter your email address","type","text",3,"value","ngModel","ngModelChange"],[1,"relative"],[1,"absolute","right-0","top-10",3,"click"],["name","eye-outline",4,"ngIf"],["name","eye-off-outline",4,"ngIf"],["placeholder","Enter your password",3,"type","ngModel","ngModelChange"],[1,"mt-6","w-full","bg-accentBlue","p-4","font-semibold","text-center","block","text-white","uppercase","rounded-xl",3,"click"],["routerLink","/auth/signin",1,"w-full","p-4","text-center","block","text-accentBlue","border","border-accentBlue","uppercase","rounded-xl"],["name","eye-outline"],["name","eye-off-outline"]],template:function(e,t){1&e&&(s["\u0275\u0275elementStart"](0,"ion-app"),s["\u0275\u0275elementStart"](1,"ion-content"),s["\u0275\u0275elementStart"](2,"div",0),s["\u0275\u0275elementStart"](3,"div"),s["\u0275\u0275element"](4,"img",1),s["\u0275\u0275elementStart"](5,"div",2),s["\u0275\u0275elementStart"](6,"ion-item"),s["\u0275\u0275elementStart"](7,"ion-label",3),s["\u0275\u0275text"](8,"Profile name"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](9,"ion-input",4),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.data.name=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](10,"ion-item"),s["\u0275\u0275elementStart"](11,"ion-label",3),s["\u0275\u0275text"](12,"Email address"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](13,"ion-input",5),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.data.email=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](14,"ion-item",6),s["\u0275\u0275elementStart"](15,"ion-label",3),s["\u0275\u0275text"](16,"Password"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](17,"span",7),s["\u0275\u0275listener"]("click",function(){return t.showPassword=!t.showPassword}),s["\u0275\u0275template"](18,u,1,0,"ion-icon",8),s["\u0275\u0275template"](19,g,1,0,"ion-icon",9),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](20,"ion-input",10),s["\u0275\u0275listener"]("ngModelChange",function(e){return t.data.password=e}),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](21,"span",11),s["\u0275\u0275listener"]("click",function(){return t.register()}),s["\u0275\u0275text"](22,"Continue"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementStart"](23,"span",12),s["\u0275\u0275text"](24,"Login"),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"](),s["\u0275\u0275elementEnd"]()),2&e&&(s["\u0275\u0275advance"](9),s["\u0275\u0275property"]("value",t.data.name)("ngModel",t.data.name),s["\u0275\u0275advance"](4),s["\u0275\u0275property"]("value",t.data.email)("ngModel",t.data.email),s["\u0275\u0275advance"](5),s["\u0275\u0275property"]("ngIf",t.showPassword),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("ngIf",!t.showPassword),s["\u0275\u0275advance"](1),s["\u0275\u0275property"]("type",t.showPassword?"text":"password")("ngModel",t.data.password))},directives:[r.IonApp,r.IonContent,r.IonItem,r.IonLabel,r.IonInput,r.TextValueAccessor,o.NgControlStatus,o.NgModel,l.NgIf,r.RouterLinkDelegate,i.rH,r.IonIcon],styles:[""]}),e})()}];let f=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({imports:[[i.Bz.forChild(h)],i.Bz]}),e})(),v=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=s["\u0275\u0275defineInjector"]({imports:[[l.CommonModule,o.FormsModule,r.IonicModule,f]]}),e})()}}]);