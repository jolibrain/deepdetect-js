import deepdetectJs from './index';

describe('index.js', () => {
  it('should say something', () => {
    expect(deepdetectJs('🐰')).toEqual('👉 🐰 👈');
    expect(deepdetectJs()).toEqual('No args passed!');
  });
});
