// const Inventory = require('./Inventory');
const Entity = require('./Entity');
// const Inquirer = require('./Inquirer');
// const Room = require('./Room');
const Logger = require('./Logger');

class Enemy extends Entity {
  constructor (name, description, currentRoom) {
    super(currentRoom);
    this.health = 150;
    this.description = description;
    this.name = name;
  }
  setHealth (health) {
    this.health = health;
  }
  setRoom (currentRoom) {
    this.room = currentRoom;
  }

}

module.exports = Enemy;
