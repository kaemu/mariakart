import { reactive, toRefs } from 'vue'

import useGame from './useGame.js'
import usePlayerCart from './usePlayerCart.js'

const connect = () => {
  // const socket = new WebSocket('wss://bind.bunex-industries.com/kart/play')
  const socket = new WebSocket('ws://' + window.location.host + '/kart/play')

  const send = (cmd, value) => {
    socket.send(JSON.stringify({ cmd, value }))
  }

  socket.addEventListener('error', (err) => {
    console.log('SOCKET ERROR', err)
  })

  socket.addEventListener('close', () => {
    console.log('SOCKET CLOSE')
  })

  socket.addEventListener('open', (event) => {  
    console.log('SOCKET OPEN')
    setInterval(() => {
        const value = {
          id: usePlayerCart.id.value,
          position: {
            x: usePlayerCart.position.value.x,
            y: usePlayerCart.position.value.y,
            z: 0
          },
          rotation: {
            x: 0,
            y: 0,
            z: usePlayerCart.rotation.value.z
          }
        }
        send("positionDidChange", value)
      }, 200)
  })

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    // console.log(data);

    if (data.type === "playernew") {
      console.log('NEW PLAYER', data.player)
      useGame.addPlayer(data.player)
    }
    if (data.type === "playerleft") {
      console.log('PLAYER LEFT', data.player)
      useGame.removePlayer(data.player)
    }
    if (data.type === "positions") {
      data.positions.forEach(position => {
        //console.log(position)
        const player = useGame.playerWithId(position.id)
        if (player) {
          player.prev_position = { ...player.position }
          player.prev_rotation = { ...player.rotation }
          player.position = position.position
          player.rotation = position.rotation
        }
      })
    }

  })
}

export default {
  connect
}
