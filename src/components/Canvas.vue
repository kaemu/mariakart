<template>
  <canvas ref="canvasRef" />
  <Stage />
</template>

<script setup>

import { ref, onMounted } from 'vue'
import * as THREE from 'three'

import Stage from './Stage.vue'
import useScene from '../uses/useScene'
import useCamera from '../uses/useCamera'

// reference on the HTMLCanvasElement
const canvasRef = ref(null)

let renderer

const animation = ( time ) => {
	renderer.render( useScene.scene, useCamera.camera )
}

const resize = () => {
  useCamera.camera.aspect = window.innerWidth / window.innerHeight
  useCamera.camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
}

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvasRef.value,
    antialias: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
  resize()
  window.addEventListener('resize', resize)
  renderer.setAnimationLoop( animation )
})

</script>

<style scoped>
canvas {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
</style>