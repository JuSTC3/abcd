const say = async (args,message) => {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);  
};



module.exports = {
    say
};
