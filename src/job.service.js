const https = require('https');

const getPositions = (description, city, callback) => {
  let httpOptions = {
    host: 'jobs.github.com',
    path: '/positions.json?description=' + description + '&location=' + city,
    method: 'GET'
  };

  https.request(httpOptions, function(response) {
    response.on('data', function (chunk) {
      callback(JSON.parse(chunk));
    });
  }).end();

};

module.exports = {
  getPositions: getPositions
};