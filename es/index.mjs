import "./GenForm/index.mjs";
import "./GenButton/index.mjs";
import n from "./GenButton/src/GenButton.vue.mjs";
import t from "./GenForm/src/GenForm.vue.mjs";
const m = [n, t], e = function(i, r = {}) {
  m.forEach((o) => {
    i.component(o.name, o);
  });
};
typeof window < "u" && window.Vue && e(window.Vue);
const c = {
  GenButton: n,
  GenForm: t,
  install: e
};
export {
  c as default
};
