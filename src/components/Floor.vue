<template>
  <draggable
    :list="list"
    :disabled="!enabled"
    item-key="id"
    class="list-group"
    ghost-class="ghost"
    @start="dragging = true"
    @end="dragging = false"
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
              <div class="floor-difficulty">{{ difficultyTable[element.difficulty] }}</div>
              <div class="floor-top-right-controls">
                <button type="button" @click="rerollFloor(element)" class="floor-control-btn floor-reroll-btn" title="Reroll Floor">&#x21bb;</button>
                <button type="button" @click="removeFloor(index)" class="floor-control-btn floor-remove-btn" title="Remove Floor">&times;</button>
              </div>
              <strong>{{ element.feature.type }}</strong>
              <template v-if="element.feature.type != 'Password'">
                :
                <contenteditable
                  v-model="element.feature.description"
                  tag="div"
                  :contenteditable="true"
                  class="input-floor-desc"
                />
              </template>
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
    difficultyTable: [
      'Lobby',
      'Basic',
      'Standard',
      'Uncommon',
      'Advanced',
    ],
    rollTableLobby: [
      {type: 'File', description: 'Some boring file...', DV: 6},
      {type: 'Password', description: null, DV: 6},
      {type: 'Password', description: null, DV: 8},
      {type: 'Black ICE', description: 'Skunk', DV: null},
      {type: 'Black ICE', description: 'Wisp', DV: null},
      {type: 'Black ICE', description: 'Killer', DV: null},
    ],
    rollTableBasic: [
      {type: 'Black ICE', description: 'Hellhound', DV: null},
      {type: 'Black ICE', description: 'Sabertooth', DV: null},
      {type: 'Black ICE', description: 'Raven x2', DV: null},
      {type: 'Black ICE', description: 'Hellhound', DV: null},
      {type: 'Black ICE', description: 'Wisp', DV: null},
      {type: 'Black ICE', description: 'Raven', DV: null},
      {type: 'Password', description: null, DV: 6},
      {type: 'File', description: 'Some exciting file...', DV: 6},
      {type: 'Control Node', description: null, DV: 6},
      {type: 'Password', description: null, DV: 6},
      {type: 'Black ICE', description: 'Skunk', DV: null},
      {type: 'Black ICE', description: 'Asp', DV: null},
      {type: 'Black ICE', description: 'Scorpion', DV: null},
      {type: 'Black ICE', description: 'Killer, Skunk', DV: null},
      {type: 'Black ICE', description: 'Wisp x3', DV: null},
      {type: 'Black ICE', description: 'Liche', DV: null},
    ],
    rollTableUncommon: [
      {type: 'Black ICE', description: 'Kraken', DV: null},
      {type: 'Black ICE', description: 'Hellhound, Scorpion', DV: null},
      {type: 'Black ICE', description: 'Hellhound, Killer', DV: null},
      {type: 'Black ICE', description: 'Raven x2', DV: null},
      {type: 'Black ICE', description: 'Sabertooth', DV: null},
      {type: 'Black ICE', description: 'Hellhound', DV: null},
      {type: 'Password', description: null, DV: 10},
      {type: 'File', description: 'Some exciting file...', DV: 10},
      {type: 'Control Node', description: null, DV: 10},
      {type: 'Password', description: null, DV: 10},
      {type: 'Black ICE', description: 'Killer', DV: null},
      {type: 'Black ICE', description: 'Liche', DV: null},
      {type: 'Black ICE', description: 'Dragon', DV: null},
      {type: 'Black ICE', description: 'Asp, Raven', DV: null},
      {type: 'Black ICE', description: 'Dragon, Wisp', DV: null},
      {type: 'Black ICE', description: 'Giant', DV: null},
    ],
    rollTableAdvanced: [
      {type: 'Black ICE', description: 'Hellhound x3', DV: null},
      {type: 'Black ICE', description: 'Asp x2', DV: null},
      {type: 'Black ICE', description: 'Hellhound, Liche', DV: null},
      {type: 'Black ICE', description: 'Wisp x3', DV: null},
      {type: 'Black ICE', description: 'Hellhound, Sabertooth', DV: null},
      {type: 'Black ICE', description: 'Kraken', DV: null},
      {type: 'Password', description: null, DV: 12},
      {type: 'File', description: 'Some exciting file...', DV: 12},
      {type: 'Control Node', description: null, DV: 12},
      {type: 'Password', description: null, DV: 12},
      {type: 'Black ICE', description: 'Giant', DV: null},
      {type: 'Black ICE', description: 'Dragon', DV: null},
      {type: 'Black ICE', description: 'Killer, Scorpion', DV: null},
      {type: 'Black ICE', description: 'Kraken', DV: null},
      {type: 'Black ICE', description: 'Raven, Wisp, Hellhound', DV: null},
      {type: 'Black ICE', description: 'Dragon x2', DV: null},
    ],
    rollTableStandard: [
      {type: 'Black ICE', description: 'Hellhound x2', DV: null},
      {type: 'Black ICE', description: 'Hellhound, Killer', DV: null},
      {type: 'Black ICE', description: 'Skunk x2', DV: null},
      {type: 'Black ICE', description: 'Sabertooth', DV: null},
      {type: 'Black ICE', description: 'Scorpion', DV: null},
      {type: 'Black ICE', description: 'Hellhound', DV: null},
      {type: 'Password', description: null, DV: 8},
      {type: 'File', description: 'Some exciting file...', DV: 8},
      {type: 'Control Node', description: null, DV: 8},
      {type: 'Password', description: null, DV: 8},
      {type: 'Black ICE', description: 'Asp', DV: null},
      {type: 'Black ICE', description: 'Killer', DV: null},
      {type: 'Black ICE', description: 'Liche', DV: null},
      {type: 'Black ICE', description: 'Asp', DV: null},
      {type: 'Black ICE', description: 'Raven x3', DV: null},
      {type: 'Black ICE', description: 'Liche, Raven', DV: null},
    ]
  }),
  components: {
    draggable,
    contenteditable
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
        return this.rollTableLobby[Math.floor(Math.random()*this.rollTableLobby.length)];
      } else if (difficulty == 1) {
        rollTable = this.rollTableBasic;
      } else if (difficulty == 3) {
        rollTable = this.rollTableUncommon;
      } else if (difficulty == 4) {
        rollTable = this.rollTableAdvanced;
      } else {
        rollTable = this.rollTableStandard;
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
          left:0;
          background: var(--red);
          padding: 0 1rem;
          font-weight:bold;
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
    .floor-controls {
      position: absolute;
      bottom: -1rem;
      width:100%;
      display:flex;
      align-items: center;
      justify-content: center;
      margin-bottom:1rem;
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
      }
    }
  }
}
</style>