<template>
	<BouncingCube />
	<PlayerKart 
		v-if="me"
	/>
	<Kart
		v-for="player in otherPlayers" 
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
const me = computed(() => UseGame.me.value)
const otherPlayers = computed(() => UseGame.otherPlayers.value)

</script>
