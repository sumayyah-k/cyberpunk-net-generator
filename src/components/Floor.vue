<template>
  <draggable
    :list="list"
    item-key="id"
    group="floors"
    class="list-group"
    handle=".floor-handle"
  >
    <template #item="{ element, index }">
      <div class="floor-wrap">
        <div class="floor-display-wrap">
          <div class="floor-display">
            <div class="floor-num">
              <div class="floor-header">Floor</div>
              {{ index + 1 }}<small v-if="floorLetter">{{ floorLetter }}</small>
              <div class="floor-mobile-dv">
                <div class="floor-header">DV</div>
                {{ element.feature.DV || '-' }}
              </div>
            </div>
            <div class="floor-feature">
              <div class="floor-handle">&#8942;</div>
              <div class="floor-difficulty">
                <button
                  type="button"
                  class="floor-control-btn"
                  @click="changeDifficulty(element)"
                  title="Change Difficulty"
                >
                  {{ difficultyTable[element.difficulty] }}
                </button>
              </div>
              <div class="floor-top-right-controls">
                <button type="button" @click="cycleFeature(element)" class="floor-control-btn floor-reroll-btn" title="Cycle Floor Type">&#x21bb;</button>
                <button type="button" @click="rerollFloor(element)" class="floor-control-btn floor-reroll-btn" title="Reroll Floor">&#127922;</button>
                <button type="button" @click="removeFloor(index)" class="floor-control-btn floor-remove-btn" title="Remove Floor">&times;</button>
              </div>
              <div class="floor-feature-content">
                <strong>{{ element.feature.type }}</strong>
                <template v-if="element.feature.type != 'Password' && element.feature.type != 'Black ICE'">
                  :
                  <contenteditable
                    v-model="element.feature.description"
                    tag="div"
                    :contenteditable="true"
                    class="input-floor-desc"
                  />
                </template>
                <div v-if="false && element.feature.blackIce.length > 0" class="floor-black-ice-wrap">
                  <div v-for="bi in element.feature.blackIce" class="floor-black-ice" :class="{derezzed: bi.currentRez == 0}">
                    <div class="icon" :title="bi.type.name" v-html="bi.type.icon"></div>
                    <div class="rez"><input type="number" v-model="bi.currentRez" min="0" :max="bi.type.rez"/> / {{ bi.type.rez }}</div>
                  </div>
                </div>
                <FloorBlackIce :list="element.feature.blackIce" />
              </div>
            </div>
            <div class="floor-dv">
              <div class="floor-header">DV</div>
              {{ element.feature.DV || '-' }}
            </div>

            <div class="floor-controls">
              <template v-if="element.split.length == 0">
                <button
                  v-for="(difficultyName, diff) in difficultyTable"
                  :key="diff"
                  type="button"
                  @click="addRoom(diff, index)"
                  class="floor-control-btn"
                  :title="'Add ' + difficultyName + ' floor'"
                >+ {{ difficultyName[0] }}</button>
              </template>
              <button
                v-if="index == list.length - 1"
                type="button"
                class="floor-control-btn"
                @click="splitFloor(element)"
                title="Split"
              >&#8621;</button>
            </div>
          </div>
          <div class="floor-controls-mobile">
            <template v-if="element.split.length == 0">
              <button
                v-for="(difficultyName, diff) in difficultyTable"
                :key="diff"
                type="button"
                @click="addRoom(diff, index)"
                class="floor-control-btn"
                :title="'Add ' + difficultyName + ' floor'"
              >+ {{ difficultyName[0] }}</button>
            </template>
            <button
              v-if="index == list.length - 1"
              type="button"
              class="floor-control-btn"
              @click="splitFloor(element)"
              title="Split"
            >&#8621;</button>
            <button type="button" @click="rerollFloor(element)" class="floor-control-btn floor-reroll-btn" title="Reroll Floor">&#127922;</button>
                <button type="button" @click="removeFloor(index)" class="floor-control-btn floor-remove-btn" title="Remove Floor">&times;</button>
          </div>
          <div v-if="(index != list.length - 1) || element.split.length > 0" class="floor-arrow-wrap">
            <div class="floor-arrow" v-for="a in element.split.length || 1"></div>
          </div>
        </div>

        <div v-if="element.split && element.split.length > 0" class="floor-split-wrap">
          <div v-for="(col, colIndex) in element.split" key="col.id" class="floor-split-column">
            <Floor :list="col.rooms" :floorLetter="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[colIndex]" />
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import contenteditable from 'vue-contenteditable'
import {store} from '../store'
import FloorBlackIce from "./FloorBlackIce.vue";

