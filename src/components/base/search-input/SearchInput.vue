<script lang="ts" setup>
import BaseCard from "../base-card/BaseCard.vue";

const props = defineProps<{
  placeholder?: string;
}>();

const search = defineModel<string>();
</script>

<template>
  <BaseCard>
    <div class="search-input-wrapper">
      <input
        type="text"
        v-model="search"
        :placeholder="placeholder || 'Search...'"
        class="search-input"
      />
    </div>
  </BaseCard>
</template>

<style scoped>
.search-input-wrapper {
  background: linear-gradient(90deg, #515050, #696868);
  padding: 10px;
  border-radius: 8px;
}

.search-input {
  margin: 10px;
  width: 100%;
  background: transparent;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  border: 0;
  outline: none;
}

.search-input::placeholder {
  color: white;
}

@media (max-width: 600px) {
  .search-input {
    font-size: 1rem;
    font-weight: normal;
  }
}
</style>
