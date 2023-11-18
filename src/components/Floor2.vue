<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { computed, ref } from 'vue'
import {store} from '../store'
import contenteditable from 'vue-contenteditable'
import FloorBlackIce from "./FloorBlackIce.vue";
import FloorNetrunners from "./FloorNetrunners.vue";
import {generateFloor, floorToNode, generateEdge} from '../floorUtils.js';

const { nodes, addNodes, addEdges, setNodes, setEdges, dimensions, setTransform, toObject } = useVueFlow()

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const difficultyTable = ref([
  'Lobby',
  'Basic',
  'Standard',
  'Uncommon',
  'Advanced',
]);

// const emit = defineEmits(['change', 'gradient'])

function addFloor(difficulty, depth) {
  const floor = generateFloor(difficulty, depth, props.data.id);
  store.netArch.floors.push(floor);
  addNodes(floorToNode(floor));
  addEdges(generateEdge(props.data.id, floor.id));
}

function onSelect(color) {
  emit('change', color)
}

function removeFloor(index) {
  this.list.splice(index, 1);
}
function rerollFloor(floor) {
  floor.feature = this.randomFeature(floor.difficulty);
}
function changeDifficulty(floor, reverse) {
  if (reverse === true) {
    if (floor.difficulty == 0) {
      floor.difficulty = this.difficultyTable.length - 1;
    } else {
      floor.difficulty = floor.difficulty - 1;
    }
  } else {
    if (floor.difficulty == this.difficultyTable.length - 1) {
      floor.difficulty = 0;
    } else {
      floor.difficulty = floor.difficulty + 1;
    }
  }
  floor.feature = this.randomFeature(floor.difficulty);
}
function cycleFeature(floor, reverse) {
  const table = [
    {type: 'Black ICE', description: 'Asp', DV: null, blackIce: [store.netArch.blackIce.asp], demons: []},
    {type: 'Password', description: null, DV: 4 + (floor.difficulty * 2), blackIce: [], demons: []},
    {type: 'Control Node', description: 'Massage Chairs...', DV: 4 + (floor.difficulty * 2), blackIce: [], demons: []},
    {type: 'File', description: 'Some File...', DV: 4 + (floor.difficulty * 2), blackIce: [], demons: []},
  ];
  const index = table.findIndex(f => f.type == floor.feature.type);
  if (reverse) {
    floor.feature = table[index == 0 ? table.length - 1 : index - 1]
  } else {
    floor.feature = table[index == table.length - 1 ? 0 : index + 1]
  }
}
function splitFloor(floor) {
  floor.split.push({id: self.crypto.randomUUID(), rooms: [this.generateRoom(floor.difficulty)]})
  if (floor.split.length == 1) {
    floor.split.push({id: self.crypto.randomUUID(), rooms: [this.generateRoom(floor.difficulty)]})
  }
}
function generateRoom(difficulty) {
  const feature = this.randomFeature();
  return {
    id: self.crypto.randomUUID(),
    feature: structuredClone(toRaw(feature)),
    difficulty: difficulty,
    netrunners: [],
    split: []
  };
}
function randomFeature(difficulty) {
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

const sourceHandleStyleA = computed(() => ({
  backgroundColor: 'var(--red)',
  bottom: 'auto',
  top: '-10px',
  width: '1rem',
  height: '.25rem',
  borderRadius: 0,
  border: 'none',
}))

const sourceHandleStyleB = computed(() => ({
  backgroundColor: 'transparent',
  bottom: '-10px',
  top: 'auto',
  width: 0,
  height: 0,
  minWidth: 0,
  minHeight: 0,
  border: '0.75rem solid transparent',
  borderRadius: 0,
  borderBottom: 0,
  borderTopColor: 'var(--red)'
}))
</script>

<template>
  <div class="floor-wrap">
    <div class="floor-display-wrap">
      <div class="floor-display">
        <div class="floor-num">
          <div class="floor-header">Floor</div>
          <span class="floor-num-value">
            {{ data.position.depth || 0 }}
          </span>
          <div class="floor-mobile-dv">
            <div class="floor-header">DV</div>
            <span class="floor-num-value">{{ data.feature ? data.feature.DV : '-' }}</span>
          </div>
        </div>
        <div class="floor-feature">
          <div class="floor-handle">&#8942;</div>
          <div class="floor-difficulty nodrag">
            <button
              type="button"
              class="floor-control-btn"
              @click="changeDifficulty(data)"
              @contextmenu.prevent.stop="changeDifficulty(data, true)"
              title="Change Difficulty"
            >
              {{ difficultyTable[data.difficulty] }}
            </button>
          </div>
          <div class="floor-top-right-controls nodrag">
            <button
              type="button"
              @click="cycleFeature(data)"
              @contextmenu.prevent.stop="cycleFeature(data, true)"
              class="floor-control-btn floor-reroll-btn"
              title="Cycle Floor Type"
            >&#x21bb;</button>
            <button
              type="button"
              @click="rerollFloor(data)"
              class="floor-control-btn floor-reroll-btn"
              title="Reroll Floor"
            >&#127922;</button>
            <button
              type="button"
              @click="removeFloor(index)"
              class="floor-control-btn floor-remove-btn"
              title="Remove Floor"
            >&times;</button>
          </div>
          <div class="floor-feature-content nodrag">
            <FloorNetrunners :list="data.netrunners" />
            <strong>{{ data.feature.type }}</strong>
            <template v-if="data.feature.type != 'Password' && data.feature.type != 'Black ICE'">
              :
              <contenteditable
                v-model="data.feature.description"
                tag="div"
                :contenteditable="true"
                class="input-floor-desc"
              />
            </template>
            <div v-if="false && data.feature.blackIce.length > 0" class="floor-black-ice-wrap">
              <div v-for="bi in data.feature.blackIce" class="floor-black-ice" :class="{derezzed: bi.currentRez == 0}">
                <div class="icon" :title="bi.type.name" v-html="bi.type.icon"></div>
                <div class="rez"><input type="number" v-model="bi.currentRez" min="0" :max="bi.type.rez"/> / {{ bi.type.rez }}</div>
              </div>
            </div>
            <FloorBlackIce
              :list="data.feature.blackIce"
              :show-full="data.netrunners.length > 0"
            />
          </div>
        </div>
        <div class="floor-dv">
          <div class="floor-header">DV</div>
          <span class="floor-num-value">{{ data.feature ? data.feature.DV : '-' }}</span>
        </div>
        <div class="floor-controls">
            <button
              v-for="(difficultyName, diff) in difficultyTable"
              :key="diff"
              type="button"
              @click="addFloor(diff, ((data.position.depth || 0) + 1))"
              class="floor-control-btn"
              :title="'Add ' + difficultyName + ' floor'"
            >+ {{ difficultyName[0] }}</button>
          <button
            v-if="false && index == list.length - 1"
            type="button"
            class="floor-control-btn"
            @click="splitFloor(data)"
            title="Split"
          >&#8621;</button>
        </div>
      </div>
    </div>
  </div>
  <Handle id="a" type="target" :position="Position.Top" :style="sourceHandleStyleA" />
  <Handle id="b" type="source" :position="Position.Bottom" :style="sourceHandleStyleB" />
</template>

<style lang="scss">

.floor-wrap {
  width: 32rem;
  .floor-display-wrap {
    position:relative;
    .floor-display {
      position:relative;
      display:flex;
      width:100%;
      padding-bottom: 1rem;
      color: var(--text-light);
      text-align: center;
      &:before {
        content:'';
        position:absolute;
        top:calc(50% - 1px);
        width:100%;
        border-bottom:6px solid var(--red);
        z-index: -1;
      }
      .floor-num, .floor-feature, .floor-dv {
        background-color: var(--background-color);
      }
      .floor-num, .floor-dv {
        flex: none;
        width:7rem;
        border: 8px solid var(--red);
        font-size: 2.5rem;
        line-height: 1.5;
        font-weight: bold;
        .floor-header {
          background-color: var(--red);
          font-size: 1.2rem;
          margin-bottom:.5rem;
        }
        small {
          font-size:.85em;
        }
        .floor-mobile-dv {
          display:none;
        }
        .floor-num-value {
          font-family: 'Oxanium', sans-serif;
          font-weight: 700;
        }
      }
      .floor-feature {
        margin: 0 1rem;
        padding:1.5rem 0;
        display:flex;
        width:100%;
        flex-wrap: wrap;
        position:relative;
        align-items: center;
        justify-content: center;
        border: 6px solid var(--red);
        .floor-handle {
          display: flex;
          justify-content: center;
          align-items: center;
          position:absolute;
          top:0;
          left:0;
          bottom:0;
          width:1.5rem;
          background-color: var(--red);
        }
        .floor-top-right-controls {
          position:absolute;
          top:0;
          right:0;
          z-index:2;
          .floor-remove-btn {
            margin-left:.5rem;
          }
        }
        .floor-difficulty {
          position:absolute;
          top:0;
          left:1rem;
          font-weight:bold;
          .floor-control-btn {
            margin:0;
          }
        }
        .input-floor-desc {
          border:none;
          min-width: 1rem;
          margin-left:.75rem;
          background: var(--background-color);
          border-bottom: 1px solid #333;
          font-size:1.2rem;
        }
        
      }
    }
    
    .floor-controls {
      position: absolute;
      bottom: 0.25rem;
      right: 0.75rem;
      z-index:2;
      .floor-control-btn {
        font-size:1rem;
        border:6px solid var(--background-color);
      }
    }
    .floor-arrow-wrap {
      display:flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom:1rem;
      .floor-arrow {
        height: 0;
        width: 0;
        border: 1.25rem solid transparent;
        border-top: 2rem solid var(--red);
        line-height: 1;
        border-bottom: 0 solid transparent;
        margin:0 1rem;
      }
    }
  }
  .floor-control-btn {
    background: var(--red);
    border:none;
    font-size:1.25rem;
    line-height:1.5;
    margin-left: .5rem;
    cursor: pointer;
  }
  .floor-controls, .floor-controls-mobile {
    align-items: center;
    justify-content: center;
  }
  .floor-controls-mobile {
    display:none;
  }
  .floor-split-wrap {
    display:flex;
    justify-content: space-between;
    align-items: stretch;
    margin: 0 -1rem 0 -1rem;
    .floor-split-column {
      flex:1;
      margin: 0 1rem;
    }
  }
  // @media (max-width: 500px) {
    .floor-display-wrap {
      .floor-display {
        .floor-num, .floor-dv {
          font-size: 1.5rem;
          width:auto;
          .floor-header {
            font-size: 1rem;
            padding: 0 1rem;
          }
          .floor-mobile-dv {
            display:block;
          }
        }
        .floor-dv {
          display:none;
        }
        .floor-feature {
          margin-right:0;
          padding:1.5rem 0 1rem;
          .floor-difficulty {
            font-size: .85rem;
          }
        }
      }
    }
    .floor-controls-mobile {
      display:flex;
      margin-bottom:1rem;
      .floor-control-btn {
        white-space: nowrap;
        font-size:.9rem;
      }
    }
  // }
}
</style>