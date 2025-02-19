<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { IconStar } from "@tabler/icons-vue";

import { Show } from "@/types";
import ShowCard from "@/components/show/ShowCard.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import ManageListToggle from "@/components/show/ManageListToggle.vue";
import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import NoResults from "@/components/base/NoResults.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const showId = Number(route.params.id);

const show = computed<Show>(() => store.getters["showDetail/getShow"]);
const loading = computed<boolean>(() => store.getters["showDetail/isLoading"]);
const error = computed<string>(() => store.getters["showDetail/getError"]);

onMounted(() => {
  store.dispatch("showDetail/fetchShow", showId);
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <div>
    <div v-if="loading && !show">
      <LoadingSpinner />
    </div>
    <div class="buttons-wrapper">
      <BaseButton mode="outline" @click="goBack" class="button"
        >Back</BaseButton
      >
      <ManageListToggle v-if="show" :show="show" />
    </div>
    <BaseCard>
      <div class="detail-content" v-if="show">
        <div class="left-column">
          <div class="show-title-container">
            <h1 class="show-title">
              {{ show.name }}
            </h1>
            <span class="rating">
              <p>Ratings: {{ show.rating?.average }}</p>
              <IconStar class="star-icon" />
            </span>
          </div>

          <div class="show-summary" v-html="show.summary"></div>
          <div class="show-info">
            <p>Status: {{ show.status }}</p>
            <p>Premiered: {{ show.premiered }}</p>
            <p v-if="show.ended">Ended: {{ show.ended }}</p>
          </div>
        </div>
        <div class="right-column">
          <ShowCard
            :id="show.id"
            :name="show.name"
            :image="show.image?.original"
          />
        </div>
      </div>
      <NoResults v-else-if="error">
        <p>Show not found. {{ error }}, Try Later</p>
      </NoResults>
    </BaseCard>
  </div>
</template>

<style scoped>
.buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .detail-content {
    grid-template-columns: 2fr 1fr;
  }
}

.right-column {
  display: flex;
  justify-content: center;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.show-title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.show-title {
  font-size: 2rem;
  margin: 0;
}

.rating {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

.star-icon {
  width: 24px;
  height: 24px;
  margin-right: 4px;
  color: #fdd835; /* Yellow */
}

.show-summary {
  line-height: 1.6;
}

.show-info p {
  margin: 0;
  font-size: 1rem;
}
</style>
