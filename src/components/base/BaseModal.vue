<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: "Modal Title",
  },
});
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <header class="modal-header">
        <slot name="header">
          <h3>{{ title }}</h3>
        </slot>
      </header>
      <section class="modal-body">
        <slot></slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button @click="close">Close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}
</style>
