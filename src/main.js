import { createApp } from 'vue'
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";

import App from './App.vue'
import router from './router'
import store from './store'
// import BaseSearch from "./share/BaseSearch.vue";
import "./cullIcons.js";
// import globalMixins from "./mixins/modules/logger";
import "./scss/index.scss";
import './registerServiceWorker'

const app = createApp(App);

app.use(store);
app.use(router);

// app.mixin(globalMixins);

// app.config.productionTip = false;
app.component("fa-icon", FontAwesomeIcon);
app.component("fa-layer", FontAwesomeLayers);
app.component("fa-layer-text", FontAwesomeLayersText);

// app.component("base-search", BaseSearch);

router.isReady()
  .then(() => {
    app.mount("#s16-oneapp");
  })
  .catch((error) => {
    console.log('34 -- error: ', error.message, error.stack)
  });
