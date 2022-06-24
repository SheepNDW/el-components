<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  text: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  top: {
    type: Number,
    default: 20,
  },
  onClose: {
    type: Function,
  },
  onDestroy: {
    type: Function,
  },
});

// 提示訊息樣式
const style = {
  info: {
    icon: 'info',
    color: '#73767a',
    background: '#f4f4f5',
  },
  warning: {
    icon: 'error',
    color: '#b88230',
    background: '#faecd8',
  },
  danger: {
    icon: 'cancel',
    color: '#c45656',
    background: '#fde2e2',
  },
  success: {
    icon: 'check_circle',
    color: '#529b2e',
    background: '#e1f3d8',
  },
};

// 控制訊息的顯示與隱藏
const visible = ref(false);
onMounted(() => (visible.value = true));
setTimeout(() => (visible.value = false), props.duration);
</script>

<template>
  <transition
    @before-leave="onClose"
    @after-leave="onDestroy"
    name="message-fade"
  >
    <div
      class="toast-message"
      :style="[style[type], { top: `${top}px` }]"
      v-show="visible"
    >
      <i class="material-icons-round">
        {{ style[type].icon }}
      </i>
      <span class="ml-2">{{ text }}</span>
    </div>
  </transition>
</template>

<style scoped>
.toast-message {
  @apply fixed z-50 left-1/2 rounded px-4 py-2 transform -translate-x-1/2 w-75 transition-all;
  @apply flex items-center;
}

.message-fade-enter-from,
.message-fade-leave-to {
  @apply transform -translate-x-1/2 -translate-y-20px opacity-0;
}
</style>
