<script lang="ts" setup>
import { Show } from "@/types";
import CarouselBlock from "../shared/CarouselBlock.vue";
import ShowCard from "./ShowCard.vue";

const props = defineProps<{
  myShowsList: Show[];
}>();

const emit = defineEmits<(event: "click", id: number) => void>();
</script>

<template>
  <h2>My Watchlist</h2>
  <div v-if="myShowsList.length > 0">
    <CarouselBlock>
      <ShowCard
        v-for="show in myShowsList"
        :key="show.id"
        :id="show.id"
        :name="show.name"
        :image="show.image.medium"
        :hover="true"
        @click="emit('click', show.id)"
      />
    </CarouselBlock>
  </div>
  <div v-else class="empty-watchlist">
    <h2>Add a Show to your Watchlist in the show details</h2>
  </div>
</template>

<style scoped>
.empty-watchlist {
  text-align: center;
  align-content: center;
  font-size: 1.2em;
  min-height: 150px;
  background: linear-gradient(90deg, #302f2f, #696868);
  border-radius: 20px;
}
</style>
