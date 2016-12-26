var builder = require('botbuilder');
var restify = require('restify');

//create the connector
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//create the bot 
var bot = new builder.UniversalBot(connector);
//sss
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function (){
    console.log('%s listening to %s', server.name, server.url);
});


server.post('/api/messages', connector.listen());

//add in the dialog
//bot.dialog('/', function(session){
//    session.send('sveki, robot!');
//   session.send('un ko tagad tu gribi?');

//    var userMessage = session.message.text;
//    session.send(userMessage);
//});

bot.dialog('/', [
    function(session){
        
        builder.Prompts.text(session,'Sāksim?');
    },
    function(session){
        session.beginDialog('/profi', session.userData.profils);
    },
    function(session, result){
        session.send('pēc visa tā, ');
        
    }   
]);
bot.dialog('/profi',[
        function(session, args, next){
            session.send('nostrādāja');
            next();
    },
    function(session){
        builder.Prompts.choice(session, "kada krāsa",["sarkana","zala","balta"]);

    },
    function(session){
        session.endDialogWithResult({ response: session.dialogData.profils});
    }
        
]);    
