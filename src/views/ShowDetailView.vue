<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import { Show } from "@/types";

const store = useStore();
const route = useRoute();
const showId = Number(route.params.id);

const loading = computed(() => store.getters["shows/isLoading"]);

const show = computed<Show | undefined>(() => {
  return store.getters["shows/getShowById"](showId);
});
</script>

<template>
  <div class="show-detail">
    <div v-if="loading" class="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="show">
      <h1>{{ show.name }}</h1>
      <img :src="show.image?.original" :alt="show.name" />
      <div v-html="show.summary"></div>
    </div>
    <div v-else>
      <p>Show not found.</p>
    </div>
  </div>
</template>

<style scoped></style>
