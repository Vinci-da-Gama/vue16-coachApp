<template>
	<span :class="['badge', type && type.length > 0 ? type : '']">
		{{text}}
	</span>
</template>

<script>

import { computed, toRefs } from 'vue';

export default {
  name: 'BaseBadge',
  props: ['type', 'title'],
  setup(props) {
  	const { title } = toRefs(props);
  	const text = computed(() => title.value.toUpperCase());
  	return {
  		text
  	}
  }
}
</script>

<style lang="scss" scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #3d008d;
  color: white;
}

.backend {
  background-color: #71008d;
  color: white;
}

.career {
  background-color: #8d006e;
  color: white;
}
</style>
