import { Drone } from "roles/drones/Drone";

export class Builder extends Drone {
  /** @param {Creep} creep **/
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
      creep.say("🚧 build");
    }
  }

  private static doNextTask(creep: Creep) {
    if (this.shouldWork(creep)) {
      this.build(creep);
    } else {
      this.harvestClosestSource(creep);
    }
  }

  private static build(creep: Creep) {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length) {
      if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    } else {
      creep.memory.role = "none";
    }
  }
}
