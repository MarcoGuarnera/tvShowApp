<script lang="ts" setup>
import { defineProps } from "vue";
import { Show } from "@/types";

const props = defineProps<{
  show: Show;
  hover?: boolean;
}>();

const emit = defineEmits<(event: "click", show: Show) => void>();
</script>

<template>
  <div class="card">
    <img
      :src="show.image.medium"
      :alt="show.name"
      :class="{ 'hover-enabled': hover !== false }"
      @click="emit('click', show)"
    />
    <h4>{{ show.name }}</h4>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  max-width: 300px;
}

.card img {
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.3s, border-color 0.3s;
}

.hover-enabled:hover {
  transform: scale(1.1);
  border-color: white;
}

h4 {
  margin-top: 20px;
  text-align: center;
}
</style>
