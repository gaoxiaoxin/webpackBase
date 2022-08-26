"use strict";
(self["webpackChunkwebpack_base"] = self["webpackChunkwebpack_base"] || []).push([["page1"],{

/***/ "./src/pages/page1/app.js":
/*!********************************!*\
  !*** ./src/pages/page1/app.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/index.less */ "./src/pages/page1/css/index.less");
/* harmony import */ var _css_fifth_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/fifth.less */ "./src/pages/page1/css/fifth.less");
/* harmony import */ var _js_start_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/start.js */ "./src/pages/page1/js/start.js");



var login = document.querySelector(".btna");
login.addEventListener("click", _js_start_js__WEBPACK_IMPORTED_MODULE_2__.send);

/***/ }),

/***/ "./src/pages/page1/js/start.js":
/*!*************************************!*\
  !*** ./src/pages/page1/js/start.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "send": () => (/* binding */ send)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);


document.addEventListener("DOMContentLoaded", ready);


function ready() {
  return _ready.apply(this, arguments);
}

function _ready() {
  _ready = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var keyword, id, x;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sessionStorage.setItem("code", "");
            _context.next = 3;
            return prompt("请输入上一关卡得到的密码：");

          case 3:
            keyword = _context.sent;
            id = prompt("请输入用户名(年级-专业-姓名）：");
            x = document.getElementById("info-box");
            axios__WEBPACK_IMPORTED_MODULE_2___default()({
              method: "post",
              url: "http://2022.sipcoj.com:38080/keycheck",
              data: {
                userName: id,
                password: keyword,
                level: 5
              },
              headers: {
                "content-type": "application/json"
              }
            }).then(function (response) {
              if (response.data.code == "00000") {
                x.style.visibility = "visible";
              } else if (response.data.code == "C0000") {
                alert("用户名不能为空");
                location.reload();
              } else {
                alert("密码错误");
                location.reload();
              }
            })["catch"](function () {
              alert("密码错误");
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ready.apply(this, arguments);
}

window.onload = function () {
  console.log("听说学长喜欢用-连接的东西");
};

function send() {
  console.log("start...");
  console.log("有时候许多东西需要连续尝试~");
  var ipt = document.getElementById("fasong");
  var code = ipt.value;
  sessionStorage.setItem("code", code);
  axios__WEBPACK_IMPORTED_MODULE_2___default()({
    method: "post",
    baseURL: "",
    url: "api/task5/login",
    data: {
      code: code
    },
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      code: code
    },
    withCredentials: true
  }).then(function (res) {
    if (res.data.code === "00000") {
      var link = document.querySelector(".btna");
      link.href = "./download.html";
    }
  })["catch"](function (err) {
    console.log(err);
  });
}



/***/ }),

/***/ "./src/pages/page1/css/fifth.less":
/*!****************************************!*\
  !*** ./src/pages/page1/css/fifth.less ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/pages/page1/css/index.less":
/*!****************************************!*\
  !*** ./src/pages/page1/css/index.less ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__("./src/pages/page1/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=page1-bundle.js.map