import { ErrorMapper } from "utils/ErrorMapper";
import { RoleOrchestrator } from "RoleOrchestrator";
import { SpawnController } from "spawning/SpawnController";

const spawn = new SpawnController();

// WORK sucks out 2 of the resource

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  spawn.spawnIfNeeded(Game.creeps, Game.spawns.Spawn1.room.energyAvailable);
  RoleOrchestrator.tick();
});
