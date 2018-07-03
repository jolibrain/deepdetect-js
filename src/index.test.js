import DD from './index';

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

describe.only('Error catching', () => {
  beforeEach(async () => {
    // Check if test service exists, and delete it if it's the case
    // This can happen when a service-related test is not complete
    const dd = new DD(ddServerParams);

    const info = await dd.info();

    if (info.head.services.map(s => s.name).includes(testService.name)) {
      await dd.deleteService(testService.name);
    }
  });

  test('return http error on unexisting service', async () => {
    const dd = new DD(ddServerParams);

    try {
      await dd.getService(testService.name);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.status).toBeDefined();

      expect(err.status.code).toEqual(404);
      expect(err.status.msg).toEqual('NotFound');
    }
  });

  test('return a parsing error when json not returned', async () => {
    const dd = new DD({
      host: '1.1.1.1',
      port: 80,
    });

    try {
      await dd.getService(testService.name);
    } catch (err) {
      expect(err).toBeDefined();

      expect(err.name).toBeDefined();
      expect(err.message).toBeDefined();
      expect(err.type).toBeDefined();

      expect(err.name).toEqual('FetchError');
      expect(err.message).toContain('Unexpected token < in JSON at position 0');
      expect(err.type).toEqual('invalid-json');
    }
  });

  test('handle BadRequest error when creating a new service', async () => {
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
      expect(err).toBeDefined();

      expect(err.name).toBeDefined();
      expect(err.status).toBeDefined();

      expect(err.status.code).toBeDefined();
      expect(err.status.msg).toBeDefined();
      expect(err.status.dd_code).toBeDefined();
      expect(err.status.dd_msg).toBeDefined();

      expect(err.status.code).toEqual(400);
      expect(err.status.msg).toEqual('BadRequest');
      expect(err.status.dd_code).toEqual(1006);
      expect(err.status.dd_msg).toEqual('Service Bad Request Error');
    }
  });
});

describe('Info API', () => {
  beforeEach(async () => {
    // Check if test service exists, and delete it if it's the case
    // This can happen when a service-related test is not complete
    const dd = new DD(ddServerParams);

    const info = await dd.info();

    if (info.head.services.map(s => s.name).includes(testService.name)) {
      await dd.deleteService(testService.name);
    }
  });

  test('access Info API', async () => {
    const dd = new DD(ddServerParams);
    const info = await dd.info();

    expect(info).toBeDefined();
    expect(info.status).toBeDefined();
    expect(info.head).toBeDefined();

    expect(info.status).toEqual({ code: 200, msg: 'OK' });

    expect(info.head.method).toEqual('/info');
    expect(info.head.version).toEqual('0.1');
    expect(info.head.commit).toBeDefined();
    expect(info.head.services).toHaveLength(0);
  });
});

describe('Service API', () => {
  beforeEach(async () => {
    // Check if test service exists, and delete it if it's the case
    // This can happen when a service-related test is not complete
    const dd = new DD(ddServerParams);

    const info = await dd.info();

    if (info.head.services.map(s => s.name).includes(testService.name)) {
      await dd.deleteService(testService.name);
    }
  });

  test('access Service API', async () => {
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

    expect(service).toBeDefined();
    expect(service.status).toBeDefined();

    expect(service.status.code).toEqual(201);
    expect(service.status.msg).toEqual('Created');

    const existingService = await dd.getService(testService.name);

    expect(existingService).toBeDefined();
    expect(existingService.status).toBeDefined();
    expect(existingService.body).toBeDefined();

    expect(existingService.status.code).toEqual(200);
    expect(existingService.status.msg).toEqual('OK');

    expect(existingService.body.name).toEqual(testService.name);
    expect(existingService.body.description).toEqual(serviceConfig.description);
    expect(existingService.body.mllib).toEqual(serviceConfig.mllib);
    expect(existingService.body.jobs).toHaveLength(0);

    const deletingService = await dd.deleteService(testService.name);

    expect(deletingService).toBeDefined();
    expect(deletingService.status).toBeDefined();

    expect(deletingService.status.code).toEqual(200);
    expect(deletingService.status.msg).toEqual('OK');
  });
});

describe('Train API', () => {
  beforeEach(async () => {
    // Check if test service exists, and delete it if it's the case
    // This can happen when a service-related test is not complete
    const dd = new DD(ddServerParams);

    const info = await dd.info();

    if (info.head.services.map(s => s.name).includes(testService.name)) {
      await dd.deleteService(testService.name);
    }
  });

  it(
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

      expect(train).toBeDefined();
      expect(train.status).toBeDefined();
      expect(train.head).toBeDefined();
      expect(train.body).toBeDefined();
      expect(train.body.measure).toBeDefined();
      expect(train.body.measure.f1).toBeDefined();
      expect(train.body.measure.train_loss).toBeDefined();

      expect(train.status.code).toEqual(201);
      expect(train.status.msg).toEqual('Created');

      expect(train.head.method).toEqual('/train');
      expect(train.head.time).toBeGreaterThan(0);

      expect(train.body.measure.train_loss).toBeGreaterThan(0);
      expect(train.body.measure.acc).toBeGreaterThan(0.5);
      expect(train.body.measure.acc).toEqual(train.body.measure.accp);

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

      expect(predict).toBeDefined();
      expect(predict.status).toBeDefined();
      expect(predict.body).toBeDefined();
      expect(predict.body.measure).toBeDefined();

      expect(predict.status.code).toEqual(200);

      expect(predict.body.measure.f1).toBeGreaterThan(0.6);

      // Delete service
      await dd.deleteService(testService.name, { clear: 'full' });
    },
    120000
  ); // set timeout to 120 seconds
});
