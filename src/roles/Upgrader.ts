export class Upgrader {
  /** @param {Creep} creep **/
  public static run(creep: Creep): void {
    if (creep.store[RESOURCE_ENERGY] === 0) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    } else {
      // ! is non-null assertion in typescript
      const structureController = creep.room.controller;
      if (structureController != null) {
        if (creep.upgradeController(structureController) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structureController);
        }
      }
    }
  }
}
