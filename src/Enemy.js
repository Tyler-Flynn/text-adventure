// const Inventory = require('./Inventory');
const Entity = require('./Entity');
const Logger = require('./Logger');


class Enemy extends Entity {
  Enemy (name, description, currentRoom) {
    this.health = 150;
  }
  sethealth (health) {
    this.health = health;
  }
  setCurrentRoom (currentRoom) {
    this.room = currentRoom;
  }
  printDescription () {
    Logger.log(this.name);
    Logger.log('\t' + this.description);
  }

}

module.exports = Enemy;
