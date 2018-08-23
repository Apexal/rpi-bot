# RPI Bot

> RPI - Registered Personnel Identifier

A simple Discord bot for college servers to allow students to publicly share their name, graduation year, major, dorm, etc. (all optionally)

### Install

In order to keep your data private, its strongly recommended to host the bot yourself. You must have **NodeJS** and **SQLite** installed.

1. Clone this repository: `$ git clone git@github.com:Apexal/rpi-bot.git`
2. Install dependencies `$ npm install`
3. Create `config.json` based on `config_example.json`
4. Run the bot `$ node index.js`
5. **Add the bot to your server by going to the invite link the bot says on startup.**

If you don't want to/cannot and _you understand that I will be able to see all info saved_ you can add my hosted version to your server just by click [here](https://discordapp.com/api/oauth2/authorize?client_id=482050806934274048&scope=bot&permissions=67619904).

### Commands

_Default prefix is `!`_

- `!help` - Shows a list of commands. Use `!help <command>` for a description and example uses.
- `!who` - Shows a summary of a student with all given info.
- `!name` - Get/sets a user's real name.
- `!dorm` - Get/sets a user's dorm.
- `!major` - Get/sets a user's major
- `!grad` - Get/sets a user's graduation year _coming soon_

### Examples

![setting info](assets/example2.png)
![who command](assets/example.png)

### Contributing

Fork and submit pull requests! This is an ongoing project.
