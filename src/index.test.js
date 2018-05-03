import DD from './index';

describe('index.js', () => {
  it('access Info API', () => {
    const dd = new DD();
    dd.info().then((err, resp) => {
      const info = resp.body;
      expect(info.status).toEqual({ code: 200, msg: 'ok' });
    });
  });
});
