import { Drone } from "roles/drones/Drone";

export class Harvester extends Drone {
  public static run(creep: Creep): any {
    if (this.hasAvailableCapacity(creep)) {
      this.harvestClosestSource(creep);
    } else {
      const targets = this.findFillableStructures(creep);
      if (targets.length > 0) {
        this.tryToTransfer(creep, targets[0]);
      } else {
        creep.memory.role = "none";
      }
    }
  }

  public static findFillableStructures(creep: Creep): AnyStructure[] {
    return creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      }
    });
  }

  private static hasAvailableCapacity(creep: Creep): boolean {
    return creep.store.getFreeCapacity() > 0;
  }

  private static tryToTransfer(creep: Creep, structure: AnyStructure): any {
    if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      this.moveToWorkSite(creep, structure);
    }
  }
}
