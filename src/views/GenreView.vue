<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { Show } from "@/types";
import BaseButton from "@/components/base/BaseButton.vue";
import GridCardsBlock from "@/components/show/GridCardsBlock.vue";
import NoResults from "@/components/base/NoResults.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const genre = route.params.genre as string;

const error = computed<string>(() => store.getters["shows/getError"]);
const genreShows = computed<Show[]>(() =>
  store.getters["shows/getShowsByGenre"](genre)
);

const goToShowDetail = (show: Show) => {
  router.push(`/shows/${show.id}`);
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="genre-view" v-if="genreShows">
    <BaseButton mode="outline" @click="goBack" class="button">Back</BaseButton>

    <h1>{{ genre }} Shows</h1>
    <GridCardsBlock :shows="genreShows" @click="goToShowDetail" />
  </div>

  <NoResults v-else>
    <p>Shows not found. {{ error }}, Try Later</p>
  </NoResults>
</template>

<style scoped>
.genre-view {
  padding: 16px;
}
</style>
