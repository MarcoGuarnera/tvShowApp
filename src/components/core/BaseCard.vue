<template>
  <div class="card-wrapper">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.card-wrapper {
  border-radius: 8px;
  box-shadow: 0 2px 8px #005e5d;
  padding: 20px;
  margin: 20px;
}
</style>
