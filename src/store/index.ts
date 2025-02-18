import { createStore } from "vuex";
import shows from "./modules/shows";
import search from "./modules/search";
import watchlist from "./modules/watchlist";

const store = createStore({
  modules: {
    shows,
    search,
    watchlist,
  },
});

// Initialize watchlist data from localStorage
store.dispatch("watchlist/initWatchlist");

export default store;
