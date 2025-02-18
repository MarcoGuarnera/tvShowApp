<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

import { Show } from "@/types";
import ShowCard from "@/components/show/ShowCard.vue";

const props = defineProps<{
  shows: Show[];
}>();
const emit = defineEmits(["select"]);

const handleClick = (show: Show) => {
  emit("select", show);
};
</script>

<template>
  <div class="grid-Cards-block">
    <ShowCard
      v-for="show in shows"
      :key="show.id"
      :id="show.id"
      :name="show.name"
      :image="show.image.medium"
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
