'use strict';
const Entity = require('./Entity');

class EntityManager {
  constructor () {
    this.entities = [];
  }
  addEntity (entity) {
    this.entities.push(entity);
  }
  entitiesInRoom (room) {
    var result = [];
    for (var i = 0; i < this.entities.length; i++) {
      if (this.entities[i].currentRoom === room) {
        if (this.entities[i] instanceof Entity) {
          result.push(this.entities[i]);
        }
      }
    }
    return (result);
  }
}

module.exports = EntityManager;
