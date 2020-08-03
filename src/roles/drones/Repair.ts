import { Drone } from "roles/drones/Drone";

export class Repair extends Drone {
  public static run(creep: Creep): any {
    this.determineNextTask(creep);
    this.doNextTask(creep);
  }

  private static determineNextTask(creep: Creep): any {
    if (this.isReadyForHarvest(creep)) {
      creep.memory.working = false;
      creep.say("🔄 harvest");
    }
    if (this.isReadyToWork(creep)) {
      creep.memory.working = true;
      creep.say("🚧 repair");
    }
  }

  private static doNextTask(creep: Creep) {
    if (this.shouldWork(creep)) {
      this.repairLowestTotalHealth(creep);
    } else {
      this.harvestClosestSource(creep);
    }
  }

  private static repairLowestTotalHealth(creep: Creep) {
    const structuresByLowestTotalHealth = creep.room
      .find(FIND_STRUCTURES, {
        filter: structure => structure.hits < structure.hitsMax
      })
      .sort((a, b) => {
        return a.hits - b.hits;
      });
    if (creep.repair(structuresByLowestTotalHealth[0]) === ERR_NOT_IN_RANGE) {
      this.moveToWorkSite(creep, structuresByLowestTotalHealth[0]);
    }
  }
}
