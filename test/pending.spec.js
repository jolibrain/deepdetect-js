/* global describe, it, before */

import chai from 'chai';
import DD from '../src/index.js';

chai.expect();
const expect = chai.expect;

// Change these parameters in accord with
// your own DeepDetect server configuration
const ddServerParams = {
  host: '10.10.77.61',
  port: 8666,
};

describe('Timeout on pending', () => {

  describe('when server is not responding', () => {
    it('should return a timeout error', async (done) => {
      const dd = new DD(ddServerParams);

      try {
        await dd.info();
      } catch (err) {
        console.log(err);
        expect(err).to.not.be.undefined;
        expect(err.status).to.not.be.undefined;

        expect(err.status.code).to.equal(404);
        expect(err.status.msg).to.equal('NotFound');
      }

      done();
    }).timeout(6000);
  });

});
