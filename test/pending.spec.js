/* global describe, it, before */

import chai from 'chai';
import DD from '../src/index.js';

chai.expect();
const expect = chai.expect;

// Change these parameters in accord with
// your own DeepDetect server configuration
const ddServerParams = {
  host: 'localhost',
  port: 8080,
};

describe('Timeout on pending', () => {

  describe('when server is not responding', () => {

    it('should return a timeout error', async () => {

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

    }).timeout(6000);

  });

});
