<template>
  <Canvas />
</template>

<script setup>

import Canvas from './components/Canvas.vue'
import usePlayerCart from './uses/usePlayerCart.js'

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
  console.log(data);
  
  if (data.type === "positions") {
    /*
    for (var i = 0 ; i < game.others.length ; i++) {
      game.others[i].previous_pos = { ...game.others[i].position }
      game.others[i].previous_rot = { ...game.others[i].rotation }
      game.others[i].position = data.positions[i].position
      game.others[i].rotation = data.positions[i].rotation
    }
    */
  }

})


</script>

<style>
body, #app {
  margin:0;
  padding:0;
  position:relative;
}
</style>