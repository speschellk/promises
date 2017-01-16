/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = (filePath, cb) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return cb(err, data);
    } else {
      data = data.toString().split('\n')[0];
      return cb(err, data);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = (url, cb) => {
  request.get(url, (err, res) => {
    if (err) {
      return cb(err, res);
    } else {
      return cb(err, res.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
