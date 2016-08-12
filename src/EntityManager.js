class EntityManager {
  constructor () {
    this.entities = []
  }
  addEntity (entity) {
    this.entities.push(entity);
  }
  entitiesInRoom (room) {
    var result = []
    for(var i =0;<entities.length; i++){
      if(entities[i].currentRoom == Room){
        if(entities[i] instead of class){
          result.push(entities[i]);
        }
      }
    }
    return (result);
  }
}

module.exports = EntityManager;
