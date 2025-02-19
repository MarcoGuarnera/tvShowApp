import { createStore } from "vuex";
import shows from "./modules/shows";
import search from "./modules/search";
import watchlist from "./modules/watchlist";
import showDetail from "./modules/showDetail";

const store = createStore({
  modules: {
    shows,
    search,
    watchlist,
    showDetail,
  },
});

// Initialize watchlist data from localStorage
store.dispatch("watchlist/initWatchlist");

export default store;
