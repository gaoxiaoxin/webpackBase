"use strict";
(self["webpackChunkwebpack_base"] = self["webpackChunkwebpack_base"] || []).push([["page4"],{

/***/ "./src/pages/page4/app.js":
/*!********************************!*\
  !*** ./src/pages/page4/app.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./css/index.less */ "./src/pages/page4/css/index.less");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);





// fcreen.js

/*
此源码是基于 XgpNwb 的二次修改
Github：https://github.com/NianBroken/Firework_Simulator
Gitee：https://gitee.com/nianbroken/Firework_Simulator
*/



(function (global) {
  "use strict";

  var key = {
    fullscreenEnabled: 0,
    fullscreenElement: 1,
    requestFullscreen: 2,
    exitFullscreen: 3,
    fullscreenchange: 4,
    fullscreenerror: 5
  };
  var webkit = ["webkitFullscreenEnabled", "webkitFullscreenElement", "webkitRequestFullscreen", "webkitExitFullscreen", "webkitfullscreenchange", "webkitfullscreenerror"];
  var moz = ["mozFullScreenEnabled", "mozFullScreenElement", "mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozfullscreenerror"];
  var ms = ["msFullscreenEnabled", "msFullscreenElement", "msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "MSFullscreenError"]; // so it doesn't throw if no window or document
  // The language of this project was translated into Chinese by Nianbroken

  var doc = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
  var vendor = "fullscreenEnabled" in doc && Object.keys(key) || webkit[0] in doc && webkit || moz[0] in doc && moz || ms[0] in doc && ms || [];
  var fscreen = {
    requestFullscreen: function requestFullscreen(element) {
      return element[vendor[key.requestFullscreen]]();
    },
    requestFullscreenFunction: function requestFullscreenFunction(element) {
      return element[vendor[key.requestFullscreen]];
    },

    get exitFullscreen() {
      return doc[vendor[key.exitFullscreen]].bind(doc);
    },

    addEventListener: function addEventListener(type, handler, options) {
      return doc.addEventListener(vendor[key[type]], handler, options);
    },
    removeEventListener: function removeEventListener(type, handler) {
      return doc.removeEventListener(vendor[key[type]], handler);
    },

    get fullscreenEnabled() {
      return Boolean(doc[vendor[key.fullscreenEnabled]]);
    },

    set fullscreenEnabled(val) {},

    get fullscreenElement() {
      return doc[vendor[key.fullscreenElement]];
    },

    set fullscreenElement(val) {},

    get onfullscreenchange() {
      return doc[("on" + vendor[key.fullscreenchange]).toLowerCase()];
    },

    set onfullscreenchange(handler) {
      return doc[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler;
    },

    get onfullscreenerror() {
      return doc[("on" + vendor[key.fullscreenerror]).toLowerCase()];
    },

    set onfullscreenerror(handler) {
      return doc[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler;
    }

  };
  global.fscreen = fscreen;
})(window); // Stage.js

/*
此源码是基于 XgpNwb 的二次修改
Github：https://github.com/NianBroken/Firework_Simulator
Gitee：https://gitee.com/nianbroken/Firework_Simulator
*/


var Ticker = function TickerFactory(window) {
  "use strict";

  var Ticker = {}; // public
  // will call function reference repeatedly once registered, passing elapsed time and a lag multiplier as parameters

  Ticker.addListener = function addListener(callback) {
    if (typeof callback !== "function") throw "Ticker.addListener() requires a function reference passed for a callback.";
    listeners.push(callback); // start frame-loop lazily

    if (!started) {
      started = true;
      queueFrame();
    }
  }; // private


  var started = false;
  var lastTimestamp = 0;
  var listeners = []; // queue up a new frame (calls frameHandler)

  function queueFrame() {
    if (window.requestAnimationFrame) {
      requestAnimationFrame(frameHandler);
    } else {
      webkitRequestAnimationFrame(frameHandler);
    }
  }

  function frameHandler(timestamp) {
    var frameTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp; // make sure negative time isn't reported (first frame can be whacky)

    if (frameTime < 0) {
      frameTime = 17;
    } // - cap minimum framerate to 15fps[~68ms] (assuming 60fps[~17ms] as 'normal')
    else if (frameTime > 68) {
      frameTime = 68;
    } // fire custom listeners


    listeners.forEach(function (listener) {
      return listener.call(window, frameTime, frameTime / 16.6667);
    }); // always queue another frame

    queueFrame();
  }

  return Ticker;
}(window);

var Stage = function StageFactory(window, document, Ticker) {
  "use strict"; // Track touch times to prevent redundant mouse events.

  var lastTouchTimestamp = 0; // Stage constructor (canvas can be a dom node, or an id string)

  function Stage(canvas) {
    if (typeof canvas === "string") canvas = document.getElementById(canvas); // canvas and associated context references

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d"); // Prevent gestures on stages (scrolling, zooming, etc)

    this.canvas.style.touchAction = "none"; // physics speed multiplier: allows slowing down or speeding up simulation (must be manually implemented in physics layer)

    this.speed = 1; // devicePixelRatio alias (should only be used for rendering, physics shouldn't care)
    // avoids rendering unnecessary pixels that browser might handle natively via CanvasRenderingContext2D.backingStorePixelRatio
    // Language translation of this project into Chinese by Nianbroken

    this.dpr = Stage.disableHighDPI ? 1 : (window.devicePixelRatio || 1) / (this.ctx.backingStorePixelRatio || 1); // canvas size in DIPs and natural pixels

    this.width = canvas.width;
    this.height = canvas.height;
    this.naturalWidth = this.width * this.dpr;
    this.naturalHeight = this.height * this.dpr; // size canvas to match natural size

    if (this.width !== this.naturalWidth) {
      this.canvas.width = this.naturalWidth;
      this.canvas.height = this.naturalHeight;
      this.canvas.style.width = this.width + "px";
      this.canvas.style.height = this.height + "px";
    } // To any known illigitimate users...


    var badDomains = ["bla" + "ckdiam" + "ondfirew" + "orks" + ".de"];
    var hostname = document.location.hostname;

    if (badDomains.some(function (d) {
      return hostname.includes(d);
    })) {
      var delay = 60000 * 3; // 3 minutes

      setTimeout(function () {
        var html = "<sty" + "le>\n" + "\t\t\t\t" + "\t\tbo" + "dy { bac" + "kgrou" + "nd-colo" + "r: #000;" + " padd" + "ing: " + "20px; text-" + "align:" + " center; col" + "or: " + "#ddd" + "; mi" + "n-he" + "ight" + ": 10" + "0vh;" + " dis" + "play" + ": fl" + "ex; " + "flex" + "-dir" + "ecti" + "on: " + "colu" + "mn; " + "just" + "ify-" + "cont" + "ent:" + " cen" + "ter;" + " ali" + "gn-i" + "tems" + ": ce" + "nter" + "; ov" + "erfl" + "ow: " + "visi" + "ble;" + " }\n\t" + "\t\t\t\t" + "\th1 " + "{ fo" + "nt-s" + "ize:" + " 1.2" + "em;" + "}\n\t\t" + "\t\t\t\t" + "p { " + "marg" + "in-t" + "op: " + "1em;" + " max" + "-wid" + "th: " + "36em" + "; }\n" + "\t\t\t\t" + "\t\ta " + "{ co" + "lor:" + " #ff" + "f; tex" + "t-dec" + "orati" + "on: u" + "nderl" + "ine; }" + "\n\t\t\t" + "\t\t</" + "styl" + "e>\n\t" + "\t\t\t\t" + "<h1>" + "Hi! " + "Sorr" + "y to" + " int" + "erru" + "pt t" + "he f" + "irew" + "orks" + ".</h" + "1>\n\t" + "\t\t\t\t" + "<p>M" + "y na" + "me i" + "s Ca" + "leb." + " Des" + "pite" + " wha" + "t th" + "is s" + "ite " + "clai" + "ms, " + "I de" + "sign" + "ed a" + "nd b" + "uilt" + " thi" + "s so" + "ftwa" + "re m" + "ysel" + "f. I" + "'ve " + "spen" + "t a " + "coup" + "le h" + "undr" + "ed h" + "ours" + " of " + "my o" + "wn t" + "ime, " + "over" + " tw" + "o ye" + "ars, " + "maki" + "ng i" + "t.</" + "p>\n\t" + "\t\t\t\t" + "<p>T" + "he o" + "wner" + " of " + "this" + " sit" + "e cl" + "earl" + "y do" + "esn'" + "t re" + "spec" + "t my" + " wor" + "k, a" + "nd h" + "as l" + "abel" + "ed i" + "t as" + " the" + "ir o" + "wn.<" + "/p>\n" + "\t\t\t\t" + "\t<p>" + "If y" + "ou w" + "ere " + "enjo" + "ying" + " the" + " sho" + "w, p" + "leas" + "e ch" + "eck " + "out " + "<a h" + "ref=" + "\"htt" + "ps:/" + "/cod" + "epen" + ".io/" + "Mill" + "erTi" + "me/f" + "ull/" + "XgpN" + "wb\">" + "my&n" + "bsp;" + "offi" + "cial" + "&nbs" + "p;ve" + "rsio" + "n&nb" + "sp;h" + "ere<" + "/a>!" + "</p>\n" + "\t\t\t\t" + "\t<p>I" + "f you" + "'re th" + "e ow" + "ner, <a" + " href=\"m" + "ailt" + "o:cal" + "ebdotmi" + "ller@" + "gmai" + "l.co" + "m\">cont" + "act m" + "e</a>" + ".</p>";
        document.body.innerHTML = html;
      }, delay);
    }

    Stage.stages.push(this); // event listeners (note that 'ticker' is also an option, for frame events)

    this._listeners = {
      // canvas resizing
      resize: [],
      // pointer events
      pointerstart: [],
      pointermove: [],
      pointerend: [],
      lastPointerPos: {
        x: 0,
        y: 0
      }
    };
  } // track all Stage instances


  Stage.stages = []; // allow turning off high DPI support for perf reasons (enabled by default)
  // Note: MUST be set before Stage construction.
  // Each stage tracks its own DPI (initialized at construction time), so you can effectively allow some Stages to render high-res graphics but not others.
  // Language translation of this project into Chinese by Nianbroken

  Stage.disableHighDPI = false; // events

  Stage.prototype.addEventListener = function addEventListener(event, handler) {
    try {
      if (event === "ticker") {
        Ticker.addListener(handler);
      } else {
        this._listeners[event].push(handler);
      }
    } catch (e) {
      throw "Invalid Event";
    }
  };

  Stage.prototype.dispatchEvent = function dispatchEvent(event, val) {
    var _this = this;

    var listeners = this._listeners[event];

    if (listeners) {
      listeners.forEach(function (listener) {
        return listener.call(_this, val);
      });
    } else {
      throw "Invalid Event";
    }
  }; // resize canvas


  Stage.prototype.resize = function resize(w, h) {
    this.width = w;
    this.height = h;
    this.naturalWidth = w * this.dpr;
    this.naturalHeight = h * this.dpr;
    this.canvas.width = this.naturalWidth;
    this.canvas.height = this.naturalHeight;
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.dispatchEvent("resize");
  }; // utility function for coordinate space conversion


  Stage.windowToCanvas = function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
      x: (x - bbox.left) * (canvas.width / bbox.width),
      y: (y - bbox.top) * (canvas.height / bbox.height)
    };
  }; // handle interaction


  Stage.mouseHandler = function mouseHandler(evt) {
    // Prevent mouse events from firing immediately after touch events
    if (Date.now() - lastTouchTimestamp < 500) {
      return;
    }

    var type = "start";

    if (evt.type === "mousemove") {
      type = "move";
    } else if (evt.type === "mouseup") {
      type = "end";
    }

    Stage.stages.forEach(function (stage) {
      var pos = Stage.windowToCanvas(stage.canvas, evt.clientX, evt.clientY);
      stage.pointerEvent(type, pos.x / stage.dpr, pos.y / stage.dpr);
    });
  };

  Stage.touchHandler = function touchHandler(evt) {
    lastTouchTimestamp = Date.now(); // Set generic event type

    var type = "start";

    if (evt.type === "touchmove") {
      type = "move";
    } else if (evt.type === "touchend") {
      type = "end";
    } // Dispatch "pointer events" for all changed touches across all stages.


    Stage.stages.forEach(function (stage) {
      // Safari doesn't treat a TouchList as an iteratable, hence Array.from()
      for (var _i = 0, _Array$from = Array.from(evt.changedTouches); _i < _Array$from.length; _i++) {
        var touch = _Array$from[_i];
        var pos = void 0;

        if (type !== "end") {
          pos = Stage.windowToCanvas(stage.canvas, touch.clientX, touch.clientY);
          stage._listeners.lastPointerPos = pos; // before touchstart event, fire a move event to better emulate cursor events
          // Language translation of this project into Chinese by Nianbroken

          if (type === "start") stage.pointerEvent("move", pos.x / stage.dpr, pos.y / stage.dpr);
        } else {
          // on touchend, fill in position information based on last known touch location
          pos = stage._listeners.lastPointerPos;
        }

        stage.pointerEvent(type, pos.x / stage.dpr, pos.y / stage.dpr);
      }
    });
  }; // dispatch a normalized pointer event on a specific stage


  Stage.prototype.pointerEvent = function pointerEvent(type, x, y) {
    // build event oject to dispatch
    var evt = {
      type: type,
      x: x,
      y: y
    }; // whether pointer event was dispatched over canvas element

    evt.onCanvas = x >= 0 && x <= this.width && y >= 0 && y <= this.height; // dispatch

    this.dispatchEvent("pointer" + type, evt);
  };

  document.addEventListener("mousedown", Stage.mouseHandler);
  document.addEventListener("mousemove", Stage.mouseHandler);
  document.addEventListener("mouseup", Stage.mouseHandler);
  document.addEventListener("touchstart", Stage.touchHandler);
  document.addEventListener("touchmove", Stage.touchHandler);
  document.addEventListener("touchend", Stage.touchHandler);
  return Stage;
}(window, document, Ticker); // MyMath.js

/*
此源码是基于 XgpNwb 的二次修改
Github：https://github.com/NianBroken/Firework_Simulator
Gitee：https://gitee.com/nianbroken/Firework_Simulator
*/


var MyMath = function MyMathFactory(Math) {
  var MyMath = {}; // degree/radian conversion constants

  MyMath.toDeg = 180 / Math.PI;
  MyMath.toRad = Math.PI / 180;
  MyMath.halfPI = Math.PI / 2;
  MyMath.twoPI = Math.PI * 2; // Pythagorean Theorem distance calculation

  MyMath.dist = function (width, height) {
    return Math.sqrt(width * width + height * height);
  }; // Pythagorean Theorem point distance calculation
  // Same as above, but takes coordinates instead of dimensions.
  // The language of this project was translated into Chinese by Nianbroken


  MyMath.pointDist = function (x1, y1, x2, y2) {
    var distX = x2 - x1;
    var distY = y2 - y1;
    return Math.sqrt(distX * distX + distY * distY);
  }; // Returns the angle (in radians) of a 2D vector


  MyMath.angle = function (width, height) {
    return MyMath.halfPI + Math.atan2(height, width);
  }; // Returns the angle (in radians) between two points
  // Same as above, but takes coordinates instead of dimensions.


  MyMath.pointAngle = function (x1, y1, x2, y2) {
    return MyMath.halfPI + Math.atan2(y2 - y1, x2 - x1);
  }; // Splits a speed vector into x and y components (angle needs to be in radians)


  MyMath.splitVector = function (speed, angle) {
    return {
      x: Math.sin(angle) * speed,
      y: -Math.cos(angle) * speed
    };
  }; // Generates a random number between min (inclusive) and max (exclusive)


  MyMath.random = function (min, max) {
    return Math.random() * (max - min) + min;
  }; // Generates a random integer between and possibly including min and max values


  MyMath.randomInt = function (min, max) {
    return (Math.random() * (max - min + 1) | 0) + min;
  }; // Returns a random element from an array, or simply the set of provided arguments when called


  MyMath.randomChoice = function randomChoice(choices) {
    if (arguments.length === 1 && Array.isArray(choices)) {
      return choices[Math.random() * choices.length | 0];
    }

    return arguments[Math.random() * arguments.length | 0];
  }; // Clamps a number between min and max values


  MyMath.clamp = function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  };

  return MyMath;
}(Math);
/*
此源码是基于 XgpNwb 的二次修改
Github：https://github.com/NianBroken/Firework_Simulator
Gitee：https://gitee.com/nianbroken/Firework_Simulator
*/


"use strict";

console.clear(); // This is a prime example of what starts out as a simple project
// and snowballs way beyond its intended size. It's a little clunky
// reading/working on this single file, but here it is anyways :)

var IS_MOBILE = window.innerWidth <= 640;
var IS_DESKTOP = window.innerWidth > 800;
var IS_HEADER = IS_DESKTOP && window.innerHeight < 300; // Detect high end devices. This will be a moving target.

var IS_HIGH_END_DEVICE = function () {
  var hwConcurrency = navigator.hardwareConcurrency;

  if (!hwConcurrency) {
    return false;
  } // Large screens indicate a full size computer, which often have hyper threading these days.
  // So a quad core desktop machine has 8 cores. We'll place a higher min threshold there.


  var minCount = window.innerWidth <= 1024 ? 4 : 8;
  return hwConcurrency >= minCount;
}(); // Prevent canvases from getting too large on ridiculous screen sizes.
// 8K - can restrict this if needed


var MAX_WIDTH = 7680;
var MAX_HEIGHT = 4320;
var GRAVITY = 0.9; // Acceleration in px/s

var simSpeed = 1;

function getDefaultScaleFactor() {
  if (IS_MOBILE) return 0.9;
  if (IS_HEADER) return 0.75;
  return 1;
} // Width/height values that take scale into account.
// USE THESE FOR DRAWING POSITIONS


var stageW, stageH; // All quality globals will be overwritten and updated via `configDidUpdate`.

var quality = 1;
var isLowQuality = false;
var isNormalQuality = true;
var isHighQuality = false;
var QUALITY_LOW = 1;
var QUALITY_NORMAL = 2;
var QUALITY_HIGH = 3;
var SKY_LIGHT_NONE = 0;
var SKY_LIGHT_DIM = 1;
var SKY_LIGHT_NORMAL = 2;
var COLOR = {
  Red: "#ff0043",
  Green: "#14fc56",
  Blue: "#1e7fff",
  Purple: "#e60aff",
  Gold: "#ffbf36",
  White: "#ffffff"
}; // Special invisible color (not rendered, and therefore not in COLOR map)

var INVISIBLE = "_INVISIBLE_";
var PI_2 = Math.PI * 2;
var PI_HALF = Math.PI * 0.5; // Stage.disableHighDPI = true;

var trailsStage = new Stage("trails-canvas");
var mainStage = new Stage("main-canvas");
var stages = [trailsStage, mainStage]; // Fullscreen helpers, using Fscreen for prefixes.

function fullscreenEnabled() {
  return fscreen.fullscreenEnabled;
} // Note that fullscreen state is synced to store, and the store should be the source
// of truth for whether the app is in fullscreen mode or not.


function isFullscreen() {
  return !!fscreen.fullscreenElement;
} // Attempt to toggle fullscreen mode.


function toggleFullscreen() {
  if (fullscreenEnabled()) {
    if (isFullscreen()) {
      fscreen.exitFullscreen();
    } else {
      fscreen.requestFullscreen(document.documentElement);
    }
  }
} // Sync fullscreen changes with store. An event listener is necessary because the user can
// toggle fullscreen mode directly through the browser, and we want to react to that.
// The language of this project was translated into Chinese by Nianbroken


fscreen.addEventListener("fullscreenchange", function () {
  store.setState({
    fullscreen: isFullscreen()
  });
}); // Simple state container; the source of truth.

var store = {
  _listeners: new Set(),
  _dispatch: function _dispatch(prevState) {
    var _this2 = this;

    this._listeners.forEach(function (listener) {
      return listener(_this2.state, prevState);
    });
  },
  state: {
    // will be unpaused in init()
    paused: true,
    soundEnabled: true,
    menuOpen: false,
    openHelpTopic: null,
    fullscreen: isFullscreen(),
    // Note that config values used for <select>s must be strings, unless manually converting values to strings
    // at render time, and parsing on change.
    config: {
      quality: String(IS_HIGH_END_DEVICE ? QUALITY_HIGH : QUALITY_NORMAL),
      // will be mirrored to a global variable named `quality` in `configDidUpdate`, for perf.
      shell: "Random",
      size: IS_DESKTOP ? "3" // Desktop default
      : IS_HEADER ? "1.2" // Profile header default (doesn't need to be an int)
      : "2",
      // Mobile default
      autoLaunch: true,
      finale: true,
      skyLighting: SKY_LIGHT_NORMAL + "",
      hideControls: IS_HEADER,
      longExposure: false,
      scaleFactor: getDefaultScaleFactor()
    }
  },
  setState: function setState(nextState) {
    var prevState = this.state;
    this.state = Object.assign({}, this.state, nextState);

    this._dispatch(prevState);

    this.persist();
  },
  subscribe: function subscribe(listener) {
    var _this3 = this;

    this._listeners.add(listener);

    return function () {
      return _this3._listeners.remove(listener);
    };
  },
  // Load / persist select state to localStorage
  // Mutates state because `store.load()` should only be called once immediately after store is created, before any subscriptions.
  load: function load() {
    var serializedData = localStorage.getItem("cm_fireworks_data");

    if (serializedData) {
      var _JSON$parse = JSON.parse(serializedData),
          schemaVersion = _JSON$parse.schemaVersion,
          data = _JSON$parse.data;

      var config = this.state.config;

      switch (schemaVersion) {
        case "1.1":
          config.quality = data.quality;
          config.size = data.size;
          config.skyLighting = data.skyLighting;
          break;

        case "1.2":
          config.quality = data.quality;
          config.size = data.size;
          config.skyLighting = data.skyLighting;
          config.scaleFactor = data.scaleFactor;
          break;

        default:
          throw new Error("version switch should be exhaustive");
      }

      console.log("Loaded config (schema version ".concat(schemaVersion, ")"));
    } // Deprecated data format. Checked with care (it's not namespaced).
    else if (localStorage.getItem("schemaVersion") === "1") {
      var size; // Attempt to parse data, ignoring if there is an error.

      try {
        var sizeRaw = localStorage.getItem("configSize");
        size = typeof sizeRaw === "string" && JSON.parse(sizeRaw);
      } catch (e) {
        console.log("Recovered from error parsing saved config:");
        console.error(e);
        return;
      } // Only restore validated values


      var sizeInt = parseInt(size, 10);

      if (sizeInt >= 0 && sizeInt <= 4) {
        this.state.config.size = String(sizeInt);
      }
    }
  },
  persist: function persist() {
    var config = this.state.config;
    localStorage.setItem("cm_fireworks_data", JSON.stringify({
      schemaVersion: "1.2",
      data: {
        quality: config.quality,
        size: config.size,
        skyLighting: config.skyLighting,
        scaleFactor: config.scaleFactor
      }
    }));
  }
};

if (!IS_HEADER) {
  store.load();
} // Actions
// ---------


function togglePause(toggle) {
  var paused = store.state.paused;
  var newValue;

  if (typeof toggle === "boolean") {
    newValue = toggle;
  } else {
    newValue = !paused;
  }

  if (paused !== newValue) {
    store.setState({
      paused: newValue
    });
  }
}

function toggleSound(toggle) {
  if (typeof toggle === "boolean") {
    store.setState({
      soundEnabled: toggle
    });
  } else {
    store.setState({
      soundEnabled: !store.state.soundEnabled
    });
  }
}

function toggleMenu(toggle) {
  if (typeof toggle === "boolean") {
    store.setState({
      menuOpen: toggle
    });
  } else {
    store.setState({
      menuOpen: !store.state.menuOpen
    });
  }
}

function updateConfig(nextConfig) {
  nextConfig = nextConfig || getConfigFromDOM();
  store.setState({
    config: Object.assign({}, store.state.config, nextConfig)
  });
  configDidUpdate();
} // Map config to various properties & apply side effects


function configDidUpdate() {
  var config = store.state.config;
  quality = qualitySelector();
  isLowQuality = quality === QUALITY_LOW;
  isNormalQuality = quality === QUALITY_NORMAL;
  isHighQuality = quality === QUALITY_HIGH;

  if (skyLightingSelector() === SKY_LIGHT_NONE) {
    appNodes.canvasContainer.style.backgroundColor = "#000";
  }

  Spark.drawWidth = quality === QUALITY_HIGH ? 0.75 : 1;
} // Selectors
// -----------


var isRunning = function isRunning() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : store.state;
  return !state.paused && !state.menuOpen;
}; // Whether user has enabled sound.


