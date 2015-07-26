var helper = require(__dirname + '/../test-helper');

helper.pg.defaults.poolIdleTimeout = 1000;

helper.pg.connect(helper.config, function(err,client) {
  client.query("SELECT pg_backend_pid()", function(err, result) {
    var pid = result.rows[0].pg_backend_pid;
    client.query('SELECT pg_terminate_backend('+pid+')', assert.calls(function (err, result) {
      //assert.isNull(error);
    }));
  });
});

helper.pg.on('error', function(err, client) {
  assert.ifError(err);
});
