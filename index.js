const Discord = require('discord.js');
const client = new Discord.Client();
client.function = require('./function');
var badWords = require('./badwords');
const prefix = '!';


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('BPRP', {type: 'WATCHING'});
});

client.on('message', async message => {
   if (message.author.bot) return;
   const msg=message.content.toLowerCase();

   var bwords = msg.trim().match(/\w+|\s+|[^\s\w]+/g);
   var containsBadWord = bwords.some(word => {
      return badWords.includes(word);
   });


   if (containsBadWord) {
    client.function.badm(message);
   }

   else if(message.content.startsWith(prefix)){
      client.function.prefixc(prefix,message);
   }

   else if ((message.channel.name == "chat")||(message.content.startsWith('.'))){
      client.function.AImsg(client,message);
   }

   else if(message.channel.name == "test"){
      client.function.add(message);
   }
    
});

client.login("Nzg2NTczMzE1OTY3NjgwNTcy.X9IXfA.nwYuSyMo8bLS-kSEwWuUMtf44Is");

