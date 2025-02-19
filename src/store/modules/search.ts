import { Module } from "vuex";
import { Show } from "@/types";

export interface SearchState {
  results: Show[];
  loading: boolean;
  error: string | null;
}

const state: SearchState = {
  results: [],
  loading: false,
  error: null,
};

const search: Module<SearchState, any> = {
  namespaced: true,
  state,
  mutations: {
    setResults(state, payload: Show[]) {
      state.results = [...payload];
    },
    setLoading(state, payload: boolean) {
      state.loading = payload;
    },
    setError(state, payload: string) {
      state.error = payload;
    },
  },
  actions: {
    async searchShows({ commit }, query: string) {
      commit("setLoading", true);
      try {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );
        const data = await response.json();
        const shows = data.map((item: any) => item.show);
        commit("setResults", shows);
      } catch (err: any) {
        commit("setError", err.message);
      } finally {
        commit("setLoading", false);
      }
    },
    resetShows({ commit }) {
      commit("setResults", []);
    },
  },
  getters: {
    getResults: (state) => state.results,
    isLoading: (state) => state.loading,
    isError: (state) => state.error,
  },
};

export default search;
