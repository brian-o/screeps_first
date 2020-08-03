export class Drone {
  public static shouldWork(creep: Creep): boolean {
    return creep.memory.working;
  }

  public static shouldNotWork(creep: Creep): boolean {
    return !this.shouldWork(creep);
  }

  public static isReadyForHarvest(creep: Creep): boolean {
    return this.shouldWork(creep) && creep.store[RESOURCE_ENERGY] === 0;
  }

  public static isReadyToWork(creep: Creep): boolean {
    return this.shouldNotWork(creep) && creep.store.getFreeCapacity() === 0;
  }

  public static moveToResource(creep: Creep, resourcePosition: RoomPosition | { pos: RoomPosition }): any {
    creep.moveTo(resourcePosition, { visualizePathStyle: { stroke: "#ffaa00" } });
  }

  public static moveToWorkSite(creep: Creep, worksitePosition: RoomPosition | { pos: RoomPosition }): any {
    creep.moveTo(worksitePosition, { visualizePathStyle: { stroke: "#ffffff" } });
  }

  public static harvestClosestSource(creep: Creep): any {
    const closestSource = this.findClosestSource(creep);
    if (creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
      this.moveToResource(creep, closestSource);
    }
  }

  public static findClosestSource(creep: Creep): Source {
    let source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (source == null) {
      source = creep.room.find(FIND_SOURCES)[0];
    }
    return source;
  }
}
