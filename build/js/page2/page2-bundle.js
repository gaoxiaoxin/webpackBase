"use strict";
(self["webpackChunkwebpack_base"] = self["webpackChunkwebpack_base"] || []).push([["page2"],{

/***/ "./src/pages/page2/app.js":
/*!********************************!*\
  !*** ./src/pages/page2/app.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/index.less */ "./src/pages/page2/css/index.less");
/* harmony import */ var _js_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/index */ "./src/pages/page2/js/index.js");


var btn = document.querySelector("#btn");
btn.addEventListener("click", _js_index__WEBPACK_IMPORTED_MODULE_1__.check);

/***/ }),

/***/ "./src/pages/page2/js/index.js":
/*!*************************************!*\
  !*** ./src/pages/page2/js/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "check": () => (/* binding */ check)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


function check() {
  var ipt = document.getElementById("ipt");
  var secretKey = ipt.value;
  axios__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "post",
    baseURL: "",
    url: "api/task5/part3",
    data: {
      secretKey: secretKey
    },
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      code: sessionStorage.getItem("code")
    },
    withCredentials: true
  }).then(function (res) {
    console.log(res);

    if (res.data.code !== "00000") {
      return alert(res.data.message);
    }

    alert(res.data.message + ",恭喜你完成了隐藏关卡!");
    window.location.replace("/download.html");
  })["catch"](function (err) {
    console.log(err);
  });
}



/***/ }),

/***/ "./src/pages/page2/css/index.less":
/*!****************************************!*\
  !*** ./src/pages/page2/css/index.less ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__("./src/pages/page2/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=page2-bundle.js.map