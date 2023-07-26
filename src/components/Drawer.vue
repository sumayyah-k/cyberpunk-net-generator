<template>
  <div class="left-drawer">
    <div class="drawer-help">Drag into floors to add</div>
    <div class="drawer-header">Black ICE</div>
    <draggable
      :list="Object.values(store.netArch.blackIce)"
      item-key="name"
      group="blackice"
      class="floor-black-ice-wrap"
      @start="store.draggingBlackIce = true"
      @end="store.draggingBlackIce = false"
      :clone="cloneBlackIce"
    >
      <template #item="{ element, index }">
        <div class="black-ice-icon" :title="element.name" v-html="element.icon"></div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import {store} from '../store.js';

export default {
  data: () => ({
    store
  }),
  components: {
    draggable
  },
  mounted() {
    console.log(store.netArch.blackIce);
  },
  methods: {
    cloneBlackIce({ name }) {
      console.log(name)
      const blackIce = store.netArch.blackIce[name.toLowerCase()];
      return {
        type: blackIce,
        currentRez: blackIce.rez
      };
    }
  }
}

</script>

<style lang="scss">
.left-drawer {
  position: fixed;
  left:0;
  top:0;
  bottom:0;
  width:var(--drawer-width);
  background: var(--red);
  overflow-x: visible;
  overflow-y: auto;
  .drawer-help {
    text-align:center;
    font-size:.8rem;
    padding:.5rem 0;
  }
  .drawer-header {
    text-align:center;
    background-color: var(--background-color);
    font-size:.8rem;
    font-weight:600;
    margin-bottom:.5rem;
    padding:.5rem 0;
  }
}
</style>
