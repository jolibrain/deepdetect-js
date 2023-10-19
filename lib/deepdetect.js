(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("isomorphic-fetch"));
	else if(typeof define === 'function' && define.amd)
		define(["isomorphic-fetch"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("isomorphic-fetch")) : factory(root["isomorphic-fetch"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE_isomorphic_fetch__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "isomorphic-fetch":
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_isomorphic_fetch__;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(descriptor.key), descriptor);
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

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function _toPrimitive(input, hint) {
  if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function _toPropertyKey(arg) {
  var key = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arg, "string");
  return (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key) === "symbol" ? key : String(key);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DD)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");


/* eslint-env es6 */

if (!process.browser) {
  __webpack_require__(/*! isomorphic-fetch */ "isomorphic-fetch"); // eslint-disable-line global-require
}
var DD = /*#__PURE__*/function () {
  // DD class constructor
  // @param {String} host the DeepDetect server host
  // @param {Integer} port the DeepDetect server port
  // @param {Boolean} https http (default) or https connection
  // @param {String} apiversion url api version
  // @param {Boolean} sameOrigin Use sameOrigin flag to setup host from window.location
  function DD(opts) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, DD);
    var defaults = {
      host: 'localhost',
      port: 8080,
      path: '',
      https: false,
      apiversion: '0.1',
      fetchTimeout: 15000,
      gzipEnable: true,
      requestHeaders: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Accept-Encoding': 'gzip'
      }
    };
    var options = Object.assign({}, defaults, opts);
    var API_METHODS_URL = {
      0.1: {
        info: '/info',
        services: '/services',
        train: '/train',
        predict: '/predict',
        chain: '/chain'
      }
    };
    this.urls = API_METHODS_URL[options.apiversion || 0.1];
    if (options.sameOrigin) {
      // Browser support, uses window.location by default
      this.ddurl = window.location.origin;
    } else {
      // NodeJS support
      this.ddurl = options.https ? 'https://' : 'http://';
      this.ddurl += options.host;
      this.ddurl += ':' + options.port;
    }
    this.ddurl += options.path;
    this.fetchTimeout = options.fetchTimeout;
    this.requestHeaders = options.requestHeaders;
    if (!options.gzipEnable) {
      this.requestHeaders['Accept-Encoding'] = 'identity';
    }
  }

  // **API Info**

  // Info on the DeepDetect server
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(DD, [{
    key: "info",
    value: function info() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._get(this.urls.info, null, params);
    }
  }, {
    key: "putService",
    value:
    // **API Service**

    // Create a service
    //
    // @param {String} sname  service name as a resource
    // @param {Object} data   service parameters
    function putService(sname, data) {
      return this._put("".concat(this.urls.services, "/").concat(sname), data);
    }
  }, {
    key: "getService",
    value:
    // Get information about a service
    //
    // @param {String} sname service name as a resource
    function getService(sname) {
      return this._get("".concat(this.urls.services, "/").concat(sname));
    }
  }, {
    key: "deleteService",
    value:
    // Delete a service
    //
    // @param {String} sname service name as a resource
    // @param {String} clear 'full','lib' or 'mem', optionally clears model repository data
    function deleteService(sname) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        clear: 'lib'
      };
      return this._delete("".concat(this.urls.services, "/").concat(sname), data);
    }
  }, {
    key: "postTrain",
    value: /* API Train */

    // Creates a training job
    //
    // @param {String} sname service name as a resource
    // @param {Array} data array of input data / dataset for training
    // @param {Object} parametersInput input parameters
    // @param {Object} parametersMlLib library parameters
    // @param {Object} parametersOutput output parameters
    // @param {Boolean} asyncParam whether to run the job as non-blocking
    function postTrain(sname, data, parameters) {
      var asyncParam = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var postData = {
        service: sname,
        'async': asyncParam,
        parameters: parameters,
        data: data
      };
      return this._post(this.urls.train, postData);
    }
  }, {
    key: "getTrain",
    value:
    // Get information on a non-blocking training job
    //
    // @param {String} sname service name as a resource
    // @param {Integer} job job number on the service
    // @param {Integer} timeout timeout before obtaining the job status
    // @param {Boolean} measureHist whether to return the full measure history (e.g. for plotting)
    function getTrain(sname) {
      var job = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var measureHist = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var maxHistPoints = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var params = {
        service: sname,
        job: job,
        timeout: timeout
      };
      if (measureHist) {
        params['parameters.output.measure_hist'] = true;
      } else if (!Number.isNaN(maxHistPoints) && parseInt(Number(maxHistPoints), 10) === maxHistPoints && !Number.isNaN(parseInt(maxHistPoints, 10))) {
        params['parameters.output.max_hist_points'] = parseInt(maxHistPoints, 10);
      }
      return this._get(this.urls.train, null, params);
    }
  }, {
    key: "deleteTrain",
    value:
    // Kills a non-blocking training job
    //
    // @params {String} sname service name as a resource
    // @params {Integer} job job number on the service
    function deleteTrain(sname) {
      var job = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var params = {
        service: sname,
        job: job
      };
      return this._delete(this.urls.train, null, params);
    }
  }, {
    key: "postPredict",
    value: /* API Predict */

    // Makes prediction from data and model
    //
    // @param {Object} postData   prediction parameters
    function postPredict(postData) {
      return this._post(this.urls.predict, postData);
    }
  }, {
    key: "putChain",
    value: /* API Chain */

    // Makes prediction from data and model using tree-structured chains
    //
    // @param {String} endPoint http endpoint
    // @param {Object} data     chain parameters
    function putChain(endPoint, data) {
      return this._put("".concat(this.urls.chain, "/").concat(endPoint), data);
    }
  }, {
    key: "_httpRequest",
    value:
    // **HTTP requests to the DeepDetect server**

    // HTTP request to DeepDetect server
    //
    // @param {String} httpMethod GET/POST/PUT/DELETE
    // @param {String} apiMethod DeepDetect api method
    // @param {Object} jsonParams
    // @param {Object} searchParams
    function _httpRequest(httpMethod, apiMethod) {
      var _this = this;
      var jsonParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var searchParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      return new Promise(function (resolve, reject) {
        var url = _this.ddurl + apiMethod;
        var requestParams = {
          method: httpMethod,
          headers: _this.requestHeaders
        };
        if (jsonParams != null) {
          requestParams.body = JSON.stringify(jsonParams);
        } else if (searchParams != null) {
          var urlParameters = Object.entries(searchParams).map(function (e) {
            return e.join('=');
          }).join('&');
          url += "?".concat(urlParameters);
        }
        _this._fetchTimeout(_this.fetchTimeout, fetch(url, requestParams)).then(function (response) {
          return response.text().then(function (text) {
            return text ? JSON.parse(text.replace(/NaN,/g, '0,')) : {};
          });
        }).then(function (json) {
          return resolve(json);
        })["catch"](function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: "_fetchTimeout",
    value: function _fetchTimeout(ms, promise) {
      return new Promise(function (resolve, reject) {
        var timer = setTimeout(function () {
          reject(new Error('timeout'));
        }, ms);
        promise.then(function (res) {
          clearTimeout(timer);
          resolve(res);
        })["catch"](function (err) {
          clearTimeout(timer);
          reject(err);
        });
      });
    }

    // GET to DeepDetect server
    //
    // @param {String} method
    // @param {Object} json
    // @param {Object} params
  }, {
    key: "_get",
    value: function _get(method) {
      var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this._httpRequest('get', method, json, params).then(function (body) {
        return body;
      })["catch"](function (err) {
        throw err;
      });
    }
  }, {
    key: "_put",
    value:
    // PUT to DeepDetect server
    //
    // @param {String} method
    // @param {Object} json
    // @param {Object} params
    function _put(method) {
      var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this._httpRequest('put', method, json, params).then(function (body) {
        return body;
      })["catch"](function (err) {
        throw err;
      });
    }
  }, {
    key: "_post",
    value:
    // POST to DeepDetect server
    //
    // @param {String} method
    // @param {Object} json
    // @param {Object} params
    function _post(method) {
      var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this._httpRequest('post', method, json, params).then(function (body) {
        return body;
      })["catch"](function (err) {
        return err;
      });
    }
  }, {
    key: "_delete",
    value:
    // DELETE to DeepDetect server
    //
    // @param {String} method
    // @param {Object} json
    // @param {Object} params
    function _delete(method) {
      var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this._httpRequest('delete', method, json, params).then(function (body) {
        return body;
      })["catch"](function (err) {
        return err;
      });
    }
  }]);
  return DD;
}();

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=deepdetect.js.map