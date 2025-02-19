// src/store/modules/showDetail.ts
import { Module } from "vuex";
import { Show } from "@/types";

export interface ShowDetailState {
  show: Show | null;
  loading: boolean;
  error: string | null;
}

const state: ShowDetailState = {
  show: null,
  loading: false,
  error: null,
};

const showDetail: Module<ShowDetailState, any> = {
  namespaced: true,
  state,
  mutations: {
    setShow(state, payload: Show) {
      state.show = payload;
    },
    clearShow(state) {
      state.show = null;
    },
    setLoading(state, payload: boolean) {
      state.loading = payload;
    },
    setError(state, payload: string) {
      state.error = payload;
    },
  },
  actions: {
    async fetchShow({ commit }, showId: number) {
      commit("setLoading", true);
      commit("clearShow");
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
        const data: Show = await response.json();
        commit("setShow", data);
      } catch (error: any) {
        commit("setError", error.message);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    getShow: (state) => state.show,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
};

export default showDetail;
