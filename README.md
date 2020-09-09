# Hi and Welcome to the UnOfficial docs of telegraf api

## The bot that you see above has been created by me using node js and the telegraf api

### So let's get right into it :grin:

| Our Goals                                                                      |
| ------------------------------------------------------------------------------ |
| [ ] Being able to launch our bot                                               |
| [ ] Being able to fetch data from NASA's database                              |
| [ ] Being able to send media files                                             |
| [ ] Being able to add a subscribe command to receive updates from time to time |

#### In Cmd or Powershell type the following

```cmd
cd desktop\projects\
```

**You may also move to any other directory**

#### Then type

```cmd
mkdir bot
cd bot
```

**To make and get into the directory**

#### Type

```cmd
npm init
```

##### This makes a package.json file with the required module's dependencies

#### Just follow through the default options by pressing enter

#### Now in the folder you will see a new file i.e. package.json has appeared

#### We will now install the required packages

```cmd
npm i telegraf --save
npm i axios --save
npm i random -- save
```

**Tip:- In order for your bot to work correctly you must add the --save**

#### From here on you can use any code editor but I am going to use Visual Studio Code because it is the latest trend !!

```cmd
code .
```

##### This will open the VS code editor

### On the top left corner in VS code you can see that a new node modules folder has appeared leave it as it is for now and don't tamper with it

#### Now outside of the node_modules folder, in the same directory in whih the package.json and package-lock.json are present ,create a new javascript file named index.js (The name of the javascript file has to be index.js if you have accepted the default options)

#### In the index.js file do the following code

```javascript
const Telegraf = require("telegraf");
// Remember the Caps
const bot = new Telegraf("BOT_TOKEN");
```

## Now to get your BOT_Token you will need to Talk to Botfather in the telegram app itself there are a lot of tutorials online like [this one](https://www.youtube.com/watch?v=MZixi8oIdaA&ab_channel=MikhailPozdnyakov)

### To get our first bot program up and running do the following

```javascript
bot.start((ctx) => {
  ctx.reply("Hi, Humans !!");
});
bot.launch();
```

### Remember the ctx is a predefined variable and don't attempt to change it

#### Now to run your bot, in cmd do this

```cmd
node index.js
```

#### Tip:- In case of running node index.js there is no need to type it every singlr time, just press **Pg Dn** key and then Enter

### Now open up your telegram app and go to your bot, then type

```telegram
 /start
```

### and see your message

#### Now in case you are curious the **_bot_** is an object of class Telegraf so that means you can name it anything you want and not just bot like myStupidObject for instance
