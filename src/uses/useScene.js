import { reactive, watchEffect, toRefs } from 'vue'
import * as THREE from 'three'

const state = reactive({
  background: 0x5DC8FA
})

THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 )

const scene = new THREE.Scene()
watchEffect(() => {
  scene.background = new THREE.Color( state.background )
})

export default {
  scene,
  ...toRefs(state)
}
