import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import errorHandler from "./plugins/errorHandler";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(errorHandler);

app.mount("#app");
