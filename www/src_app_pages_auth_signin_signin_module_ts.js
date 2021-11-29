(self["webpackChunkcom_app_shei_manageam"] = self["webpackChunkcom_app_shei_manageam"] || []).push([["src_app_pages_auth_signin_signin_module_ts"],{

/***/ 3742:
/*!************************************************************!*\
  !*** ./src/app/pages/auth/signin/signin-routing.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SigninPageRoutingModule": () => (/* binding */ SigninPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _signin_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signin.page */ 296);




const routes = [
    {
        path: '',
        component: _signin_page__WEBPACK_IMPORTED_MODULE_0__.SigninPage
    }
];
let SigninPageRoutingModule = class SigninPageRoutingModule {
};
SigninPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], SigninPageRoutingModule);



/***/ }),

/***/ 7382:
/*!****************************************************!*\
  !*** ./src/app/pages/auth/signin/signin.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SigninPageModule": () => (/* binding */ SigninPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _signin_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./signin-routing.module */ 3742);
/* harmony import */ var _signin_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signin.page */ 296);







let SigninPageModule = class SigninPageModule {
};
SigninPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _signin_routing_module__WEBPACK_IMPORTED_MODULE_0__.SigninPageRoutingModule
        ],
        declarations: [_signin_page__WEBPACK_IMPORTED_MODULE_1__.SigninPage]
    })
], SigninPageModule);



/***/ }),

/***/ 296:
/*!**************************************************!*\
  !*** ./src/app/pages/auth/signin/signin.page.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SigninPage": () => (/* binding */ SigninPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_signin_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./signin.page.html */ 4018);
/* harmony import */ var _signin_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signin.page.scss */ 911);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authentication/authentication.service */ 7020);
/* harmony import */ var src_app_services_global_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/global/global.service */ 4031);
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/user/user.service */ 9709);








let SigninPage = class SigninPage {
    constructor(globalService, userService, router, auth) {
        this.globalService = globalService;
        this.userService = userService;
        this.router = router;
        this.auth = auth;
        this.showPassword = false;
        this.data = {
            email: '',
            password: '',
        };
    }
    ngOnInit() { }
    login() {
        if (!this.data.email || !this.data.password) {
            return this.globalService.alert('Login', 'Please complete all the require information', ['Okay']);
        }
        this.userService.login(this.data).subscribe((user) => {
            const { user_details } = user;
            this.userService.setDetails(user);
            this.auth.login(user_details);
            this.router.navigate(['/']);
        });
    }
};
SigninPage.ctorParameters = () => [
    { type: src_app_services_global_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService },
    { type: src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router },
    { type: src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_2__.AuthenticationService }
];
SigninPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-signin',
        template: _raw_loader_signin_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_signin_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], SigninPage);



/***/ }),

/***/ 911:
/*!****************************************************!*\
  !*** ./src/app/pages/auth/signin/signin.page.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("ion-item {\n  --inner-padding-start: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ25pbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwwQkFBQTtBQUNGIiwiZmlsZSI6InNpZ25pbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taXRlbSB7XG4gIC0taW5uZXItcGFkZGluZy1zdGFydDogMHB4O1xufVxuIl19 */");

/***/ }),

/***/ 4018:
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/auth/signin/signin.page.html ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-app>\n  <ion-content>\n    <div class=\"min-h-screen bg-gray-100 grid items-center\">\n      <div>\n        <img src=\"/assets/img/logo.svg\" class=\"w-full p-6 inline-block\" />\n        <div\n          class=\"bg-white px-6 py-10 m-4 space-y-5 font-geomanist rounded-xl\"\n        >\n          <ion-item>\n            <ion-label class=\"block font-calibre w-full\" position=\"stacked\"\n              >Email address</ion-label\n            >\n            <ion-input\n              placeholder=\"Enter your email address\"\n              type=\"text\"\n              [value]=\"data.email\"\n              [(ngModel)]=\"data.email\"\n            ></ion-input>\n          </ion-item>\n\n          <ion-item class=\"relative\">\n            <ion-label class=\"block font-calibre w-full\" position=\"stacked\"\n              >Password</ion-label\n            >\n            <span\n              class=\"absolute right-0 top-10\"\n              (click)=\"showPassword = !showPassword\"\n            >\n              <ion-icon name=\"eye-outline\" *ngIf=\"showPassword\"></ion-icon>\n              <ion-icon name=\"eye-off-outline\" *ngIf=\"!showPassword\"></ion-icon>\n            </span>\n            <ion-input\n              placeholder=\"Enter your password\"\n              [type]=\"showPassword? 'text': 'password'\"\n              [(ngModel)]=\"data.password\"\n            ></ion-input>\n          </ion-item>\n          <p class=\"text-blue-500 text-right\">Forgot password?</p>\n          <span\n            (click)=\"login()\"\n            class=\"\n              w-full\n              bg-blue-500\n              p-4\n              font-semibold\n              text-center\n              block\n              text-white\n              uppercase\n              rounded-xl\n            \"\n            >Login</span\n          >\n\n          <span\n            class=\"\n              w-full\n              p-4\n              text-center\n              block\n              text-blue-500\n              border border-blue-500\n              uppercase\n              rounded-xl\n            \"\n            routerLink=\"/auth/signup\"\n            >create account</span\n          >\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-app>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_pages_auth_signin_signin_module_ts.js.map