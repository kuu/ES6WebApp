var express = require('express'),
    app = express();

/**
 * Initialize Express middleware stack.
 */
app.use(express.static(__dirname + '/dist'));

/**
 * Start server.
 */
function start(){
  var port = process.env.PORT || 3030;
  var server = app.listen(port);
  console.log("server pid %s listening on port %s in %s mode",
    process.pid,
    port,
    app.get('env')
  );
  return server;
}

/**
 * Only start server if this script is executed, not if it's require()'d.
 * This makes it easier to run integration tests on ephemeral ports.
 */
if (require.main === module) {
  start();
}

exports.app = app;
