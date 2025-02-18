<script lang="ts" setup>
import { defineProps } from "vue";
import placeholderImage from "@/assets/img-placeholder.png";

const props = defineProps<{
  name: string;
  image: string | undefined;
  id: number;
  hover?: boolean;
}>();

const emit = defineEmits<(event: "click", id: number) => void>();
</script>

<template>
  <div class="card">
    <img
      :src="image || placeholderImage"
      :alt="name"
      :class="{ 'hover-enabled': hover !== false }"
      @click="emit('click', id)"
    />
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
  border: 2px solid transparent;
  transition: transform 0.3s, border-color 0.3s;
  box-shadow: 0 2px 8px #00000047;
  border-radius: 20px;
}

.hover-enabled:hover {
  transform: scale(1.1);
  border-color: white;
  cursor: pointer;
}
</style>
