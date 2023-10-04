<template>
  <header class="top-bar">
    <ul class="menu-left"></ul>
    <ul class="menu-right">
      <li>
        <button
          type="button"
          class="btn btn-primary"
          @click="clearLocalStorage"
        >
          {{ confirmClearLocalStorage ? 'Are you Sure?' : 'Clear Data' }}
        </button>
      </li>
    </ul>
  </header>
</template>

<script>
  export default {
    data: () => ({
      confirmClearLocalStorage: false,
    }),
    methods: {
      clearLocalStorage() {
        if (!this.confirmClearLocalStorage) {
          this.confirmClearLocalStorage = true;
        } else {
          localStorage.clear();
          window.location.reload(true);
          this.confirmClearLocalStorage = false;
        }
      }
    }
  }
</script>

<style lang="scss">
header.top-bar {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top:0;
  left:0;
  right:0;
  height:var(--header-height);
  margin: 0;
  padding:0 0 0 calc(var(--drawer-width) + 1rem);
  background: var(--yellow);
  ul {
    display:flex;
    align-items: center;
    list-style-type: none;
    margin:0;
    padding:0;
    height:100%;
    li {
      padding:.5rem;
    }
  }
}
</style>