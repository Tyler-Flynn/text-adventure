'use strict';
const Inventory = require('./Inventory');

/** class containing the properties of the Player */
class Entity {
  constructor (currentRoom) {
    this.health = 100;
    this.inventory = new Inventory();

    this.currentRoom = currentRoom;
  }

  setHealth (health) {
    this.health = health;
  }
}
module.exports = Entity;
