<script lang="ts" setup>
import { defineProps } from "vue";
import { Show } from "@/types";

const props = defineProps<{
  show: Show;
}>();
</script>

<template>
  <div class="card" @click="$emit('click', show)">
    <img :src="show.image.medium" :alt="show.name" />
    <div class="card-body">
      <h4>{{ show.name }}</h4>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 349px;
  height: 180px;
  padding: 10px;
  border: 1px solid transparent;
  transition: transform 0.3s, border-color 0.3s;
}
.card:hover {
  transform: scale(1.05);
  border-color: #007bff;
}
.card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
