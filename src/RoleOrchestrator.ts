import { Builder } from "roles/drones/Builder";
import { Harvester } from "roles/drones/Harvester";
import { Repair } from "roles/drones/Repair";
import { Upgrader } from "roles/drones/Upgrader";

export class RoleOrchestrator {
  public static tick(): any {
    const currentCreeps = Game.creeps;
    let none: Creep[] = [];
    const builders: Creep[] = [];
    const harvesters: Creep[] = [];
    const repair: Creep[] = [];
    const upgraders: Creep[] = [];

    for (const name in currentCreeps) {
      const creep = currentCreeps[name];
      switch (creep.memory.role) {
        case "none":
          none.push(creep);
          break;
        case "builder":
          builders.push(creep);
          Builder.run(creep);
          break;
        case "harvester":
          harvesters.push(creep);
          Harvester.run(creep);
          break;
        case "repair":
          repair.push(creep);
          Repair.run(creep);
          break;
        case "upgrader":
          upgraders.push(creep);
          Upgrader.run(creep);
          break;
        default:
          creep.memory.role = "none";
          none.push(creep);
          break;
      }
    }

    none.forEach((creep: Creep) => {
      creep.memory.role = this.determineNextRole(builders.length, harvesters.length, repair.length, upgraders.length);
      none = _.remove(none, c => c === creep);
      switch (creep.memory.role) {
        case "none":
          none.push(creep);
          break;
        case "builder":
          builders.push(creep);
          Builder.run(creep);
          break;
        case "harvester":
          harvesters.push(creep);
          Harvester.run(creep);
          break;
        case "repair":
          repair.push(creep);
          Repair.run(creep);
          break;
        case "upgrader":
          upgraders.push(creep);
          Upgrader.run(creep);
          break;
        default:
          creep.memory.role = "none";
          none.push(creep);
          break;
      }
    });
  }

  // this will assign all harvesters basically to any nones :(
  private static determineNextRole(
    numBuilders: number,
    numHarvesters: number,
    numRepair: number,
    numUpgrader: number
  ): string {
    if (numHarvesters < 2) {
      return "harvester";
    }
    if (numUpgrader < 1) {
      return "upgrader";
    }
    if (numBuilders < 1) {
      return "builder";
    }
    return "repair";
  }
}
