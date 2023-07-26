<template>
  <draggable
    :list="list"
    item-key="name"
    group="blackice"
    class="floor-black-ice-wrap"
    :class="{'floor-black-ice-wrap-visibly-empty': store.draggingBlackIce}"
    @start="store.draggingBlackIce = true"
    @end="store.draggingBlackIce = false"
  >
    <template #item="{ element, index }">
      <div class="floor-black-ice" :class="{derezzed: element.currentRez == 0}">
        <div class="icon" :title="element.type.name" v-html="element.type.icon"></div>
        <div class="rez"><input type="number" v-model="element.currentRez" min="0" :max="element.type.rez"/> / {{ element.type.rez }}</div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.floor-black-ice-wrap-visibly-empty {
    min-width:3rem;
    min-height:3rem;
    background: rgba(255, 0, 0, .5);
    border:1px dotted var(--red);
  }
}
</style>