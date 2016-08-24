'use strict';
const Promise = require('bluebird');
const Inventory = require('./Inventory');
const Logger = require('./Logger');

/** class containing the properties of the Player */
class Entity {
  constructor (name, currentRoom) {
    this.name = name;
    this.setHealth(100);
    this.inventory = new Inventory(this);

    this.currentRoom = currentRoom;

    this.strength = 1;
  }

  getCurrentRoom () {
    return this.currentRoom;
  }

  setHealth (health) {
    this.health = health;
    this.maxHealth = health;
  }

  hurt (attacker, amount) {
    Logger.log(this.name + ' hurt for ' + amount + ' damage by ' + attacker.name);

    this.health -= amount;
    if (this.health < 0) {
      this.health = 0;
    }

    Logger.log('\t' + this.name + ' remaining health: ' + this.health);
  }

  heal (healer, amount) {
    this.health += amount;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  }

  isAlive () {
    return this.health > 0;
  }

  getDamageWithItem (item, showLogs) {
    if (item) {
      const itemDamage = item.getDamage();
      const addDamage = this.strength;  // TODO: something cooler
      if (showLogs) {
        Logger.log(this.name + ' wields ' + item.name + ', their strength adding ' + addDamage + ' damage');
      }
      return itemDamage + addDamage;
    } else {
      if (showLogs) {
        Logger.log(this.name + ' wields their bare knuckles, their strength mustering ' + this.strength + ' damage');
      }
      return this.strength;
    }
  }

  getAccuracyWithItem (item) {
    if (item) {
      return item.getAccuracy();
    } else {
      return 0.5;
    }
  }

  doFight (player) {
    Logger.log('Fight started between player and: ' + this.name);

    // A single back and forth.  Returns a promise, that resolves to null until fight is complete (one party dies)
    const fightTurn = () => {
      return player.inventory.selectItem('Attack with what?').then(playerItem => {
        // Player's attack
        const playerDamage = player.getDamageWithItem(playerItem, true);
        Logger.log('');
        // Accuracy
        const playerAccuracy = player.getAccuracyWithItem(playerItem);
        if (Math.random() > playerAccuracy) {
          Logger.log('\t' + player.name + ' swings and misses, dealing no damage.');
        } else {
          if (playerItem) {
            playerItem.consumeUse(true);
          }
          this.hurt(player, playerDamage);
          if (!this.isAlive()) {
            return 'PLAYER_WIN';
          }
        }

        Logger.log('');

        // Entity attack
        // TODO: Select strongest item from entity inventory automatically
        const entityItem = null;
        const entityDamage = this.getDamageWithItem(entityItem, true);
        Logger.log('');
        // Accuracy
        const entityAccuracy = this.getAccuracyWithItem(entityItem);
        if (Math.random() > entityAccuracy) {
          Logger.log('\t' + this.name + ' swings and misses, dealing no damage.');
        } else {
          if (entityItem) {
            entityItem.consumeUse(true);
          }
          player.hurt(this, entityDamage);
          if (!player.isAlive()) {
            return 'PLAYER_LOSE';
          }
        }

        // Do it again!
        Logger.log('\nYou catch your breath.\n');
        return null;
      });
    };

    return new Promise((resolve, reject) => {
      const fightLoop = () => {
        return fightTurn().then(result => {
          if (result) {
            resolve(result);
          } else {
            setTimeout(() => {
              fightLoop();
            }, 1000);
          }
        });
      };
      fightLoop();
    });
  }
}
module.exports = Entity;