export default {
  props: {
    list: {
      type: Array,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    floorLetter: {
      type: String,
    }
  },
  data: () => ({
    store,
    difficultyTable: [
      'Lobby',
      'Basic',
      'Standard',
      'Uncommon',
      'Advanced',
    ],
  }),
  components: {
    draggable,
    contenteditable,
    FloorBlackIce
  },
  methods: {
    addRoom(difficulty, index) {
      if (index > -1) {
        this.list.splice(index + 1, 0, this.generateRoom(difficulty));
      } else {
        this.list.push(this.generateRoom(difficulty))
      }
    },
    removeFloor(index) {
      this.list.splice(index, 1);
    },
    rerollFloor(floor) {
      floor.feature = this.randomFeature(floor.difficulty);
    },
    changeDifficulty(floor) {
      console.log('old', floor.difficulty);
      if (floor.difficulty == this.difficultyTable.length - 1) {
        floor.difficulty = 0;
      } else {
        floor.difficulty = floor.difficulty + 1;
      }
      console.log('new', floor.difficulty);
      floor.feature = this.randomFeature(floor.difficulty);
    },
    cycleFeature(floor) {
      const table = [
        {type: 'Black ICE', description: 'Asp', DV: null, blackIce: [store.netArch.blackIce.asp], demons: []},
        {type: 'Password', description: null, DV: 4 + (floor.difficulty * 2), blackIce: [], demons: []},
        {type: 'Control Node', description: 'Massage Chairs...', DV: 4 + (floor.difficulty * 2), blackIce: [], demons: []},
        {type: 'File', description: 'Some File...', DV: 4 + (floor.difficulty * 2), blackIce: [], demons: []},
      ];
      const index = table.findIndex(f => f.type == floor.feature.type);
      floor.feature = table[index == table.length - 1 ? 0 : index + 1]
    },
    splitFloor(floor) {
      floor.split.push({id: self.crypto.randomUUID(), rooms: [this.generateRoom(floor.difficulty)]})
      if (floor.split.length == 1) {
        floor.split.push({id: self.crypto.randomUUID(), rooms: [this.generateRoom(floor.difficulty)]})
      }
    },
    generateRoom(difficulty) {
      return {
        id: self.crypto.randomUUID(),
        feature: this.randomFeature(difficulty),
        difficulty: difficulty,
        split: []
      };
    },
    randomFeature(difficulty) {
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
      console.log(difficulty, roll1, roll2, roll3, roll1 + roll2 + roll3, rollTable[roll1 + roll2 + roll3 - 3])
      return rollTable[(roll1 + roll2 + roll3) - 3];
    },
  }
}
</script>

<style lang="scss">
.floor-wrap {
  .floor-display-wrap {
    position:relative;
    .floor-display {
      position:relative;
      display:flex;
      width:100%;
      padding-bottom: 1rem;
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
      }
      .floor-feature {
        margin: 0 1rem;
        padding:1.5rem 0;
        flex:1;
        display:flex;
        flex-wrap: wrap;
        position:relative;
        align-items: center;
        justify-content: center;
        border: 6px solid var(--red);
        border-left-width: 0;
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
            opacity:1;
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
        .floor-black-ice-wrap {
          display:flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .floor-black-ice {
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin:0 .5rem;
            .rez {
              font-size:.85rem;
              input[type=number] {
                background-color: var(--background-color);
                border:none;
                border-bottom: 1px solid #555;
                width:2rem;
              }
            }
            .icon {
              position:relative;
              width:2rem;
              height:2rem;
              border: 3px solid var(--red);
              svg {
                width:2rem !important;
                height:2rem !important;
              }
            }
            &.derezzed .icon::after {
              content:'';
              position: absolute;
              top:0;
              left:0;
              right:0;
              bottom:0;
              background-color: var(--red);
              opacity:.75;
            }
          }
        }
      }
    }
    
    .floor-controls {
      position: absolute;
      bottom: 0;
      width:100%;
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
    &:hover {
      .floor-control-btn {
        opacity:1;
      }
    }
  }
  .floor-control-btn {
    opacity:0;
    background: var(--red);
    border:none;
    font-size:1.25rem;
    line-height:1.5;
    transition: opacity .2s linear;
    margin-left: .5rem;
    cursor: pointer;
  }
  .floor-controls, .floor-controls-mobile {
    display:flex;
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
  @media (max-width: 500px) {
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
        .floor-controls, .floor-top-right-controls {
          display:none;
        }
      }
    }
    .floor-controls-mobile {
      display:flex;
      margin-bottom:1rem;
      .floor-control-btn {
        opacity:1;
        white-space: nowrap;
        font-size:.9rem;
      }
    }
  }
}
</style>