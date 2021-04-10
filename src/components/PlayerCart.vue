<template>
  <Cart :position="position" :rotation="rotation" />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

import usePlayerCart from '../uses/usePlayerCart.js'

import Cart from './Cart.vue'

let acceleration = 0
let direction = 0

const position = usePlayerCart.position.value
const rotation = usePlayerCart.rotation.value

const animation = ( time ) => {
  position.x += acceleration/10
  position.y += acceleration/10
  rotation.z -= direction/20
  requestAnimationFrame(animation)
}

const keydown = () => {
  if ([32, 37, 38, 39, 40, 81, 90, 68].indexOf(event.keyCode) > -1) {
    event.preventDefault()
  }
  if (event.keyCode === 38 ||event.keyCode === 90) {
    acceleration = 1
  } else if(event.keyCode === 40 ||event.keyCode === 83) {
    acceleration = -1
  } else if(event.keyCode === 37 || event.keyCode === 81)  {
    direction = 1
  } else if(event.keyCode === 39 || event.keyCode === 68) {
    direction = -1
  }
}

const keyup = () => {
  if (event.keyCode === 38 ||event.keyCode === 90) { // UP
    acceleration = 0
  } else if(event.keyCode === 40 ||event.keyCode === 83) { // UP
    acceleration = 0
  } else if(event.keyCode === 37 || event.keyCode === 81) { // LEFT
    direction = 0
  } else if(event.keyCode === 39 || event.keyCode === 68) { // RIGHT 
    direction = 0
  }
}

onMounted(() => {
  window.addEventListener('keydown',	keydown,	false);
  window.addEventListener('keyup', 	keyup,	false);
  requestAnimationFrame(animation)
})

onUnmounted(() => {
  window.removeEventListener('keydown',	keydown,	false);
  window.removeEventListener('keyup', 	keyup,	false);
})

</script>
