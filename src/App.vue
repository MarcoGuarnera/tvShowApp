<script lang="ts" setup>
import "./style.css";
import Header from "./components/core/Header.vue";
</script>

<template>
  <Header />

  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component class="container" :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<style scoped>
.container {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
