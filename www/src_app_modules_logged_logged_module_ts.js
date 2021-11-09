(self["webpackChunkcom_app_shei_manageam"] = self["webpackChunkcom_app_shei_manageam"] || []).push([["src_app_modules_logged_logged_module_ts"],{

/***/ 4363:
/*!*********************************************************!*\
  !*** ./src/app/modules/logged/logged-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoggedRoutingModule": () => (/* binding */ LoggedRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 9895);



const routes = [
    {
        path: '',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_pages_logged_home_home_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../../pages/logged/home/home.module */ 6200)).then((m) => m.HomePageModule),
    },
];
let LoggedRoutingModule = class LoggedRoutingModule {
};
LoggedRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    })
], LoggedRoutingModule);



/***/ }),

/***/ 5443:
/*!*************************************************!*\
  !*** ./src/app/modules/logged/logged.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoggedModule": () => (/* binding */ LoggedModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _logged_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logged-routing.module */ 4363);




let LoggedModule = class LoggedModule {
};
LoggedModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        declarations: [],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _logged_routing_module__WEBPACK_IMPORTED_MODULE_0__.LoggedRoutingModule
        ]
    })
], LoggedModule);



/***/ })

}]);
//# sourceMappingURL=src_app_modules_logged_logged_module_ts.js.map