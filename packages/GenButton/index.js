import GenButton from "./src/GenButton.vue";

/* istanbul ignore next */
GenButton.install = function (Vue) {
  Vue.component(GenButton.name, GenButton);
};

export default GenButton;
