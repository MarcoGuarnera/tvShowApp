<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import debounce from "lodash-es/debounce";

import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import GridCardsBlock from "@/components/show/GridCardsBlock.vue";

const store = useStore();
const router = useRouter();

const query = ref("");
const loading = computed(() => store.getters["search/isLoading"]);
const searchResults = computed(() => store.getters["search/getResults"]);

const debouncedSearch = debounce(() => {
  if (query.value.length >= 3) {
    store.dispatch("search/searchShows", query.value);
  }
}, 300);

watch(query, () => {
  if (query.value.length < 3) {
    store.commit("search/setResults", []);
  } else {
    debouncedSearch();
  }
});

const goToShowDetail = (show: any) => {
  router.push(`/shows/${show.id}`);
};
</script>

<template>
  <div class="search-page">
    <div class="search-container">
      <!-- <BaseInput v-model="query" placeholder="Search for a show..." /> -->
    </div>

    <div class="content-section">
      <div v-if="query.length < 3" class="placeholder">
        Start typing to search for show title
      </div>
      <LoadingSpinner v-if="loading" />
      <div v-if="!loading && query.length >= 3">
        <GridCardsBlock
          v-if="searchResults.length > 0"
          :shows="searchResults"
          @select="goToShowDetail"
        />
        <div v-else class="no-results">No result for "{{ query }}"</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  padding: 16px;
}
.search-container {
  margin: 16px 0;
}
.placeholder,
.no-results {
  margin-top: 16px;
  font-size: 1.2rem;
  color: #666;
}
</style>
