<template>
  <draggable
    :list="list"
    item-key="id"
    group="netrunners"
    class="floor-netrunners-wrap"
    :class="{'floor-netrunners-wrap-visibly-empty': store.draggingNetrunners}"
    @start="store.draggingNetrunners = true"
    @end="store.draggingNetrunners = false"
  >
    <template #item="{ element, index }">
      <Netrunner :netrunner="element" @delete-netrunner="deleteNetrunner(element, index)"/>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { store } from '../store.js';
import Netrunner from "./Netrunner.vue";

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
    Netrunner
  },
  methods: {
    deleteNetrunner(element, index) {
      var netrunners = localStorage.getItem('netrunners');

      if (netrunners) {
        netrunners = JSON.parse(netrunners);
        var nrIndex = netrunners.findIndex(nr => nr.id == element.id);
        netrunners.splice(nrIndex, 1);
        localStorage.setItem('netrunners', JSON.stringify(netrunners));
      }

      this.list.splice(index, 1);
    }
  }
}
</script>

<style lang="scss">
.floor-netrunners-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &.floor-netrunners-wrap-visibly-empty {
    min-width:3rem;
    min-height:3rem;
    background: rgba(255, 0, 0, .5);
    border:1px dotted var(--red);
  }
}
</style>