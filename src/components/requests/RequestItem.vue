<template>
	<li>
		<div>
			<a :href="emailLink">{{ email }}</a>
		</div>
		<p>{{ message }}</p>
	</li>
</template>

<script>
import { toRefs, computed } from 'vue';

export default {
	name: 'RequestItem',
	props: ['email', 'message'],
  setup (props) {
  	const { email } = toRefs(props);
  	const emailLink = computed(() => `mailto:${email}`)

    return {
    	emailLink
		}
  }
}
</script>

<style lang="scss" scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
  &:hover,
	&:active {
	  color: #8d007a;
	}
}

p {
  margin: 0.5rem 0 0 0;
}
</style>
