/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');

Promise.promisifyAll(fs);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise(function(resolve, reject) {
    fs.readFileAsync(readFilePath, function(err, data) {
      // if (err) {
      //   reject(err);
      // } else {
      //   data = data.toString().split('\n')[0];
      //   resolve(data);
      // }
    })
    .then(function(data) {
      var options = {
        url: 'https://api.github.com/users/' + data.toString().split('\n')[0],
        headers: { 'User-Agent': 'request' },
        json: true  // will JSON.parse(body) for us
      };
      request.get(options, function(err, res, body) {
        if (err) {
          console.log(err);
        } else if (body.message) {
          console.log('Failed to get GitHub profile: ' + body.message);
        } else {
          return (body);
        }
      });
    })
    .then(function(body) {
      fs.writeFileAsync(writeFilePath, body);
    })
    .catch(function(err) {
      console.log(err);
    });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
