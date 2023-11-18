<script setup>
defineProps({
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <g>
    <path
      class="vue-flow__connection animated"
      fill="none"
      :style="{stroke: 'var(--red)'}"
      :stroke-width="2.5"
      :d="`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`"
    />

  </g>
</template>