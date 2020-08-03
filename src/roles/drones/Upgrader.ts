import { Drone } from "roles/drones/Drone";

export class Upgrader extends Drone {
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
      creep.say("🚧 upgrade");
    }
  }

  private static upgradeRoomController(creep: Creep) {
    const structureController = creep.room.controller;
    if (structureController != null) {
      if (creep.upgradeController(structureController) === ERR_NOT_IN_RANGE) {
        this.moveToWorkSite(creep, structureController);
      }
    }
  }

  private static doNextTask(creep: Creep) {
    if (this.shouldWork(creep)) {
      this.upgradeRoomController(creep);
    } else {
      this.harvestClosestSource(creep);
    }
  }
}
