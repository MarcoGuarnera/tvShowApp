<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Show } from "@/types";

import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import CarouselBlock from "@/components/shared/CarouselBlock.vue";
import ShowCard from "@/components/show/ShowCard.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import Watchlist from "@/components/show/Watchlist.vue";
import NoResults from "@/components/base/NoResults.vue";

const store = useStore();
const router = useRouter();

const loading = computed<boolean>(() => store.getters["shows/isLoading"]);
const shows = computed<Show[]>(() => store.getters["shows/getShows"]);
const error = computed<string>(() => store.getters["shows/getError"]);

const genres = ["Drama", "Comedy", "Thriller", "Action", "Fantasy"];

const getShowsByGenre = (genre: string): Show[] => {
  return shows.value.filter((show: Show) => show.genres.includes(genre));
};

const myWatchlist = computed(() => store.getters["watchlist/getMyShows"]);

const goToShowDetail = (id: number) => {
  router.push(`/shows/${id}`);
};

if (!shows.value.length) {
  store.dispatch("shows/fetchShows");
}

const getGenreLink = (genre: string) => {
  return `/shows/genre/${genre}`;
};
</script>

<template>
  <div class="dashboard-container">
    <div v-if="loading && shows.length === 0">
      <LoadingSpinner />
    </div>

    <div
      v-else-if="genres.length > 0 && shows.length > 0"
      class="genre-section"
    >
      <Watchlist :my-shows-list="myWatchlist" @click="goToShowDetail" />
      <div v-for="genre in genres" :key="genre">
        <div class="genre-header">
          <h2>{{ genre }}</h2>
          <BaseButton mode="flat" link :to="getGenreLink(genre)"
            >View More {{ genre }} shows</BaseButton
          >
        </div>
        <CarouselBlock>
          <ShowCard
            v-for="show in getShowsByGenre(genre)"
            :key="show.id"
            :id="show.id"
            :name="show.name"
            :image="show.image?.medium"
            :hover="true"
            @click="goToShowDetail"
          />
        </CarouselBlock>
      </div>
    </div>

    <NoResults v-else-if="shows.length === 0">
      <p>Shows not found. {{ error }}, Try Later</p>
    </NoResults>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 16px;
  box-sizing: border-box;
  width: 100%;
}

.genre-section {
  margin: 0 16px 32px;
}

.genre-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  margin-bottom: 8px;
}

@media (max-width: 600px) {
  .dashboard-container {
    padding: 8px;
  }

  .genre-section {
    margin: 0 8px 24px;
  }

  .genre-header {
    gap: 20px;
  }

  .genre-header h2 {
    font-size: 1.2rem;
  }
}

@media (max-width: 349px) {
  .dashboard-container {
    width: 349px;
    overflow-x: auto;
  }
}
</style>
