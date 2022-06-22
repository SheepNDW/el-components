import MessageBoxComponent from './MessageBox.vue';

import { createApp } from 'vue';

const fields = ['confirm', 'prompt'];

const MessageBox = options => {
  const messageBoxApp = createApp(MessageBoxComponent, options);

  return new Promise((resolve, reject) => {
    showMessageBox(messageBoxApp, { resolve, reject });
  });
};

fields.forEach(field => {
  MessageBox[field] = options => {
    options.field = field;
    return MessageBox(options);
  };
});

function showMessageBox(app, { resolve, reject }) {
  const oFragment = document.createDocumentFragment();
  const vm = app.mount(oFragment);
  document.body.appendChild(oFragment);
  vm.setVisible(true);
}

export default MessageBox;
