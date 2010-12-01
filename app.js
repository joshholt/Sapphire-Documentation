/*globals __dirname*/
/**
 * Module dependencies.
 */
var Connect = require('connect'), app;

app = Connect.createServer(
 Connect.logger(),
 Connect.conditionalGet(),
 Connect.favicon(),
 Connect.cache(),
 Connect.gzip(),
 require('wheat')(__dirname)
);

module.exports = app;

// // Only listen on $ node app.js
// 
// if (!module.parent) {
  app.listen(3000);
  console.log("Connect server listening on port %d", app.address().port);
// }