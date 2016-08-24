'use strict';
const inquirer = require('inquirer');
const Logger = require('./Logger');
const Inventory = require('./Inventory');

/** Class representing the base properties of items found in the game*/
class Item {
	/**
	* Create an item
	* @param {string} name - An object that the user can interact with within the game
	* @param {string} description - A description of an item
  * @param {number} damage - How much damage this item can do to a character
	*/
  constructor (name, description, damage, weight, uses) {
    this.name = name;
    this.description = description;
    this.damage = damage;
    this.weight = weight;
    this.uses = uses;

    this.inventory = null;
  }

  addInventory () {
    if (this.inventory) {
      throw new Error('This item already has an inventory')
    }
    this.inventory = new Inventory();
  }

  printDescription () {
    Logger.log('Item: {ITEM:' + this.name + '}');
    Logger.log('\t' + this.description);
    Logger.log('\tWeight: ' + this.weight + '\tDamage: ' + this.damage + '\tUses: ' + this.uses);
  }

  doExamine () {
    // Build list of choices
    var choices = [
      {
        name: 'Take',
        value: {
          action: 'TAKE'
        }
      },
      {
        name: 'Leave',
        value: {
          action: 'LEAVE'
        }
      }
    ];

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
        //
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
