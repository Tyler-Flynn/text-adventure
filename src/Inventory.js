const inquirer = require('inquirer');

class Inventory {
  constructor () {
    this.items = [];
  }

  /**
   * @param {Item} item An object the player can pick up manipulate
   */
  addItem (item) {
    this.items.push(item);
  }

  removeItem (item) {
    let index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }

  doExamine () {
    // Build list of choices
    var choices = [];
    // Iterate through all available items in this rooms inventory
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      choices.push({
        name: item.name,
        value: item
      });
    }

    if (choices.length < 1) {
      console.log('You have nothing in your inventory.')
      return Promise.resolve();
    }

    // Return the new promise
    return inquirer.prompt([{
      type: 'list',
      name: 'userChoice',
      message: 'Examine what?',
      choices: choices
    }]).then((answers) => {
      return answers.userChoice.doExamine();
    });
  }
}

module.exports = Inventory;