var soundEnabledSelector = function soundEnabledSelector() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : store.state;
  return state.soundEnabled;
}; // Whether any sounds are allowed, taking into account multiple factors.


var canPlaySoundSelector = function canPlaySoundSelector() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : store.state;
  return isRunning(state) && soundEnabledSelector(state);
}; // Convert quality to number.


var qualitySelector = function qualitySelector() {
  return +store.state.config.quality;
};

var shellNameSelector = function shellNameSelector() {
  return store.state.config.shell;
}; // Convert shell size to number.


var shellSizeSelector = function shellSizeSelector() {
  return +store.state.config.size;
};

var finaleSelector = function finaleSelector() {
  return store.state.config.finale;
};

var skyLightingSelector = function skyLightingSelector() {
  return +store.state.config.skyLighting;
};

var scaleFactorSelector = function scaleFactorSelector() {
  return store.state.config.scaleFactor;
}; // Help Content


var helpContent = {
  shellType: {
    header: "烟花类型",
    body: "你要放的烟花的类型，选择“随机（Random）”可以获得非常好的体验！"
  },
  shellSize: {
    header: "烟花大小",
    body: "烟花越大绽放范围就越大，但是烟花越大，设备所需的性能也会增多，大的烟花可能导致你的设备卡顿。"
  },
  quality: {
    header: "画质",
    body: "如果动画运行不流畅，你可以试试降低画质。画质越高，烟花绽放后的火花数量就越多，但高画质可能导致你的设备卡顿。"
  },
  skyLighting: {
    header: "照亮天空",
    body: "烟花爆炸时，背景会被照亮。如果你的屏幕看起来太亮了，可以把它改成“暗”或者“不”。"
  },
  scaleFactor: {
    header: "缩放",
    body: "使你与烟花离得更近或更远。对于较大的烟花，你可以选择更小的缩放值，尤其是在手机或平板电脑上。"
  },
  autoLaunch: {
    header: "自动放烟花",
    body: "开启后你就可以坐在你的设备屏幕前面欣赏烟花了，你也可以关闭它，但关闭后你就只能通过点击屏幕的方式来放烟花。"
  },
  finaleMode: {
    header: "同时放更多的烟花",
    body: "可以在同一时间自动放出更多的烟花（但需要开启先开启“自动放烟花”）。"
  },
  hideControls: {
    header: "隐藏控制按钮",
    body: "隐藏屏幕顶部的按钮。如果你要截图，或者需要一个无缝的体验，你就可以将按钮隐藏，隐藏按钮后你仍然可以在右上角打开设置。"
  },
  fullscreen: {
    header: "全屏",
    body: "切换至全屏模式"
  },
  longExposure: {
    header: "保留烟花的火花",
    body: "可以保留烟花留下的火花"
  }
};
var nodeKeyToHelpKey = {
  shellTypeLabel: "shellType",
  shellSizeLabel: "shellSize",
  qualityLabel: "quality",
  skyLightingLabel: "skyLighting",
  scaleFactorLabel: "scaleFactor",
  autoLaunchLabel: "autoLaunch",
  finaleModeLabel: "finaleMode",
  hideControlsLabel: "hideControls",
  fullscreenLabel: "fullscreen",
  longExposureLabel: "longExposure"
}; // Render app UI / keep in sync with state

