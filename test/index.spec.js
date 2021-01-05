/* global describe, it, before */

import chai from 'chai';
import DD from '../src/index.js';

chai.expect();
const expect = chai.expect;

// Change these parameters in accord with
// your own DeepDetect server configuration
const ddServerParams = {
  host: '127.0.0.1',
  port: 8080,
};

// Change these parameters in accord with
// the path where test repository and data are available
//
// Process MUST have writting permission on
// "${testService.repository}" folder
const testService = {
  name: 'myserv',
  data: 'http://i.ytimg.com/vi/0vxOhd4qlnA/maxresdefault.jpg',
};

describe('Error catching', () => {
  before(async () => {
    // Check if test service exists, and delete it if it's the case
    // This can happen when a service-related test is not complete
    const dd = new DD(ddServerParams);

    const info = await dd.info();

    if (info.head.services.map(s => s.name).includes(testService.name)) {
      await dd.deleteService(testService.name);
    }
  });

  describe('when service does not exist', () => {
    it('should return a http error', async () => {
      const dd = new DD(ddServerParams);

      try {
        await dd.getService(testService.name);
      } catch (err) {
        expect(err).to.not.be.undefined;
        expect(err.status).to.not.be.undefined;

        expect(err.status.code).to.equal(404);
        expect(err.status.msg).to.equal('NotFound');
      }
    });
  });

  describe('when json is not returned', () => {

    it('should return a parsing error', async () => {
      const dd = new DD({
        host: '0.0.0.0',
        port: 80,
      });

      try {
        await dd.getService(testService.name);
      } catch (err) {
        expect(err).to.not.be.undefined;

        expect(err.name).to.not.be.undefined;
        expect(err.message).to.not.be.undefined;
        expect(err.type).to.be.undefined;

        expect(err.name).to.equal('SyntaxError');
        expect(err.message).to.have.string('Unexpected token < in JSON at position 0');
      }
    });
  });

  describe('when creating a new service', () => {
    it('should return handle BadRequest error', async () => {
      const dd = new DD(ddServerParams);

      try {
        await dd.putService('test', {
          description: '',
          model: {
            repository:
              '/opt/platform/models/private/traffic_detect_SSD_v1_300x300',
          },
          mllib: 'caffe',
          type: 'supervised',
          parameters: {
            input: { connector: 'image', height: 300, width: 300 },
            mllib: { nclasses: 2, gpu: true, gpuid: 0 },
          },
        });
      } catch (err) {
        expect(err).to.not.be.undefined;

        expect(err.name).to.not.be.undefined;
        expect(err.status).to.not.be.undefined;

        expect(err.status.code).to.not.be.undefined;
        expect(err.status.msg).to.not.be.undefined;
        expect(err.status.dd_code).to.not.be.undefined;
        expect(err.status.dd_msg).to.not.be.undefined;

        expect(err.status.code).to.equal(400);
        expect(err.status.msg).to.equal('BadRequest');
        expect(err.status.dd_code).to.equal(1006);
        expect(err.status.dd_msg).to.have.string('Service Bad Request Error');
      }
    });
  });

});

describe('ddurl init', () => {
  before(async () => {
    // Check if test service exists, and delete it if it's the case
    // This can happen when a service-related test is not complete
    const dd = new DD(ddServerParams);

    const info = await dd.info();

    if (info.head.services.map(s => s.name).includes(testService.name)) {
      await dd.deleteService(testService.name);
    }
  });

  it('has defaults', () => {
    const dd = new DD();

    expect(dd.ddurl).to.equal('http://localhost:8080');
  });

  it('has host', () => {
    const dd = new DD({
      host: 'localhost'
    });

    expect(dd.ddurl).to.equal('http://localhost:8080');
  });

  it('has port', () => {
    const dd = new DD({
      port: 8080
    });

    expect(dd.ddurl).to.equal('http://localhost:8080');
  });

  it('has path', () => {
    const dd = new DD({
      path: '/api'
    });

    expect(dd.ddurl).to.equal('http://localhost:8080/api');
  });

  it('has https', () => {
    const dd = new DD({
      https: true
    });

    expect(dd.ddurl).to.equal('https://localhost:8080');
  });

});

describe('Info API', () => {
  before(async () => {
    // Check if test service exists, and delete it if it's the case
    // This can happen when a service-related test is not complete
    const dd = new DD(ddServerParams);

    const info = await dd.info();

    if (info.head.services.map(s => s.name).includes(testService.name)) {
      await dd.deleteService(testService.name);
    }
  });

  it('access Info API', async () => {
    const dd = new DD(ddServerParams);
    const info = await dd.info();

    expect(info).to.not.be.undefined;
    expect(info.status).to.not.be.undefined;
    expect(info.head).to.not.be.undefined;

    expect(info.status).to.eql({ code: 200, msg: 'OK' });

    expect(info.head.method).to.equal('/info');
    expect(info.head.version).to.equal('0.1');
    expect(info.head.commit).to.not.be.undefined;
    expect(info.head.services).to.have.lengthOf(0);
  });
});

