<template>
  <div class="left-drawer">
    <div class="drawer-help">Drag into floors to add</div>
    <div class="drawer-header">Netrunners</div>
    <draggable
      :list="store.netArch.netrunners"
      item-key="id"
      group="netrunners"
      class="drawer-netrunners-wrap"
      @start="store.draggingNetrunners = true"
      @end="store.draggingNetrunners = false"
    >
      <template #item="{ element, index }">
        <Netrunner :netrunner="element" :collasped-mini="true" />
      </template>
    </draggable>
    <div class="drawer-netrunner-controls">
      <button type="button" @click="addNetrunner" title="Add Netrunner">+</button>
    </div>
    <div class="drawer-header">Black ICE</div>
    <draggable
      :list="Object.values(store.netArch.blackIce)"
      item-key="name"
      group="blackice"
      class="floor-black-ice-wrap drawer-black-ice-wrap"
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
import Netrunner from "./Netrunner.vue";

export default {
  data: () => ({
    store
  }),
  components: {
    draggable,
    Netrunner
  },
  mounted() {
    console.log(store.netArch.blackIce);
  },
  methods: {
    cloneBlackIce({ name }) {
      const blackIce = store.netArch.blackIce[name.toLowerCase()];
      return {
        type: blackIce,
        currentRez: blackIce.rez
      };
    },
    addNetrunner() {
      const netrunner = {
        id: self.crypto.randomUUID(),
        image: null,
        name: 'Netrunner',
        interface: 4
      };
      store.netArch.netrunners.push(netrunner);

      var netrunners = localStorage.getItem('netrunners');
      if (netrunners) {
        netrunners = JSON.parse(netrunners);
        netrunners.push(netrunner);
      } else {
        netrunners = [netrunner];
      }
      localStorage.setItem('netrunners', JSON.stringify(netrunners));
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
  .drawer-netrunners-wrap{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: visible;
    .netrunner {
      position: relative;
      z-index:2;
      margin-bottom:.5rem;
    }
  }
  .drawer-netrunner-controls {
    text-align: center;
    margin:.5rem 0;
    button {
      background:var(--yellow);
      color: var(--background-color);
      border:none;
      font-weight: 700;
      font-size:2rem;
      line-height: 1.5rem;
    }
  }
  .drawer-black-ice-wrap {
    flex-direction: column;

  }
}
</style>
