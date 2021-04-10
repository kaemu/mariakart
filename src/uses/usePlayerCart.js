import { reactive, toRefs, watchEffect, watch } from 'vue'

const state = reactive({
  id: '',
  pseudo: 'No Name',
  position: { 
    x: 0, 
    y: 0, 
    z: 0
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0
  }
})

export default {
  ...toRefs(state)
}
