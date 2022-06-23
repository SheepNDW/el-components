import { h, ref } from 'vue';

const promptValue = ref('');

const ContentView = ({ field, content }) => {
  switch (field) {
    case !field || 'confirm':
      return h('p', null, content);

    case 'prompt':
      return h('input', {
        value: promptValue.value,
        onInput: (e) => (promptValue.value = e.target.value),
        class: 'messagebox-input',
      });

    default:
      return '';
  }
};

export { promptValue, ContentView };
