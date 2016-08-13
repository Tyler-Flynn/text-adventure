const Logger = require('./Logger');
const Inventory = require('./Inventory');
const Enemy = require('./Enemy');
/** Class giving the base properties of a room. */
class Room {
	/**
	 * @param {string} description - A description of an object
	 * @param {Inventory} inventory - The interactive contents of a room
	 */
  constructor (game, name, description) {
    this.game = game;
    this.name = name;
    this.description = description;
    this.inventory = new Inventory();
    this.connectedRooms = {};
    this.enemy = new Enemy(description);
  }

  addItem (item) {
    this.inventory.addItem(item);
  }
  addEnemy (enemy) {
    this.currentRoom.addEnemy(enemy);
  }

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

  printDescription () {
    Logger.log(this.name);
    Logger.log('\t' + this.description);
    Logger.log('\tYou can go: ' + Object.keys(this.connectedRooms));

    let entities = this.game.entityManager.entitiesInRoom(this);
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].description) {
        Logger.log('\n' + entities[i].description);
      }
    }
  }

  doExamine () {
    return this.inventory.doExamine();
  }
}

module.exports = Room;
