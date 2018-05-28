const jobService = require('../src/job.service');
const chai = require('chai');
const nock = require('nock');
const mock = require('mock-require');
const expect = chai.expect;
const _ = require('lodash');

describe('The GitHub job service gets', () => {

  beforeEach(function() {
    nock('https://jobs.github.com:443', { 'encodedQueryParams': true })
      .get('/positions.json')
      .query({ 'description': 'javascript', 'location': 'barcelona' })
      .reply(200, [
        {
          id: '3d0c8c86-5a78-11e8-9dac-d37aab551739',
          created_at: 'Fri May 18 08:49:59 UTC 2018',
          title: 'Front-end Jedi ',
          location: 'Barcelona, Spain',
          type: 'Full Time',
          description: 'Super fake job',
          how_to_apply: 'Just ride a giant rocket',
          company: 'ACME'
        },
        {
          id: 'f9080d9e-26dd-11e8-97ec-50dc22333a0f',
          created_at: 'Sun May 13 17:13:09 UTC 2018',
          title: 'Java Backend Developer',
          location: 'Barcelona',
          type: 'Full Time',
          description: 'Another fake job but matching the API service contract.',
          how_to_apply: 'Follow the yellow brick road',
          company: 'Pied Piper'
        }
      ]);
  });

  it('at least one job offer', function(done) {

    jobService.getPositions('javascript', 'barcelona', function (jobServiceResponse) {
      expect(jobServiceResponse).to.be.an('array');
      expect(jobServiceResponse).to.have.lengthOf.at.least(1);
      done();
    });
  });

  it('one offer located on Barcelona with title and description', function(done) {

    jobService.getPositions('javascript', 'barcelona', function (jobServiceResponse) {
      expect(jobServiceResponse[0].location).contains('Barcelona');
      expect(jobServiceResponse[0].title).to.not.be.null;
      expect(jobServiceResponse[0].description).to.not.be.null;
      done();
    });
  });

  it('one job position from ACME', function(done) {

    jobService.getPositions('javascript', 'barcelona', function (jobServiceResponse) {
      expect(_.some(jobServiceResponse, { company: 'ACME' })).to.be.true;
      done();
    });
  });

  it('one job position from Pied Piper', function(done) {

    jobService.getPositions('javascript', 'barcelona', function (jobServiceResponse) {
      expect(_.some(jobServiceResponse, { company: 'Pied Piper' })).to.be.true;
      done();
    });
  });

});

describe('The nock library', () => {

  it('should able to record http request', function (done) {
    nock.recorder.rec({
      dont_print: true,
      output_objects: true,
      enable_reqheaders_recording: true
    });

    jobService.getPositions('javascript', 'barcelona', function () {
      expect(nock.recorder.play()).to.not.be.null;
      done();
    });

  });

});

describe('The http library', () => {

  beforeEach(function() {
    mock('http', { request: function() {
      return 'MOCKED http.request called';
    } });
  });

  it('should be mocked at this point', function (done) {
    jobService.requireHttp(function (jobServiceResponse) {
      expect(jobServiceResponse).to.be.equal('MOCKED http.request called');
      done();
    });
  });

});