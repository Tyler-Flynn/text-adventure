/** Class giving the base properties of a room. */
class Room {
	/**
	 * @param {string} description - A description of an object
	 * @param {Inventory} inventory - The interactive contents of a room
	 */
  constructor (description, inventory) {
    this.description = description;
    this.inventory = inventory;
  }
}

module.exports = Room;
