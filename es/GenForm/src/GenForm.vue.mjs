import { pushScopeId as q, popScopeId as J, createElementVNode as P, resolveComponent as h, openBlock as t, createBlock as s, mergeProps as N, withCtx as f, createVNode as T, normalizeClass as x, createElementBlock as p, Fragment as k, renderList as V, normalizeStyle as b, createTextVNode as U, toDisplayString as _, createCommentVNode as r, renderSlot as F, withModifiers as E } from "vue";
import "./GenForm.vue2.mjs";
import Q from "../../_virtual/_plugin-vue_export-helper.mjs";
const X = {
  name: "GenForm",
  components: {
    RenderDom: {
      name: "RenderDom",
      functional: !0,
      props: {
        row: [String, Object, Number, Array],
        render: Function,
        key: String
      },
      render: (a, d) => {
        const l = {
          row: d.props.row,
          key: d.props.key
        };
        return d.props.render(a, l);
      }
    }
  },
  props: {
    // 表单主题
    themeType: {
      type: String,
      default: "default"
    },
    formType: {
      type: String,
      default: "default"
    },
    // 自定义类名
    className: {
      type: String,
      default: ""
    },
    // 表单数据
    data: {
      type: Object,
      default: () => {
      }
    },
    // 相关字段信息
    fieldList: {
      type: Array,
      default: () => []
    },
    // 验证规则
    rules: {
      type: Object,
      default: () => {
      }
    },
    // 相关的列表
    listTypeInfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // label宽度
    labelWidth: {
      type: String,
      default: ""
    },
    labelPosition: {
      type: String,
      default: "right"
    },
    validatchange: {
      type: Boolean,
      default: !0
    },
    refObj: {
      type: Object,
      default: () => {
      }
    },
    gutter: {
      type: Number,
      default: 20
    },
    tb: {
      type: String,
      default: "ts"
    },
    size: {
      type: String,
      default: "small"
    },
    inline: {
      type: Boolean,
      default: !1
    },
    formitemclassName: {
      type: String
    },
    elcolClassName: {
      type: String
    }
  },
  data() {
    return {
      // classify: {},
      timeOne: "",
      // 时间范围下选择的开始时间
      timeTwo: "",
      // 时间范围------的结束时间
      selectableRange0: "00:00:00 - 23:59:59",
      // timeOne 开始时间范围
      selectableRange1: "00:00:00 - 23:59:59",
      // timeTwo 结束时间范围
      formchild: {},
      fieldListchild: [
        // {
        // 	key: 'warning_type',
        // 	label: '告警类型',
        // 	type: 'select',
        // 	span: 5,
        // 	props: { label: 'value', value: 'key' },
        // 	isbr: true,
        // 	stype: 'views',
        // 	related_items: '',
        // },
      ],
      // keyobj: {},
      dragIndex: null
    };
  },
  computed: {
    timeKey() {
      const a = this.fieldList.find((d) => d.type === "timeDiy");
      return a ? a.key : null;
    },
    keyobj() {
      const a = {};
      return this.fieldList.forEach((d) => {
        d.props && (a[d.key] = {}, this.listTypeInfo[d.key] && this.listTypeInfo[d.key].forEach((l) => {
          const c = l[d.props.value], u = l[d.props.label];
          a[d.key][c] = u;
        }));
      }), a;
    }
    // allkeyobj() {
    // 	let objs = {};
    // 	Object.values(this.keyobj).forEach((it) => {
    // 		objs = {
    // 			...objs,
    // 			...it,
    // 		};
    // 	});
    // 	return objs;
    // },
  },
  watch: {
    // classify: {
    // 	handler(val) {
    // 		const data = [];
    // 		for (let k in val) {
    // 			if (val[k]) {
    // 				data.push(k);
    // 			}
    // 		}
    // 		this.$emit('getxs', data);
    // 	},
    // 	deep: true,
    // },
    timeOne(a) {
      this.timeKey && a && this.timeTwo ? this.data[this.timeKey] = [a, this.timeTwo] : this.timeKey && (!a || !this.timeTwo) && (this.data[this.timeKey] = []);
    },
    timeTwo(a) {
      this.timeKey && a && this.timeOne ? this.data[this.timeKey] = [this.timeOne, a] : this.timeKey && (!a || !this.timeOne) && (this.data[this.timeKey] = []);
    },
    data: {
      handler() {
        this.initdata();
      },
      deep: !0
    }
  },
  created() {
    const a = /* @__PURE__ */ Object.create(null);
    this.classify = a, this.formchild = a, this.initdata();
  },
  methods: {
    getvalues(a, d) {
      if (d.gllist) {
        const l = this.listTypeInfo[d.gllist];
        return this.getnowvalue(l, d.gllabel, a) != "" ? this.getnowvalue(l, d.gllabel, a) : a;
      } else
        return a;
    },
    getnowvalue(a, d, l) {
      if (a && a.length > 0) {
        const c = a.filter((u) => u[d.name] == l);
        return c.length > 0 ? d.value ? c[0][d.value] : c[0] : "";
      }
    },
    dragstart(a) {
      this.dragIndex = a;
    },
    dragover(a) {
      a.preventDefault();
    },
    dragenter(a, d, l) {
      if (a.preventDefault(), this.dragIndex !== d) {
        const c = this.data[l][this.dragIndex];
        this.data[l].splice(this.dragIndex, 1), this.data[l].splice(d, 0, c), this.dragIndex = d;
      }
    },
    getdelete(a, d) {
      this.data[d].splice(a, 1);
    },
    getclickit(a, d) {
      this.$nextTick(() => {
        this.data[d.related_items] && this.data[d.related_items].push(a);
      });
    },
    initdata() {
      const a = this.keyobj, d = [];
      this.fieldList.forEach((l) => {
        if (l.stype && this.data[l.key] !== void 0) {
          if (l.stype == "add" && l.multiple == !0)
            this.data[l.key].forEach((u) => {
              const y = {
                key: l.add_key ? `${l.add_key}${l.add_split ? l.add_split : "/"}${u}` : u,
                label: a[l.key] && a[l.key][u] ? a[l.key][u] : u,
                type: "input",
                parent_key: l.key,
                span: l.span
              };
              d.push(y);
            });
          else if (l.stype == "view") {
            const c = {
              key: l.key,
              label: l.labelview ? l.labelview : l.label + "详情",
              props: l.props,
              related_items: l.related_items,
              parent_key: l.key,
              span: l.span,
              type: l.stype,
              list: l.list,
              gllist: l.gllist,
              gllabel: l.gllabel
            };
            d.push(c), this.$set(this.formchild, l.key, this.data[l.key]);
          }
          this.fieldListchild = d, console.log(this.fieldListchild);
        }
      });
    },
    //获取下拉框数组值对应对象
    getkeyobj(a, d) {
      const l = {};
      return a.forEach((c) => {
        c.props && (l[c.key] = {}, d[c.key] && d[c.key].forEach((u) => {
          const o = u[c.props.value], y = u[c.props.label];
          l[c.key][o] = y;
        }));
      }), l;
    },
    // 下拉框出现/隐藏时触发 只在cascaderDiy 有调用
    visibleChange(a) {
      const d = this;
      document.querySelectorAll(
        ".popperClass-radio-normal .el-cascader-menu .el-cascader-node"
      ).forEach((c) => {
        const u = c.firstChild, o = c.lastChild;
        function y() {
          const v = d.$refs.cascader[0].getCheckedNodes()[0];
          v && v.isLeaf && (d.$refs.cascader[0].dropDownVisible = !1), o.click(), u.click();
        }
        a ? c.addEventListener("click", y, !1) : c.removeEventListener("click", y, !1);
      });
    },
    // 当展开节点发生变化时触发 只在cascaderDiy 有调用
    expandChange() {
      setTimeout(() => {
        this.visibleChange(!0);
      }, 300);
    },
    timerChange(a, d) {
      a.handleChange && a.handleChange(d, a);
    },
    selectOne(a) {
      this.selectableRange1 = a + this.selectableRange1.slice(8);
    },
    selectTwo(a) {
      this.selectableRange0 = this.selectableRange0.slice(0, 11) + a;
    },
    // 数字组件
    checkNumber(a) {
      this.data[a].match(/\d+(\.\d{0,2})?/) ? this.data[a] = this.data[a].match(/\d+(\.\d{0,3})?/)[0] || null : this.data[a] = null;
    },
    // 获取字段列表
    getConfigList() {
      return this.fieldList.filter(
        (a) => !a.hasOwnProperty("show") || a.hasOwnProperty("show") && (a.show instanceof Function ? a.show() : a.show)
      );
    },
    // 得到placeholder的显示
    getPlaceholder(a) {
      if (a.placeholder)
        return a.placeholder;
      {
        let d;
        return a.type === "input" || a.type === "textarea" || a.type == "text" ? a.placeholder ? d = a.placeholder : d = "请输入" + a.label : a.type === "select" || a.type === "time" || a.type === "date" || a.type === "cascader" ? a.placeholder ? d = a.placeholder : d = "请选择" + (a.filterable === !1 ? "" : "或输入") + a.label : d = a.label, d.replace("：", "");
      }
    },
    // 重置form
    resetFields() {
      this.$refs.generalForm.resetFields();
    },
    // 重置form中指定项校验
    clearValidate(a) {
      this.$refs.generalForm.clearValidate(a);
    },
    // 验证form
    validateSelf() {
      let a = null;
      return this.$refs.generalForm.validate((d) => {
        if (d)
          a = !0;
        else
          return a = !1, !1;
      }), a;
    },
    // 绑定的相关事件
    handleEvent(a) {
      this.$emit("handleEvent", a);
    },
    handleChange(a, d) {
      this.handleEvent(a);
    },
    handleBlur(a, d) {
      this.handleEvent(a);
    },
    // 派发按钮点击事件
    handleClick(a, d) {
      this.$emit("handleClick", a, d);
    }
  }
}, Y = (a) => (q("data-v-524933a3"), a = a(), J(), a), Z = {
  key: 2,
  class: "font15 pr"
}, $ = {
  key: 3,
  class: "font15 pr"
}, ee = {
  key: 13,
  class: "slot_el-time_piker_containner"
}, le = /* @__PURE__ */ Y(() => /* @__PURE__ */ P("span", { class: "zhi" }, "-", -1)), ae = {
  key: 19,
  class: "tags"
}, ne = ["onClick", "title"], de = { class: "elipse" }, te = {
  key: 20,
  class: "tags"
}, oe = ["onDragenter", "onDragstart", "title"], se = { class: "elipse" }, re = ["onClick"];
function ce(a, d, l, c, u, o) {
  const y = h("RenderDom"), v = h("el-input"), O = h("el-input-number"), L = h("el-option"), D = h("el-select"), R = h("el-date-picker"), w = h("el-time-picker"), z = h("el-switch"), m = h("el-checkbox"), H = h("el-checkbox-group"), I = h("el-radio"), K = h("el-radio-group"), B = h("el-cascader"), j = h("el-button"), M = h("el-form-item"), S = h("el-col"), W = h("GeneralForm"), G = h("el-row"), A = h("el-form");
  return t(), s(A, N({ ref: "generalForm" }, a.$attrs, {
    class: ["general-form", [l.themeType, l.className]],
    model: l.data,
    rules: l.rules,
    "label-width": l.labelWidth,
    "label-position": l.labelPosition,
    "validate-on-rule-change": l.validatchange,
    size: l.size ? l.size : "small",
    inline: l.inline
  }), {
    default: f(() => [
      T(G, {
        gutter: l.gutter,
        class: x(l.className)
      }, {
        default: f(() => [
          (t(!0), p(k, null, V(o.getConfigList(), (e, i) => (t(), p(k, null, [
            e.hidden ? r("", !0) : (t(), s(S, {
              key: e.key + i + "_s",
              span: e.span ? e.span : void 0,
              class: x([l.elcolClassName]),
              style: b(e.type == "textword" ? "" : "min-height: 52px")
            }, {
              default: f(() => [
                P("template", null, [
                  e.type == "textword" ? (t(), p("div", {
                    key: 0,
                    class: "font15 pr",
                    style: b([{ color: "#1d2c5c", "font-weight": "900", padding: "0 0 20px 5px" }, e.style])
                  }, [
                    U(_(e.label) + " ", 1),
                    e.appendrender ? (t(), s(y, {
                      key: i,
                      row: l.data[e.key],
                      render: e.appendrender
                    }, null, 8, ["row", "render"])) : r("", !0)
                  ], 4)) : e.type == "textworddata" ? (t(), p("div", {
                    key: 1,
                    class: "font15 pr",
                    style: b([{ color: "#1d2c5c", "font-weight": "900", padding: "0 0 20px 5px" }, e.style])
                  }, [
                    U(_(l.data[e.key]) + " ", 1),
                    e.appendrender ? (t(), s(y, {
                      key: i,
                      row: l.data[e.key],
                      render: e.appendrender
                    }, null, 8, ["row", "render"])) : r("", !0)
                  ], 4)) : e.type == "allrender" ? (t(), p("div", Z, [
                    (t(), s(y, {
                      key: i,
                      row: l.data[e.key],
                      render: e.render
                    }, null, 8, ["row", "render"])),
                    e.appendrender ? (t(), s(y, {
                      key: i,
                      row: l.data[e.key],
                      render: e.appendrender
                    }, null, 8, ["row", "render"])) : r("", !0)
                  ])) : e.type === "allslot" ? (t(), p("div", $, [
                    F(a.$slots, `form-${e.key}`, {}, void 0, !0),
                    e.appendrender ? (t(), s(y, {
                      key: i,
                      row: l.data[e.key],
                      render: e.appendrender
                    }, null, 8, ["row", "render"])) : r("", !0)
                  ])) : (t(), s(M, {
                    key: 4,
                    "label-width": e.labelWidth,
                    prop: e.key ? e.key.replace(/\（[^)]*\）/, "") : i + "_s",
                    label: e.islabel == 0 ? "" : e.label,
                    class: x([
                      e.className,
                      l.formitemclassName,
                      {
                        bordersicon: e.type == "view" && (!l.data[e.key] || l.data[e.key].length <= 0)
                      }
                    ]),
                    rules: e.rules,
                    style: b({
                      width: e.width,
                      height: e.height,
                      color: e.color
                    })
                  }, {
                    default: f(() => [
                      e.titlesort ? (t(), s(y, {
                        key: i,
                        row: l.data[e.key],
                        render: e.render
                      }, null, 8, ["row", "render"])) : r("", !0),
                      e.type === "slot" ? F(a.$slots, `form-${e.key}`, { key: 1 }, void 0, !0) : r("", !0),
                      e.type === "input" || e.type === "password" || e.type === "text" ? (t(), s(v, {
                        key: 2,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        type: e.type,
                        disabled: e.disabled,
                        placeholder: o.getPlaceholder(e),
                        readonly: e.readonly,
                        maxlength: e.maxlength,
                        minlength: e.minlength,
                        debounce: "200",
                        "show-word-limit": "",
                        onBlur: (n) => o.handleBlur(e),
                        onFocus: (n) => o.handleEvent(e.event),
                        onInput: (n) => e.change ? e.change : o.handleChange(e),
                        clearable: e.clearable
                      }, {
                        default: f(() => [
                          e.append ? (t(), s(y, {
                            key: i,
                            row: l.data[e.key],
                            render: e.append
                          }, null, 8, ["row", "render"])) : r("", !0)
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "onUpdate:modelValue", "type", "disabled", "placeholder", "readonly", "maxlength", "minlength", "onBlur", "onFocus", "onInput", "clearable"])) : r("", !0),
                      e.type === "number" ? (t(), s(O, {
                        key: 3,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        disabled: e.disabled,
                        "controls-position": e.position,
                        precision: e.precision,
                        min: e.min,
                        max: e.max,
                        placeholder: o.getPlaceholder(e),
                        onFocus: (n) => o.handleEvent(e.event),
                        onChange: (n) => {
                          e.change && e.change(n);
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "controls-position", "precision", "min", "max", "placeholder", "onFocus", "onChange"])) : r("", !0),
                      e.type === "number2" ? (t(), s(O, {
                        key: 4,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        disabled: e.disabled,
                        "controls-position": e.position,
                        precision: e.precision,
                        min: e.min,
                        max: e.max,
                        placeholder: o.getPlaceholder(e),
                        onChange: (n) => {
                          e.change && e.change(n);
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "controls-position", "precision", "min", "max", "placeholder", "onChange"])) : r("", !0),
                      e.type === "float" ? (t(), s(v, {
                        key: 5,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        type: e.type,
                        disabled: e.disabled,
                        placeholder: o.getPlaceholder(e),
                        onFocus: (n) => o.handleEvent(e.event),
                        onInput: (n) => o.checkNumber(e.key)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "disabled", "placeholder", "onFocus", "onInput"])) : r("", !0),
                      e.type === "textarea" ? (t(), s(v, {
                        key: 6,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        modelModifiers: { trim: !0 },
                        resize: e.resize,
                        maxlength: e.maxlength,
                        type: e.type,
                        disabled: e.disabled,
                        placeholder: o.getPlaceholder(e),
                        "show-word-limit": "",
                        autosize: e.autosize || { minRows: 2, maxRows: 10 },
                        onFocus: (n) => o.handleEvent(e.event)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "resize", "maxlength", "type", "disabled", "placeholder", "autosize", "onFocus"])) : r("", !0),
                      e.type === "inputNumber" ? (t(), s(O, N({
                        key: 7,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        placeholder: o.getPlaceholder(e),
                        precision: e.precision,
                        step: e.step,
                        size: e.size,
                        "controls-position": e.controlsPositionRight,
                        disabled: e.disabled,
                        min: e.min,
                        max: e.max
                      }, e, {
                        class: { flatSpace: !!e.flatSpace },
                        onChange: (n) => o.handleEvent(e.event)
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "placeholder", "precision", "step", "size", "controls-position", "disabled", "min", "max", "class", "onChange"])) : r("", !0),
                      e.type === "select" ? (t(), s(D, {
                        class: x({ tnselect: e.clearable === !1 }),
                        ref_for: !0,
                        ref: e.key,
                        key: e.keys ? e.keys : e.key,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        disabled: e.disabled,
                        clearable: e.clearable == null ? !0 : e.clearable,
                        filterable: e.filterable == null ? !0 : e.filterable,
                        "allow-create": e.allowCreate,
                        "filter-method": e.filter,
                        remote: e.remote,
                        "remote-method": e.remoteMethod,
                        loading: e.loading,
                        placeholder: o.getPlaceholder(e),
                        "value-key": e.valueKey,
                        multiple: e.multiple,
                        "multiple-limit": e.multipleLmit || 0,
                        "collapse-tags": e.collapseTags == null ? !0 : e.collapseTags,
                        props: e.props,
                        onChange: (n) => {
                          e.change && e.change(n, e);
                        },
                        onVisibleChange: (n) => {
                          n && e.vchange && e.vchange(e);
                        }
                      }, {
                        default: f(() => [
                          (t(!0), p(k, null, V(l.listTypeInfo[e.list ? e.list : e.key], (n, g) => (t(), s(L, {
                            key: e.hasOwnProperty("props") ? `${n[e.props.value]}_${g}` : g,
                            label: e.hasOwnProperty("props") ? n[e.props.label] : n,
                            value: e.hasOwnProperty("props") ? n[e.props.value] : n,
                            disabled: n.hasOwnProperty("disabled") ? n.disabled : !1
                          }, null, 8, ["label", "value", "disabled"]))), 128))
                        ]),
                        _: 2
                      }, 1032, ["class", "modelValue", "onUpdate:modelValue", "disabled", "clearable", "filterable", "allow-create", "filter-method", "remote", "remote-method", "loading", "placeholder", "value-key", "multiple", "multiple-limit", "collapse-tags", "props", "onChange", "onVisibleChange"])) : r("", !0),
                      e.type === "date" ? (t(), s(R, {
                        key: 9,
                        style: { "margin-bottom": "0.5px" },
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        type: e.dateType,
                        "picker-options": e.TimePickerOptions,
                        clearable: e.clearable,
                        disabled: e.disabled,
                        placeholder: o.getPlaceholder(e),
                        format: e.format ? e.format : "yyyy-MM-dd HH:mm:ss",
                        "value-format": e.valueFormat ? e.valueFormat : "yyyy-MM-dd HH:mm:ss",
                        "start-placeholder": e.startPlaceholder || "开始日期",
                        "end-placeholder": e.endPlaceholder || "结束日期",
                        onFocus: (n) => o.handleEvent(e.event),
                        onChange: (n) => o.timerChange(e, l.data[e.key]),
                        "default-time": e.dateType && e.dateType.indexOf("range") != -1 ? ["00:00:00", "23:59:59"] : null
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "picker-options", "clearable", "disabled", "placeholder", "format", "value-format", "start-placeholder", "end-placeholder", "onFocus", "onChange", "default-time"])) : r("", !0),
                      e.type === "timeSingle" ? (t(), s(w, {
                        key: 10,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        class: "showbox slot_el-time_piker",
                        disabled: e.disabled,
                        format: e.format || "HH:mm:ss",
                        "value-format": e.format || "HH:mm:ss",
                        placeholder: o.getPlaceholder(e),
                        onChange: (n) => o.timerChange(e, l.data[e.key])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "format", "value-format", "placeholder", "onChange"])) : r("", !0),
                      e.type === "time" ? (t(), s(w, {
                        key: 11,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        format: e.format || "HH:mm:ss",
                        "value-format": e.format || "HH:mm:ss",
                        placeholder: "请选择时间",
                        clearable: e.clearable,
                        disabled: e.disabled,
                        onChange: (n) => o.timerChange(e, l.data[e.key])
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "format", "value-format", "clearable", "disabled", "onChange"])) : r("", !0),
                      e.type === "switch" ? (t(), s(z, {
                        key: 12,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        onChange: (n) => {
                          e.change && e.change(n);
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : r("", !0),
                      e.type === "timeDiy" ? (t(), p("div", ee, [
                        T(w, {
                          modelValue: u.timeOne,
                          "onUpdate:modelValue": d[0] || (d[0] = (n) => u.timeOne = n),
                          class: "showbox slot_el-time_piker",
                          disabled: e.disabled,
                          "is-range": e.isRange,
                          placeholder: "开始时间",
                          "value-format": "HH:mm:ss",
                          "picker-options": {
                            selectableRange: u.selectableRange0
                          },
                          onChange: o.selectOne
                        }, null, 8, ["modelValue", "disabled", "is-range", "picker-options", "onChange"]),
                        le,
                        T(w, {
                          modelValue: u.timeTwo,
                          "onUpdate:modelValue": d[1] || (d[1] = (n) => u.timeTwo = n),
                          class: "showbox slot_el-time_piker",
                          disabled: e.disabled,
                          "is-range": e.isRange,
                          placeholder: "结束时间",
                          "value-format": "HH:mm:ss",
                          "picker-options": {
                            selectableRange: u.selectableRange1
                          },
                          onChange: o.selectTwo
                        }, null, 8, ["modelValue", "disabled", "is-range", "picker-options", "onChange"]),
                        T(w, {
                          modelValue: l.data[e.key],
                          "onUpdate:modelValue": (n) => l.data[e.key] = n,
                          style: { display: "none" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])) : r("", !0),
                      e.type === "checkbox" ? (t(), s(H, {
                        key: 14,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        disabled: e.disabled,
                        min: e.min,
                        max: e.max,
                        onChange: (n) => {
                          e.change && e.change(n);
                        }
                      }, {
                        default: f(() => [
                          (t(!0), p(k, null, V(l.listTypeInfo[e.list ? e.list : e.key], (n, g) => (t(), s(m, {
                            style: { "margin-right": "15px" },
                            key: g,
                            label: e.props ? n[e.props.value] : n,
                            disabled: e.props ? n[e.props.disabled] : !1,
                            border: !!e.border
                          }, {
                            default: f(() => [
                              U(_(e.props ? n[e.props.label] : n), 1)
                            ]),
                            _: 2
                          }, 1032, ["label", "disabled", "border"]))), 128))
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "min", "max", "onChange"])) : r("", !0),
                      e.type === "radio" ? (t(), s(K, {
                        key: 15,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        disabled: e.disabled,
                        onChange: (n) => {
                          e.change && e.change(n);
                        }
                      }, {
                        default: f(() => [
                          (t(!0), p(k, null, V(l.listTypeInfo[e.list ? e.list : e.key], (n, g) => (t(), s(I, {
                            key: g + "_s",
                            border: !!e.border,
                            label: e.props ? n[e.props.value] : n,
                            disabled: n.disabled,
                            style: b({ width: e.compWidth })
                          }, {
                            default: f(() => [
                              U(_(e.props ? n[e.props.label] : n), 1)
                            ]),
                            _: 2
                          }, 1032, ["border", "label", "disabled", "style"]))), 128))
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"])) : r("", !0),
                      e.type == "cascader" ? (t(), s(B, {
                        ref_for: !0,
                        ref: e.key,
                        key: e.keys ? e.keys : e.key,
                        modelValue: l.data[e.key],
                        "onUpdate:modelValue": (n) => l.data[e.key] = n,
                        clearable: "",
                        disabled: e.disabled,
                        options: e.options ? e.options : l.listTypeInfo[e.list ? e.list : e.key],
                        placeholder: o.getPlaceholder(e),
                        "collapse-tags": e.collapseTags == null ? !0 : e.collapseTags,
                        props: {
                          checkStrictly: e.checkStrictly ? e.checkStrictly : !1,
                          expandTrigger: e.expandTrigger ? e.expandTrigger : "hover",
                          multiple: e.multiple ? e.multiple : !1,
                          emitPath: e.emitPath !== void 0 ? e.emitPath : !0,
                          label: e.customLabel ? e.customLabel : "label",
                          value: e.customValue ? e.customValue : "value",
                          children: e.children ? e.children : "children",
                          ...e.props
                        },
                        class: "shadow",
                        filterable: e.filterable == null ? !0 : e.filterable,
                        style: b({ width: e.width || "100%" }),
                        onChange: (n) => {
                          e.change && e.change(n);
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled", "options", "placeholder", "collapse-tags", "props", "filterable", "style", "onChange"])) : r("", !0),
                      e.type == "button" ? (t(), s(j, {
                        key: i,
                        style: b(e.style),
                        type: e.buttonType,
                        class: x(e.className),
                        disabled: e.disabled,
                        onClick: E(e.handleClick, ["stop", "prevent"])
                      }, {
                        default: f(() => [
                          U(_(e.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["style", "type", "class", "disabled", "onClick"])) : e.render ? (t(), s(y, {
                        key: i,
                        row: l.data[e.key],
                        render: e.render
                      }, null, 8, ["row", "render"])) : e.type === "view" ? (t(), p("div", ae, [
                        (t(!0), p(k, null, V(l.data[e.key], (n) => (t(), p("span", {
                          onClick: (g) => o.getclickit(n, e),
                          key: n,
                          class: "tags-item",
                          title: o.getvalues(n, e)
                        }, [
                          P("span", de, _(o.getvalues(n, e)), 1)
                        ], 8, ne))), 128))
                      ])) : e.type == "dragrow" ? (t(), p("div", te, [
                        (t(!0), p(k, null, V(l.data[e.key], (n, g) => (t(), p("div", {
                          class: "tags-item",
                          key: n + "_s",
                          onDragenter: (C) => o.dragenter(C, g, e.key),
                          onDragover: d[2] || (d[2] = (C) => o.dragover(C)),
                          onDragstart: (C) => o.dragstart(g),
                          draggable: "",
                          title: o.getvalues(n, e)
                        }, [
                          P("span", se, _(o.getvalues(n, e)), 1),
                          P("i", {
                            class: "el-icon-close dragrow-icon ml5",
                            onClick: E((C) => o.getdelete(g, e.key), ["stop"])
                          }, null, 8, re)
                        ], 40, oe))), 128))
                      ])) : r("", !0),
                      e.appendrender ? (t(), s(y, {
                        key: i,
                        row: l.data[e.key],
                        render: e.appendrender
                      }, null, 8, ["row", "render"])) : r("", !0)
                    ]),
                    _: 2
                  }, 1032, ["label-width", "prop", "label", "class", "rules", "style"]))
                ])
              ]),
              _: 2
            }, 1032, ["span", "class", "style"])),
            e.isbr ? (t(), s(S, {
              span: 24,
              key: e.key + i + "_n"
            })) : r("", !0),
            e.stype ? (t(), s(S, {
              key: e.key + i + "_add"
            }, {
              default: f(() => [
                T(W, {
                  data: l.data,
                  inline: l.inline,
                  "label-width": l.labelWidth,
                  listTypeInfo: l.listTypeInfo,
                  formitemclassName: l.formitemclassName,
                  fieldList: u.fieldListchild.filter((n) => n.parent_key == e.key)
                }, null, 8, ["data", "inline", "label-width", "listTypeInfo", "formitemclassName", "fieldList"])
              ]),
              _: 2
            }, 1024)) : r("", !0)
          ], 64))), 256)),
          F(a.$slots, "formtp", {}, void 0, !0)
        ]),
        _: 3
      }, 8, ["gutter", "class"]),
      l.formType === "slot" ? F(a.$slots, "form", { key: 0 }, void 0, !0) : r("", !0)
    ]),
    _: 3
  }, 16, ["class", "model", "rules", "label-width", "label-position", "validate-on-rule-change", "size", "inline"]);
}
const pe = /* @__PURE__ */ Q(X, [["render", ce], ["__scopeId", "data-v-524933a3"]]);
export {
  pe as default
};
