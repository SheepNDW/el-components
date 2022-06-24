import { h, render } from 'vue';
import MessageComponent from './Message.vue';

const instances = [];

/**
 * 顯示提示訊息
 * @param {Object} options - 接收 type, text, duration
 * @param {String} [options.type] - info 提示(預設) warning 警告 danger 錯誤 success 成功
 * @param {String} options.text - 提示訊息
 * @param {String} [options.duration] - 顯示時長 (預設: 3000)
 */
export default function Message(options) {
  let top = 20;

  instances.forEach((instance) => {
    top += instance.el.offsetHeight + 16 || 16;
  });

  const container = document.createDocumentFragment();

  const vnode = h(MessageComponent, {
    ...options,
    top,
    onClose() {
      close(vnode);
    },
    onDestroy() {
      render(null, container);
    },
  });

  render(vnode, container);
  document.body.appendChild(container);

  instances.push(vnode);
}

function close(vnode) {
  const index = instances.findIndex((instance) => instance === vnode);
  if (index === -1) return;

  instances.splice(index, 1);

  for (let start = index; start < instances.length; start++) {
    const component = instances[start].component;
    component.props.top -= vnode.el.offsetHeight + 16;
  }
}