var appNodes = {
  stageContainer: ".stage-container",
  canvasContainer: ".canvas-container",
  controls: ".controls",
  menu: ".menu",
  menuInnerWrap: ".menu__inner-wrap",
  pauseBtn: ".pause-btn",
  pauseBtnSVG: ".pause-btn use",
  soundBtn: ".sound-btn",
  soundBtnSVG: ".sound-btn use",
  shellType: ".shell-type",
  shellTypeLabel: ".shell-type-label",
  shellSize: ".shell-size",
  shellSizeLabel: ".shell-size-label",
  quality: ".quality-ui",
  qualityLabel: ".quality-ui-label",
  skyLighting: ".sky-lighting",
  skyLightingLabel: ".sky-lighting-label",
  scaleFactor: ".scaleFactor",
  scaleFactorLabel: ".scaleFactor-label",
  autoLaunch: ".auto-launch",
  autoLaunchLabel: ".auto-launch-label",
  finaleModeFormOption: ".form-option--finale-mode",
  finaleMode: ".finale-mode",
  finaleModeLabel: ".finale-mode-label",
  hideControls: ".hide-controls",
  hideControlsLabel: ".hide-controls-label",
  fullscreenFormOption: ".form-option--fullscreen",
  fullscreen: ".fullscreen",
  fullscreenLabel: ".fullscreen-label",
  longExposure: ".long-exposure",
  longExposureLabel: ".long-exposure-label",
  // Help UI
  helpModal: ".help-modal",
  helpModalOverlay: ".help-modal__overlay",
  helpModalHeader: ".help-modal__header",
  helpModalBody: ".help-modal__body",
  helpModalCloseBtn: ".help-modal__close-btn"
}; // Convert appNodes selectors to dom nodes

Object.keys(appNodes).forEach(function (key) {
  appNodes[key] = document.querySelector(appNodes[key]);
}); // Remove fullscreen control if not supported.

if (!fullscreenEnabled()) {
  appNodes.fullscreenFormOption.classList.add("remove");
} // First render is called in init()


function renderApp(state) {
  var pauseBtnIcon = "#icon-".concat(state.paused ? "play" : "pause");
  var soundBtnIcon = "#icon-sound-".concat(soundEnabledSelector() ? "on" : "off");
  appNodes.pauseBtnSVG.setAttribute("href", pauseBtnIcon);
  appNodes.pauseBtnSVG.setAttribute("xlink:href", pauseBtnIcon);
  appNodes.soundBtnSVG.setAttribute("href", soundBtnIcon);
  appNodes.soundBtnSVG.setAttribute("xlink:href", soundBtnIcon);
  appNodes.controls.classList.toggle("hide", state.menuOpen || state.config.hideControls);
  appNodes.canvasContainer.classList.toggle("blur", state.menuOpen);
  appNodes.menu.classList.toggle("hide", !state.menuOpen);
  appNodes.finaleModeFormOption.style.opacity = state.config.autoLaunch ? 1 : 0.32;
  appNodes.quality.value = state.config.quality;
  appNodes.shellType.value = state.config.shell;
  appNodes.shellSize.value = state.config.size;
  appNodes.autoLaunch.checked = state.config.autoLaunch;
  appNodes.finaleMode.checked = state.config.finale;
  appNodes.skyLighting.value = state.config.skyLighting;
  appNodes.hideControls.checked = state.config.hideControls;
  appNodes.fullscreen.checked = state.fullscreen;
  appNodes.longExposure.checked = state.config.longExposure;
  appNodes.scaleFactor.value = state.config.scaleFactor.toFixed(2);
  appNodes.menuInnerWrap.style.opacity = state.openHelpTopic ? 0.12 : 1;
  appNodes.helpModal.classList.toggle("active", !!state.openHelpTopic);

  if (state.openHelpTopic) {
    var _helpContent$state$op = helpContent[state.openHelpTopic],
        header = _helpContent$state$op.header,
        body = _helpContent$state$op.body;
    appNodes.helpModalHeader.textContent = header;
    appNodes.helpModalBody.textContent = body;
  }
}

store.subscribe(renderApp); // Perform side effects on state changes

function handleStateChange(state, prevState) {
  var canPlaySound = canPlaySoundSelector(state);
  var canPlaySoundPrev = canPlaySoundSelector(prevState);

  if (canPlaySound !== canPlaySoundPrev) {
    if (canPlaySound) {
      soundManager.resumeAll();
    } else {
      soundManager.pauseAll();
    }
  }
}

store.subscribe(handleStateChange);

function getConfigFromDOM() {
  return {
    quality: appNodes.quality.value,
    shell: appNodes.shellType.value,
    size: appNodes.shellSize.value,
    autoLaunch: appNodes.autoLaunch.checked,
    finale: appNodes.finaleMode.checked,
    skyLighting: appNodes.skyLighting.value,
    longExposure: appNodes.longExposure.checked,
    hideControls: appNodes.hideControls.checked,
    // Store value as number.
    scaleFactor: parseFloat(appNodes.scaleFactor.value)
  };
}

var updateConfigNoEvent = function updateConfigNoEvent() {
  return updateConfig();
};

appNodes.quality.addEventListener("input", updateConfigNoEvent);
appNodes.shellType.addEventListener("input", updateConfigNoEvent);
appNodes.shellSize.addEventListener("input", updateConfigNoEvent);
appNodes.autoLaunch.addEventListener("click", function () {
  return setTimeout(updateConfig, 0);
});
appNodes.finaleMode.addEventListener("click", function () {
  return setTimeout(updateConfig, 0);
});
appNodes.skyLighting.addEventListener("input", updateConfigNoEvent);
appNodes.longExposure.addEventListener("click", function () {
  return setTimeout(updateConfig, 0);
});
appNodes.hideControls.addEventListener("click", function () {
  return setTimeout(updateConfig, 0);
});
appNodes.fullscreen.addEventListener("click", function () {
  return setTimeout(toggleFullscreen, 0);
}); // Changing scaleFactor requires triggering resize handling code as well.

appNodes.scaleFactor.addEventListener("input", function () {
  updateConfig();
  handleResize();
});
Object.keys(nodeKeyToHelpKey).forEach(function (nodeKey) {
  var helpKey = nodeKeyToHelpKey[nodeKey];
  appNodes[nodeKey].addEventListener("click", function () {
    store.setState({
      openHelpTopic: helpKey
    });
  });
});
appNodes.helpModalCloseBtn.addEventListener("click", function () {
  store.setState({
    openHelpTopic: null
  });
});
appNodes.helpModalOverlay.addEventListener("click", function () {
  store.setState({
    openHelpTopic: null
  });
}); // Constant derivations

var COLOR_NAMES = Object.keys(COLOR);
var COLOR_CODES = COLOR_NAMES.map(function (colorName) {
  return COLOR[colorName];
}); // Invisible stars need an indentifier, even through they won't be rendered - physics still apply.

var COLOR_CODES_W_INVIS = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__["default"])(COLOR_CODES), [INVISIBLE]); // Map of color codes to their index in the array. Useful for quickly determining if a color has already been updated in a loop.

