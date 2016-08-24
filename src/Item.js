'use strict';
const EventEmitter = require('events');

const inquirer = require('inquirer');

const Logger = require('./Logger');
const Inventory = require('./Inventory');

/** Class representing the base properties of items found in the game*/
class Item extends EventEmitter {
	/**
	* Create an item
	* @param {string} name - An object that the user can interact with within the game
	* @param {string} description - A description of an item
  * @param {number} damage - How much damage this item can do to a character
	*/
  constructor (name, description, damage, weight, uses) {
    super();
    this.name = name;
    this.description = description;
    this.damage = damage || 0;
    this.weight = weight || 1;
    this.uses = uses || 1;

    this.accuracy = 0.8;

    this.inventory = null;
    this.parentInventory = null;
  }

  addInventory () {
    if (this.inventory) {
      throw new Error('This item already has an inventory')
    }
    this.inventory = new Inventory(this);
  }

  removeFromParentInventory () {
    if (this.parentInventory) {
      this.parentInventory.removeItem(this);
    }
  }

  getCurrentRoom () {
    if (!this.parentInventory) {
      return null;
    }
    return this.parentInventory.getCurrentRoom();
  }

  consumeUse (showLogs) {
    this.uses--;
    this.emit('consumeUse', this.uses);
    if (this.uses === 0) {
      this.removeFromParentInventory();
      if (showLogs) {
        Logger.log('The ' + this.name + ' runs out of uses, crumbling into a pile of rubble.');
      }
    }
  }

  getDamage () {
    return this.damage;
  }

  getAccuracy () {
    return this.accuracy;
  }

  printDescription () {
    Logger.log('Item: {ITEM:' + this.name + '}');
    Logger.log('\t' + this.description);
    Logger.log('\tWeight: ' + this.weight + '\tDamage: ' + this.damage + '\tUses: ' + this.uses);
  }

  doExamine (player) {
    // Build list of choices
    const choices = [];

    if (player.inventory.hasItem(this)) {
      choices.push({
        name: 'Drop',
        value: {
          action: 'DROP'
        }
      });
    } else {
      choices.push({
        name: 'Take',
        value: {
          action: 'TAKE'
        }
      });
    }

    if (this.inventory && this.inventory.items.length > 0) {
      choices.push({
        name: 'Look inside',
        value: {
          action: 'LOOK_INSIDE'
        }
      });
    }

    choices.push({
      name: 'Nothing',
      value: {
        action: 'LEAVE'
      }
    });

    // Display item stats
    this.printDescription();

    // Return the new promise
    return inquirer.prompt([{
      type: 'list',
      name: 'userChoice',
      message: 'Do what with the item?',
      choices: choices
    }]).then((answers) => {
      // console.log(answers);
      console.log('');
      // Run the game logic
      if (answers.userChoice.action === 'TAKE') {
        // Move item from current inventory to player inventory
        this.removeFromParentInventory();
        player.inventory.addItem(this);
      } else if (answers.userChoice.action === 'DROP') {
        this.removeFromParentInventory();
        player.currentRoom.inventory.addItem(this);
      } else if (answers.userChoice.action === 'LOOK_INSIDE') {
        return this.inventory.doExamine(player);
      } else if (answers.userChoice.action === 'LEAVE') {
        return;
      } else {
        console.log('unhandled action', answers.userChoice);
      }
    });
  }
}

module.exports = Item;


// var backpack = new Item(...);
// backpack.setInventory(new Inventory());
// backpack.inventory.addItem(myItem);


// console.log(myItem) // -> "Item ( name: 'dagger' )"
// console.log(backpack.inventory) // -> "Inventory ( ... )"
// console.log(backpack.inventory.addItem) // -> "function {...}"
// console.log(backpack.inventory.items[0]) // -> "Item ( name: 'dagger' )"
