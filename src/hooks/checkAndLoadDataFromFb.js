import { ref, reactive, computed } from "vue";
import { useStore } from 'vuex';

import { storeNamespaces } from '../constants/storeNamespaces';

export default (shouldLoad = false, stateStr, dataStr, hasData, isTarget, httpErrResponse, loadDataStr) => {
  const store = useStore();
  const isLoading = ref(shouldLoad);
  const activeFilters = reactive({
    frontend: true,
    backend: true,
    career: true
  });

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

  const localStoreData = computed(() => stateStr === 'coaches'
    ? filterAndReturnCoaches(store.getters[`${storeNamespaces[stateStr]}/${dataStr}`])
    : store.getters[`${storeNamespaces[stateStr]}/${dataStr}`]);
  const hasTargetData = computed(() => store.getters[`${storeNamespaces[stateStr]}/${hasData}`] && !isLoading.value)
  const isCoach = computed(() => store.getters[`${storeNamespaces[stateStr]}/${isTarget}`])
  const httpErr = computed(() => store.getters[`${storeNamespaces[stateStr]}/${httpErrResponse}`])

  const loadDataFromFbDb = async (refresh = false) => {
    isLoading.value = true;
    if(stateStr === 'coaches') {
      await store.dispatch(`${storeNamespaces[stateStr]}/${loadDataStr}`, { refresh })
    } else {
      await store.dispatch(`${storeNamespaces[stateStr]}/${loadDataStr}`)
    }
    isLoading.value = false;
  }

  const setFilters = (updatedFilters) => {
    // use Object assign to trigger local variable changes, then computed will be retriggered
    Object.assign(activeFilters, updatedFilters)
  }

  return {
    isLoading,
    activeFilters,
    localStoreData,
    hasTargetData,
    isCoach,
    httpErr,
    loadDataFromFbDb,
    setFilters
  };
};
