<template>
	<base-card>
		<h2>Find Your Coach</h2>
		<!-- vfor -->
		<span class="filter-option">
      <input type="checkbox" id="frontend" v-model="filters.frontend" @change="setFilter" />
      <label for="frontend">Frontend</label>
    </span>
		<span class="filter-option">
      <input type="checkbox" id="backend" v-model="filters.backend" @change="setFilter" />
      <label for="backend">Backend</label>
    </span>
		<span class="filter-option">
      <input type="checkbox" id="career" v-model="filters.career" @change="setFilter" />
      <label for="career">Career</label>
    </span>
	</base-card>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'CoachFilter',
  emits: ['change-filter'],
  setup(_, ctx) {
  	/*const chks = [{
  		id: 'frontend',
  		label: 'Frontend'
  	},{
  		id: 'backend',
  		label: 'Backend'
  	},{
  		id: 'career',
  		label: 'Career'
  	}];*/

  	const filters = reactive({
  		frontend: true,
  		backend: true,
  		career: true
  	})

  	const setFilter = (event) => {
  		const key = event.target.id;
  		const isActive = event.target.checked;
  		/*filters = {
  			...filters,
  			[key]: isActive
  		};*/
  		filters[key] = isActive;
  		console.log('52 -- this.filters: ', filters)
  		ctx.emit('change-filter', filters)
  	}

  	return {
  		// chks,
  		filters,
  		setFilter
  	}
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
