<template>
    <div class="netrunner" :class="{'expanded-view': expanded}" @click="expand">
      <div class="icon-wrap">
        <div class="icon" title="Change Image" :style="{backgroundImage: netrunner.image ? 'url(' + netrunner.image + ')': null}">
          
        </div>
        <button v-if="expanded" type="button" class="netrunner-image-btn">
          Change
          <input type="file" @change="imageChange" ref="netrunner-image-input"/>
        </button>
      </div>
      <div class="name" v-if="!expanded && !collaspedMini">
      {{ netrunner.name }}
      </div>
      <div class="form" v-if="expanded">
        <div class="form-group">Name: <input type="text" v-model="netrunner.name"/></div>
        <div class="form-group">Interface: <input type="number" v-model="netrunner.interface" min="0" max="20" /></div>
      </div>
      <div>
        <button type="button" v-if="expanded" @click.stop.prevent="expanded = false" title="Minimize" class="minimize-btn">-</button>
        <button type="button" v-if="expanded" @click.stop.prevent="$emit('delete-netrunner')" title="Delete Netrunner" class="trash-btn">&#128465;</button>
      </div>
    </div>
</template>

<script>
import {store} from '../store.js';

export default {
  props: {
    netrunner: {
      type: Object,
      default: {
        id: null,
        image: null,
        name: 'Netrunner',
        currentRez: 0
      }
    },
    collaspedMini: {
      type: Boolean,
      default:false,
    }
  },
  data: () => ({
    store,
    expanded: false,
  }),
  watch: {
    netrunner: {
      handler(netrunner, old) {
        console.log(netrunner);
        var netrunners = localStorage.getItem('netrunners');
        if (!netrunners) {
          localStorage.setItem('netrunners', JSON.stringify([netrunner]));
        } else {
          netrunners = JSON.parse(netrunners);
          const index = netrunners.findIndex(nr => nr.id == netrunner.id);
          if (typeof index == 'number' && index > -1) {
            netrunners[index] = netrunner;
            console.log(netrunners[index])
          } else {
            netrunners.push(netrunner);
          }
          localStorage.setItem('netrunners', JSON.stringify(netrunners));
        }
      },
      deep: true,
    }
  },
  methods: {
    expand() {
      if (this.expanded == false && !store.netArch.draggingNetrunners && !this.collaspedMini) {
        console.log('expand');
        this.expanded = true;
      }
    },
    imageChange($event) {
      var vue = this;
      var file = this.$refs['netrunner-image-input'].files[0];
      var reader  = new FileReader();
      reader.onload = function(e)  {
        vue.netrunner.image = e.target.result;
        // vue.$refs['netrunner-image'].style.backgroundImage = 'url("' + e.target.result + '")';
      }
      reader.readAsDataURL(file);
    }
  }
}
</script>

<style lang="scss" scoped>
.netrunner {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(135deg, var(--yellow) 0%, var(--yellow) calc(100% - .5rem), transparent calc(100% - .5rem), transparent 100%);
  color:var(--background-color);
  margin:0 .5rem .5rem;
  padding:.25rem;
  .icon {
    position: relative;
    flex:none;
    width:2rem;
    height:2rem;
    background-color: var(--background-color);
    background-size: cover;
  }
  .netrunner-image-btn {
    position: relative;
    font-size: 0.8rem;
    font-weight: 600;
    background: var(--red);
    border:none;
    line-height: 1.2rem;
    input[type=file] {
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      opacity:0;
    }
  }
  .name, .form {
    flex:none;
    margin:0 .5rem;
  }
  .form {
    .form-group {
      width:100%;
      display:flex;
      flex-direction: row;
      margin-bottom:.5rem;
      input {
        flex:1;
      }
    }
  }
  .minimize-btn, .trash-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--red);
    width:1.5rem;
    height:1.5rem;
    border:none;
  }
  .minimize-btn {
    font-weight: 700;
    font-size:2rem;
    line-height:1.5rem;
    margin-bottom:.25rem;
  }
  &.expanded-view {
    align-items: flex-start;
    .icon {
      width: 3.65rem;
      height: 3.65rem;
    }
  }
}
</style>