<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { IconStar } from "@tabler/icons-vue";

import { Show } from "@/types";
import ShowCard from "@/components/show/ShowCard.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const showId = Number(route.params.id);

// const loading = computed(() => store.getters["shows/isLoading"]);
const show = computed<Show | undefined>(() => {
  return store.getters["shows/getShowById"](showId);
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <div>
    <BaseButton mode="outline" @click="goBack" class="button">Back</BaseButton>
    <BaseCard>
      <div class="detail-content" v-if="show">
        <div class="left-column">
          <h1 class="show-title">
            {{ show.name }}
            <span class="rating">
              <IconStar class="star-icon" />
              {{ show.rating.average }}
            </span>
          </h1>
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
            :image="show.image.original"
          />
        </div>
      </div>
      <div v-else-if="!show">
        <p>Show not found.</p>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
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

.show-title {
  font-size: 2rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #fdd835; /* Yellow */
}

.star-icon {
  width: 24px;
  height: 24px;
  margin-right: 4px;
}

.show-summary {
  line-height: 1.6;
}

.show-info p {
  margin: 0;
  font-size: 1rem;
}
.button {
  margin-left: 20px;
}
</style>
