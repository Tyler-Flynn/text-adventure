'use strict';
const fs = require('fs');
const path = require('path');

const inquirer = require('inquirer');

const Logger = require('./Logger');
const Inventory = require('./Inventory');


/** Class giving the base properties of a room. */
class Room {
	/**
	 * @param {string} description - A description of an object
	 * @param {Inventory} inventory - The interactive contents of a room
	 */
  constructor (game, name, description) {
    this.game = game;
    this.name = name;
    this.inventory = new Inventory();
    this.connectedRooms = {};

    this.setDescription(description);
  }

  setDescription (description) {
    if (description.startsWith('file:')) {
      // Remove the 'file:'
      let descPath = description.substring(5);
      // Make it relative to project/src
      descPath = path.resolve(__dirname, descPath);
      // Actually load the file contents
      let contents = fs.readFileSync(descPath, 'utf8');
      this.description = contents;
    } else {
      this.description = description;
    }
  }

  addItem (item) {
    this.inventory.addItem(item);
  }
  // addEnemy (enemy) {
  //   this.currentRoom.addEnemy(enemy);
  // }

  connect (keyword, otherRoom) {
    // Connect this room -> other room
    this.connectedRooms[keyword] = otherRoom;
    // Reverse the keyword
    let oppositeKeyword;
    if (keyword === 'NORTH') {
      oppositeKeyword = 'SOUTH';
    } else if (keyword === 'EAST') {
      oppositeKeyword = 'WEST';
    } else if (keyword === 'SOUTH') {
      oppositeKeyword = 'NORTH';
    } else if (keyword === 'WEST') {
      oppositeKeyword = 'EAST';
    } else {
      throw new Error('Unknown direction keyword: ' + keyword);
    }
    // Connect other room -> this room
    otherRoom.connectedRooms[oppositeKeyword] = this;
  }

  addChoices (choices) {
    // Interact with room
    choices.push({
      name: 'Examine',
      value: {
        action: 'EXAMINE'
      }
    });
    // Movement
    choices.push({
      name: 'Go North',
      value: {
        action: 'MOVE',
        direction: 'NORTH'
      }
    });
    choices.push({
      name: 'Go East',
      value: {
        action: 'MOVE',
        direction: 'EAST'
      }
    });
    choices.push({
      name: 'Go South',
      value: {
        action: 'MOVE',
        direction: 'SOUTH'
      }
    });
    choices.push({
      name: 'Go West',
      value: {
        action: 'MOVE',
        direction: 'WEST'
      }
    });

    const entitiesInSelf = this.game.entityManager.entitiesInRoom(this);
    if (entitiesInSelf.length > 0) {
      choices.push({
        name: 'Fight',
        value: {
          action: 'FIGHT'
        }
      });
    }
  }

  printDescription () {
    // process.stdout.write('\u001B[2J\u001B[0;0f');

    // Print this rooom information
    Logger.log(this.name);
    Logger.log('\t' + this.description);
    // Print Entities in Room
    let entities = this.game.entityManager.entitiesInRoom(this)
    if (entities.length === 0) {
      Logger.log('You are alone in the room.')
    } else {
      Logger.log('You are not alone in the room...')
      for (let i = 0; i < entities.length; i++) {
        Logger.log('\t' + entities[i].name);
        if (entities[i].description) {
          Logger.log('\t\t' + entities[i].description);
        }
      }
    }
    // Displays the directions you can access from the curren room
    Logger.log('You can go: ' + Object.keys(this.connectedRooms));
  }

  doExamine (player) {
    return this.inventory.doExamine(player);
  }

  doFight (player) {
    const entitiesInSelf = this.game.entityManager.entitiesInRoom(this);
    const choices = [];
    entitiesInSelf.forEach(entity => {
      choices.push({
        name: entity.name,
        value: entity
      });
    });

    return inquirer.prompt([{
      type: 'list',
      name: 'userChoice',
      message: 'Fight what?',
      choices: choices
    }]).then((answers) => {
      return answers.userChoice.doFight(player);
    });
  }
}

module.exports = Room;
