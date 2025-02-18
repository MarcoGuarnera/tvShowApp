<script lang="ts" setup>
import { defineProps, defineEmits, useAttrs } from "vue";
import ArrowIcon from "./ArrowIcon.vue";

const props = defineProps<{
  mode?: "flat" | "outline";
  link?: boolean;
  to?: string;
  customClass?: string;
}>();

const emit = defineEmits<(event: "click", eventData: MouseEvent) => void>();

const handleClick = (event: MouseEvent): void => {
  emit("click", event);
};

const attrs = useAttrs() as Record<string, unknown>;
</script>

<template>
  <button v-if="!link" :class="[mode, attrs.class]" @click="handleClick">
    <slot></slot>
    <ArrowIcon v-if="mode === 'flat'" />
  </button>
  <router-link v-else :to="to || '/'" :class="mode">
    <slot></slot>
    <ArrowIcon v-if="mode === 'flat'" />
  </router-link>
</template>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #00716b;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  display: inline-block;
  transition: background-color 0.3s, border 0.3s;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #004c4c;
  border-color: #004c4c;
}

.flat {
  background-color: transparent;
  border: none;
  color: white;
}

.flat:hover,
.flat:active {
  text-decoration: underline;
  background-color: #004c4c;
  color: #fff;
}
</style>
