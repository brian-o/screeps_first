import { Config } from "./Config";

export class SpawnController {
  private config: Config;

  /**
   *
   */
  public constructor() {
    this.config = new Config(6, 400);
  }

  public spawnIfNeeded(currentCreeps: { [creepName: string]: Creep }, availableEnergy: number): void {
    const currentNumberOfCreeps = Object.keys(currentCreeps).length;
    if (
      this.moreCreepsNeeded(currentNumberOfCreeps, this.config.maxDrones) &&
      this.isEnoughEnergyToSpawn(availableEnergy, this.config.droneEnergy)
    ) {
      this.spawnCreep();
    }
  }

  private moreCreepsNeeded(currentNumberOfCreeps: number, maxCreeps: number): boolean {
    console.log(`current creeps: ${currentNumberOfCreeps}, needed: ${maxCreeps}`);
    return currentNumberOfCreeps < maxCreeps;
  }

  private isEnoughEnergyToSpawn(currentEnergy: number, energyNeeded: number): boolean {
    console.log(`current energy: ${currentEnergy}, needed: ${energyNeeded}`);
    return currentEnergy >= energyNeeded;
  }

  private spawnCreep(): any {
    const newName = `Drone ${Game.time}`;
    console.log(`Spawning: ${newName}`);
    Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], newName, {
      memory: {
        role: "none",
        room: "",
        working: false
      }
    });
  }
}
