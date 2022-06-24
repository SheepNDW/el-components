import MessageBoxComponent from './MessageBox.vue';

import { createApp, watch } from 'vue';

export const fields = ['confirm', 'prompt'];

/**
 * 提示訊息對話框
 * @param {Object} options - MessageBox 配置項
 * @param {string} options.title - 標題
 * @param {string} options.content - 內容
 * @param {string} options.confirmButtonText - 確認按鈕文本
 * @param {boolean} options.showCancelButton - 是否顯示取消按鈕
 * @param {string} options.cancelButtonText - 取消按鈕文本
 * @callback confirm - 調用 Confirm 類型彈出框
 * @callback prompt - 調用 Prompt 類型彈出框
 * @returns Promise
 */
const MessageBox = (options) => {
  const messageBoxApp = createApp(MessageBoxComponent, options);
  return new Promise((resolve, reject) => {
    showMessageBox(messageBoxApp, { resolve, reject });
  });
};

fields.forEach((field) => {
  MessageBox[field] = (options) => {
    options.field = field;
    return MessageBox(options);
  };
});

function showMessageBox(app, { resolve, reject }) {
  const oFragment = document.createDocumentFragment();
  const vm = app.mount(oFragment);
  document.body.appendChild(oFragment);
  vm.setVisible(true);

  watch(
    () => vm.visible,
    (newVisible) => {
      if (!newVisible) {
        switch (vm.type) {
          case 'cancel':
            reject();
            break;
          case 'confirm':
            resolve(vm.promptValue);
            vm.setPromptValue('');
            break;
          default:
            break;
        }
        // 推遲 1 秒再將 app 卸載，為了讓退場特效先執行
        setTimeout(() => {
          hideMessageBox(app);
        }, 1000);
      }
    }
  );
}

function hideMessageBox(app) {
  app.unmount();
}

export default MessageBox;
