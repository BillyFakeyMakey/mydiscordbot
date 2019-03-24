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
