const https = require('https');

const getPositions = (description, city, callback) => {
  let httpOptions = {
    host: 'jobs.github.com',
    path: '/positions.json?description=' + description + '&location=' + city,
    method: 'GET'
  };

  https.request(httpOptions, function(serviceResponse) {
    let body = [];

    serviceResponse.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      callback(JSON.parse(body));
    });
  }).end();

};

const requireHttp = (callback) => {
  const http = require('http');

  callback(http.request());
};

module.exports = {
  getPositions: getPositions,
  requireHttp: requireHttp
};