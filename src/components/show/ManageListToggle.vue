<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { IconPlus, IconTrash } from "@tabler/icons-vue";

import { Show } from "@/types";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps<{
  show: Show;
}>();

const store = useStore();

const isAdded = computed(() => {
  return store.getters["watchlist/isShowAdded"](props.show.id);
});

const toggleShow = () => {
  store.dispatch("watchlist/toggleShowInList", props.show);
};

const currentIcon = computed(() => {
  if (isAdded.value) {
    return IconTrash;
  } else {
    return IconPlus;
  }
});

const action = computed(() => {
  if (isAdded.value) {
    return "Remove from";
  }
  return "Add to";
});
</script>

<template>
  <div class="wrapper">
    <p>{{ action }} My List</p>
    <BaseButton mode="outline" @click="toggleShow" class="toggle-button">
      <transition name="icon-fade" mode="out-in">
        <component :is="currentIcon" class="toggle-icon" />
      </transition>
    </BaseButton>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
}
.toggle-button {
  margin-left: 20px;
  border-radius: 20px;
}

.toggle-icon {
  width: 28px;
  height: 28px;
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: opacity 0.1s ease;
}

.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
}

.icon-fade-enter-to,
.icon-fade-leave-from {
  opacity: 1;
}

@media (max-width: 600px) {
  p {
    margin-left: 20px;
  }
}
</style>
