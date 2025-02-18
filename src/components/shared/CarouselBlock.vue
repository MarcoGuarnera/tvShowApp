<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";

const containerRef = ref<HTMLDivElement | null>(null);

const showControls = ref(false);

const canScrollLeft = ref(false);
const canScrollRight = ref(false);

// Function to update the control visibility based on scroll position
const updateScrollButtons = () => {
  if (containerRef.value) {
    const el = containerRef.value;
    const epsilon = 10; // tolerance of 10 pixels to handle errors
    canScrollLeft.value = el.scrollLeft > 0;
    canScrollRight.value =
      el.scrollLeft + el.clientWidth < el.scrollWidth - epsilon;
  }
};

const scrollLeft = () => {
  if (containerRef.value) {
    containerRef.value.scrollBy({
      left: -(349 + 10),
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (containerRef.value) {
    containerRef.value.scrollBy({
      left: 349 + 10,
      behavior: "smooth",
    });
  }
};

const onScroll = () => {
  updateScrollButtons();
};

onMounted(() => {
  nextTick(() => {
    if (containerRef.value) {
      updateScrollButtons();
      containerRef.value.addEventListener("scroll", onScroll);
    }
  });
});

onBeforeUnmount(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener("scroll", onScroll);
  }
});
</script>

<template>
  <div
    class="carousel-block"
    @mouseenter="showControls = true"
    @mouseleave="showControls = false"
  >
    <div class="carousel-container" ref="containerRef">
      <div class="carousel-content">
        <slot />
      </div>
    </div>

    <div
      v-if="showControls && canScrollLeft"
      class="control-wrapper left-wrapper"
    >
      <div class="carousel-control left" @click="scrollLeft">
        <IconChevronLeft class="control-icon" />
      </div>
    </div>

    <div
      v-if="showControls && canScrollRight"
      class="control-wrapper right-wrapper"
    >
      <div class="carousel-control right" @click="scrollRight">
        <IconChevronRight class="control-icon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-block {
  position: relative;
  overflow: hidden;
}

.carousel-container {
  overflow: hidden;
}

.carousel-content {
  display: flex;
  gap: 10px;

  &:hover {
    border-color: red;
  }
}

.carousel-content > * {
  flex-shrink: 0;
  width: 210px;
}

.control-wrapper {
  position: absolute;
  top: 0;
  height: 80%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  user-select: none;
}

.right-wrapper {
  right: 0;
}

.left-wrapper {
  left: 0;
}

.carousel-control {
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: black;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 2;
  transition: opacity 0.3s;
}

.carousel-control.left {
  left: 10px;
}

.carousel-control.right {
  right: 10px;
}

.control-icon {
  color: white;
  width: 24px;
  height: 24px;
}
</style>
