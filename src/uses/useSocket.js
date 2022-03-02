import { reactive, toRefs } from 'vue'

import useGame from './useGame.js'

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
          id: useGame.me.id.value,
          position: {
            x: useGame.me.position.value.x,
            y: useGame.me.position.value.y,
            z: 0
          },
          rotation: {
            x: 0,
            y: 0,
            z: useGame.me.rotation.value.z
          }
        }
        send("positionDidChange", value)
      }, 200)
  })

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    
    console.log('message', data.type)

    if (data.type === "playernew") {
      console.log('NEW PLAYER', data.player)
      useGame.addPlayer(data.player)
    }
    if (data.type === "players") {
      console.log('NEW PLAYERS', data.players)
      data.players.forEach(player => useGame.addPlayer(player))
    }
    if (data.type === "playerme") {
      console.log('NEW PLAYER', data.player)
      useGame.addPlayer({
        me: true,
        ...data.player
      })
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
          player.value.prev_position = { ...player.value.position }
          player.value.prev_rotation = { ...player.value.rotation }
          player.value.position = position.position
          player.value.rotation = position.rotation
        }
      })
    }

  })
}

export default {
  connect
}
