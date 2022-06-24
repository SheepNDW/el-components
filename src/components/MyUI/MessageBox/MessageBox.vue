<script setup>
import { ref } from 'vue';
import { fields } from './index';
import { ContentView, promptValue, setPromptValue } from './ContentView';

defineProps({
  title: {
    type: String,
    default: 'Message',
  },
  content: {
    type: String,
    default: 'Message content.',
  },
  showCancelButton: {
    type: Boolean,
    default: false,
  },
  confirmButtonText: {
    type: String,
    default: 'OK',
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel',
  },
  field: {
    type: String,
    default: 'confirm',
    validator(value) {
      return fields.includes(value);
    },
  },
});

const visible = ref(false);
const type = ref('confirm');

const setVisible = (isVisible) => {
  visible.value = isVisible;
};

const handleCancel = () => {
  type.value = 'cancel';
  setVisible(false);
};

const handleConfirm = () => {
  type.value = 'confirm';
  setVisible(false);
};

// 暴露給元件實例
defineExpose({
  setVisible,
  visible,
  type,
  promptValue,
  setPromptValue,
});
</script>

<template>
  <transition name="messagebox-fade">
    <div
      @click.self="handleCancel"
      v-show="visible"
      class="z-50 flex justify-center items-center fixed top-0 left-0 w-full h-full bg-dark-50/50"
    >
      <div
        class="transform -translate-y-1/2 p-4 rounded w-5/7 md:max-w-[420px] bg-white"
      >
        <div class="relative flex justify-between items-center">
          <h3 class="text-lg">{{ title }}</h3>
          <span
            class="material-icons-outlined text-gray-400 text-lg cursor-pointer hover:(text-sky-300)"
            @click="handleCancel"
          >
            close
          </span>
        </div>
        <p class="my-4 text-base font-light text-gray-500">
          <ContentView :field="field" :content="content" />
        </p>
        <div class="w-full flex justify-end items-center">
          <button
            v-if="showCancelButton"
            class="btn mr-2"
            @click="handleCancel"
          >
            {{ cancelButtonText }}
          </button>
          <button class="btn btn-primary" @click="handleConfirm">
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.btn {
  @apply outline-gray-100 border-none py-1.5 px-4 rounded bg-warm-gray-200;
}

.btn-primary {
  @apply bg-sky-300;
}

.messagebox-input {
  @apply border rounded border-light-900 outline-none w-full py-1 px-2 text-base text-gray-500;
}

.messagebox-fade-enter-from,
.messagebox-fade-leave-to {
  @apply opacity-0;
}

.messagebox-fade-enter-active,
.messagebox-fade-leave-active {
  @apply transition-opacity duration-200 ease-out;
}
</style>
