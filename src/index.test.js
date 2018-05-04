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
});
