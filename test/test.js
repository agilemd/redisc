var chai = require('chai')
chai.should()
var sinon = require('sinon')
chai.use(require('sinon-chai'))
var moquire = require('moquire')


describe('redisc', function () {
  var redisc = require('../')
  
  it('interface', function () {
    redisc.should.be.a('function')
    redisc.parse.should.be.a('function')
  })

  it('authenticates if auth is defined in the conn str', function () {
    var mockClient = {
      auth: sinon.spy(),
      select: sinon.spy()
    }
    var mockRedis = {
      createClient: function () { return mockClient }
    }
    var redisc = moquire('../', {redis: mockRedis})

    redisc('redis://blah@rewwer:10/0')
    mockClient.auth.should.have.been.calledWithExactly('blah')
  })

  describe('parse', function () {
    it('parsed connection strings', function () {
      var parsed = redisc.parse('redis://servar:23/6')

      parsed.should.deep.equal({
        auth: undefined,
        host: 'servar',
        port: 23,
        db: 6
      })
    })

    it('defaults the port to the redis default port (6379)', function () {
      var parsed = redisc.parse('redis://localhost/')
      parsed.port.should.equal(6379)
    })

    it('defaults to db 0 if no db is defined', function () {
      var parsed = redisc.parse('redis://localhost')
      parsed.db.should.equal(0)
    })
  })
})