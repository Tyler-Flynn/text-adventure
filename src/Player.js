'use strict';
// const Inventory = require('./Inventory');
const Logger = require('./Logger');
const Entity = require('./Entity');

/** class containing the properties of the Player */
class Player extends Entity {
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

