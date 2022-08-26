"use strict";
(self["webpackChunkwebpack_base"] = self["webpackChunkwebpack_base"] || []).push([["page3"],{

/***/ "./src/pages/page3/app.js":
/*!********************************!*\
  !*** ./src/pages/page3/app.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/index */ "./src/pages/page3/js/index.js");
/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/index.less */ "./src/pages/page3/css/index.less");


var code = document.querySelector(".code");
var diff = document.querySelector(".diff");
var ipt = document.querySelector(".no");
ipt.addEventListener("click", _js_index__WEBPACK_IMPORTED_MODULE_0__.fasong);
diff.addEventListener("click", _js_index__WEBPACK_IMPORTED_MODULE_0__.sent);
diff.style.display = "none";
ipt.removeEventListener("click", _js_index__WEBPACK_IMPORTED_MODULE_0__.send);
code.addEventListener("click", _js_index__WEBPACK_IMPORTED_MODULE_0__.send);
var body = document.querySelector("body");
var num = 0;
body.addEventListener("click", function () {
  num++;

  if (num === 6) {
    diff.style.display = "block";
  }
});

/***/ }),

/***/ "./src/pages/page3/js/index.js":
/*!*************************************!*\
  !*** ./src/pages/page3/js/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fasong": () => (/* binding */ fasong),
/* harmony export */   "send": () => (/* binding */ send),
/* harmony export */   "sent": () => (/* binding */ sent)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


function sent() {
  alert("恭喜你进入hyg学姐的秘密花园");
  window.location.replace("/code.html");
}

function send() {
  console.log("111");
  window.location.href = "http://2022.sipcoj.com/level5/DAXIE.zip";
}

function fasong() {
  var ipt = document.getElementById("fasong");
  var secretKey = ipt.value;
  console.log(secretKey);
  var codeId = sessionStorage.getItem("code");
  axios__WEBPACK_IMPORTED_MODULE_0___default()({
    method: "post",
    baseURL: "",
    url: "api/task5/part2",
    data: {
      secretKey: secretKey
    },
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      code: codeId
    },
    withCredentials: true
  }).then(function (res) {
    console.log(res.data.code);

    if (res.data.code === "00000") {
      window.location.replace("/final.html");
    } else {
      alert(res.data.message);
    }
  })["catch"](function (err) {
    console.log(err);
  });
}



/***/ }),

/***/ "./src/pages/page3/css/index.less":
/*!****************************************!*\
  !*** ./src/pages/page3/css/index.less ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__("./src/pages/page3/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=page3-bundle.js.map