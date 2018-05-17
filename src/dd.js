/* eslint-env es6 */

'use strict';

export class DD {
  // DD class constructor
  // @param {String} host the DeepDetect server host
  // @param {Integer} port the DeepDetect server port
  // @param {Boolean} https http (default) or https connection
  // @param {String} apiversion url api version
  constructor(opts = {
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

    if (opts.path != null) {
      // Browser support, uses opts.path
      // instead of opts.host and opts.port
      this.ddurl = window.location + opts.path;
    } else {
      // NodeJS support, uses opts.host and opts.port
      this.ddurl = opts.https ? 'https://' : 'http://';
      this.ddurl += opts.host;
      this.ddurl += `:${opts.port}`;
    }
  }

  // **HTTP requests to the DeepDetect server**

  // HTTP request to DeepDetect server
  //
  // @param {String} httpMethod GET/POST/PUT/DELETE
  // @param {String} apiMethod DeepDetect api method
  // @param {Object} json
  // @param {Object} params
  httpRequest(httpMethod, apiMethod, json = null, params = null) {
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
          console.log(err);
          reject(err.response.json());
        });
    });
  }

  // GET to DeepDetect server
  //
  // @param {String} method
  // @param {Object} json
  // @param {Object} params
  get(method, json = null, params = null) {
    return this.httpRequest('get', method, json, params)
      .then(body => body)
      .catch(err => err);
  }

  // PUT to DeepDetect server
  //
  // @param {String} method
  // @param {Object} json
  // @param {Object} params
  put(method, json = null, params = null) {
    return this.httpRequest('put', method, json, params)
      .then(body => body)
      .catch(err => err);
  }

  // POST to DeepDetect server
  //
  // @param {String} method
  // @param {Object} json
  // @param {Object} params
  post(method, json = null, params = null) {
    return this.httpRequest('post', method, json, params)
      .then(body => body)
      .catch(err => err);
  }

  // DELETE to DeepDetect server
  //
  // @param {String} method
  // @param {Object} json
  // @param {Object} params
  delete(method, json = null, params = null) {
    return this.httpRequest('delete', method, json, params)
      .then(body => body)
      .catch(err => err);
  }

  // **API Info**

  // Info on the DeepDetect server
  info() {
    return this.get(this.urls.info, null, null).then(info => info);
  }

  // **API Service**

  // Create a service
  //
  // @param {String} sname              service name as a resource
  // @param {Object} data               service parameters
  putService(sname, data) {
    return this.put(`${this.urls.services}/${sname}`, data);
  }

  // Get information about a service
  //
  // @param {String} sname service name as a resource
  getService(sname) {
    return this.get(`${this.urls.services}/${sname}`);
  }

  // Delete a service
  //
  // @param {String} sname service name as a resource
  // @param {Object} clear 'full','lib' or 'mem', optionally clears model repository data
  deleteService(sname, data = { clear: 'lib' }) {
    return this.delete(`${this.urls.services}/${sname}`, data);
  }

  /* API Train */

  // Creates a training job
  //
  // @param {String} sname service name as a resource
  // @param {Array} data array of input data / dataset for training
  // @param {Object} parametersInput input parameters
  // @param {Object} parametersMlLib library parameters
  // @param {Object} parametersOutput output parameters
  // @param {Boolean} asyncParam whether to run the job as non-blocking
  postTrain(
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

    return this.post(this.urls.train, postData);
  }

  // Get information on a non-blocking training job
  //
  // @param {String} sname service name as a resource
  // @param {Integer} job job number on the service
  // @param {Integer} timeout timeout before obtaining the job status
  // @param {Boolean} measureHist whether to return the full measure history (e.g. for plotting)
  getTrain(sname, job = 1, timeout = 0, measureHist = false) {
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

    return this.get(this.urls.train, null, params);
  }

  // Kills a non-blocking training job
  //
  // @params {String} sname service name as a resource
  // @params {Integer} job job number on the service
  deleteTrain(sname, job = 1) {
    const params = {
      service: sname,
      job,
    };

    return this.delete(this.urls.train, null, params);
  }

  /* API Predict */

  // Makes prediction from data and model
  //
  // @param {String} name               service name as a resource
  // @param {Array} data                array of data URI to predict from
  // @param {Object} parametersInput   input parameters
  // @param {Object} parametersMlLib   library parameters
  // @param {Object} parametersOutput  output parameters
  postPredict(sname, data, parametersInput, parametersMlLib, parametersOutput) {
    const postData = {
      service: sname,
      parameters: {
        input: parametersInput,
        mllib: parametersMlLib,
        output: parametersOutput,
      },
      data,
    };

    return this.post(this.urls.predict, postData);
  }
}
