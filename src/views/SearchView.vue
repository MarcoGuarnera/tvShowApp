<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import debounce from "lodash-es/debounce";

import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import GridCardsBlock from "@/components/show/GridCardsBlock.vue";
import SearchInput from "@/components/base/SearchInput.vue";
import NoResults from "@/components/base/NoResults.vue";

const store = useStore();
const router = useRouter();

const query = ref("");
const loading = computed(() => store.getters["search/isLoading"]);
const error = computed(() => store.getters["search/isError"]);
const searchResults = computed(() => store.getters["search/getResults"]);

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
      <NoResults v-if="showNoResults">
        <template v-if="error">
          <p>Error: {{ error }}. Please try again.</p>
        </template>
        <template v-else>
          <p>No result for "{{ query }}". Please try with a different title</p>
        </template>
      </NoResults>
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
