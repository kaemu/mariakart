import { reactive, toRefs, watchEffect, watch } from 'vue'
import * as THREE from 'three'

const state = reactive({
  fov: 70,
  lookAt: { x:0, y:0, z:0 },
  position: { x:10, y:10, z:10 }
})

const camera = new THREE.PerspectiveCamera()

watchEffect(() => {
  camera.fov = state.fov
})
watchEffect(() => {
  camera.position.x = state.position.x
  camera.position.y = state.position.y
  camera.position.z = state.position.z
})
watchEffect(() => {
  camera.lookAt(state.lookAt.x, state.lookAt.y, state.lookAt.z)
})

export default {
  camera,
  ...toRefs(state)
}