var COLOR_CODE_INDEXES = COLOR_CODES_W_INVIS.reduce(function (obj, code, i) {
  obj[code] = i;
  return obj;
}, {}); // Tuples is a map keys by color codes (hex) with values of { r, g, b } tuples (still just objects).

var COLOR_TUPLES = {};
COLOR_CODES.forEach(function (hex) {
  COLOR_TUPLES[hex] = {
    r: parseInt(hex.substr(1, 2), 16),
    g: parseInt(hex.substr(3, 2), 16),
    b: parseInt(hex.substr(5, 2), 16)
  };
}); // Get a random color.

function randomColorSimple() {
  return COLOR_CODES[Math.random() * COLOR_CODES.length | 0];
} // Get a random color, with some customization options available.


var lastColor;

function randomColor(options) {
  var notSame = options && options.notSame;
  var notColor = options && options.notColor;
  var limitWhite = options && options.limitWhite;
  var color = randomColorSimple(); // limit the amount of white chosen randomly

  if (limitWhite && color === COLOR.White && Math.random() < 0.6) {
    color = randomColorSimple();
  }

  if (notSame) {
    while (color === lastColor) {
      color = randomColorSimple();
    }
  } else if (notColor) {
    while (color === notColor) {
      color = randomColorSimple();
    }
  }

  lastColor = color;
  return color;
}

function whiteOrGold() {
  return Math.random() < 0.5 ? COLOR.Gold : COLOR.White;
} // Shell helpers


function makePistilColor(shellColor) {
  return shellColor === COLOR.White || shellColor === COLOR.Gold ? randomColor({
    notColor: shellColor
  }) : whiteOrGold();
} // Unique shell types


var crysanthemumShell = function crysanthemumShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var glitter = Math.random() < 0.25;
  var singleColor = Math.random() < 0.72;
  var color = singleColor ? randomColor({
    limitWhite: true
  }) : [randomColor(), randomColor({
    notSame: true
  })];
  var pistil = singleColor && Math.random() < 0.42;
  var pistilColor = pistil && makePistilColor(color);
  var secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({
    notColor: color,
    limitWhite: true
  }) : null;
  var streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
  var starDensity = glitter ? 1.1 : 1.25;
  if (isLowQuality) starDensity *= 0.8;
  if (isHighQuality) starDensity = 1.2;
  return {
    shellSize: size,
    spreadSize: 300 + size * 100,
    starLife: 900 + size * 200,
    starDensity: starDensity,
    color: color,
    secondColor: secondColor,
    glitter: glitter ? "light" : "",
    glitterColor: whiteOrGold(),
    pistil: pistil,
    pistilColor: pistilColor,
    streamers: streamers
  };
};

var ghostShell = function ghostShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  // Extend crysanthemum shell
  var shell = crysanthemumShell(size); // Ghost effect can be fast, so extend star life

  shell.starLife *= 1.5; // Ensure we always have a single color other than white

  var ghostColor = randomColor({
    notColor: COLOR.White
  }); // Always use streamers, and sometimes a pistil

  shell.streamers = true;
  var pistil = Math.random() < 0.42;
  var pistilColor = pistil && makePistilColor(ghostColor); // Ghost effect - transition from invisible to chosen color

  shell.color = INVISIBLE;
  shell.secondColor = ghostColor; // We don't want glitter to be spewed by invisible stars, and we don't currently
  // have a way to transition glitter state. So we'll disable it.

  shell.glitter = "";
  return shell;
};

var strobeShell = function strobeShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var color = randomColor({
    limitWhite: true
  });
  return {
    shellSize: size,
    spreadSize: 280 + size * 92,
    starLife: 1100 + size * 200,
    starLifeVariation: 0.4,
    starDensity: 1.1,
    color: color,
    glitter: "light",
    glitterColor: COLOR.White,
    strobe: true,
    strobeColor: Math.random() < 0.5 ? COLOR.White : null,
    pistil: Math.random() < 0.5,
    pistilColor: makePistilColor(color)
  };
};

var palmShell = function palmShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var color = randomColor();
  var thick = Math.random() < 0.5;
  return {
    shellSize: size,
    color: color,
    spreadSize: 250 + size * 75,
    starDensity: thick ? 0.15 : 0.4,
    starLife: 1800 + size * 200,
    glitter: thick ? "thick" : "heavy"
  };
};

var ringShell = function ringShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var color = randomColor();
  var pistil = Math.random() < 0.75;
  return {
    shellSize: size,
    ring: true,
    color: color,
    spreadSize: 300 + size * 100,
    starLife: 900 + size * 200,
    starCount: 2.2 * PI_2 * (size + 1),
    pistil: pistil,
    pistilColor: makePistilColor(color),
    glitter: !pistil ? "light" : "",
    glitterColor: color === COLOR.Gold ? COLOR.Gold : COLOR.White,
    streamers: Math.random() < 0.3
  }; // return Object.assign({}, defaultShell, config);
};

var crossetteShell = function crossetteShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var color = randomColor({
    limitWhite: true
  });
  return {
    shellSize: size,
    spreadSize: 300 + size * 100,
    starLife: 750 + size * 160,
    starLifeVariation: 0.4,
    starDensity: 0.85,
    color: color,
    crossette: true,
    pistil: Math.random() < 0.5,
    pistilColor: makePistilColor(color)
  };
};

var floralShell = function floralShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return {
    shellSize: size,
    spreadSize: 300 + size * 120,
    starDensity: 0.12,
    starLife: 500 + size * 50,
    starLifeVariation: 0.5,
    color: Math.random() < 0.65 ? "random" : Math.random() < 0.15 ? randomColor() : [randomColor(), randomColor({
      notSame: true
    })],
    floral: true
  };
};

var fallingLeavesShell = function fallingLeavesShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return {
    shellSize: size,
    color: INVISIBLE,
    spreadSize: 300 + size * 120,
    starDensity: 0.12,
    starLife: 500 + size * 50,
    starLifeVariation: 0.5,
    glitter: "medium",
    glitterColor: COLOR.Gold,
    fallingLeaves: true
  };
};

var willowShell = function willowShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return {
    shellSize: size,
    spreadSize: 300 + size * 100,
    starDensity: 0.6,
    starLife: 3000 + size * 300,
    glitter: "willow",
    glitterColor: COLOR.Gold,
    color: INVISIBLE
  };
};

var crackleShell = function crackleShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  // favor gold
  var color = Math.random() < 0.75 ? COLOR.Gold : randomColor();
  return {
    shellSize: size,
    spreadSize: 380 + size * 75,
    starDensity: isLowQuality ? 0.65 : 1,
    starLife: 600 + size * 100,
    starLifeVariation: 0.32,
    glitter: "light",
    glitterColor: COLOR.Gold,
    color: color,
    crackle: true,
    pistil: Math.random() < 0.65,
    pistilColor: makePistilColor(color)
  };
};

var horsetailShell = function horsetailShell() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var color = randomColor();
  return {
    shellSize: size,
    horsetail: true,
    color: color,
    spreadSize: 250 + size * 38,
    starDensity: 0.9,
    starLife: 2500 + size * 300,
    glitter: "medium",
    glitterColor: Math.random() < 0.5 ? whiteOrGold() : color,
    // Add strobe effect to white horsetails, to make them more interesting
    strobe: color === COLOR.White
  };
};

function randomShellName() {
  return Math.random() < 0.5 ? "Crysanthemum" : shellNames[Math.random() * (shellNames.length - 1) + 1 | 0];
}

function randomShell(size) {
  // Special selection for codepen header.
  if (IS_HEADER) return randomFastShell()(size); // Normal operation

  return shellTypes[randomShellName()](size);
}

function shellFromConfig(size) {
  return shellTypes[shellNameSelector()](size);
} // Get a random shell, not including processing intensive varients
// Note this is only random when "Random" shell is selected in config.
// Also, this does not create the shell, only returns the factory function.


var fastShellBlacklist = ["Falling Leaves", "Floral", "Willow"];

function randomFastShell() {
  var isRandom = shellNameSelector() === "Random";
  var shellName = isRandom ? randomShellName() : shellNameSelector();

  if (isRandom) {
    while (fastShellBlacklist.includes(shellName)) {
      shellName = randomShellName();
    }
  }

  return shellTypes[shellName];
}

var shellTypes = {
  Random: randomShell,
  Crackle: crackleShell,
  Crossette: crossetteShell,
  Crysanthemum: crysanthemumShell,
  "Falling Leaves": fallingLeavesShell,
  Floral: floralShell,
  Ghost: ghostShell,
  "Horse Tail": horsetailShell,
  Palm: palmShell,
  Ring: ringShell,
  Strobe: strobeShell,
  Willow: willowShell
};
var shellNames = Object.keys(shellTypes);

function init() {
  // Remove loading state
  document.querySelector(".loading-init").remove();
  appNodes.stageContainer.classList.remove("remove"); // Populate dropdowns

  function setOptionsForSelect(node, options) {
    node.innerHTML = options.reduce(function (acc, opt) {
      return acc += "<option value=\"".concat(opt.value, "\">").concat(opt.label, "</option>");
    }, "");
  } // shell type


  var options = "";
  shellNames.forEach(function (opt) {
    return options += "<option value=\"".concat(opt, "\">").concat(opt, "</option>");
  });
  appNodes.shellType.innerHTML = options; // shell size

  options = "";
  ['3"', '4"', '6"', '8"', '12"', '16"'].forEach(function (opt, i) {
    return options += "<option value=\"".concat(i, "\">").concat(opt, "</option>");
  });
  appNodes.shellSize.innerHTML = options;
  setOptionsForSelect(appNodes.quality, [{
    label: "低",
    value: QUALITY_LOW
  }, {
    label: "正常",
    value: QUALITY_NORMAL
  }, {
    label: "高",
    value: QUALITY_HIGH
  }]);
  setOptionsForSelect(appNodes.skyLighting, [{
    label: "不",
    value: SKY_LIGHT_NONE
  }, {
    label: "暗",
    value: SKY_LIGHT_DIM
  }, {
    label: "正常",
    value: SKY_LIGHT_NORMAL
  }]); // 0.9 is mobile default

  setOptionsForSelect(appNodes.scaleFactor, [0.5, 0.62, 0.75, 0.9, 1.0, 1.5, 2.0].map(function (value) {
    return {
      value: value.toFixed(2),
      label: "".concat(value * 100, "%")
    };
  })); // Begin simulation

  togglePause(false); // initial render

  renderApp(store.state); // Apply initial config

  configDidUpdate();
}

function fitShellPositionInBoundsH(position) {
  var edge = 0.18;
  return (1 - edge * 2) * position + edge;
}

function fitShellPositionInBoundsV(position) {
  return position * 0.75;
}

function getRandomShellPositionH() {
  return fitShellPositionInBoundsH(Math.random());
}

function getRandomShellPositionV() {
  return fitShellPositionInBoundsV(Math.random());
}

function getRandomShellSize() {
  var baseSize = shellSizeSelector();
  var maxVariance = Math.min(2.5, baseSize);
  var variance = Math.random() * maxVariance;
  var size = baseSize - variance;
  var height = maxVariance === 0 ? Math.random() : 1 - variance / maxVariance;
  var centerOffset = Math.random() * (1 - height * 0.65) * 0.5;
  var x = Math.random() < 0.5 ? 0.5 - centerOffset : 0.5 + centerOffset;
  return {
    size: size,
    x: fitShellPositionInBoundsH(x),
    height: fitShellPositionInBoundsV(height)
  };
} // Launches a shell from a user pointer event, based on state.config


