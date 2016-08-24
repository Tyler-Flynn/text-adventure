'use strict';
const inquirer = require('inquirer');


class Inventory {
  constructor (parent) {
    this.parent = parent;

    this.items = [];
  }

  getCurrentRoom () {
    if (!this.parent) {
      return null;
    }
    return this.parent.getCurrentRoom();
  }

  /**
   * @param {Item} item An object the player can pick up manipulate
   */
  addItem (item) {
    if (item.parentInventory) {
      throw new Error('Item already has parentInventory');
    }
    item.parentInventory = this;
    this.items.push(item);
  }

  removeItem (item) {
    let index = this.items.indexOf(item);
    if (index >= 0) {
      let item = this.items[index];
      this.items.splice(index, 1);
      item.parentInventory = null;
    }
  }

  hasItem (item) {
    return this.items.indexOf(item) >= 0;
  }

  selectItem (message) {
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
      return Promise.resolve(null);
    }

    // Return the new promise
    return inquirer.prompt([{
      type: 'list',
      name: 'userChoice',
      message: message,
      choices: choices
    }]).then((answers) => {
      return answers.userChoice;
    });
  }

  doExamine (player) {
    return this.selectItem('Examine what?').then(item => {
      return item.doExamine(player);
    });
  }
}

module.exports = Inventory;
