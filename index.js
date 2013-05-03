var redis = require('redis')
var urlParse = require('url').parse

function parse(connStr) {
  var parsed = urlParse(connStr)

  return {
    auth: parsed.auth,
    host: parsed.hostname || 'localhost',
    port: parseInt(parsed.port || 6397, 10),
    db: parseInt(parsed.pathname.substr(1) || 0, 10)
  }
}

function redisc (connStr) {
  var conn = parse(connStr)


  var client = redis.createClient(conn.port, conn.host)
  if (conn.auth) {
    client.auth(conn.auth)
  }
  client.select(conn.db)
  return client
}

module.exports = redisc
module.exports.parse = parse