describe('Service API', () => {
  before(async () => {
    // Check if test service exists, and delete it if it's the case
    // This can happen when a service-related test is not complete
    const dd = new DD(ddServerParams);

    const info = await dd.info();

    if (info.head.services.map(s => s.name).includes(testService.name)) {
      await dd.deleteService(testService.name);
    }
  });

  it('access Service API', async () => {
    const dd = new DD(ddServerParams);

    const serviceConfig = {
      description: 'example classification service',
      model: {
        repository: '/opt/models/ggnet/',
      },
      mllib: 'caffe',
      type: 'unsupervised',
      parameters: {
        input: { connector: 'csv' },
        mllib: { nclasses: 9, layers: [512, 512, 512], activation: 'prelu' },
        output: {},
      },
    };

    const service = await dd.putService(testService.name, serviceConfig);

    expect(service).to.not.be.undefined;
    expect(service.status).to.not.be.undefined;

    expect(service.status.code).to.equal(201);
    expect(service.status.msg).to.equal('Created');

    const existingService = await dd.getService(testService.name);

    expect(existingService).to.not.be.undefined;
    expect(existingService.status).to.not.be.undefined;
    expect(existingService.body).to.not.be.undefined;

    expect(existingService.status.code).to.equal(200);
    expect(existingService.status.msg).to.equal('OK');

    expect(existingService.body.name).to.equal(testService.name);
    expect(existingService.body.description).to.equal(serviceConfig.description);
    expect(existingService.body.mllib).to.equal(serviceConfig.mllib);
    expect(existingService.body.jobs).to.have.lengthOf(0);

    const deletingService = await dd.deleteService(testService.name);

    expect(deletingService).to.not.be.undefined;
    expect(deletingService.status).to.not.be.undefined;

    expect(deletingService.status.code).to.equal(200);
    expect(deletingService.status.msg).to.equal('OK');
  });
});

describe('Train API', () => {
  before(async () => {
    // Check if test service exists, and delete it if it's the case
    // This can happen when a service-related test is not complete
    const dd = new DD(ddServerParams);

    const info = await dd.info();

    if (info.head.services.map(s => s.name).includes(testService.name)) {
      await dd.deleteService(testService.name);
    }
  });

  it.skip(
    'access Train API',
    async () => {
      const dd = new DD(ddServerParams);

      const serviceConfig = {
        description: 'image classification service',
        model: {
          repository: '/opt/models/ggnet',
          templates: '../templates/caffe/',
        },
        mllib: 'caffe',
        type: 'supervised',
        parameters: {
          input: {
            connector: 'image',
            width: 224,
            height: 224,
          },
          mllib: {
            nclasses: 5,
          },
          output: {},
        },
      };

      // Create service
      await dd.putService(testService.name, serviceConfig);

      // Train
      const train = await dd.postTrain(
        testService.name,
        [testService.data],
        {
          mllib: {
            net: {
              batch_size: 32,
            },
            solver: {
              test_interval: 500,
              iterations: 30000,
              base_lr: 0.001,
              stepsize: 1000,
              gamma: 0.9,
            },
          },
          input: {
            connector: 'image',
            test_split: 0.1,
            shuffle: true,
            width: 224,
            height: 224,
          },
          output: {
            measure: ['acc', 'mcll', 'f1'],
          },
        },
        false
      );

      expect(train).to.not.be.undefined;
      expect(train.status).to.not.be.undefined;
      expect(train.head).to.not.be.undefined;
      expect(train.body).to.not.be.undefined;
      expect(train.body.measure).to.not.be.undefined;
      expect(train.body.measure.f1).to.not.be.undefined;
      expect(train.body.measure.train_loss).to.not.be.undefined;

      expect(train.status.code).to.equal(201);
      expect(train.status.msg).to.equal('Created');

      expect(train.head.method).to.equal('/train');
      expect(train.head.time).to.be.above(0);

      expect(train.body.measure.train_loss).to.be.above(0);
      expect(train.body.measure.acc).to.be.above(0.5);
      expect(train.body.measure.acc).to.equal(train.body.measure.accp);

      // Predict with measures
      const postData = {
        service: testService.name,
        data: [testService.data],
        parameters: {
          input: {},
          mllib: {
            gpu: false,
            net: {
              test_batch_size: 10,
            },
          },
          output: {
            measure: ['f1'],
          },
        },
      };
      const predict = await dd.postPredict(postData);

      expect(predict).to.not.be.undefined;
      expect(predict.status).to.not.be.undefined;
      expect(predict.body).to.not.be.undefined;
      expect(predict.body.measure).to.not.be.undefined;

      expect(predict.status.code).to.equal(200);

      expect(predict.body.measure.f1).to.be.above(0.6);

      // Delete service
      await dd.deleteService(testService.name, { clear: 'full' });
    },
    120000
  ); // set timeout to 120 seconds
});
