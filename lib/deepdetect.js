(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("isomorphic-fetch"));
	else if(typeof define === 'function' && define.amd)
		define("deepdetect", ["isomorphic-fetch"], factory);
	else if(typeof exports === 'object')
		exports["deepdetect"] = factory(require("isomorphic-fetch"));
	else
		root["deepdetect"] = factory(root["isomorphic-fetch"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_isomorphic_fetch__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-env es6 */
if (!process.browser) {
  __webpack_require__(/*! isomorphic-fetch */ "isomorphic-fetch"); // eslint-disable-line global-require

}

var DD =
/*#__PURE__*/
function () {
  // DD class constructor
  // @param {String} host the DeepDetect server host
  // @param {Integer} port the DeepDetect server port
  // @param {Boolean} https http (default) or https connection
  // @param {String} apiversion url api version
  function DD() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      host: 'localhost',
      port: 8080,
      path: null,
      https: false,
      apiversion: '0.1',
      fetchTimeout: 5000
    };

    _classCallCheck(this, DD);

    var API_METHODS_URL = {
      0.1: {
        info: '/info',
        services: '/services',
        train: '/train',
        predict: '/predict'
      }
    };
    this.urls = API_METHODS_URL[opts.apiversion || 0.1];

    if (typeof window !== 'undefined' && typeof window.location !== 'undefined' && typeof window.location.origin !== 'undefined' && typeof opts.host === 'undefined') {
      // Browser support, uses window.location by default
      this.ddurl = window.location.origin;
    } else {
      // NodeJS support
      this.ddurl = opts.https ? 'https://' : 'http://';
      this.ddurl += opts.host ? opts.host : 'localhost';
      this.ddurl += opts.port ? ":".concat(opts.port) : '';
    }

    this.ddurl += opts.path ? opts.path : '';
    this.fetchTimeout = opts.fetchTimeout ? opts.fetchTimeout : 5000;
  } // **API Info**
  // Info on the DeepDetect server


  _createClass(DD, [{
    key: "info",
    value: function info() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._get(this.urls.info, null, params);
    }
  }, {
    key: "putService",
    // **API Service**
    // Create a service
    //
    // @param {String} sname  service name as a resource
    // @param {Object} data   service parameters
    value: function putService(sname, data) {
      return this._put("".concat(this.urls.services, "/").concat(sname), data);
    }
  }, {
    key: "getService",
    // Get information about a service
    //
    // @param {String} sname service name as a resource
    value: function getService(sname) {
      return this._get("".concat(this.urls.services, "/").concat(sname));
    }
  }, {
    key: "deleteService",
    // Delete a service
    //
    // @param {String} sname service name as a resource
    // @param {String} clear 'full','lib' or 'mem', optionally clears model repository data
    value: function deleteService(sname) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        clear: 'lib'
      };
      return this._delete("".concat(this.urls.services, "/").concat(sname), data);
    }
  }, {
    key: "postTrain",

    /* API Train */
    // Creates a training job
    //
    // @param {String} sname service name as a resource
    // @param {Array} data array of input data / dataset for training
    // @param {Object} parametersInput input parameters
    // @param {Object} parametersMlLib library parameters
    // @param {Object} parametersOutput output parameters
    // @param {Boolean} asyncParam whether to run the job as non-blocking
    value: function postTrain(sname, data, parameters) {
      var asyncParam = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var postData = {
        service: sname,
        data: data,
        parameters: parameters,
        async: asyncParam
      };
      return this._post(this.urls.train, postData);
    }
  }, {
    key: "getTrain",
    // Get information on a non-blocking training job
    //
    // @param {String} sname service name as a resource
    // @param {Integer} job job number on the service
    // @param {Integer} timeout timeout before obtaining the job status
    // @param {Boolean} measureHist whether to return the full measure history (e.g. for plotting)
    value: function getTrain(sname) {
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
    // Kills a non-blocking training job
    //
    // @params {String} sname service name as a resource
    // @params {Integer} job job number on the service
    value: function deleteTrain(sname) {
      var job = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var params = {
        service: sname,
        job: job
      };
      return this._delete(this.urls.train, null, params);
    }
  }, {
    key: "postPredict",

    /* API Predict */
    // Makes prediction from data and model
    //
    // @param {Object} postData   prediction parameters
    value: function postPredict(postData) {
      return this._post(this.urls.predict, postData);
    }
  }, {
    key: "_httpRequest",
    // **HTTP requests to the DeepDetect server**
    // HTTP request to DeepDetect server
    //
    // @param {String} httpMethod GET/POST/PUT/DELETE
    // @param {String} apiMethod DeepDetect api method
    // @param {Object} jsonParams
    // @param {Object} searchParams
    value: function _httpRequest(httpMethod, apiMethod) {
      var _this = this;

      var jsonParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var searchParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      return new Promise(function (resolve, reject) {
        var url = _this.ddurl + apiMethod;
        var requestParams = {
          method: httpMethod
        };

        if (jsonParams != null) {
          requestParams.body = JSON.stringify(jsonParams);
        } else if (searchParams != null) {
          var urlParameters = Object.entries(searchParams).map(function (e) {
            return e.join('=');
          }).join('&');
          url += "?".concat(urlParameters);
        } // Set timeout timer


        var timer = setTimeout(function () {
          return reject(new Error('Request timed out'));
        }, _this.fetchTimeout);
        fetch(url, requestParams).then(function (response) {
          response.json().catch(function (error) {
            return reject(error);
          }).then(function (json) {
            if (response.status >= 200 && response.status < 300) {
              return resolve(json);
            }

            var error = new Error();

            if (json && json.status) {
              error.status = json.status;
            } else if (response.statusText) {
              error.status = response.statusText;
            }

            return reject(error);
          });
        }).finally(function () {
          return clearTimeout(timer);
        });
      });
    }
  }, {
    key: "_get",
    // GET to DeepDetect server
    //
    // @param {String} method
    // @param {Object} json
    // @param {Object} params
    value: function _get(method) {
      var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this._httpRequest('get', method, json, params).then(function (body) {
        return body;
      }).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: "_put",
    // PUT to DeepDetect server
    //
    // @param {String} method
    // @param {Object} json
    // @param {Object} params
    value: function _put(method) {
      var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this._httpRequest('put', method, json, params).then(function (body) {
        return body;
      }).catch(function (err) {
        throw err;
      });
    }
  }, {
    key: "_post",
    // POST to DeepDetect server
    //
    // @param {String} method
    // @param {Object} json
    // @param {Object} params
    value: function _post(method) {
      var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this._httpRequest('post', method, json, params).then(function (body) {
        return body;
      }).catch(function (err) {
        return err;
      });
    }
  }, {
    key: "_delete",
    // DELETE to DeepDetect server
    //
    // @param {String} method
    // @param {Object} json
    // @param {Object} params
    value: function _delete(method) {
      var json = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this._httpRequest('delete', method, json, params).then(function (body) {
        return body;
      }).catch(function (err) {
        return err;
      });
    }
  }]);

  return DD;
}();

exports.default = DD;
module.exports = exports["default"];
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "isomorphic-fetch":
/*!***********************************!*\
  !*** external "isomorphic-fetch" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_isomorphic_fetch__;

/***/ })

/******/ });
});
//# sourceMappingURL=deepdetect.js.map