import { reactive, toRefs } from 'vue'

import usePlayerCart from './usePlayerCart.js'

const state = reactive({
  players: []
})

const playerWithId = (id) => state.players.find(player => player.id === id)

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
  state.players.push(player)
}

const removePlayer = ({ id }) => {
  const playerIndex = state.players.findIndex(player => player.id === id)
  if (playerIndex >= 0) {
    state.players.splice(playerIndex, 1)
  }
}

export default {
  ...toRefs(state),
  addPlayer,
  removePlayer,
  playerWithId
}
