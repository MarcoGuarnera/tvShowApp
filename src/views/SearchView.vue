<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import debounce from "lodash-es/debounce";

import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import GridCardsBlock from "@/components/show/grid-cards-block/GridCardsBlock.vue";
import SearchInput from "@/components/base/search-input/SearchInput.vue";
import NoResultsBlock from "@/components/base/no-result-block/NoResultsBlock.vue";
import { Show } from "@/types";

const store = useStore();
const router = useRouter();

const query = ref("");
const loading = computed<boolean>(() => store.getters["search/isLoading"]);
const error = computed<string>(() => store.getters["search/isError"]);
const searchResults = computed<Show[]>(
  () => store.getters["search/getResults"]
);

const debouncedSearch = debounce(() => {
  if (query.value.length >= 3) {
    store.dispatch("search/searchShows", query.value);
  }
}, 300);

watch(query, () => {
  if (query.value.length < 3) {
    store.dispatch("search/resetShows");
  } else {
    debouncedSearch();
  }
});

const showNoResults = computed(() => {
  if (query.value.length < 3) return false;
  return (
    !loading.value && (Boolean(error.value) || searchResults.value.length === 0)
  );
});

const goToShowDetail = (show: any) => {
  router.push(`/shows/${show.id}`);
};
</script>

<template>
  <div class="search-page">
    <div class="search-container">
      <SearchInput
        v-model="query"
        placeholder="Search for a show by title..."
      />
    </div>

    <div class="content-section">
      <LoadingSpinner v-if="loading" />
      <div v-if="!loading && query.length >= 3">
        <GridCardsBlock
          v-if="searchResults.length > 0"
          :shows="searchResults"
          @click="goToShowDetail"
        />
      </div>
      <NoResultsBlock v-if="showNoResults">
        <template v-if="error">
          <p>Error: {{ error }}. Please try again.</p>
        </template>
        <template v-else>
          <p>No result for "{{ query }}". Please try with a different title</p>
        </template>
      </NoResultsBlock>
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
</style>
