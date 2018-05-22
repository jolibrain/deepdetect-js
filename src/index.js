/* eslint-env es6 */

'use strict';

if (!process.browser) {
  require('isomorphic-fetch'); // eslint-disable-line global-require
}

module.exports = DD; // eslint-disable-line no-use-before-define
DD.prototype = {}; // eslint-disable-line no-use-before-define

// DD class constructor
// @param {String} host the DeepDetect server host
// @param {Integer} port the DeepDetect server port
// @param {Boolean} https http (default) or https connection
// @param {String} apiversion url api version
function DD(opts = {
  host: 'localhost',
  port: 8080,
  path: null,
  https: false,
  apiversion: '0.1',
}) {
  const API_METHODS_URL = {
    0.1: {
      info: '/info',
      services: '/services',
      train: '/train',
      predict: '/predict',
    },
  };

  this.urls = API_METHODS_URL[opts.apiversion || 0.1];

  if (process.browser) {
    // Browser support, uses window.location by default
    this.ddurl = window.location;

    if (opts.host != null) {
      this.ddurl = opts.https ? 'https://' : 'http://';
      this.ddurl += opts.host;
    }

    if (opts.port != null) {
      this.ddurl += opts.host;
    }

    if (opts.path != null) {
      this.ddurl += opts.path;
    }
  } else {
    // NodeJS support
    this.ddurl = opts.https ? 'https://' : 'http://';
    this.ddurl += opts.host;
    this.ddurl += `:${opts.port}`;

    if (opts.path != null) {
      this.ddurl += opts.path;
    }
  }
}

// **HTTP requests to the DeepDetect server**

// HTTP request to DeepDetect server
//
// @param {String} httpMethod GET/POST/PUT/DELETE
// @param {String} apiMethod DeepDetect api method
// @param {Object} json
// @param {Object} params
DD.prototype._httpRequest = function _httpRequest(
  httpMethod,
  apiMethod,
  json = null,
  params = null
) {
  return new Promise((resolve, reject) => {
    const url = this.ddurl + apiMethod;
    const requestParams = { method: httpMethod };

    if (json != null) {
      requestParams.body = JSON.stringify(json);
    } else if (params != null) {
      requestParams.search = new URLSearchParams(params);
    }

    fetch(url, requestParams)
      .then(resp => {
        resolve(resp.json());
      })
      .catch(err => {
        reject(err.response.json());
      });
  });
};

// GET to DeepDetect server
//
// @param {String} method
// @param {Object} json
// @param {Object} params
DD.prototype._get = function _get(method, json = null, params = null) {
  return this._httpRequest('get', method, json, params)
    .then(body => body)
    .catch(err => err);
};

// PUT to DeepDetect server
//
// @param {String} method
// @param {Object} json
// @param {Object} params
DD.prototype._put = function _put(method, json = null, params = null) {
  return this._httpRequest('put', method, json, params)
    .then(body => body)
    .catch(err => err);
};

// POST to DeepDetect server
//
// @param {String} method
// @param {Object} json
// @param {Object} params
DD.prototype._post = function _post(method, json = null, params = null) {
  return this._httpRequest('post', method, json, params)
    .then(body => body)
    .catch(err => err);
};

// DELETE to DeepDetect server
//
// @param {String} method
// @param {Object} json
// @param {Object} params
DD.prototype._delete = function _delete(method, json = null, params = null) {
  return this._httpRequest('delete', method, json, params)
    .then(body => body)
    .catch(err => err);
};

// **API Info**

// Info on the DeepDetect server
DD.prototype.info = function info() {
  return this._get(this.urls.info, null, null);
};

// **API Service**

// Create a service
//
// @param {String} sname  service name as a resource
// @param {Object} data   service parameters
DD.prototype.putService = function putService(sname, data) {
  return this._put(`${this.urls.services}/${sname}`, data);
};

// Get information about a service
//
// @param {String} sname service name as a resource
DD.prototype.getService = function getService(sname) {
  return this._get(`${this.urls.services}/${sname}`);
};

// Delete a service
//
// @param {String} sname service name as a resource
// @param {String} clear 'full','lib' or 'mem', optionally clears model repository data
DD.prototype.deleteService = function deleteService(
  sname,
  data = { clear: 'lib' }
) {
  return this._delete(`${this.urls.services}/${sname}`, data);
};

/* API Train */

// Creates a training job
//
// @param {String} sname service name as a resource
// @param {Array} data array of input data / dataset for training
// @param {Object} parametersInput input parameters
// @param {Object} parametersMlLib library parameters
// @param {Object} parametersOutput output parameters
// @param {Boolean} asyncParam whether to run the job as non-blocking
DD.prototype.postTrain = function postTrain(
  sname,
  data,
  parametersInput,
  parametersMlLib,
  parametersOutput,
  asyncParam = true
) {
  const postData = {
    service: sname,
    data,
    parameters: {
      input: parametersInput,
      mllib: parametersMlLib,
      output: parametersOutput,
    },
    async: asyncParam,
  };

  return this._post(this.urls.train, postData);
};

// Get information on a non-blocking training job
//
// @param {String} sname service name as a resource
// @param {Integer} job job number on the service
// @param {Integer} timeout timeout before obtaining the job status
// @param {Boolean} measureHist whether to return the full measure history (e.g. for plotting)
DD.prototype.getTrain = function getTrain(
  sname,
  job = 1,
  timeout = 0,
  measureHist = false
) {
  const params = {
    service: sname,
    job,
    timeout,
  };

  if (measureHist) {
    params.parameters = {
      output: {
        measureHist: true,
      },
    };
  }

  return this._get(this.urls.train, null, params);
};

// Kills a non-blocking training job
//
// @params {String} sname service name as a resource
// @params {Integer} job job number on the service
DD.prototype.deleteTrain = function deleteTrain(sname, job = 1) {
  const params = {
    service: sname,
    job,
  };

  return this._delete(this.urls.train, null, params);
};

/* API Predict */

// Makes prediction from data and model
//
// @param {Object} postData   prediction parameters
DD.prototype.postPredict = function postPredict(postData) {
  return this._post(this.urls.predict, postData);
};

// Makes prediction from data and model
//
// @param {String} name               service name as a resource
// @param {Array} data                array of data URI to predict from
// @param {Object} parametersInput   input parameters
// @param {Object} parametersMlLib   library parameters
// @param {Object} parametersOutput  output parameters
DD.prototype.postPredict = function postPredict(
  sname,
  data,
  parametersInput,
  parametersMlLib,
  parametersOutput
) {
  const postData = {
    service: sname,
    parameters: {
      input: parametersInput,
      mllib: parametersMlLib,
      output: parametersOutput,
    },
    data,
  };

  return this._post(this.urls.predict, postData);
};
