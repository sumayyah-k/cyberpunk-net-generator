<template>
  <div class="generator">

    <GenerateArchitecture2
      v-if="initialLoad"
      :floors="floors"
    />


    <pre v-if="false">{{ floors }}</pre>

    <div class="right-sidebar" :class="{'right-sidebar-visible': store.rightSidebarVisible}">
      <div class="right-sidebar-help">
        <p>Pretty basic for now. Refresh to generate a new architecture.</p>
        <p>Netrunners are saved in your browser's local storage to be used between architectures, you can clear this with the button in the top right.</p>
        <p>
          <strong>Average Difficulty:</strong> {{ difficultyRating[averageDifficulty].type }}<br />
          <strong>Interface of a Netrunner with a fighting chance:</strong> {{ difficultyRating[averageDifficulty].fightingChance || 'N/A' }}<br />
          <strong>Interface of a Netrunner who might die before reaching the bottom:</strong> {{ difficultyRating[averageDifficulty].deadly || 'N/A' }}<br />
          <small>* Average skips over the first two rooms if both are lobby</small>
        </p>
      </div>

      <footer>
        Icons from <a href="https://game-icons.net/" target="_blank">game-icons.net</a>.
      </footer>
    </div>
  </div>
</template>

<script>
import {store} from '../store'
import GenerateArchitecture2 from './GenerateArchitecture2.vue';
import {generateFloor} from '../floorUtils';

export default {
  data: () => ({
    store,
    floors: [],
    difficultyRating: [
      {type: 'Lobby', DV: 6, fightingChance: 2, deadly: null},
      {type: 'Basic', DV: 6, fightingChance: 2, deadly: null},
      {type: 'Standard', DV: 8, fightingChance: 4, deadly: 2},
      {type: 'Uncommon', DV: 10, fightingChance: 6, deadly: 4},
      {type: 'Advanced', DV: 12, fightingChance: 8, deadly: 6},
    ],
    initialLoad: false,
  }),
  components: {
    GenerateArchitecture2
  },
  mounted() {
    var netrunners = localStorage.getItem('netrunners');
    if (netrunners) {
      store.netArch.netrunners = JSON.parse(netrunners);
    }

    this.generateLobby();
  },
  computed: {
    averageDifficulty() {
      var array = this.getDifficultyArray(this.floors);

      if (array.length) {
        if (array[0] == 0 && array[1] == 0) {
          array.splice(0, 2); //Remove Lobby
        }
        if (array.length) {
          return Math.ceil(array.reduce((a, b) => a + b, 0) / array.length);
        }
      }
      return 0;
    }
  },
  methods: {
    getDifficultyArray(list) {
      var diff = [];
      for (const f of list) {
        diff.push(f.difficulty);
        // if (f.split.length > 0) {
        //   for (const col of f.split) {
        //     diff = [...diff, ...this.getDifficultyArray(col.rooms)];
        //   }
        // }
      }
      return diff;
    },
    generateLobby() {
      const floor1 = generateFloor(0, 0);
      const floor2 = generateFloor(0, 1, floor1.id);

      store.netArch.floors.push(floor1);
      store.netArch.floors.push(floor2);

      this.initialLoad = true;
    },
  }
}
</script>

<style scoped lang="scss">
.generator {
  padding-top: calc(var(--header-height) + 1rem);
  padding-left: calc(var(--drawer-width) + 1rem);
}
.right-sidebar {
  position: fixed;
  top: calc(var(--header-height));
  right:calc((var(--right-sidebar-width) + 2rem) * -1);
  bottom:0;
  width:var(--right-sidebar-width);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--red);
  color: var(--text-light);
  padding:1rem;
  text-transform: none;
  transition: right 0.4s ease-in-out;
  &.right-sidebar-visible {
    right:0;
  }
  .right-sidebar-help {
    text-align: left;
  }
  footer {
    margin-top:3rem;
    padding: 4rem 1rem;
    text-align: right;
  }
}
</style>