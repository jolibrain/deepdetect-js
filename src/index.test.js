import DD from './index';

// Change these parameters in accord with
// your own DeepDetect server configuration
const ddServerParams = {
  host: '127.0.0.1',
  port: 8580,
};

// Change these parameters in accord with
// the path where test repository and data are available
//
// Process MUST have writting permission on
// "${testService.repository}" folder
const testService = {
  name: 'myserv',
  description: 'example classification service',
  mlLib: 'caffe',
  repository: '/opt/eris/data1/alx/deepdetect-js/n20',
  data: '/opt/eris/data1/alx/deepdetect-js/n20/news20',
};

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

    const service = await dd.putService(
      testService.name,
      { repository: testService.repository },
      testService.description,
      testService.mlLib,
      { connector: 'csv' },
      { nclasses: 9, layers: [512, 512, 512], activation: 'prelu' }
    );

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
    expect(existingService.body.description).toEqual(testService.description);
    expect(existingService.body.mllib).toEqual(testService.mlLib);
    expect(existingService.body.jobs).toHaveLength(0);

    const deletingService = await dd.deleteService(testService.name);

    expect(deletingService).toBeDefined();
    expect(deletingService.status).toBeDefined();

    expect(deletingService.status.code).toEqual(200);
    expect(deletingService.status.msg).toEqual('OK');

    try {
      dd.getService(testService.name);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.status).toBeDefined();

      expect(err.status.code).toEqual(404);
      expect(err.status.msg).toEqual('NotFound');
    }
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

      // Create service
      await dd.putService(
        testService.name,
        { repository: testService.repository, templates: '../templates/caffe' },
        testService.description,
        testService.mlLib,
        { connector: 'txt' },
        { nclasses: 20 }
      );

      // Train
      const train = await dd.postTrain(
        testService.name,
        [testService.data],
        {
          test_split: 0.2,
          shuffle: true,
          min_count: 10,
          min_word_length: 3,
          count: false,
        },
        {
          gpu: false,
          solver: {
            iterations: 1000,
            test_interval: 200,
            base_lr: 0.05,
            snapshot: 1000,
            test_initialization: true,
          },
          net: {
            batch_size: 100,
          },
        },
        { measure: ['acc', 'mcll', 'f1'] },
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
      const predict = await dd.postPredict(
        testService.name,
        [testService.data],
        {},
        {
          gpu: false,
          net: {
            test_batch_size: 10,
          },
        },
        { measure: ['f1'] }
      );

      expect(predict).toBeDefined();
      expect(predict.status).toBeDefined();
      expect(predict.body).toBeDefined();
      expect(predict.body.measure).toBeDefined();

      expect(predict.status.code).toEqual(200);

      expect(predict.body.measure.f1).toBeGreaterThan(0.6);

      // Delete service
      await dd.deleteService(testService.name, 'full');
    },
    120000
  ); // set timeout to 120 seconds
});
