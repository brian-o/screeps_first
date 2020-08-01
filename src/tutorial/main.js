// var roleHarvester = require('role.harvester');
// var roleUpgrader = require('role.upgrader');
// var roleBuilder = require('role.builder')

// module.exports.loop = function () {

//     for(var name in Game.creeps) {
//         var creep = Game.creeps[name];
//         if(creep.memory.role == 'harvester') {
//             roleHarvester.run(creep);
//         }
//         // if(creep.memory.role == 'upgrader') {
//         //     roleUpgrader.run(creep);
//         // }
//         if(creep.memory.role == 'harvester') {
//             roleBuilder.run(creep)
//         }
//     }
// }


// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1' );
// Game.creeps['Harvester1'].memory.role = 'harvester';
// Game.creeps['Upgrader1'].memory.role = 'upgrader';
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1',
//     { memory: { role: 'builder' } } );

// var roleHarvester = require('role.harvester');
// var roleBuilder = require('role.builder');

// module.exports.loop = function () {

//     for(var name in Game.rooms) {
//         console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
//     }

//     for(var name in Game.creeps) {
//         var creep = Game.creeps[name];
//         if(creep.memory.role == 'harvester') {
//             roleHarvester.run(creep);
//         }
//         if(creep.memory.role == 'builder') {
//             roleBuilder.run(creep);
//         }
//     }
// }

// Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
//     'HarvesterBig',
//     { memory: { role: 'harvester' } } );


// auto-spawn creeps time

// var roleHarvester = require('role.harvester');
// var roleUpgrader = require('role.upgrader');

// module.exports.loop = function () {

//     for(var name in Memory.creeps) {
//         if(!Game.creeps[name]) {
//             delete Memory.creeps[name];
//             console.log('Clearing non-existing creep memory:', name);
//         }
//     }


//     var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
//     console.log('Harvesters: ' + harvesters.length);

//     if(harvesters.length < 2) {
//         var newName = 'Harvester' + Game.time;
//         console.log('Spawning new harvester: ' + newName);
//         Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
//             {memory: {role: 'harvester'}});
//     }

//     if(Game.spawns['Spawn1'].spawning) {
//         var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
//         Game.spawns['Spawn1'].room.visual.text(
//             '🛠️' + spawningCreep.memory.role,
//             Game.spawns['Spawn1'].pos.x + 1,
//             Game.spawns['Spawn1'].pos.y,
//             {align: 'left', opacity: 0.8});
//     }

//     for(var name in Game.creeps) {
//         var creep = Game.creeps[name];
//         if(creep.memory.role == 'harvester') {
//             roleHarvester.run(creep);
//         }
//         if(creep.memory.role == 'upgrader') {
//             roleUpgrader.run(creep);
//         }
//     }
// }

// Game.creeps['Harvester1'].suicide()
// limited number of safe mode activations
// Game.spawns['Spawn1'].room.controller.activateSafeMode();
// Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );


var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    var tower = Game.getObjectById('658b53177d4cce952080b4ef');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
