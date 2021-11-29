(self["webpackChunkcom_app_shei_manageam"] = self["webpackChunkcom_app_shei_manageam"] || []).push([["src_app_pages_auth_home_home_module_ts"],{

/***/ 5849:
/*!********************************************************!*\
  !*** ./src/app/pages/auth/home/home-routing.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageRoutingModule": () => (/* binding */ HomePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 9809);




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], HomePageRoutingModule);



/***/ }),

/***/ 7402:
/*!************************************************!*\
  !*** ./src/app/pages/auth/home/home.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": () => (/* binding */ HomePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-routing.module */ 5849);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page */ 9809);







let HomePageModule = class HomePageModule {
};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _home_routing_module__WEBPACK_IMPORTED_MODULE_0__.HomePageRoutingModule
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_1__.HomePage]
    })
], HomePageModule);



/***/ }),

/***/ 9809:
/*!**********************************************!*\
  !*** ./src/app/pages/auth/home/home.page.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./home.page.html */ 3857);
/* harmony import */ var _home_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.scss */ 2346);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);




let HomePage = class HomePage {
    constructor() { }
    ngOnInit() { }
    next(e) {
        this.slides.slideNext();
    }
};
HomePage.ctorParameters = () => [];
HomePage.propDecorators = {
    slides: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__.ViewChild, args: ['mySlider',] }]
};
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Component)({
        selector: 'app-home',
        template: _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_home_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], HomePage);



/***/ }),

/***/ 2346:
/*!************************************************!*\
  !*** ./src/app/pages/auth/home/home.page.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".slide-1 {\n  background-image: url(\"/assets/img/slide-1.png\");\n  background-size: cover;\n}\n\n.slide-2 {\n  background-image: url(\"/assets/img/slide-2.png\");\n  background-size: cover;\n}\n\n.slide-3 {\n  background-image: url(\"/assets/img/slide-3.png\");\n  background-size: cover;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0RBQUE7RUFDQSxzQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0RBQUE7RUFDQSxzQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0RBQUE7RUFDQSxzQkFBQTtBQUNGIiwiZmlsZSI6ImhvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNsaWRlLTEge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL2ltZy9zbGlkZS0xLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuLnNsaWRlLTIge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL2ltZy9zbGlkZS0yLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuLnNsaWRlLTMge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL2ltZy9zbGlkZS0zLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cbiJdfQ== */");

/***/ }),

/***/ 3857:
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/auth/home/home.page.html ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-app>\n  <ion-content class=\"h-full bg-gray-200 font-geomanist\">\n    <ion-slides pager=\"true\" class=\"h-screen\" #mySlider>\n      <ion-slide class=\"h-full slide-1 relative\">\n        <span\n          class=\"\n            absolute\n            top-10\n            right-6\n            font-semibold\n            tracking-wider\n            text-white\n          \"\n          routerLink=\"/auth/signup\"\n          >Skip</span\n        >\n        <div\n          class=\"\n            grid\n            h-full\n            w-full\n            items-end\n            p-2\n            pb-16\n            bg-gradient-to-t\n            from-gray-900\n          \"\n        >\n          <div class=\"w-full p-3\">\n            <h3 class=\"text-white font-bold text-2xl mb-4\">\n              Track your well being\n            </h3>\n            <div class=\"grid\">\n              <span\n                class=\"inline-block uppercase bg-white py-3 px-3 rounded-lg\"\n                (click)=\"next($event)\"\n              >\n                Next\n              </span>\n            </div>\n          </div>\n        </div>\n      </ion-slide>\n      <ion-slide class=\"h-full slide-2 relative\">\n        <span\n          class=\"\n            absolute\n            top-10\n            right-6\n            font-semibold\n            tracking-wider\n            text-white\n          \"\n          routerLink=\"/auth/signup\"\n          >Skip</span\n        >\n        <div\n          class=\"\n            grid\n            h-full\n            w-full\n            items-end\n            p-2\n            pb-16\n            bg-gradient-to-t\n            from-gray-900\n          \"\n        >\n          <div class=\"w-full p-3\">\n            <h3 class=\"text-white font-bold text-2xl mb-4\">Your meal guide</h3>\n            <div class=\"grid\">\n              <span\n                (click)=\"next($event)\"\n                class=\"inline-block uppercase bg-white py-3 px-3 rounded-lg\"\n              >\n                Next\n              </span>\n            </div>\n          </div>\n        </div>\n      </ion-slide>\n      <ion-slide class=\"h-full slide-3 relative\">\n        <div\n          class=\"\n            grid\n            h-full\n            w-full\n            items-end\n            p-2\n            pb-16\n            bg-gradient-to-t\n            from-gray-900\n          \"\n        >\n          <div class=\"w-full p-3\">\n            <h3 class=\"text-white font-bold text-2xl mb-4\">\n              Diabetes education\n            </h3>\n            <div class=\"grid grid-cols-2 gap-3\">\n              <span\n                routerLink=\"/auth/signin\"\n                class=\"inline-block uppercase bg-white py-3 px-3 rounded-lg\"\n              >\n                Login\n              </span>\n              <span\n                routerLink=\"/auth/signup\"\n                class=\"\n                  inline-block\n                  uppercase\n                  px-3\n                  border border-white\n                  text-white\n                  rounded-lg\n                  py-3\n                \"\n                >Get Started</span\n              >\n            </div>\n          </div>\n        </div>\n      </ion-slide>\n    </ion-slides>\n  </ion-content>\n</ion-app>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_pages_auth_home_home_module_ts.js.map