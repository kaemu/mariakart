import { reactive, toRefs, computed } from 'vue'

import usePlayerCart from './usePlayerCart.js'

const state = reactive({
  players: []
})

const playerWithId = (id) => state.players.find(player => player.value.id === id)

const addPlayer = (player) => {
  player = {
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    ...player
  }
  console.log('add player', player)
  state.players.push(usePlayerCart(player))
}

const removePlayer = ({ id }) => {
  const playerIndex = state.players.findIndex(player => player.id.value === id)
  if (playerIndex >= 0) {
    state.players.splice(playerIndex, 1)
  }
}

const me = computed(() => state.players.find(player => player.me.value))
const otherPlayers = computed(() => state.players.filter(player => !player.me.value))

export default {
  ...toRefs(state),
  me,
  otherPlayers,
  addPlayer,
  removePlayer,
  playerWithId
}