function launchShellFromConfig(event) {
  var shell = new Shell(shellFromConfig(shellSizeSelector()));
  var w = mainStage.width;
  var h = mainStage.height;
  shell.launch(event ? event.x / w : getRandomShellPositionH(), event ? 1 - event.y / h : getRandomShellPositionV());
} // Sequences
// -----------


function seqRandomShell() {
  var size = getRandomShellSize();
  var shell = new Shell(shellFromConfig(size.size));
  shell.launch(size.x, size.height);
  var extraDelay = shell.starLife;

  if (shell.fallingLeaves) {
    extraDelay = 4600;
  }

  return 900 + Math.random() * 600 + extraDelay;
}

function seqRandomFastShell() {
  var shellType = randomFastShell();
  var size = getRandomShellSize();
  var shell = new Shell(shellType(size.size));
  shell.launch(size.x, size.height);
  var extraDelay = shell.starLife;
  return 900 + Math.random() * 600 + extraDelay;
}

function seqTwoRandom() {
  var size1 = getRandomShellSize();
  var size2 = getRandomShellSize();
  var shell1 = new Shell(shellFromConfig(size1.size));
  var shell2 = new Shell(shellFromConfig(size2.size));
  var leftOffset = Math.random() * 0.2 - 0.1;
  var rightOffset = Math.random() * 0.2 - 0.1;
  shell1.launch(0.3 + leftOffset, size1.height);
  setTimeout(function () {
    shell2.launch(0.7 + rightOffset, size2.height);
  }, 100);
  var extraDelay = Math.max(shell1.starLife, shell2.starLife);

  if (shell1.fallingLeaves || shell2.fallingLeaves) {
    extraDelay = 4600;
  }

  return 900 + Math.random() * 600 + extraDelay;
}

function seqTriple() {
  var shellType = randomFastShell();
  var baseSize = shellSizeSelector();
  var smallSize = Math.max(0, baseSize - 1.25);
  var offset = Math.random() * 0.08 - 0.04;
  var shell1 = new Shell(shellType(baseSize));
  shell1.launch(0.5 + offset, 0.7);
  var leftDelay = 1000 + Math.random() * 400;
  var rightDelay = 1000 + Math.random() * 400;
  setTimeout(function () {
    var offset = Math.random() * 0.08 - 0.04;
    var shell2 = new Shell(shellType(smallSize));
    shell2.launch(0.2 + offset, 0.1);
  }, leftDelay);
  setTimeout(function () {
    var offset = Math.random() * 0.08 - 0.04;
    var shell3 = new Shell(shellType(smallSize));
    shell3.launch(0.8 + offset, 0.1);
  }, rightDelay);
  return 4000;
}

function seqPyramid() {
  var barrageCountHalf = IS_DESKTOP ? 7 : 4;
  var largeSize = shellSizeSelector();
  var smallSize = Math.max(0, largeSize - 3);
  var randomMainShell = Math.random() < 0.78 ? crysanthemumShell : ringShell;
  var randomSpecialShell = randomShell;

  function launchShell(x, useSpecial) {
    var isRandom = shellNameSelector() === "Random";
    var shellType = isRandom ? useSpecial ? randomSpecialShell : randomMainShell : shellTypes[shellNameSelector()];
    var shell = new Shell(shellType(useSpecial ? largeSize : smallSize));
    var height = x <= 0.5 ? x / 0.5 : (1 - x) / 0.5;
    shell.launch(x, useSpecial ? 0.75 : height * 0.42);
  }

  var count = 0;
  var delay = 0;

  while (count <= barrageCountHalf) {
    if (count === barrageCountHalf) {
      setTimeout(function () {
        launchShell(0.5, true);
      }, delay);
    } else {
      (function () {
        var offset = count / barrageCountHalf * 0.5;
        var delayOffset = Math.random() * 30 + 30;
        setTimeout(function () {
          launchShell(offset, false);
        }, delay);
        setTimeout(function () {
          launchShell(1 - offset, false);
        }, delay + delayOffset);
      })();
    }

    count++;
    delay += 200;
  }

  return 3400 + barrageCountHalf * 250;
}

function seqSmallBarrage() {
  seqSmallBarrage.lastCalled = Date.now();
  var barrageCount = IS_DESKTOP ? 11 : 5;
  var specialIndex = IS_DESKTOP ? 3 : 1;
  var shellSize = Math.max(0, shellSizeSelector() - 2);
  var randomMainShell = Math.random() < 0.78 ? crysanthemumShell : ringShell;
  var randomSpecialShell = randomFastShell(); // (cos(x*5π+0.5π)+1)/2 is a custom wave bounded by 0 and 1 used to set varying launch heights

  function launchShell(x, useSpecial) {
    var isRandom = shellNameSelector() === "Random";
    var shellType = isRandom ? useSpecial ? randomSpecialShell : randomMainShell : shellTypes[shellNameSelector()];
    var shell = new Shell(shellType(shellSize));
    var height = (Math.cos(x * 5 * Math.PI + PI_HALF) + 1) / 2;
    shell.launch(x, height * 0.75);
  }

  var count = 0;
  var delay = 0;

  while (count < barrageCount) {
    if (count === 0) {
      launchShell(0.5, false);
      count += 1;
    } else {
      (function () {
        var offset = (count + 1) / barrageCount / 2;
        var delayOffset = Math.random() * 30 + 30;
        var useSpecial = count === specialIndex;
        setTimeout(function () {
          launchShell(0.5 + offset, useSpecial);
        }, delay);
        setTimeout(function () {
          launchShell(0.5 - offset, useSpecial);
        }, delay + delayOffset);
        count += 2;
      })();
    }

    delay += 200;
  }

  return 3400 + barrageCount * 120;
}

seqSmallBarrage.cooldown = 15000;
seqSmallBarrage.lastCalled = Date.now();
var sequences = [seqRandomShell, seqTwoRandom, seqTriple, seqPyramid, seqSmallBarrage];
var isFirstSeq = true;
var finaleCount = 32;
var currentFinaleCount = 0;

function startSequence() {
  if (isFirstSeq) {
    isFirstSeq = false;

    if (IS_HEADER) {
      return seqTwoRandom();
    } else {
      var shell = new Shell(crysanthemumShell(shellSizeSelector()));
      shell.launch(0.5, 0.5);
      return 2400;
    }
  }

  if (finaleSelector()) {
    seqRandomFastShell();

    if (currentFinaleCount < finaleCount) {
      currentFinaleCount++;
      return 170;
    } else {
      currentFinaleCount = 0;
      return 6000;
    }
  }

  var rand = Math.random();

  if (rand < 0.08 && Date.now() - seqSmallBarrage.lastCalled > seqSmallBarrage.cooldown) {
    return seqSmallBarrage();
  }

  if (rand < 0.1) {
    return seqPyramid();
  }

  if (rand < 0.6 && !IS_HEADER) {
    return seqRandomShell();
  } else if (rand < 0.8) {
    return seqTwoRandom();
  } else if (rand < 1) {
    return seqTriple();
  }
}

var activePointerCount = 0;
var isUpdatingSpeed = false;

function handlePointerStart(event) {
  activePointerCount++;
  var btnSize = 50;

  if (event.y < btnSize) {
    if (event.x < btnSize) {
      togglePause();
      return;
    }

    if (event.x > mainStage.width / 2 - btnSize / 2 && event.x < mainStage.width / 2 + btnSize / 2) {
      toggleSound();
      return;
    }

    if (event.x > mainStage.width - btnSize) {
      toggleMenu();
      return;
    }
  }

  if (!isRunning()) return;

  if (updateSpeedFromEvent(event)) {
    isUpdatingSpeed = true;
  } else if (event.onCanvas) {
    launchShellFromConfig(event);
  }
}

function handlePointerEnd(event) {
  activePointerCount--;
  isUpdatingSpeed = false;
}

function handlePointerMove(event) {
  if (!isRunning()) return;

  if (isUpdatingSpeed) {
    updateSpeedFromEvent(event);
  }
}

function handleKeydown(event) {
  // P
  if (event.keyCode === 80) {
    togglePause();
  } // O
  else if (event.keyCode === 79) {
    toggleMenu();
  } // Esc
  else if (event.keyCode === 27) {
    toggleMenu(false);
  }
}

mainStage.addEventListener("pointerstart", handlePointerStart);
mainStage.addEventListener("pointerend", handlePointerEnd);
mainStage.addEventListener("pointermove", handlePointerMove);
window.addEventListener("keydown", handleKeydown); // Account for window resize and custom scale changes.

function handleResize() {
  var w = window.innerWidth;
  var h = window.innerHeight; // Try to adopt screen size, heeding maximum sizes specified

  var containerW = Math.min(w, MAX_WIDTH); // On small screens, use full device height

  var containerH = w <= 420 ? h : Math.min(h, MAX_HEIGHT);
  appNodes.stageContainer.style.width = containerW + "px";
  appNodes.stageContainer.style.height = containerH + "px";
  stages.forEach(function (stage) {
    return stage.resize(containerW, containerH);
  }); // Account for scale

  var scaleFactor = scaleFactorSelector();
  stageW = containerW / scaleFactor;
  stageH = containerH / scaleFactor;
} // Compute initial dimensions


handleResize();
window.addEventListener("resize", handleResize); // Dynamic globals

var currentFrame = 0;
var speedBarOpacity = 0;
var autoLaunchTime = 0;

function updateSpeedFromEvent(event) {
  if (isUpdatingSpeed || event.y >= mainStage.height - 44) {
    // On phones it's hard to hit the edge pixels in order to set speed at 0 or 1, so some padding is provided to make that easier.
    var edge = 16;
    var newSpeed = (event.x - edge) / (mainStage.width - edge * 2);
    simSpeed = Math.min(Math.max(newSpeed, 0), 1); // show speed bar after an update

    speedBarOpacity = 1; // If we updated the speed, return true

    return true;
  } // Return false if the speed wasn't updated


  return false;
} // Extracted function to keep `update()` optimized


function updateGlobals(timeStep, lag) {
  currentFrame++; // Always try to fade out speed bar

  if (!isUpdatingSpeed) {
    speedBarOpacity -= lag / 30; // half a second

    if (speedBarOpacity < 0) {
      speedBarOpacity = 0;
    }
  } // auto launch shells


  if (store.state.config.autoLaunch) {
    autoLaunchTime -= timeStep;

    if (autoLaunchTime <= 0) {
      autoLaunchTime = startSequence() * 1.25;
    }
  }
}

