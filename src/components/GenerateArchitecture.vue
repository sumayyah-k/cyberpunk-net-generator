<template>
  <div class="generator">
    <h1>Cyberpunk: Red Net architecture generator</h1>
    <p>Pretty basic for now. Refresh to start over.</p>
    <p>
      Average Difficulty: {{ difficultyRating[averageDifficulty].type }}<br />
      Interface of a Netrunner with a fighting chance: {{ difficultyRating[averageDifficulty].fightingChance || 'N/A' }}<br />
      Interface of a Netrunner who might die before reaching the bottom: {{ difficultyRating[averageDifficulty].deadly || 'N/A' }}<br />
      <small>* Average skips over the first two rooms if both are lobby</small>
    </p>
    <Floor
      :list="floors"
    />

    <pre v-if="false">{{ floors }}</pre>

    <footer>
      Icons from <a href="https://game-icons.net/" target="_blank">game-icons.net</a>.
    </footer>
  </div>
</template>

<script>
import {toRaw} from 'vue'
import Floor from './Floor.vue';
import {store} from '../store'

export default {
  data: () => ({
    floors: [],
    difficultyRating: [
      {type: 'Lobby', DV: 6, fightingChance: 2, deadly: null},
      {type: 'Basic', DV: 6, fightingChance: 2, deadly: null},
      {type: 'Standard', DV: 8, fightingChance: 4, deadly: 2},
      {type: 'Uncommon', DV: 10, fightingChance: 6, deadly: 4},
      {type: 'Advanced', DV: 12, fightingChance: 8, deadly: 6},
    ]
  }),
  components: {
    Floor
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
        if (f.split.length > 0) {
          for (const col of f.split) {
            diff = [...diff, ...this.getDifficultyArray(col.rooms)];
          }
        }
      }
      return diff;
    },
    generateLobby() {
      this.floors.push(this.generateLobbyRoom());
      this.floors.push(this.generateLobbyRoom());
    },
    generateLobbyRoom() {
      const feature = this.randomFeature();
      return {
        id: self.crypto.randomUUID(),
        feature: structuredClone(toRaw(feature)),
        difficulty: 0,
        netrunners: [],
        split: [],
      };
    },
    randomFeature() {
      return store.netArch.rollTableLobby[Math.floor(Math.random() * store.netArch.rollTableLobby.length)];
    }
  }
}
</script>

<style scoped>
.generator {
  padding-left: calc(var(--drawer-width) + 1rem);
}
footer {
  margin-top:3rem;
  padding: 4rem 1rem;
  text-align: right;
}
</style>