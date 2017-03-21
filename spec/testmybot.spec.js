describe('TestMyBot Sample Conversation Test Suite', function() {
  var bot = require('testmybot');

  beforeAll(function(done) {
    bot.beforeAll().then(done);
  }, 120000);

  beforeEach(function(done) {
    bot.beforeEach().then(done);
  }, 60000);

  afterEach(function(done) {
    bot.afterEach().then(done);
  }, 60000);

  afterAll(function(done) {
    bot.afterAll().then(done);
  }, 60000);

  it('should answer to hello', function(done) {
    bot.hears('hello');

    bot.says().then((msg) => {
      expect(msg.messageText).toMatch(/echo/);
      done();
    }).catch((err) => {
        throw new Error(err);
    });
  });

});