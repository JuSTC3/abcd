const fetch = require("node-fetch");
var commands = require('./commands');
//var responseObject = require('./response');
//var robj = require('./res.json');

const fs = require('fs');
const fileName = './res.json';
const file = require(fileName);

const badm = async (message) => {
    aut=message.author;
    message.delete().catch(O_o=>{});
    return message.channel.send(`${aut} Bad Words Use ചെയ്യല്ലേ മോനുസെ⚠️ ⚔️😤⚔️!`);
};


const AImsg = async (client,message) => {
    var i=0;
    const msg=message.content.toLowerCase();
    if(file[msg]) {
        dmsg=file[msg];
        i=1;
    }
  
    message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
      if (message.content.includes(`@`)) {
         return message.channel.send(`**:x: Please dont mention anyone**`);
      }
      message.channel.startTyping();
      if (!message.content) return message.channel.send("Please say something.");
      fetch(`http://api.brainshop.ai/get?bid=153878&key=Xckr9jW6eTcjqHpt&uid=${client.user.username}&msg=${encodeURIComponent(message.content)}`)
            .then(res => res.json())
            .then(data => {
                if(i==0){
                    message.channel.send(`> ${message.content} \n <@${message.author.id}> ${data.cnt}`);
                }
                else{
                    message.channel.send(`> ${message.content} \n <@${message.author.id}> ${dmsg}`);
                }
          });
      message.channel.stopTyping();

};

const prefixc = async (prefix,message) => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if(command === 'say') {
        if(message.member.roles.cache.some(r=>["DEVELOPMENT TEAM", "ADMINISTRATOR", "ORGANIZER"].includes(r.name)) ) {
           commands.say(args,message);
        }
	    else{
	       return message.channel.send(`**:x: You have No Permission**`);
	    }
    }
};

const add = async (message) => {
    const new_msg=message.content;
    flag=0;
    req_msg='';
    res_msg='';
    for(i=0;i<new_msg.length;i++){
        if(new_msg[i]==',')
        {
            flag=1;
            continue;
        }

        if(flag==0){
            cc=new_msg[i];
            req_msg=req_msg+cc;
        }
        else{
            cc=new_msg[i];
            res_msg=res_msg+cc;
        }
    }

    if(file[req_msg.toLowerCase()]){
        return message.channel.send(`**:x: Existed**`);
    }
    else{
        file[req_msg.toLowerCase()] = res_msg;
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
            message.channel.send(`**:white_check_mark: Added**`);
            //console.log(JSON.stringify(file));
            //console.log('writing to ' + fileName);
        });
    }
    
};


module.exports = {
    AImsg,
    badm,
    prefixc,
    add
};
