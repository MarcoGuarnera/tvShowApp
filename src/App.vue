<script lang="ts" setup>
import "./style.css";
import Header from "./components/core/Header.vue";
</script>

<template>
  <Header />

  <div class="container">
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>