function update(frameTime, lag) {
  if (!isRunning()) return;
  var width = stageW;
  var height = stageH;
  var timeStep = frameTime * simSpeed;
  var speed = simSpeed * lag;
  updateGlobals(timeStep, lag);
  var starDrag = 1 - (1 - Star.airDrag) * speed;
  var starDragHeavy = 1 - (1 - Star.airDragHeavy) * speed;
  var sparkDrag = 1 - (1 - Spark.airDrag) * speed;
  var gAcc = timeStep / 1000 * GRAVITY;
  COLOR_CODES_W_INVIS.forEach(function (color) {
    // Stars
    var stars = Star.active[color];

    for (var i = stars.length - 1; i >= 0; i = i - 1) {
      var star = stars[i]; // Only update each star once per frame. Since color can change, it's possible a star could update twice without this, leading to a "jump".

      if (star.updateFrame === currentFrame) {
        continue;
      }

      star.updateFrame = currentFrame;
      star.life -= timeStep;

      if (star.life <= 0) {
        stars.splice(i, 1);
        Star.returnInstance(star);
      } else {
        var burnRate = Math.pow(star.life / star.fullLife, 0.5);
        var burnRateInverse = 1 - burnRate;
        star.prevX = star.x;
        star.prevY = star.y;
        star.x += star.speedX * speed;
        star.y += star.speedY * speed; // Apply air drag if star isn't "heavy". The heavy property is used for the shell comets.

        if (!star.heavy) {
          star.speedX *= starDrag;
          star.speedY *= starDrag;
        } else {
          star.speedX *= starDragHeavy;
          star.speedY *= starDragHeavy;
        }

        star.speedY += gAcc;

        if (star.spinRadius) {
          star.spinAngle += star.spinSpeed * speed;
          star.x += Math.sin(star.spinAngle) * star.spinRadius * speed;
          star.y += Math.cos(star.spinAngle) * star.spinRadius * speed;
        }

        if (star.sparkFreq) {
          star.sparkTimer -= timeStep;

          while (star.sparkTimer < 0) {
            star.sparkTimer += star.sparkFreq * 0.75 + star.sparkFreq * burnRateInverse * 4;
            Spark.add(star.x, star.y, star.sparkColor, Math.random() * PI_2, Math.random() * star.sparkSpeed * burnRate, star.sparkLife * 0.8 + Math.random() * star.sparkLifeVariation * star.sparkLife);
          }
        } // Handle star transitions


        if (star.life < star.transitionTime) {
          if (star.secondColor && !star.colorChanged) {
            star.colorChanged = true;
            star.color = star.secondColor;
            stars.splice(i, 1);
            Star.active[star.secondColor].push(star);

            if (star.secondColor === INVISIBLE) {
              star.sparkFreq = 0;
            }
          }

          if (star.strobe) {
            // Strobes in the following pattern: on:off:off:on:off:off in increments of `strobeFreq` ms.
            star.visible = Math.floor(star.life / star.strobeFreq) % 3 === 0;
          }
        }
      }
    } // Sparks


    var sparks = Spark.active[color];

    for (var _i2 = sparks.length - 1; _i2 >= 0; _i2 = _i2 - 1) {
      var spark = sparks[_i2];
      spark.life -= timeStep;

      if (spark.life <= 0) {
        sparks.splice(_i2, 1);
        Spark.returnInstance(spark);
      } else {
        spark.prevX = spark.x;
        spark.prevY = spark.y;
        spark.x += spark.speedX * speed;
        spark.y += spark.speedY * speed;
        spark.speedX *= sparkDrag;
        spark.speedY *= sparkDrag;
        spark.speedY += gAcc;
      }
    }
  });
  render(speed);
}

function render(speed) {
  var dpr = mainStage.dpr;
  var width = stageW;
  var height = stageH;
  var trailsCtx = trailsStage.ctx;
  var mainCtx = mainStage.ctx;

  if (skyLightingSelector() !== SKY_LIGHT_NONE) {
    colorSky(speed);
  } // Account for high DPI screens, and custom scale factor.


  var scaleFactor = scaleFactorSelector();
  trailsCtx.scale(dpr * scaleFactor, dpr * scaleFactor);
  mainCtx.scale(dpr * scaleFactor, dpr * scaleFactor);
  trailsCtx.globalCompositeOperation = "source-over";
  trailsCtx.fillStyle = "rgba(0, 0, 0, ".concat(store.state.config.longExposure ? 0.0025 : 0.175 * speed, ")");
  trailsCtx.fillRect(0, 0, width, height);
  mainCtx.clearRect(0, 0, width, height); // Draw queued burst flashes
  // These must also be drawn using source-over due to Safari. Seems rendering the gradients using lighten draws large black boxes instead.
  // Thankfully, these burst flashes look pretty much the same either way.
  // The language of this project was translated into Chinese by Nianbroken

  while (BurstFlash.active.length) {
    var bf = BurstFlash.active.pop();
    var burstGradient = trailsCtx.createRadialGradient(bf.x, bf.y, 0, bf.x, bf.y, bf.radius);
    burstGradient.addColorStop(0.024, "rgba(255, 255, 255, 1)");
    burstGradient.addColorStop(0.125, "rgba(255, 160, 20, 0.2)");
    burstGradient.addColorStop(0.32, "rgba(255, 140, 20, 0.11)");
    burstGradient.addColorStop(1, "rgba(255, 120, 20, 0)");
    trailsCtx.fillStyle = burstGradient;
    trailsCtx.fillRect(bf.x - bf.radius, bf.y - bf.radius, bf.radius * 2, bf.radius * 2);
    BurstFlash.returnInstance(bf);
  } // Remaining drawing on trails canvas will use 'lighten' blend mode


  trailsCtx.globalCompositeOperation = "lighten"; // Draw stars

  trailsCtx.lineWidth = Star.drawWidth;
  trailsCtx.lineCap = isLowQuality ? "square" : "round";
  mainCtx.strokeStyle = "#fff";
  mainCtx.lineWidth = 1;
  mainCtx.beginPath();
  COLOR_CODES.forEach(function (color) {
    var stars = Star.active[color];
    trailsCtx.strokeStyle = color;
    trailsCtx.beginPath();
    stars.forEach(function (star) {
      if (star.visible) {
        trailsCtx.moveTo(star.x, star.y);
        trailsCtx.lineTo(star.prevX, star.prevY);
        mainCtx.moveTo(star.x, star.y);
        mainCtx.lineTo(star.x - star.speedX * 1.6, star.y - star.speedY * 1.6);
      }
    });
    trailsCtx.stroke();
  });
  mainCtx.stroke(); // Draw sparks

  trailsCtx.lineWidth = Spark.drawWidth;
  trailsCtx.lineCap = "butt";
  COLOR_CODES.forEach(function (color) {
    var sparks = Spark.active[color];
    trailsCtx.strokeStyle = color;
    trailsCtx.beginPath();
    sparks.forEach(function (spark) {
      trailsCtx.moveTo(spark.x, spark.y);
      trailsCtx.lineTo(spark.prevX, spark.prevY);
    });
    trailsCtx.stroke();
  }); // Render speed bar if visible

  if (speedBarOpacity) {
    var speedBarHeight = 6;
    mainCtx.globalAlpha = speedBarOpacity;
    mainCtx.fillStyle = COLOR.Blue;
    mainCtx.fillRect(0, height - speedBarHeight, width * simSpeed, speedBarHeight);
    mainCtx.globalAlpha = 1;
  }

  trailsCtx.setTransform(1, 0, 0, 1, 0, 0);
  mainCtx.setTransform(1, 0, 0, 1, 0, 0);
} // Draw colored overlay based on combined brightness of stars (light up the sky!)
// Note: this is applied to the canvas container's background-color, so it's behind the particles


var currentSkyColor = {
  r: 0,
  g: 0,
  b: 0
};
var targetSkyColor = {
  r: 0,
  g: 0,
  b: 0
};

function colorSky(speed) {
  // The maximum r, g, or b value that will be used (255 would represent no maximum)
  var maxSkySaturation = skyLightingSelector() * 15; // How many stars are required in total to reach maximum sky brightness

  var maxStarCount = 500;
  var totalStarCount = 0; // Initialize sky as black

  targetSkyColor.r = 0;
  targetSkyColor.g = 0;
  targetSkyColor.b = 0; // Add each known color to sky, multiplied by particle count of that color. This will put RGB values wildly out of bounds, but we'll scale them back later.
  // Also add up total star count.

  COLOR_CODES.forEach(function (color) {
    var tuple = COLOR_TUPLES[color];
    var count = Star.active[color].length;
    totalStarCount += count;
    targetSkyColor.r += tuple.r * count;
    targetSkyColor.g += tuple.g * count;
    targetSkyColor.b += tuple.b * count;
  }); // Clamp intensity at 1.0, and map to a custom non-linear curve. This allows few stars to perceivably light up the sky, while more stars continue to increase the brightness but at a lesser rate. This is more inline with humans' non-linear brightness perception.

  var intensity = Math.pow(Math.min(1, totalStarCount / maxStarCount), 0.3); // Figure out which color component has the highest value, so we can scale them without affecting the ratios.
  // Prevent 0 from being used, so we don't divide by zero in the next step.

  var maxColorComponent = Math.max(1, targetSkyColor.r, targetSkyColor.g, targetSkyColor.b); // Scale all color components to a max of `maxSkySaturation`, and apply intensity.

  targetSkyColor.r = targetSkyColor.r / maxColorComponent * maxSkySaturation * intensity;
  targetSkyColor.g = targetSkyColor.g / maxColorComponent * maxSkySaturation * intensity;
  targetSkyColor.b = targetSkyColor.b / maxColorComponent * maxSkySaturation * intensity; // Animate changes to color to smooth out transitions.

  var colorChange = 10;
  currentSkyColor.r += (targetSkyColor.r - currentSkyColor.r) / colorChange * speed;
  currentSkyColor.g += (targetSkyColor.g - currentSkyColor.g) / colorChange * speed;
  currentSkyColor.b += (targetSkyColor.b - currentSkyColor.b) / colorChange * speed;
  appNodes.canvasContainer.style.backgroundColor = "rgb(".concat(currentSkyColor.r | 0, ", ").concat(currentSkyColor.g | 0, ", ").concat(currentSkyColor.b | 0, ")");
}

mainStage.addEventListener("ticker", update); // Helper used to semi-randomly spread particles over an arc
// Values are flexible - `start` and `arcLength` can be negative, and `randomness` is simply a multiplier for random addition.

function createParticleArc(start, arcLength, count, randomness, particleFactory) {
  var angleDelta = arcLength / count; // Sometimes there is an extra particle at the end, too close to the start. Subtracting half the angleDelta ensures that is skipped.
  // Would be nice to fix this a better way.

  var end = start + arcLength - angleDelta * 0.5;

  if (end > start) {
    // Optimization: `angle=angle+angleDelta` vs. angle+=angleDelta
    // V8 deoptimises with let compound assignment
    for (var angle = start; angle < end; angle = angle + angleDelta) {
      particleFactory(angle + Math.random() * angleDelta * randomness);
    }
  } else {
    for (var _angle = start; _angle > end; _angle = _angle + angleDelta) {
      particleFactory(_angle + Math.random() * angleDelta * randomness);
    }
  }
}
/**
 * Helper used to create a spherical burst of particles.
 *
 * @param  {Number} count               The desired number of stars/particles. This value is a suggestion, and the
 *                                      created burst may have more particles. The current algorithm can't perfectly
 *                                      distribute a specific number of points evenly on a sphere's surface.
 * @param  {Function} particleFactory   Called once per star/particle generated. Passed two arguments:
 *                                        `angle`: The direction of the star/particle.
 *                                        `speed`: A multipler for the particle speed, from 0.0 to 1.0.
 * @param  {Number} startAngle=0        For segmented bursts, you can generate only a partial arc of particles. This
 *                                      allows setting the starting arc angle (radians).
 * @param  {Number} arcLength=TAU       The length of the arc (radians). Defaults to a full circle.
 *
 * @return {void}              Returns nothing; it's up to `particleFactory` to use the given data.
 */


function createBurst(count, particleFactory) {
  var startAngle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var arcLength = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : PI_2;
  // Assuming sphere with surface area of `count`, calculate various
  // properties of said sphere (unit is stars).
  // Radius
  var R = 0.5 * Math.sqrt(count / Math.PI); // Circumference

  var C = 2 * R * Math.PI; // Half Circumference

  var C_HALF = C / 2; // Make a series of rings, sizing them as if they were spaced evenly
  // along the curved surface of a sphere.

  for (var i = 0; i <= C_HALF; i++) {
    var ringAngle = i / C_HALF * PI_HALF;
    var ringSize = Math.cos(ringAngle);
    var partsPerFullRing = C * ringSize;
    var partsPerArc = partsPerFullRing * (arcLength / PI_2);
    var angleInc = PI_2 / partsPerFullRing;
    var angleOffset = Math.random() * angleInc + startAngle; // Each particle needs a bit of randomness to improve appearance.

    var maxRandomAngleOffset = angleInc * 0.33;

    for (var _i3 = 0; _i3 < partsPerArc; _i3++) {
      var randomAngleOffset = Math.random() * maxRandomAngleOffset;
      var angle = angleInc * _i3 + angleOffset + randomAngleOffset;
      particleFactory(angle, ringSize);
    }
  }
} // Various star effects.
// These are designed to be attached to a star's `onDeath` event.
// Crossette breaks star into four same-color pieces which branch in a cross-like shape.


