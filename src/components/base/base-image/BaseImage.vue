<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  src?: string;
  alt?: string;
  placeholder?: string;
  imgClass?: string;
}>();

const emit = defineEmits<(event: "click", e: MouseEvent) => void>();

const isVisible = ref(false);
const imageLoaded = ref(false);
const imgRef = ref<HTMLImageElement | null>(null);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true;
        if (observer && imgRef.value) {
          observer.unobserve(imgRef.value);
        }
      }
    },
    { threshold: 0.1 }
  );
  if (imgRef.value) {
    observer.observe(imgRef.value);
  }
});

onBeforeUnmount(() => {
  if (observer && imgRef.value) {
    observer.unobserve(imgRef.value);
  }
});

const computedSrc = computed(() => {
  return isVisible.value && props.src ? props.src : props.placeholder;
});

const handleLoad = () => {
  imageLoaded.value = true;
};
</script>

<template>
  <img
    ref="imgRef"
    :src="computedSrc"
    :alt="alt"
    :class="[imgClass, { loaded: imageLoaded }]"
    @click="$emit('click', $event)"
    @load="handleLoad"
  />
</template>

<style scoped>
img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: 2px solid transparent;
  transition: transform 0.3s, border-color 0.3s;
  box-shadow: 0 2px 8px #00000047;
  border-radius: 20px;
}
img.loaded {
  opacity: 1;
}
</style>
