var urlParse = require('url').parse

function parse(connStr) {
  var parsed = urlParse(connStr)

  return {
    auth: parsed.auth,
    host: parsed.hostname || 'localhost',
    port: parseInt(parsed.port || 6379, 10),
    db: parseInt(parsed.pathname && parsed.pathname.substr(1) || 0, 10)
  }
}

function redisc (connStr, redis) {
  redis = redis || require('redis')
  var conn = parse(connStr)
  console.log('conning', conn)

  var client = redis.createClient(conn.port, conn.host)
  if (conn.auth) {
    console.log('authing', conn.auth)
    client.auth(conn.auth)
  }
  client.select(conn.db)
  return client
}

module.exports = redisc
module.exports.parse = parse