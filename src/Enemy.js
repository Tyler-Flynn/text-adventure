// const Inventory = require('./Inventory');
const Entity = require('./Entity');


class Enemy extends Entity {
  Enemy (name, description, currentRoom) {
    this.health = 150;
  }
  sethealth (health) {
    this.health = health;
  }

}

module.exports = Enemy;
// LET ME COMMIT