import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueGoogleMaps from "@fawmi/vue-google-maps";
createApp(App)
    .use(store)
    .use(router)

    .mount("#app");
