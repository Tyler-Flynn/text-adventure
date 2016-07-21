const Inventory = require('./Inventory');
const Logger = require('./Logger');

/** class containing the properties of the Player */
class Player {
  constructor (startRoom) {
    /**
     * @type {Number}
     */
    this.health = 100;
    /**
     * The contents of the user's backpack
     * @type {Inventory}
     */
    this.inventory = new Inventory();

    this.currentRoom = startRoom;
  }

  /**
   * @param {number} health - The amount of health them player has left
   */
  setHealth (health) {
    this.health = health;
  }

  /**
   * @param {String} direction - move Action of moving the user from one connected node to aonther
   */
  move (direction) {
    // Find the connected room in the specified direction
    let destinationRoom = this.currentRoom.connectedRooms[direction];

    if (destinationRoom) {
      Logger.log('You are moving in the direction of: ' + direction);
      // Set the current room to the connected room
      this.currentRoom = destinationRoom;
    } else {
      Logger.log('There is no way to move ' + direction + ' right now.');
    }
  }
}
module.exports = Player;

