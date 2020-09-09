let isSubscribed;
let geoUrl = "https://www.iplocate.io/api/lookup/";
let apodUrl =
  "https://api.nasa.gov/planetary/apod?api_key=KYHiC6OaqSTMJjQPuywA6CtbWKjQt7JzYiGDZX5m&hd=true";
let roverUrl =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=KYHiC6OaqSTMJjQPuywA6CtbWKjQt7JzYiGDZX5m";
const { default: Telegraf, Context } = require("telegraf");

const axios = require("axios");

const random = require("random");
const bot = new Telegraf("BOT_TOKEN");

console.log("Everything W0rks!!!");
bot.start((ctx) => {
  ctx.reply(`Hi I am your Nasa Data Fetching Bot!!
Press /help to know more!!!`);
});
bot.help((ctx) => {
  ctx.reply(`I have been developed by Parag Jyoti Pal and I can do a number of things
  1. I can send you Mars Rover Pics from NASA's Database
  2. I can send you NASA's Satellite Imagery
  3. I can send You APOD (Astronomy Pictures of the Day)
  Click on /subscribe to get 2 Rover pics, 1 APOD and 1 satellite imagery
  delivered everyday(automaticaly)`);
});

bot.command("subscribe", (ctx) => {
  ctx.replyWithHTML(
    `<b>You Subscibed</b> You will recieve stuff 24 hours from now 😉
     Tap /unsubscribe to end subscription anytime you like`
  );
  isSubscribed = true;

  setInterval(() => {
    if (isSubscribed == true) {
      try {
        // gets rover pics
        getRover().then((result) => {
          ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo");
          ctx.telegram.sendPhoto(ctx.chat.id, result[0], {
            reply_to_message_id: ctx.message.message_id,
          });
          ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo");

          ctx.telegram.sendPhoto(ctx.chat.id, result[1], {
            reply_to_message_id: ctx.message.message_id,
          });
        });
        // gets apod
        getApod().then((result) => {
          if (result[0] == "video") {
            ctx.reply(result[2]);

            ctx.reply(`Explanation:-  ${result[1]}`);
          } else {
            ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo");
            ctx.telegram.sendPhoto(ctx.chat.id, result[2], {
              reply_to_message_id: ctx.message.message_id,
            });
            ctx.reply(`Explanation ${result[1]}`);
          }
        });
        // gets geoLocation
        getGeo().then((result) => {
          console.log(`Latitude= ${result[0]}
          Longitude= ${result[1]}`);
          let localGeo = `https://api.nasa.gov/planetary/earth/imagery?lon=${result[1]}lat=${result[0]}&date=2018-01-01&dim=0.15&api_key=KYHiC6OaqSTMJjQPuywA6CtbWKjQt7JzYiGDZX5m`;
          console.log(localGeo);
          ctx.reply(localGeo);
        });
        // for try
      } catch (error) {
        ctx.reply(error.message);
        ctx.reply("Maybe Your network is weak");
        //for catch
      }

      // for if block
    }
    // for set interval
  }, 24 * 3600 * 1000);

  //no touching
});
bot.command("unsubscribe", (ctx) => {
  ctx.replyWithHTML("<b>You Unsubscibed</b>");
  isSubscribed = false;
});
/////// THE FUNCTIONS \\\\\\\\\\\
async function getRover() {
  let response = await axios.get(roverUrl);
  let max = Object.keys(response.data.photos).length;

  let img1 = response.data.photos[random.int(0, max)].img_src;
  let img2 = response.data.photos[random.int(0, max - 1)].img_src;
  let img = [img1, img2];
  return img;
}
async function getApod() {
  let response = await axios.get(apodUrl);
  let mediaType = response.data.media_type;
  let exp = response.data.explanation;
  let myUrl = response.data.url;
  let apod = [mediaType, exp, myUrl];
  console.log(apod[0]);
  return apod;
}
async function getGeo() {
  let response = await axios.get(geoUrl);
  let lat = response.data.latitude;
  let lon = response.data.longitude;
  let coords = [lat, lon];
  return coords;
}

// No touching

 bot.launch();

