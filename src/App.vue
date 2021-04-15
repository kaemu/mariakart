<template>
  <Canvas />
  <Score />
</template>

<script setup>

import Canvas from './components/Canvas.vue'
import Score from './components/Score.vue'

import useSocket from './uses/useSocket.js'

useSocket.connect()

</script>

<style>
body, #app {
  position:relative;
}
</style>