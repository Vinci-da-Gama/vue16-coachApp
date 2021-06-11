<template>
	<section>
		<base-card>
			<h3>{{ fullName ? fullName : 'waiting...' }}</h3>
			<h4>${{ rate || '' }}/hour</h4>
		</base-card>
	</section>
	<section>
		<base-card>
			<header>
				<h2>Interested? Reach out now.</h2>
				<base-button link :to="contactLink">
					Contact
				</base-button>
			</header>
			<router-view></router-view>
		</base-card>
	</section>
	<section>
		<base-card>
			<base-badge v-for="area in areas" :key="area"
				:type="area" :title="area">
				{{ area }}
			</base-badge>
			<p>{{ description }}</p>
		</base-card>
	</section>
</template>

<script>

import { computed } from 'vue';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
	setup() {
		const route = useRoute();
		const store = useStore();
		const selectedCoach = computed(() => store.getters['coachesState/coaches']
			.find((coach) => coach.id === route.params.id))
		const fullName = selectedCoach.value.firstName + selectedCoach.value.lastName;
		const contactLink = computed(() => `${route.path}/${route.params.id}/contact`);
		const areas = computed(() => selectedCoach.value.areas)
		const rate = computed(() => selectedCoach.value.hourlyRate)
		const description = computed(() => selectedCoach.value.description)

		return {
			fullName,
			contactLink,
			areas,
			rate,
			description
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
