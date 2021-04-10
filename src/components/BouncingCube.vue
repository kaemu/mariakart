<template>
</template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import useScene from '../uses/useScene'

const geometry = new THREE.BoxGeometry( 1, 1, 1 )
const material = new THREE.MeshNormalMaterial()

const mesh = new THREE.Mesh( geometry, material )
useScene.scene.add( mesh )

mesh.rotation.x = 0
mesh.rotation.y = 0
mesh.position.z = 0

const animation = ( time ) => {
	mesh.rotation.x = time / 2000
	mesh.rotation.y = time / 1000
  	mesh.position.z = Math.cos(time / 100)
  	requestAnimationFrame(animation)
}

onMounted(() => {
  requestAnimationFrame(animation)
})

</script>
