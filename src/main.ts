import { ErrorMapper } from "utils/ErrorMapper";
import { Harvester } from "roles/Harvester";
import { Builder } from "roles/Builder";
import { Upgrader } from "roles/Upgrader";

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

  // spawn time bby
  let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  console.log('Harvesters: ' + harvesters.length);

  // should probably have a check on if there is enough energy xD
  if (harvesters.length < 2) {
      let newName = 'Harvester' + Game.time;
      console.log('Spawning new harvester: ' + newName);
      Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
          {memory: {
            role: 'harvester',
            room: '',
            working: true
          }});
  }

  let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  console.log(`Upgraders: ${upgraders.length}`);

  if (upgraders.length < 1) {
    let newName = `Upgrader${Game.time}`;
    console.log(`Spawning new upgrader: ${newName}`)
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {
          role: 'upgrader',
          room: '',
          working: true
        }});
  }

  let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  console.log(`Builders: ${builders.length}`)

  if (builders.length < 1) {
    let newName = `Builder${Game.time}`;
    console.log(`Spawning new builder: ${newName}`)
    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
        {memory: {
          role: 'builder',
          room: '',
          working: true
        }});
  }

  if (Game.spawns['Spawn1'].spawning) {
      let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
      Game.spawns['Spawn1'].room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          Game.spawns['Spawn1'].pos.x + 1,
          Game.spawns['Spawn1'].pos.y,
          {align: 'left', opacity: 0.8});
  }

  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
        Harvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
        Upgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
        Builder.run(creep);
    }
  }
});
