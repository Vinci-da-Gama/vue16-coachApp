<template>
  <Navigation />
  <router-view v-slot="slotProps">
    <transition name="route-changing" mode="out-in">
      <component :is="slotProps.Component" />
    </transition>
  </router-view>
</template>

<script>
import Navigation from './share/Navigation'

export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>
.route-changing-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-changing-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-changing-enter-active {
  transition: all 0.3s ease-out;
}

.route-changing-leave-active {
  transition: all 0.3s ease-in;
}

.route-changing-enter-to,
.route-changing-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
