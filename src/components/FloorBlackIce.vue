<template>
  <draggable
    :list="list"
    item-key="name"
    group="blackice"
    class="floor-black-ice-wrap"
    :class="{'floor-black-ice-wrap-visibly-empty': store.draggingBlackIce, 'floor-black-ice-full': showFull}"
    @start="store.draggingBlackIce = true"
    @end="store.draggingBlackIce = false"
  >
    <template #item="{ element, index }">
      <div class="floor-black-ice" :class="{derezzed: element.currentRez == 0}">
        <div class="icon" :title="element.type.name" v-html="element.type.icon"></div>
        <div class="info">
          <div class="general">
            <div class="name">{{ element.type.name  }}<div v-if="showFull">{{ element.type.type }}</div></div>
            <div class="rez"><input type="number" v-model="element.currentRez" min="0" :max="element.type.rez"/> / {{ element.type.rez }}</div>
          </div>
          <table class="stats">
            <thead>
              <tr>
                <th title="Perception">PER</th>
                <th title="Speed">SPD</th>
                <th title="Attack">ATK</th>
                <th title="Defense">DEF</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ element.type.per }}</td>
                <td>{{ element.type.spd }}</td>
                <td>{{ element.type.atk }}</td>
                <td>{{ element.type.def }}</td>
                <td>{{ element.type.cost }}eb</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { store } from '../store.js';

export default {
  props: {
    list: {
      type: Array,
    },
    showFull: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    store
  }),
  components: {
    draggable,
  },
}
</script>

<style lang="scss">
.floor-black-ice-wrap {
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &.floor-black-ice-wrap-visibly-empty {
    min-width:3rem;
    min-height:3rem;
    background: rgba(255, 0, 0, .5);
    border:1px dotted var(--red);
  }
  .floor-black-ice {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:0 .5rem;
    .info {
      .general {
        display:flex;
        flex-direction: column;
        .rez {
          font-size:.85rem;
          input[type=number] {
            background-color: var(--background-color);
            border:none;
            border-bottom: 1px solid #555;
            width:2rem;
          }
        }
      }
      .stats {
        display:none;
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
  &.floor-black-ice-full {
    flex-direction: column;
    align-items: stretch;
    .floor-black-ice {
      background: var(--red);
      flex-direction: row;
      align-items: flex-start;
      margin-bottom: .5rem;
      .info {
        display: flex;
        flex-direction: column;
        margin-left:.5rem;
        padding: .5rem;
        padding-top:0;
        .general {
          display:flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          width:100%;
          .name {
            text-align: left;
          }
        }
        .stats {
          display:table;
          border-collapse: collapse;
          th, td {
            border:2px solid var(--background-color);
            padding:.125rem .5rem;
          }
          th {
            background-color: var(--background-color);
          }
        }
      }
    }
  }
}
</style>