<template>
	<base-card>
		<h2>Register as a coach Now!</h2>
		<coach-form @save-data="saveCoachFormData"></coach-form>
	</base-card>
</template>

<script>
// import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { routerConstant } from '../../constants/routerConstant'
import { storeNamespaces } from '../../constants/storeNamespaces'
import CoachForm from '../../components/coaches/CoachForm';

export default {
	components: {
		CoachForm
	},
	setup() {
		const store = useStore();
		const router = useRouter();

		const saveCoachFormData = (data) => {
			store.dispatch(`${storeNamespaces.coaches}/registerCoach`, data)
			router.replace(routerConstant.coaches.path);
		}

		return {
			saveCoachFormData
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
