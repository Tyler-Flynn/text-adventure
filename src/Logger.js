const chalk = require('chalk');
const wordwrap = require('wordwrap');

class Logger {
  constructor () {
    this.wrap = wordwrap(process.stdout.columns);

    this.colorMap = {
      ITEM: function (s) {
        return chalk.blue(s);
      },
      DIRECTION: function (s) {
        return chalk.green(s);
      },
      ENEMY: function (s) {
        return chalk.red(s);
      }
    };
  }

  log (message) {
    // let re = new RegExp('{(\\w+?):(\\w+?)}', 'g');
    let re = new RegExp('{(\\w+?):([^}]+?)}', 'g');

    let i = 0;
    while (true) {
      let match = re.exec(message);
      // If there are no matches, stop checking
      if (!match) {
        break;
      }

      let rawMatch = match[0];
      let keyword = match[1];
      let id = match[2];

      // Everything before the match
      let newMessage = message.substring(0, match.index);
      // What to replace it with
      let colorFunction = this.colorMap[keyword];
      if (colorFunction) {
        newMessage += colorFunction(id);
      } else {
        newMessage += id;
      }
      // Everything after the match
      newMessage += message.substring(match.index + rawMatch.length);

      // Make message in to the new one that we just built
      message = newMessage;

      // Too many tries to replace things
      if (i++ > 100) {
        console.warn('message:', message);
        throw new Error('Max replace depth exceeded');
      }
    }

    // Log the new message
    console.log(this.wrap(message));
  }
}

module.exports = new Logger();

