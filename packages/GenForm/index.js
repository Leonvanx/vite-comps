import GenForm from "./src/GenForm.vue";

/* istanbul ignore next */
GenForm.install = function (Vue) {
  Vue.component(GenForm.name, GenForm);
};

export default GenForm;
