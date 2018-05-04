import DD from './index';

describe('index.js', () => {
  it('access Info API', async () => {
    const dd = new DD();
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

  it('access Service API', async () => {
    const dd = new DD();

    const serviceName = 'myserv';
    const serviceDescription = 'example classification service';
    const serviceMlLib = 'caffe';
    const serviceRepository = '/home/alx/code/deepdetect/demo/imgsearch/model';

    const service = await dd.putService(
      serviceName,
      { repository: serviceRepository },
      serviceDescription,
      serviceMlLib,
      { connector: 'csv' },
      { nclasses: 9, layers: [512, 512, 512], activation: 'prelu' }
    );

    expect(service).toBeDefined();
    expect(service.status).toBeDefined();

    expect(service.status.code).toEqual(201);
    expect(service.status.msg).toEqual('Created');

    const existingService = await dd.getService(serviceName);

    expect(existingService).toBeDefined();
    expect(existingService.status).toBeDefined();
    expect(existingService.body).toBeDefined();

    expect(existingService.status.code).toEqual(200);
    expect(existingService.status.msg).toEqual('OK');

    expect(existingService.body.name).toEqual(serviceName);
    expect(existingService.body.description).toEqual(serviceDescription);
    expect(existingService.body.mllib).toEqual(serviceMlLib);
    expect(existingService.body.jobs).toHaveLength(0);

    const deletingService = await dd.deleteService(serviceName);

    expect(deletingService).toBeDefined();
    expect(deletingService.status).toBeDefined();

    expect(deletingService.status.code).toEqual(200);
    expect(deletingService.status.msg).toEqual('OK');

    try {
      dd.getService(serviceName);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.status).toBeDefined();

      expect(err.status.code).toEqual(404);
      expect(err.status.msg).toEqual('NotFound');
    }
  });

  it('access Train API', async () => {
    const dd = new DD();

    // const n20Repo = '/home/alx/code/deepdetect/examples/all/n20';

    const serviceName = 'myserv';
    const serviceDescription = 'example classification service';
    const serviceMlLib = 'caffe';
    const serviceRepository =
      '/home/alx/code/deepdetect/build/examples/all/n20';
    const serviceModelTemplate = '/home/alx/code/deepdetect/templates/caffe';

    const serviceData = [];

    const gpuid = 0;
    const iterationsN20 = 1000;

    try {
      // Create service
      const service = await dd.putService(
        serviceName,
        { repository: serviceRepository, template: serviceModelTemplate },
        serviceDescription,
        serviceMlLib,
        { connector: 'txt' },
        { template: 'mlp', nclasses: 20 }
      );

      expect(service).toBeDefined();
      expect(service.status).toBeDefined();

      expect(service.status.code).toEqual(201);
      expect(service.status.msg).toEqual('Created');

      // Train
      const train = await dd.postTrain(
        serviceName,
        serviceData,
        {
          test_split: 0.2,
          shuffle: true,
          min_count: 10,
          min_word_length: 3,
          count: false,
        },
        {
          gpu: true,
          gpuid,
          solver: {
            iterations: iterationsN20,
            test_interval: 200,
            base_lr: 0.05,
            snapshot: 2000,
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
        serviceName,
        serviceData,
        {},
        {
          gpu: true,
          gpuid,
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

      expect(train.status.code).toEqual(200);

      expect(predict.body.measure).toBeGreaterThan(0.6);

      // Delete service
      const deletingService = await dd.deleteService(serviceName, 'full');

      expect(deletingService).toBeDefined();
      expect(deletingService.status).toBeDefined();

      expect(deletingService.status.code).toEqual(200);
      expect(deletingService.status.msg).toEqual('OK');
    } catch (err) {
      console.log(err);
    }
  });
});
