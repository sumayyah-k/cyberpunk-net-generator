<template>
  <div>
    <h1>Hi</h1>
    <Floor
      :list="floors"
    />

    <pre>{{ floors }}</pre>
  </div>
</template>

<script>
import Floor from './Floor.vue';

export default {
  data: () => ({
    floors: [],
  }),
  components: {
    Floor
  },
  mounted() {
    this.generateLobby();
  },
  methods: {
    generateLobby() {
      this.floors.push(this.generateLobbyRoom());
      this.floors.push(this.generateLobbyRoom());
    },
    generateLobbyRoom() {
      return {
        id: self.crypto.randomUUID(),
        feature: this.randomFeature(),
        difficulty: 0,
        split: [],
      };
    },
    randomFeature() {
      const lobbyTable = [
        {type: 'File', description: null, DV: 6},
        {type: 'Password', description: null, DV: 6},
        {type: 'Password', description: null, DV: 8},
        {type: 'Black ICE', description: 'Skunk', DV: null},
        {type: 'Black ICE', description: 'Wisp', DV: null},
        {type: 'Black ICE', description: 'Killer', DV: null},
      ];

      return lobbyTable[Math.floor(Math.random()*lobbyTable.length)];
    }
  }
}
</script>