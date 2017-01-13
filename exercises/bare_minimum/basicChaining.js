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


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(readFilePath, function(err, username) {
      if (err) {
        reject(err);
      } else {
        username = username.toString().split('\n')[0];
        resolve(username);
      }
    });
  });
};

fetchProfileAndWriteToFile('./test/files/github_handle.txt', './test/files/file_to_write_to.txt')
.then(function(username) {
  return new Promise(function(resolve, reject) {
    var options = {
      url: 'https://api.github.com/users/' + username,
      headers: { 'User-Agent': 'request' },
      json: true  // will JSON.parse(body) for us
    };

    request.get(options, function(err, res, body) {
      if (err) {
        reject(err);
      } else if (body.message) {
        reject(new Error('Failed to get GitHub profile: ' + body.message));
      } else {
        resolve(body);
      }
    });
  });
})
.catch(function(err) {
  console.log('error getting data', err);
})
.then(function(body) {
  return new Promise(function(resolve, reject) {
    fs.writeFile('./test/files/file_to_write_to.txt', body, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
})
.catch(function(err) {
  console.log('error getting data', err);
})
.then(function() {
  console.log('yay');
}, function() {
  console.log('wee');
});

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
