class EntityManager {
  constructor () {
    this.entities = []
  }
  addEntity (entity) {
    this.entities.push(entity);
  }
}

module.exports = EntityManager;
