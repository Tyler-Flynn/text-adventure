/** Class representing the base properties of items found in the game*/
class Item {
	/**
	* Create an item
	* @param {string} name - An object that the user can interact with within the game
	* @param {string} description - A description of an item
  * @param {number} damage - How much damage this item can do to a character
	*/
  constructor (name, description, damage) {
    this.name = name;
    this.description = description;
    this.damage = damage;

    this.inventory = null;
  }

  /**
   * @param {Inventory} inv
   */
  setInventory (inv) {
    this.inventory = inv;
  }
}

module.exports = Item;


// var backpack = new Item(...);
// backpack.setInventory(new Inventory());
// backpack.inventory.addItem(myItem);


// console.log(myItem) // -> "Item ( name: 'dagger' )"
// console.log(backpack.inventory) // -> "Inventory ( ... )"
// console.log(backpack.inventory.addItem) // -> "function {...}"
// console.log(backpack.inventory.items[0]) // -> "Item ( name: 'dagger' )"
