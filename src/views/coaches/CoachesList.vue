<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
	<base-card>
		<div style="display:flex;justify-content: space-between;">
			<base-button mode="outline">Refresh</base-button>
			<base-button link to="/register">Register as Coach</base-button>
		</div>
		<ul v-if="hasCoaches">
			<coach-item
				v-for="coach in filteredCoaches" :key="coach.id"
				:id="coach.id"
				:first-name="coach.firstName"
				:last-name="coach.lastName"
				:rate="coach.hourlyRate"
				:areas="coach.areas">
			</coach-item>
		</ul>
		<h3 v-else>No coaches found.</h3>
	</base-card>
</template>

<script>

import { computed, reactive } from 'vue';
// import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';

import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
	components: {
		CoachItem,
		CoachFilter
	},
	setup() {
		/*const route = useRoute();
		const router = useRouter();*/
		const store = useStore();
		console.log('42 CoachList.vue -- store: ', store);
		const activeFilters = reactive({
			frontend: true,
			backend: true,
			career: true
		})

		const filterAndReturnCoaches = (coaches) =>
			coaches.filter((el) => {
				if(activeFilters.frontend && el.areas.includes('frontend')) {
					return true;
				}
				if(activeFilters.backend && el.areas.includes('backend')) {
					return true;
				}
				if(activeFilters.career && el.areas.includes('career')) {
					return true;
				}
				return false;
			})

		const filteredCoaches = computed(() => filterAndReturnCoaches(store.getters['coachesState/coaches']));
		const hasCoaches = computed(() => store.getters['coachesState/hasCoaches'])

		const setFilters = (updatedFilters) => {
			// use Object assign to trigger local variable changes, then computed will be retriggered
			Object.assign(activeFilters, updatedFilters)
		}

		return {
			filteredCoaches,
			hasCoaches,
			setFilters
		}
	}
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
	display: flex;
  justify-content: space-between;
}
</style>