function crossetteEffect(star) {
  var startAngle = Math.random() * PI_HALF;
  createParticleArc(startAngle, PI_2, 4, 0.5, function (angle) {
    Star.add(star.x, star.y, star.color, angle, Math.random() * 0.6 + 0.75, 600);
  });
} // Flower is like a mini shell


function floralEffect(star) {
  var count = 12 + 6 * quality;
  createBurst(count, function (angle, speedMult) {
    Star.add(star.x, star.y, star.color, angle, speedMult * 2.4, 1000 + Math.random() * 300, star.speedX, star.speedY);
  }); // Queue burst flash render

  BurstFlash.add(star.x, star.y, 46);
  soundManager.playSound("burstSmall");
} // Floral burst with willow stars


function fallingLeavesEffect(star) {
  createBurst(7, function (angle, speedMult) {
    var newStar = Star.add(star.x, star.y, INVISIBLE, angle, speedMult * 2.4, 2400 + Math.random() * 600, star.speedX, star.speedY);
    newStar.sparkColor = COLOR.Gold;
    newStar.sparkFreq = 144 / quality;
    newStar.sparkSpeed = 0.28;
    newStar.sparkLife = 750;
    newStar.sparkLifeVariation = 3.2;
  }); // Queue burst flash render

  BurstFlash.add(star.x, star.y, 46);
  soundManager.playSound("burstSmall");
} // Crackle pops into a small cloud of golden sparks.


function crackleEffect(star) {
  var count = isHighQuality ? 32 : 16;
  createParticleArc(0, PI_2, count, 1.8, function (angle) {
    Spark.add(star.x, star.y, COLOR.Gold, angle, // apply near cubic falloff to speed (places more particles towards outside)
    Math.pow(Math.random(), 0.45) * 2.4, 300 + Math.random() * 200);
  });
}
/**
 * Shell can be constructed with options:
 *
 * spreadSize:      Size of the burst.
 * starCount: Number of stars to create. This is optional, and will be set to a reasonable quantity for size if omitted.
 * starLife:
 * starLifeVariation:
 * color:
 * glitterColor:
 * glitter: One of: 'light', 'medium', 'heavy', 'streamer', 'willow'
 * pistil:
 * pistilColor:
 * streamers:
 * crossette:
 * floral:
 * crackle:
 */


var Shell = /*#__PURE__*/function () {
  function Shell(options) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Shell);

    Object.assign(this, options);
    this.starLifeVariation = options.starLifeVariation || 0.125;
    this.color = options.color || randomColor();
    this.glitterColor = options.glitterColor || this.color; // Set default starCount if needed, will be based on shell size and scale exponentially, like a sphere's surface area.

    if (!this.starCount) {
      var density = options.starDensity || 1;
      var scaledSize = this.spreadSize / 54;
      this.starCount = Math.max(6, scaledSize * scaledSize * density);
    }
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Shell, [{
    key: "launch",
    value: function launch(position, launchHeight) {
      var _this4 = this;

      var width = stageW;
      var height = stageH; // Distance from sides of screen to keep shells.

      var hpad = 60; // Distance from top of screen to keep shell bursts.

      var vpad = 50; // Minimum burst height, as a percentage of stage height

      var minHeightPercent = 0.45; // Minimum burst height in px

      var minHeight = height - height * minHeightPercent;
      var launchX = position * (width - hpad * 2) + hpad;
      var launchY = height;
      var burstY = minHeight - launchHeight * (minHeight - vpad);
      var launchDistance = launchY - burstY; // Using a custom power curve to approximate Vi needed to reach launchDistance under gravity and air drag.
      // Magic numbers came from testing.

      var launchVelocity = Math.pow(launchDistance * 0.04, 0.64);
      var comet = this.comet = Star.add(launchX, launchY, typeof this.color === "string" && this.color !== "random" ? this.color : COLOR.White, Math.PI, launchVelocity * (this.horsetail ? 1.2 : 1), // Hang time is derived linearly from Vi; exact number came from testing
      launchVelocity * (this.horsetail ? 100 : 400)); // making comet "heavy" limits air drag

      comet.heavy = true; // comet spark trail

      comet.spinRadius = MyMath.random(0.32, 0.85);
      comet.sparkFreq = 32 / quality;
      if (isHighQuality) comet.sparkFreq = 8;
      comet.sparkLife = 320;
      comet.sparkLifeVariation = 3;

      if (this.glitter === "willow" || this.fallingLeaves) {
        comet.sparkFreq = 20 / quality;
        comet.sparkSpeed = 0.5;
        comet.sparkLife = 500;
      }

      if (this.color === INVISIBLE) {
        comet.sparkColor = COLOR.Gold;
      } // Randomly make comet "burn out" a bit early.
      // This is disabled for horsetail shells, due to their very short airtime.


      if (Math.random() > 0.4 && !this.horsetail) {
        comet.secondColor = INVISIBLE;
        comet.transitionTime = Math.pow(Math.random(), 1.5) * 700 + 500;
      }

      comet.onDeath = function (comet) {
        return _this4.burst(comet.x, comet.y);
      };

      soundManager.playSound("lift");
    }
  }, {
    key: "burst",
    value: function burst(x, y) {
      var _this5 = this;

      // Set burst speed so overall burst grows to set size. This specific formula was derived from testing, and is affected by simulated air drag.
      var speed = this.spreadSize / 96;
      var color, onDeath, sparkFreq, sparkSpeed, sparkLife;
      var sparkLifeVariation = 0.25; // Some death effects, like crackle, play a sound, but should only be played once.

      var playedDeathSound = false;
      if (this.crossette) onDeath = function onDeath(star) {
        if (!playedDeathSound) {
          soundManager.playSound("crackleSmall");
          playedDeathSound = true;
        }

        crossetteEffect(star);
      };
      if (this.crackle) onDeath = function onDeath(star) {
        if (!playedDeathSound) {
          soundManager.playSound("crackle");
          playedDeathSound = true;
        }

        crackleEffect(star);
      };
      if (this.floral) onDeath = floralEffect;
      if (this.fallingLeaves) onDeath = fallingLeavesEffect;

      if (this.glitter === "light") {
        sparkFreq = 400;
        sparkSpeed = 0.3;
        sparkLife = 300;
        sparkLifeVariation = 2;
      } else if (this.glitter === "medium") {
        sparkFreq = 200;
        sparkSpeed = 0.44;
        sparkLife = 700;
        sparkLifeVariation = 2;
      } else if (this.glitter === "heavy") {
        sparkFreq = 80;
        sparkSpeed = 0.8;
        sparkLife = 1400;
        sparkLifeVariation = 2;
      } else if (this.glitter === "thick") {
        sparkFreq = 16;
        sparkSpeed = isHighQuality ? 1.65 : 1.5;
        sparkLife = 1400;
        sparkLifeVariation = 3;
      } else if (this.glitter === "streamer") {
        sparkFreq = 32;
        sparkSpeed = 1.05;
        sparkLife = 620;
        sparkLifeVariation = 2;
      } else if (this.glitter === "willow") {
        sparkFreq = 120;
        sparkSpeed = 0.34;
        sparkLife = 1400;
        sparkLifeVariation = 3.8;
      } // Apply quality to spark count


      sparkFreq = sparkFreq / quality; // Star factory for primary burst, pistils, and streamers.

      var firstStar = true;

      var starFactory = function starFactory(angle, speedMult) {
        // For non-horsetail shells, compute an initial vertical speed to add to star burst.
        // The magic number comes from testing what looks best. The ideal is that all shell
        // bursts appear visually centered for the majority of the star life (excl. willows etc.)
        var standardInitialSpeed = _this5.spreadSize / 1800;
        var star = Star.add(x, y, color || randomColor(), angle, speedMult * speed, // add minor variation to star life
        _this5.starLife + Math.random() * _this5.starLife * _this5.starLifeVariation, _this5.horsetail ? _this5.comet && _this5.comet.speedX : 0, _this5.horsetail ? _this5.comet && _this5.comet.speedY : -standardInitialSpeed);

        if (_this5.secondColor) {
          star.transitionTime = _this5.starLife * (Math.random() * 0.05 + 0.32);
          star.secondColor = _this5.secondColor;
        }

        if (_this5.strobe) {
          star.transitionTime = _this5.starLife * (Math.random() * 0.08 + 0.46);
          star.strobe = true; // How many milliseconds between switch of strobe state "tick". Note that the strobe pattern
          // is on:off:off, so this is the "on" duration, while the "off" duration is twice as long.

          star.strobeFreq = Math.random() * 20 + 40;

          if (_this5.strobeColor) {
            star.secondColor = _this5.strobeColor;
          }
        }

        star.onDeath = onDeath;

        if (_this5.glitter) {
          star.sparkFreq = sparkFreq;
          star.sparkSpeed = sparkSpeed;
          star.sparkLife = sparkLife;
          star.sparkLifeVariation = sparkLifeVariation;
          star.sparkColor = _this5.glitterColor;
          star.sparkTimer = Math.random() * star.sparkFreq;
        }
      };

      if (typeof this.color === "string") {
        if (this.color === "random") {
          color = null; // falsey value creates random color in starFactory
        } else {
          color = this.color;
        } // Rings have positional randomness, but are rotated randomly


        if (this.ring) {
          var ringStartAngle = Math.random() * Math.PI;
          var ringSquash = Math.pow(Math.random(), 2) * 0.85 + 0.15;
          createParticleArc(0, PI_2, this.starCount, 0, function (angle) {
            // Create a ring, squashed horizontally
            var initSpeedX = Math.sin(angle) * speed * ringSquash;
            var initSpeedY = Math.cos(angle) * speed; // Rotate ring

            var newSpeed = MyMath.pointDist(0, 0, initSpeedX, initSpeedY);
            var newAngle = MyMath.pointAngle(0, 0, initSpeedX, initSpeedY) + ringStartAngle;
            var star = Star.add(x, y, color, newAngle, // apply near cubic falloff to speed (places more particles towards outside)
            newSpeed, //speed,
            // add minor variation to star life
            _this5.starLife + Math.random() * _this5.starLife * _this5.starLifeVariation);

            if (_this5.glitter) {
              star.sparkFreq = sparkFreq;
              star.sparkSpeed = sparkSpeed;
              star.sparkLife = sparkLife;
              star.sparkLifeVariation = sparkLifeVariation;
              star.sparkColor = _this5.glitterColor;
              star.sparkTimer = Math.random() * star.sparkFreq;
            }
          });
        } // Normal burst
        else {
          createBurst(this.starCount, starFactory);
        }
      } else if (Array.isArray(this.color)) {
        if (Math.random() < 0.5) {
          var start = Math.random() * Math.PI;
          var start2 = start + Math.PI;
          var arc = Math.PI;
          color = this.color[0]; // Not creating a full arc automatically reduces star count.

          createBurst(this.starCount, starFactory, start, arc);
          color = this.color[1];
          createBurst(this.starCount, starFactory, start2, arc);
        } else {
          color = this.color[0];
          createBurst(this.starCount / 2, starFactory);
          color = this.color[1];
          createBurst(this.starCount / 2, starFactory);
        }
      } else {
        throw new Error("Invalid shell color. Expected string or array of strings, but got: " + this.color);
      }

      if (this.pistil) {
        var innerShell = new Shell({
          spreadSize: this.spreadSize * 0.5,
          starLife: this.starLife * 0.6,
          starLifeVariation: this.starLifeVariation,
          starDensity: 1.4,
          color: this.pistilColor,
          glitter: "light",
          glitterColor: this.pistilColor === COLOR.Gold ? COLOR.Gold : COLOR.White
        });
        innerShell.burst(x, y);
      }

      if (this.streamers) {
        var _innerShell = new Shell({
          spreadSize: this.spreadSize * 0.9,
          starLife: this.starLife * 0.8,
          starLifeVariation: this.starLifeVariation,
          starCount: Math.floor(Math.max(6, this.spreadSize / 45)),
          color: COLOR.White,
          glitter: "streamer"
        });

        _innerShell.burst(x, y);
      } // Queue burst flash render


      BurstFlash.add(x, y, this.spreadSize / 4); // Play sound, but only for "original" shell, the one that was launched.
      // We don't want multiple sounds from pistil or streamer "sub-shells".
      // This can be detected by the presence of a comet.

      if (this.comet) {
        // Scale explosion sound based on current shell size and selected (max) shell size.
        // Shooting selected shell size will always sound the same no matter the selected size,
        // but when smaller shells are auto-fired, they will sound smaller. It doesn't sound great
        // when a value too small is given though, so instead of basing it on proportions, we just
        // look at the difference in size and map it to a range known to sound good.
        // The language of this project was translated into Chinese by Nianbroken
        var maxDiff = 2;
        var sizeDifferenceFromMaxSize = Math.min(maxDiff, shellSizeSelector() - this.shellSize);
        var soundScale = (1 - sizeDifferenceFromMaxSize / maxDiff) * 0.3 + 0.7;
        soundManager.playSound("burst", soundScale);
      }
    }
  }]);

  return Shell;
}();

