<template>
</template>

<script setup>
import { defineProps, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import useScene from '../uses/useScene'

const props = defineProps({
  position: Object,
  rotation: Object
})

const geometry = new THREE.BoxGeometry(3, 1.5, 1 )
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh( geometry, material )
useScene.scene.add( mesh )

const animation = ( time ) => {
  mesh.position.x = props.position.x
  mesh.position.y = props.position.y
  mesh.rotation.z = props.rotation.z
  requestAnimationFrame(animation)
}

onMounted(() => {
  requestAnimationFrame(animation)
})

onUnmounted(() => {
})

</script>
