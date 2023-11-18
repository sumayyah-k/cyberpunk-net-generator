import {store} from './store';
import {toRaw} from 'vue'

export function generateEdge(sourceId, targetId) {
  return {
    id: sourceId + '-' + targetId,
    type: 'smoothstep',
    source: sourceId,
    target: targetId
  };
}

export function floorToNode(floor) {
  return {
    id: floor.id,
    type: 'custom',
    position: {
      x: 0,
      y: (floor.position.depth ? floor.position.depth * 250 : 0)
    },
    data: floor
  };
}

/**
 * Generates a floor in the correct format
 * 
 * @param {Integer} difficulty 0-4, the difficulty of a floor
 *
 * @returns {Object}
 */
export function generateFloor(difficulty, depth, parentId) {
  const feature = randomFeature(difficulty);
  return {
    id: self.crypto.randomUUID(),
    feature: structuredClone(toRaw(feature)),
    difficulty: difficulty,
    programs: [], // black ICE and demons
    netrunners: [],
    position: {
      depth: depth || null, //the floor number
      x: null, // If the user moves the floor around x and y will be set
      y: null,
    },
    parents: parentId ? [parentId] : [], // Array of IDs that this floor leads to
  };
}

export function randomFeature(difficulty) {
  let rollTable;

  if (difficulty == 0) {
    return store.netArch.rollTableLobby[Math.floor(Math.random()*store.netArch.rollTableLobby.length)];
  } else if (difficulty == 1) {
    rollTable = store.netArch.rollTableBasic;
  } else if (difficulty == 3) {
    rollTable = store.netArch.rollTableUncommon;
  } else if (difficulty == 4) {
    rollTable = store.netArch.rollTableAdvanced;
  } else {
    rollTable = store.netArch.rollTableStandard;
  }

  const roll1 = Math.floor( Math.random() * 6 + 1);
  const roll2 = Math.floor( Math.random() * 6 + 1);
  const roll3 = Math.floor( Math.random() * 6 + 1);

  return rollTable[(roll1 + roll2 + roll3) - 3];
}
