import { Module } from "vuex";
import { Show } from "@/types";

export interface ShowsState {
  shows: Show[];
  loading: boolean;
  error: string | null;
}

const state: ShowsState = {
  shows: [],
  loading: false,
  error: null,
};

const shows: Module<ShowsState, any> = {
  namespaced: true,
  state,
  mutations: {
    setShows(state, payload: Show[]) {
      state.shows = [...payload];
    },
    setLoading(state, payload: boolean) {
      state.loading = payload;
    },
    setError(state, payload: string) {
      state.error = payload;
    },
  },
  actions: {
    async fetchShows({ commit }) {
      commit("setLoading", true);
      try {
        const response = await fetch("https://api.tvmaze.com/shows");
        const data = await response.json();
        commit("setShows", data);
      } catch (err: any) {
        commit("setError", err.message);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    getShows: (state) => state.shows,

    getShowById: (state) => (id: number) => {
      return state.shows.find((show: Show) => show.id === id);
    },

    getShowsByGenre: (state) => (genre: string) => {
      return state.shows.filter((show: Show) => show.genres.includes(genre));
    },

    isLoading: (state) => state.loading,
  },
};

export default shows;
