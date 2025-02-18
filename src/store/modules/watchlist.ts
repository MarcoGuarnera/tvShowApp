import { Module } from "vuex";
import { Show } from "@/types";
import {
  loadDataFromLocalStorage,
  saveDataToLocalStorage,
} from "@/utils/localStorageService";

export interface MyShowsListState {
  list: Show[];
}

const state: MyShowsListState = {
  list: [],
};

const watchlist: Module<MyShowsListState, any> = {
  namespaced: true,
  state,
  mutations: {
    setList(state, list: Show[]) {
      state.list = [...list];
    },
    addShow(state, show: Show) {
      if (!state.list.find((item) => item.id === show.id)) {
        state.list = [...state.list, show];
      }
    },
    removeShow(state, id: number) {
      state.list = state.list.filter((show) => show.id !== id);
    },
  },
  actions: {
    // from localStorage
    initWatchlist({ commit }) {
      const savedList = loadDataFromLocalStorage<Show[]>("myWatchlist");
      if (savedList) {
        commit("setList", savedList);
      }
    },
    persistWatchlist({ state }) {
      saveDataToLocalStorage("myWatchlist", state.list);
    },
    toggleShowInList({ commit, dispatch, getters }, show: Show) {
      if (getters.isShowAdded(show.id)) {
        commit("removeShow", show.id);
        dispatch("persistWatchlist");
      } else {
        commit("addShow", show);
        dispatch("persistWatchlist");
      }
    },
  },
  getters: {
    getMyShows: (state) => state.list,

    isShowAdded:
      (state) =>
      (showId: number): boolean => {
        return state.list.some((show) => show.id === showId);
      },
  },
};

export default watchlist;
