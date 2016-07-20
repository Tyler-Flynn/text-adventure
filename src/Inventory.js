class Inventory {
  constructor () {
    this.items = [];
  }

  /**
   * @param {Item} item An object the player can pick up manipulate
   */
  addItem (item) {
    this.items.push(item);
  }
}

module.exports = Inventory;
