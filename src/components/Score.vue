<template>
	<div class="absolute p-8 text-3xl">
		<p>Maria Kart</p>
		<p v-for="player, i in players">Player {{ i+1 }}</p>
	</div>
</template>

<script setup>

import { computed } from 'vue'

import UseGame from '../uses/useGame.js'

const players = computed(() => UseGame.players.value)

</script>
