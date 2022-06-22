<script setup>
import { ref } from 'vue';

const visible = ref(false);
const setVisible = isVisible => {
  visible.value = isVisible;
};

// 暴露給元件實例
defineExpose({
  setVisible,
});
</script>

<template>
  <transition name="messagebox-fade">
    <h1 v-show="visible" class="text-lg font-bold">MessageBox</h1>
  </transition>
</template>

<style scoped>
.messagebox-fade-enter-from,
.messagebox-fade-leave-to {
  @apply opacity-0;
}

.messagebox-fade-enter-active,
.messagebox-fade-leave-active {
  @apply transition-opacity duration-200 ease-out;
}
</style>
