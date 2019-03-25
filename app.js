const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')
const weather = require('weather-js'); // Make sure you call the packages you install.


const prefix = '~'; 


client.on('message', message => {

    let usermessage = message.content;
    let usermsgsplit = usermessage.split("~tlumacz ")
    let msg = message.content.toUpperCase(); 
    let sender = message.author; 
    let cont = message.content.slice(prefix.length).split(" "); 
    let args = cont.slice(1); 
   
    if (msg.startsWith(prefix + 'TLUMACZ')) {
       axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate', {
    params: {
      key: "trnsl.1.1.20190323T113002Z.52045309b63e652e.2b242185e12585e83caeb18ced293be26b9aae31",
      text: message.content,
      lang: 'en'
    }
  }).then(res => {
    if (res.data.text[0] !== message.content) {
      let tranreply = res.data.text[0]; 
      message.reply("**" + tranreply + "**")
    }
  }) .catch(function onError(error) {
    console.log(error.data)
    message.reply(error.data)
  });
}
    if (msg.startsWith(prefix + 'KICK')) {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Nie mogę znaleźć tego użytkownika!");
    let kReason = args.join(" ").slice(22);
    
    const noreasonembed = new Discord.RichEmbed()
    .setDescription("**Error**")
    .setColor("#F20606")
    .addField("Brak powodu. Podaj powód.");
 
    
    if(!kReason) return message.channel.send(noreasonembed);
        
        

        //message.channel.send("Podaj powód");
                
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ta osoba nie moze zostac wyrzucona!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Wyrzucony użytkownik", `${kUser} z ID ${kUser.id}`)
    .addField("Wyrzucony przez", `<@${message.author.id}> z ID ${message.author.id}`)
    .addField("Wyrzucony w", message.channel)
    .addField("Kiedy", message.createdAt)
    .addField("Powód", kReason);

    let kickChannel = message.guild.channels.find(`name`, "bansandkicks");
    if(!kickChannel) return message.channel.send("Nie mogę znalezc kanalu banów i kicków.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
        
        
        
    }
    if (msg.startsWith(prefix +'BAN')) {
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Nie mogę znaleźć tego użytkownika!");
    let bReason = args.join(" ").slice(22);
    if(!bReason) return message.channel.send(noreasonembed)
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ta osoba nie może zostać zbanowana!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Zbanowany użytkownik", `${bUser} z ID ${bUser.id}`)
    .addField("Zbanowany przez", `<@${message.author.id}> z ID ${message.author.id}`)
    .addField("Zbanowany w", message.channel)
    .addField("Kiedy", message.createdAt)
    .addField("Powód", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "bansandkicks");
    if(!incidentchannel) return message.channel.send("Nie mogę znaleźć kanału banów i kicków.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
        
        
        
        
        
    }
  
  
    if (msg.startsWith(prefix + 'POGODA')) { 

        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { 
            if (err) message.channel.send('**Błąd: **' + err);
            
          
            if (result.length === 0) {
                message.channel.send('**Proszę podaj prawidłową lokalizację.**') 
                return; 
            } 
          //else if (isNaN(args[0])) {
              //  message.channel.send('**Proszę podaj argumenty.**'); //\n means new line.
                //return;
            //}

            var current = result[0].current; 
            var location = result[0].location; 

            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
                .setAuthor(`Pogoda dla ${current.observationpoint}`) // This shows the current location of the weather.
                .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
                .setColor(0x00AE86) // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
                .addField('Strefa Czasowa',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
                .addField('Degree Type',location.degreetype, true)// This is the field that shows the degree type, and is inline
                .addField('Temperatura',`${current.temperature} Degrees`, true)
                .addField('Wiatry',current.winddisplay, true)
                .addField('Wilgotność', `${current.humidity}%`, true)

                // Now, let's display it when called
                message.channel.send({embed});
        });
    }

});

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)





client.login("NTI1OTc2NDM0NjAzNDU4NTYw.D3ekWQ.or8Gt-nzakSm-3LNz1PM1YyAmYQ")
