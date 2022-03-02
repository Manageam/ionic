(self["webpackChunkcom_app_shei_manageam"] = self["webpackChunkcom_app_shei_manageam"] || []).push([["src_app_pages_auth_signup_signup_module_ts"],{

/***/ 86270:
/*!************************************************************!*\
  !*** ./src/app/pages/auth/signup/signup-routing.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignupPageRoutingModule": () => (/* binding */ SignupPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _signup_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signup.page */ 68674);




const routes = [
    {
        path: '',
        component: _signup_page__WEBPACK_IMPORTED_MODULE_0__.SignupPage
    }
];
let SignupPageRoutingModule = class SignupPageRoutingModule {
};
SignupPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], SignupPageRoutingModule);



/***/ }),

/***/ 63732:
/*!****************************************************!*\
  !*** ./src/app/pages/auth/signup/signup.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignupPageModule": () => (/* binding */ SignupPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _signup_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signup-routing.module */ 86270);
/* harmony import */ var _signup_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signup.page */ 68674);







let SignupPageModule = class SignupPageModule {
};
SignupPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _signup_routing_module__WEBPACK_IMPORTED_MODULE_0__.SignupPageRoutingModule
        ],
        declarations: [_signup_page__WEBPACK_IMPORTED_MODULE_1__.SignupPage]
    })
], SignupPageModule);



/***/ }),

/***/ 68674:
/*!**************************************************!*\
  !*** ./src/app/pages/auth/signup/signup.page.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignupPage": () => (/* binding */ SignupPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_signup_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./signup.page.html */ 82932);
/* harmony import */ var _signup_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signup.page.scss */ 25108);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authentication/authentication.service */ 97020);
/* harmony import */ var src_app_services_global_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/global/global.service */ 84031);
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user/user.service */ 9709);
/* harmony import */ var _health_profile_health_profile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./health-profile/health-profile.component */ 42966);










let SignupPage = class SignupPage {
    constructor(globalService, modalController, UserService, authService, router) {
        this.globalService = globalService;
        this.modalController = modalController;
        this.UserService = UserService;
        this.authService = authService;
        this.router = router;
        this.showPassword = false;
        this.data = {
            email: '',
            password: '',
            name: '',
        };
    }
    ngOnInit() { }
    register() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.data.email || !this.data.password || !this.data.name) {
                return this.globalService.alert('Registration', 'Please complete all the require information', ['Okay']);
            }
            const modal = yield this.modalController.create({
                component: _health_profile_health_profile_component__WEBPACK_IMPORTED_MODULE_5__.HealthProfileComponent,
                cssClass: 'modal-50',
            });
            yield modal.present();
            const { data } = yield modal.onDidDismiss();
            this.UserService.register(this.data).subscribe((user) => {
                this.authService.login(user.user_details);
                this.UserService.getDetails().subscribe((data) => {
                    this.UserService.setDetails(data);
                });
                this.UserService.updateDetails(data).subscribe(() => (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
                    yield this.router.navigate(['/']);
                }));
            });
        });
    }
};
SignupPage.ctorParameters = () => [
    { type: src_app_services_global_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController },
    { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService },
    { type: src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_2__.AuthenticationService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.Router }
];
SignupPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-signup',
        template: _raw_loader_signup_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_signup_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], SignupPage);



/***/ }),

/***/ 25108:
/*!****************************************************!*\
  !*** ./src/app/pages/auth/signup/signup.page.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWdudXAucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ 82932:
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/auth/signup/signup.page.html ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-app>\n  <ion-content>\n    <div class=\"min-h-screen pale-bg-default grid items-center\">\n      <div>\n        <img src=\"/assets/img/logo.svg\" class=\"w-full p-6 inline-block\" />\n        <div\n          class=\"bg-white px-6 py-10 m-4 space-y-5 font-geomanist rounded-xl\"\n        >\n          <ion-item>\n            <ion-label class=\"block font-calibre w-full\" position=\"stacked\"\n              >Profile name</ion-label\n            >\n            <ion-input\n              placeholder=\"Enter first and last names\"\n              type=\"text\"\n              [value]=\"data.name\"\n              [(ngModel)]=\"data.name\"\n            ></ion-input>\n          </ion-item>\n\n          <ion-item>\n            <ion-label class=\"block font-calibre w-full\" position=\"stacked\"\n              >Email address</ion-label\n            >\n            <ion-input\n              placeholder=\"Enter your email address\"\n              type=\"text\"\n              [value]=\"data.email\"\n              [(ngModel)]=\"data.email\"\n            ></ion-input>\n          </ion-item>\n\n          <ion-item class=\"relative\">\n            <ion-label class=\"block font-calibre w-full\" position=\"stacked\"\n              >Password</ion-label\n            >\n            <span\n              class=\"absolute right-0 top-10\"\n              (click)=\"showPassword = !showPassword\"\n            >\n              <ion-icon name=\"eye-outline\" *ngIf=\"showPassword\"></ion-icon>\n              <ion-icon name=\"eye-off-outline\" *ngIf=\"!showPassword\"></ion-icon>\n            </span>\n            <ion-input\n              placeholder=\"Enter your password\"\n              [type]=\"showPassword? 'text': 'password'\"\n              [(ngModel)]=\"data.password\"\n            ></ion-input>\n          </ion-item>\n\n          <span\n            class=\"\n              mt-6\n              w-full\n              bg-accentBlue\n              p-4\n              font-semibold\n              text-center\n              block\n              text-white\n              uppercase\n              rounded-xl\n            \"\n            (click)=\"register()\"\n            >Continue</span\n          >\n\n          <span\n            class=\"\n              w-full\n              p-4\n              text-center\n              block\n              text-accentBlue\n              border border-accentBlue\n              uppercase\n              rounded-xl\n            \"\n            routerLink=\"/auth/signin\"\n            >Login</span\n          >\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-app>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_pages_auth_signup_signup_module_ts.js.map