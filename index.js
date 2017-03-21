/**
 * Created by kamrink on 21/3/17.
 */
var dotenv = require('dotenv');
dotenv.load();

var Botkit = require('botkit');

var controller = Botkit.facebookbot({
    debug: true,
    log: true,
    access_token: process.env.page_token,
    verify_token: process.env.verify_token,
    app_secret: process.env.app_secret,
    validate_requests: true, // Refuse any requests that don't come from FB on your receive webhook, must provide FB_APP_SECRET in environment variables
    receive_via_postback: true,
});

var bot = controller.spawn({
});

// if you are already using Express, you can use your own server instance...
// see "Use BotKit with an Express web server"
controller.setupWebserver(process.env.port,function(err,webserver) {
    controller.createWebhookEndpoints(controller.webserver, bot, function() {
        console.log('This bot is online!!!');
    });
});

// this is triggered when a user clicks the send-to-messenger plugin
controller.on('facebook_optin', function(bot, message) {
    console.log("facebook_optin:" + message)
    bot.reply(message, 'Welcome to my app!');

});

// user said hello
controller.hears(['hello'], 'message_received', function(bot, message) {
    console.log("message_received :" + message)
    bot.reply(message, 'Hey there');

});

controller.hears(['cookies'], 'message_received', function(bot, message) {
    console.log("message_received :" + message)
    bot.startConversation(message, function(err, convo) {

        convo.say('Did someone say cookies!?!!');
        convo.ask('What is your favorite type of cookie?', function(response, convo) {
            convo.say('Golly, I love ' + response.text + ' too!!!');
            convo.next();
        });
    });
});


// On deliver
controller.hears('message_delivered', function(bot, message) {
    console.log("message_received :" + message)
    bot.reply(message, 'Hey there :)');

});