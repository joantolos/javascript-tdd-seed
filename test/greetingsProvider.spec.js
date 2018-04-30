const greetingsProvider = require('../src/greetingsProvider');
const chai = require('chai');
const expect = chai.expect;

describe('The Greetings Provider is able to', () => {
  
  it('salute', () => {
    expect(greetingsProvider.greetings()).to.be.equal('Hi there!');
  });

});