'use strict';
const Entity = require('./Entity');

class Enemy extends Entity {
  constructor (name, description, currentRoom) {
    super(name, currentRoom);
    this.setHealth(80);
    this.description = description;
  }
}

module.exports = Enemy;
