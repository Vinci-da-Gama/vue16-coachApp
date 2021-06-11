<template>
	<li>
		<h3>{{ fullName }}</h3>
		<h4>${{ rate }}/hour</h4>
		<div>
			<base-badge v-for="area in areas" :key="area"
				:type="area" :title="area">{{ area }}</base-badge>
		</div>
		<div class="actions">
			<base-button link :to="coachContactLink" mode="outline">Contact</base-button>
			<base-button link :to="coachDetailLink">View Details</base-button>
		</div>
	</li>
</template>

<script>

import { computed, toRefs } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'CoachItem',
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  setup(props) {
  	const route = useRoute();
  	const { id, firstName, lastName } = toRefs(props);
  	console.log('27 CoachItem.vue -- id and firstName: ', id.value, firstName.value);
  	const fullName = computed(() => `${firstName.value} ${lastName.value}`);
  	const coachContactLink = computed(() => route.path + '/' + id.value + '/contact');
  	const coachDetailLink = computed(() => route.path + '/' + id.value);

  	return {
  		fullName,
  		coachContactLink,
  		coachDetailLink
  	}
  }
}
</script>

<style lang="scss" scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
