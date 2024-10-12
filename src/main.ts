import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./index.css";
import "./assets/css/fonts.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

library.add(faCircleQuestion);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(store).use(router).mount("#app");
