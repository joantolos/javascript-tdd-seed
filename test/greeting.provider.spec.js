const greetingProvider = require('../src/greeting.provider');
const chai = require('chai');
const expect = chai.expect;

describe('The Greetings Provider is able to', () => {
  
  it('salute', () => {
    expect(greetingProvider.greetings()).to.be.equal('Hi there!');
  });

});