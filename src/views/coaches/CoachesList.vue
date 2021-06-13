<template>
	<div>
		<base-dialog :show="error !== ''" title="An error occurred!" @close="clearError">
			<p>{{ error }}</p>
		</base-dialog>
	  <section>
	    <coach-filter @change-filter="setFilters"></coach-filter>
	  </section>
		<base-card>
			<div style="display:flex;justify-content: space-between;">
				<base-button mode="outline" @click="loadDataFromFbDb(true)">Refresh</base-button>
				<base-button v-if="!isCoach && !isLoading" link to="/register">
					Register as Coach
				</base-button>
			</div>
			<p>http call error: {{ httpErr }}</p>
			<div v-if="isLoading">
				<base-spinner></base-spinner>
			</div>
			<ul v-else-if="hasTargetData">
				<coach-item
					v-for="coach in localStoreData"
					:key="coach.id"
					:id="coach.id"
					:first-name="coach.firstName"
					:last-name="coach.lastName"
					:rate="coach.hourlyRate"
					:areas="coach.areas">
				</coach-item>
			</ul>
			<h3 v-else>No coaches found.</h3>
		</base-card>
	</div>
</template>

<script>

import { ref, watch } from 'vue';
// import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex';

import { storeNamespaces } from '../../constants/storeNamespaces';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import checkAndLoadDataFromFb from '../../hooks/checkAndLoadDataFromFb.js';

export default {
	components: {
		CoachItem,
		CoachFilter
	},
	setup() {
		/*const route = useRoute();
		const router = useRouter();*/
		const store = useStore();
		console.log('54 CoachList.vue -- store: ', store);

		const {
			isLoading,
			localStoreData,
			hasTargetData,
			isCoach,
			httpErr,
			loadDataFromFbDb,
			setFilters
		} = checkAndLoadDataFromFb(false, 'coaches', 'coaches', 'hasCoaches', 'isCoach', 'httpRespErr', 'loadCoaches');
		const error = ref('');

		loadDataFromFbDb();

		const clearError = () => {
			error.value = ''
		}

		watch(httpErr, (nv, ov) => {
			if(nv && nv !== ov && nv !== 'No Error or has been resetted.') {
				error.value = nv;
				setTimeout(() => {
					store.dispatch(`${storeNamespaces.coaches}/resetHttpRespErr`)
				}, 3000)
			}
		})

		return {
			isLoading,
			localStoreData,
			hasTargetData,
			setFilters,
			isCoach,
			loadDataFromFbDb,
			httpErr,
			error,
			clearError
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
