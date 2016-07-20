var Inventory = require('./Inventory');

/** class containing the properties of the Player */
class Player {
  constructor () {
    /**
     * @type {Number}
     */
    this.health = 100;
    /**
     * The contents of the user's backpack
     * @type {Inventory}
     */
    this.inventory = new Inventory();
  }

  /**
   * @param {number} health - The amount of health them player has left
   */
  setHealth (health) {
    this.health = health;
  }

  /**
   * @param {*} move Action of moving the user from one connected node to aonther
   */
  move () {
  }
}

module.exports = Player;

