import { Module } from "vuex";
import { Show } from "@/types";

export interface MyShowsListState {
  list: Show[];
}

const state: MyShowsListState = {
  list: [],
};

const myShowsList: Module<MyShowsListState, any> = {
  namespaced: true,
  state,
  mutations: {
    addShow(state, show: Show) {
      if (!state.list.find((item) => item.id === show.id)) {
        state.list.push(show);
      }
    },
    removeShow(state, id: number) {
      state.list = state.list.filter((show) => show.id !== id);
    },
  },
  actions: {},
  getters: {
    getMyShows: (state) => state.list,
  },
};

export default myShowsList;
