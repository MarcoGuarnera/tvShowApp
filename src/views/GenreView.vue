<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { Show } from "@/types";
import GridCardsBlock from "@/components/shared/GridCardsBlock.vue";
import BaseButton from "@/components/core/BaseButton.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const genre = route.params.genre as string;

const shows = computed(() => store.getters["shows/getShows"]);
const genreShows = computed((): Show[] => {
  return shows.value.filter((show: Show) => show.genres.includes(genre));
});

const goToShowDetail = (show: Show) => {
  router.push(`/shows/${show.id}`);
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="genre-view">
    <BaseButton mode="outline" @click="goBack" class="button">Back</BaseButton>
    <h1>{{ genre }} Shows</h1>
    <GridCardsBlock :shows="genreShows" @select="goToShowDetail" />
  </div>
</template>

<style scoped>
.genre-view {
  padding: 16px;
}
</style>
