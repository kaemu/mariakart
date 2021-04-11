<template>
	<BouncingCube />
	<PlayerKart />
	<Kart
		v-for="player in players" 
		:key="player.id"
		:position="player.position"
		:rotation="player.rotation"
	/>
</template>

<script setup>

import { computed } from 'vue'

import BouncingCube from './BouncingCube.vue'
import PlayerKart from './PlayerKart.vue'
import Kart from './Kart.vue'
import UseGame from '../uses/useGame.js'

const players = computed(() => UseGame.players.value)

</script>
