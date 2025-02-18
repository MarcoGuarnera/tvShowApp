import { App } from "vue";

export default {
  install(app: App) {
    app.config.errorHandler = (err, vm, info) => {
      console.error("Global error handler:", err, info);
      // trigger base modal to show error WIP
    };
  },
};
