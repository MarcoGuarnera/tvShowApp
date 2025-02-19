<script lang="ts" setup>
import { Show } from "../../../types";
import ShowCard from "../show-card/ShowCard.vue";

const props = defineProps<{
  shows: Show[];
}>();
const emit = defineEmits<(event: "click", show: Show) => void>();

const handleClick = (show: Show) => {
  emit("click", show);
};
</script>

<template>
  <div class="grid-Cards-block">
    <ShowCard
      v-for="show in shows"
      :key="show.id"
      :id="show.id"
      :name="show.name"
      :image="show.image?.medium"
      :hover="true"
      @click="handleClick(show)"
    />
  </div>
</template>

<style scoped>
.grid-Cards-block {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(349px, 1fr));
  gap: 16px;
}
</style>
