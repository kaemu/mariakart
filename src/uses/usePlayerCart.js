import { reactive, toRefs, watchEffect, watch } from 'vue'

export default (player) => {

  const state = reactive({
    id: player.id,
    pseudo: 'No Name',
    position: { 
      x: player.position.x, 
      y: player.position.y, 
      z: player.position.z
    },
    rotation: {
      x: player.rotation.x,
      y: player.rotation.y,
      z: player.rotation.z
    }
  })
  
  return {
    ...toRefs(state)
  }
  
}