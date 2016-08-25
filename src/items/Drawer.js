'use strict';
const Item = require('../Item');

class Drawer extends Item {
  constructor () {
    super('Drawer', 'A scuffed drawer, not much use without a cupboard.', 2, 5, 3);

    this.on('consumeUse', remainingUses => {
      if (Math.random() < 0.25) {
        return;
      }

      console.log('The drawer breaks, but one stick looks sharp enough to wield.');
      const stick = new Item('Stick', 'Pointy shard of drawer.', 2, 1, 1);
      const room = this.getCurrentRoom();
      room.addItem(stick);
    });
  }
}

module.exports = Drawer;
