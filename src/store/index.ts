import { createStore } from "vuex";
import shows from "./modules/shows";
import search from "./modules/search";
import myShowsList from "./modules/myShowsList";

export default createStore({
  modules: {
    shows,
    search,
    myShowsList,
  },
});
