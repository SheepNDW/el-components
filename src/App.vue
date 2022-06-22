<script setup>
import { MessageBox } from './components/MyUI';

const showMessageBox = () => {
  MessageBox({
    confirmText: '確定',
    title: 'MessageBox',
    content: 'This is MessageBox content.',
  });
  // .then(() => {
  //   console.log('MessageBox resolve');
  // })
  // .catch(() => {
  //   console.log('MessageBox reject');
  // });
};

const showConfirmMessageBox = () => {
  MessageBox.confirm({
    showCancelButton: true,
    cancelButtonText: '取消',
    title: 'ConfirmMessageBox',
    content: 'This is ConfirmMessageBox content.',
  });
  // .then(() => {
  //   console.log('ConfirmMessageBox resolve');
  // })
  // .catch(() => {
  //   console.log('ConfirmMessageBox reject');
  // });
};

const showPromptMessageBox = () => {
  MessageBox.prompt({
    confirmButtonText: '確定',
    showCancelButton: true,
    cancelButtonText: '取消',
    title: 'PromptMessageBox',
    content: 'This is PromptMessageBox content.',
  });
  // .then(() => {
  //   console.log('PromptMessageBox resolve');
  // })
  // .catch(() => {
  //   console.log('PromptMessageBox reject');
  // });
};
</script>

<template>
  <div>
    <h2 class="text-lg">MessageBox test</h2>
    <button @click="showMessageBox">message box</button>
    <button @click="showConfirmMessageBox">confirm message box</button>
    <button @click="showPromptMessageBox">prompt message box</button>
  </div>
</template>

<style scoped>
button {
  @apply rounded mt-2 mr-2 px-2 py-1 border border-light-900 bg-light-600;
}
</style>
