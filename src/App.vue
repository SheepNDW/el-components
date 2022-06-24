<script setup>
import { MessageBox, Message } from './components/MyUI';

const {
  showMessageBox,
  showConfirmMessageBox,
  showPromptMessageBox,
  mockRemove,
} = useMessageBox();

const {
  showInfoMessage,
  showWarningMessage,
  showSuccessMessage,
  showDangerMessage,
} = useMessage();

function useMessageBox() {
  const showMessageBox = () => {
    MessageBox({
      confirmButtonText: '確定',
      title: 'MessageBox',
      content: 'This is MessageBox content.',
    })
      .then(() => {
        console.log('MessageBox resolve');
      })
      .catch(() => {
        console.log('MessageBox reject');
      });
  };

  const showConfirmMessageBox = () => {
    MessageBox.confirm({
      confirmButtonText: '確定',
      showCancelButton: true,
      cancelButtonText: '取消',
      title: 'ConfirmMessageBox',
      content: 'This is ConfirmMessageBox content.',
    })
      .then(() => {
        console.log('ConfirmMessageBox resolve');
      })
      .catch(() => {
        console.log('ConfirmMessageBox reject');
      });
  };

  const showPromptMessageBox = () => {
    MessageBox.prompt({
      confirmButtonText: '確定',
      showCancelButton: true,
      cancelButtonText: '取消',
      title: 'PromptMessageBox',
      content: 'This is PromptMessageBox content.',
    })
      .then((value) => {
        console.log('PromptMessageBox resolve', value);
      })
      .catch(() => {
        console.log('PromptMessageBox reject');
      });
  };

  const mockRemove = () => {
    MessageBox.confirm({
      confirmButtonText: '確定',
      showCancelButton: true,
      cancelButtonText: '取消',
      title: '刪除產品',
      content: '你確定要刪除此產品嗎？',
    })
      .then(() => {
        console.log('call delete api');
      })
      .catch(() => {
        console.log('cancel delete');
      });
  };

  return {
    showMessageBox,
    showConfirmMessageBox,
    showPromptMessageBox,
    mockRemove,
  };
}

function useMessage() {
  const showInfoMessage = () => {
    Message({ text: '這是預設提示樣式 (info)' });
  };

  const showWarningMessage = () => {
    Message({ type: 'warning', text: '這是警告提示樣式 (warning)' });
  };

  const showSuccessMessage = () => {
    Message({ type: 'success', text: '這是成功提示樣式 (success)' });
  };

  const showDangerMessage = () => {
    Message({ type: 'danger', text: '這是錯誤提示樣式 (danger)' });
  };

  return {
    showInfoMessage,
    showWarningMessage,
    showSuccessMessage,
    showDangerMessage,
  };
}
</script>

<template>
  <div class="pl-4 pt-4">
    <h2 class="text-lg">MessageBox test</h2>
    <button @click="showMessageBox">message box</button>
    <button @click="showConfirmMessageBox">confirm message box</button>
    <button @click="showPromptMessageBox">prompt message box</button>
    <button @click="mockRemove">模擬一下刪除業務</button>
  </div>
  <div class="pl-4 pt-4">
    <h2 class="text-lg">Message test</h2>
    <button @click="showInfoMessage">info message</button>
    <button @click="showWarningMessage">warning message</button>
    <button @click="showSuccessMessage">success message</button>
    <button @click="showDangerMessage">danger message</button>
  </div>
</template>

<style scoped>
button {
  @apply rounded mt-2 mr-2 px-2 py-1 border border-light-900 bg-light-600;
}
</style>
