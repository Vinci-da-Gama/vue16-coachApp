<template>
	<div>
		<base-dialog :show="error !== ''" title="An error occurred!" @close="clearError">
			<p>{{ error }}</p>
		</base-dialog>
		<base-card>
			<header>
				<h2>Requests Received</h2>
			</header>
			<base-spinner v-if="isLoading"></base-spinner>
			<ul v-else-if="hasTargetData && !isLoading">
				<request-item
					v-for="req in localStoreData"
					:key="req.id"
					:email="req.email"
					:message="req.message">
				</request-item>
			</ul>
			<h3 v-else>You haven't received any request yet!</h3>
		</base-card>
	</div>
</template>

<script>
import { ref } from 'vue';
// import { useStore } from 'vuex';

// import { storeNamespaces } from '../../constants/storeNamespaces';
import RequestItem from '../../components/requests/RequestItem';
import checkAndLoadDataFromFb from '../../hooks/checkAndLoadDataFromFb';

export default {
	components: {
		RequestItem
	},
	setup() {
		const error = ref('');
		const {
			isLoading,
			localStoreData,
			hasTargetData,
			/*isCoach,
			httpErr,
			setFilters*/
			loadDataFromFbDb
		} = checkAndLoadDataFromFb(false, 'requests', 'requests', 'hasRequests', '', '', 'fetchRequests');

		/*const receivedRequests = computed(() => store.getters[`${storeNamespaces.requests}/requests`]);
		const hasRequests = computed(() => store.getters[`${storeNamespaces.requests}/hasRequests`]);*/
		loadDataFromFbDb();

		const clearError = () => {
			error.value = ''
		}

		return {
			isLoading,
			error,
			localStoreData,
			hasTargetData,
			clearError
		}
	}
}
</script>

<style lang="scss" scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
