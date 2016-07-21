const Logger = require('./Logger');


/** Class giving the base properties of a room. */
class Room {
	/**
	 * @param {string} description - A description of an object
	 * @param {Inventory} inventory - The interactive contents of a room
	 */
  constructor (name, description, inventory) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.connectedRooms = {};
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
    Logger.log(this.description);
    Logger.log('You can go: ' + Object.keys(this.connectedRooms));
  }
}

module.exports = Room;
