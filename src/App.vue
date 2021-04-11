<template>
  <Canvas />
</template>

<script setup>

import Canvas from './components/Canvas.vue'
import useSocket from './uses/useSocket.js'

useSocket.connect()

</script>

<style>
body, #app {
  margin:0;
  padding:0;
  position:relative;
}
</style>