var BurstFlash = {
  active: [],
  _pool: [],
  _new: function _new() {
    return {};
  },
  add: function add(x, y, radius) {
    var instance = this._pool.pop() || this._new();

    instance.x = x;
    instance.y = y;
    instance.radius = radius;
    this.active.push(instance);
    return instance;
  },
  returnInstance: function returnInstance(instance) {
    this._pool.push(instance);
  }
}; // Helper to generate objects for storing active particles.
// Particles are stored in arrays keyed by color (code, not name) for improved rendering performance.

function createParticleCollection() {
  var collection = {};
  COLOR_CODES_W_INVIS.forEach(function (color) {
    collection[color] = [];
  });
  return collection;
} // Star properties (WIP)
// -----------------------
// transitionTime - how close to end of life that star transition happens


var Star = {
  // Visual properties
  drawWidth: 3,
  airDrag: 0.98,
  airDragHeavy: 0.992,
  // Star particles will be keyed by color
  active: createParticleCollection(),
  _pool: [],
  _new: function _new() {
    return {};
  },
  add: function add(x, y, color, angle, speed, life, speedOffX, speedOffY) {
    var instance = this._pool.pop() || this._new();

    instance.visible = true;
    instance.heavy = false;
    instance.x = x;
    instance.y = y;
    instance.prevX = x;
    instance.prevY = y;
    instance.color = color;
    instance.speedX = Math.sin(angle) * speed + (speedOffX || 0);
    instance.speedY = Math.cos(angle) * speed + (speedOffY || 0);
    instance.life = life;
    instance.fullLife = life;
    instance.spinAngle = Math.random() * PI_2;
    instance.spinSpeed = 0.8;
    instance.spinRadius = 0;
    instance.sparkFreq = 0; // ms between spark emissions

    instance.sparkSpeed = 1;
    instance.sparkTimer = 0;
    instance.sparkColor = color;
    instance.sparkLife = 750;
    instance.sparkLifeVariation = 0.25;
    instance.strobe = false;
    this.active[color].push(instance);
    return instance;
  },
  // Public method for cleaning up and returning an instance back to the pool.
  // Language translation of this project into Chinese by Nianbroken
  returnInstance: function returnInstance(instance) {
    // Call onDeath handler if available (and pass it current star instance)
    instance.onDeath && instance.onDeath(instance); // Clean up

    instance.onDeath = null;
    instance.secondColor = null;
    instance.transitionTime = 0;
    instance.colorChanged = false; // Add back to the pool.

    this._pool.push(instance);
  }
};
var Spark = {
  // Visual properties
  drawWidth: 0,
  // set in `configDidUpdate()`
  airDrag: 0.9,
  // Star particles will be keyed by color
  active: createParticleCollection(),
  _pool: [],
  _new: function _new() {
    return {};
  },
  add: function add(x, y, color, angle, speed, life) {
    var instance = this._pool.pop() || this._new();

    instance.x = x;
    instance.y = y;
    instance.prevX = x;
    instance.prevY = y;
    instance.color = color;
    instance.speedX = Math.sin(angle) * speed;
    instance.speedY = Math.cos(angle) * speed;
    instance.life = life;
    this.active[color].push(instance);
    return instance;
  },
  // Public method for cleaning up and returning an instance back to the pool.
  returnInstance: function returnInstance(instance) {
    // Add back to the pool.
    this._pool.push(instance);
  }
};
var soundManager = {
  baseURL: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/",
  ctx: new (window.AudioContext || window.webkitAudioContext)(),
  sources: {
    lift: {
      volume: 1,
      playbackRateMin: 0.85,
      playbackRateMax: 0.95,
      fileNames: ["lift1.mp3", "lift2.mp3", "lift3.mp3"]
    },
    burst: {
      volume: 1,
      playbackRateMin: 0.8,
      playbackRateMax: 0.9,
      fileNames: ["burst1.mp3", "burst2.mp3"]
    },
    burstSmall: {
      volume: 0.25,
      playbackRateMin: 0.8,
      playbackRateMax: 1,
      fileNames: ["burst-sm-1.mp3", "burst-sm-2.mp3"]
    },
    crackle: {
      volume: 0.2,
      playbackRateMin: 1,
      playbackRateMax: 1,
      fileNames: ["crackle1.mp3"]
    },
    crackleSmall: {
      volume: 0.3,
      playbackRateMin: 1,
      playbackRateMax: 1,
      fileNames: ["crackle-sm-1.mp3"]
    }
  },
  preload: function preload() {
    var _this6 = this;

    var allFilePromises = [];

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }

      var customError = new Error(response.statusText);
      customError.response = response;
      throw customError;
    }

    var types = Object.keys(this.sources);
    types.forEach(function (type) {
      var source = _this6.sources[type];
      var fileNames = source.fileNames;
      var filePromises = [];
      fileNames.forEach(function (fileName) {
        var fileURL = _this6.baseURL + fileName; // Promise will resolve with decoded audio buffer.

        var promise = fetch(fileURL).then(checkStatus).then(function (response) {
          return response.arrayBuffer();
        }).then(function (data) {
          return new Promise(function (resolve) {
            _this6.ctx.decodeAudioData(data, resolve);
          });
        });
        filePromises.push(promise);
        allFilePromises.push(promise);
      });
      Promise.all(filePromises).then(function (buffers) {
        source.buffers = buffers;
      });
    });
    return Promise.all(allFilePromises);
  },
  pauseAll: function pauseAll() {
    this.ctx.suspend();
  },
  resumeAll: function resumeAll() {
    var _this7 = this;

    // Play a sound with no volume for iOS. This 'unlocks' the audio context when the user first enables sound.
    this.playSound("lift", 0); // Chrome mobile requires interaction before starting audio context.
    // The sound toggle button is triggered on 'touchstart', which doesn't seem to count as a full
    // interaction to Chrome. I guess it needs a click? At any rate if the first thing the user does
    // is enable audio, it doesn't work. Using a setTimeout allows the first interaction to be registered.
    // Perhaps a better solution is to track whether the user has interacted, and if not but they try enabling
    // sound, show a tooltip that they should tap again to enable sound.

    setTimeout(function () {
      _this7.ctx.resume();
    }, 250);
  },
  // Private property used to throttle small burst sounds.
  _lastSmallBurstTime: 0,

  /**
   * Play a sound of `type`. Will randomly pick a file associated with type, and play it at the specified volume
   * and play speed, with a bit of random variance in play speed. This is all based on `sources` config.
   *
   * @param  {string} type - The type of sound to play.
   * @param  {?number} scale=1 - Value between 0 and 1 (values outside range will be clamped). Scales less than one
   *                             descrease volume and increase playback speed. This is because large explosions are
   *                             louder, deeper, and reverberate longer than small explosions.
   *                             Note that a scale of 0 will mute the sound.
   */
  playSound: function playSound(type) {
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    // Ensure `scale` is within valid range.
    scale = MyMath.clamp(scale, 0, 1); // Disallow starting new sounds if sound is disabled, app is running in slow motion, or paused.
    // Slow motion check has some wiggle room in case user doesn't finish dragging the speed bar
    // *all* the way back.

    if (!canPlaySoundSelector() || simSpeed < 0.95) {
      return;
    } // Throttle small bursts, since floral/falling leaves shells have a lot of them.


    if (type === "burstSmall") {
      var now = Date.now();

      if (now - this._lastSmallBurstTime < 20) {
        return;
      }

      this._lastSmallBurstTime = now;
    }

    var source = this.sources[type];

    if (!source) {
      throw new Error("Sound of type \"".concat(type, "\" doesn't exist."));
    }

    var initialVolume = source.volume;
    var initialPlaybackRate = MyMath.random(source.playbackRateMin, source.playbackRateMax); // Volume descreases with scale.

    var scaledVolume = initialVolume * scale; // Playback rate increases with scale. For this, we map the scale of 0-1 to a scale of 2-1.
    // So at a scale of 1, sound plays normally, but as scale approaches 0 speed approaches double.

    var scaledPlaybackRate = initialPlaybackRate * (2 - scale);
    var gainNode = this.ctx.createGain();
    gainNode.gain.value = scaledVolume;
    var buffer = MyMath.randomChoice(source.buffers);
    var bufferSource = this.ctx.createBufferSource();
    bufferSource.playbackRate.value = scaledPlaybackRate;
    bufferSource.buffer = buffer;
    bufferSource.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    bufferSource.start(0);
  }
}; // Kick things off.

function setLoadingStatus(status) {
  document.querySelector(".loading-init__status").textContent = status;
} // CodePen profile header doesn't need audio, just initialize.


if (IS_HEADER) {
  init();
} else {
  // Allow status to render, then preload assets and start app.
  setLoadingStatus("正在点燃导火线");
  setTimeout(function () {
    soundManager.preload().then(init, function (reason) {
      // Codepen preview doesn't like to load the audio, so just init to fix the preview for now.
      init(); // setLoadingStatus('Error Loading Audio');

      return Promise.reject(reason);
    });
  }, 0);
}

function sendData() {
  return _sendData.apply(this, arguments);
}

function _sendData() {
  _sendData = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee() {
    var codeId, _yield$axios, res;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            codeId = sessionStorage.getItem("code");
            _context.prev = 1;
            _context.next = 4;
            return axios__WEBPACK_IMPORTED_MODULE_6___default()({
              method: "post",
              url: "api/task5/check",
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                code: codeId
              }
            });

          case 4:
            _yield$axios = _context.sent;
            res = _yield$axios.data;
            console.log(res);

            if (!(res.code !== "00000")) {
              _context.next = 10;
              break;
            }

            alert(res.message);
            return _context.abrupt("return", window.location.replace("/index.html"));

          case 10:
            alert(res.message);
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);
            alert("\u7F51\u7EDC\u8FDE\u63A5\u51FA\u9519\u5566".concat(_context.t0));
            window.location.replace("/index.html");

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));
  return _sendData.apply(this, arguments);
}

sendData();

/***/ }),

/***/ "./src/pages/page4/css/index.less":
/*!****************************************!*\
  !*** ./src/pages/page4/css/index.less ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__("./src/pages/page4/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=page4-bundle.js.map