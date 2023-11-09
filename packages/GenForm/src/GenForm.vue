<template>
    <el-form
      ref="generalForm"
      v-bind="$attrs"
      class="general-form"
      :class="[themeType, className]"
      :model="data"
      :rules="rules"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :validate-on-rule-change="validatchange"
      :size="size ? size : 'small'"
      :inline="inline"
    >
      <el-row :gutter="gutter" :class="className">
        <template v-for="(item, index) in getConfigList()">
          <el-col
            v-if="!item.hidden"
            :key="item.key + index + '_s'"
            :span="item.span ? item.span : undefined"
            :class="[elcolClassName]"
            :style="item.type == 'textword' ? '' : 'min-height: 52px'"
          >
            <template>
              <div
                class="font15 pr"
                style="
                  color: #606266;
                  font-weight: 900;
                  padding: 0 0 20px 5px;
                  color: #1d2c5c;
                "
                :style="item.style"
                v-if="item.type == 'textword'"
              >
                {{ item.label }}
                <template v-if="item.appendrender">
                  <RenderDom
                    :key="index"
                    :row="data[item.key]"
                    :render="item.appendrender"
                  />
                </template>
              </div>
  
              <div
                class="font15 pr"
                style="
                  color: #606266;
                  font-weight: 900;
                  padding: 0 0 20px 5px;
                  color: #1d2c5c;
                "
                :style="item.style"
                v-else-if="item.type == 'textworddata'"
              >
                {{ data[item.key] }}
                <template v-if="item.appendrender">
                  <RenderDom
                    :key="index"
                    :row="data[item.key]"
                    :render="item.appendrender"
                  />
                </template>
              </div>
              <div class="font15 pr" v-else-if="item.type == 'allrender'">
                <RenderDom
                  :key="index"
                  :row="data[item.key]"
                  :render="item.render"
                />
                <template v-if="item.appendrender">
                  <RenderDom
                    :key="index"
                    :row="data[item.key]"
                    :render="item.appendrender"
                  />
                </template>
              </div>
              <div class="font15 pr" v-else-if="item.type === 'allslot'">
                <slot :name="`form-${item.key}`" />
                <template v-if="item.appendrender">
                  <RenderDom
                    :key="index"
                    :row="data[item.key]"
                    :render="item.appendrender"
                  />
                </template>
              </div>
  
              <el-form-item
                v-else
                :label-width="item.labelWidth"
                :prop="
                  item.key ? item.key.replace(/\（[^)]*\）/, '') : index + '_s'
                "
                :label="item.islabel == 0 ? '' : item.label"
                :class="[
                  item.className,
                  formitemclassName,
                  {
                    bordersicon:
                      item.type == 'view' &&
                      (!data[item.key] || data[item.key].length <= 0),
                  },
                ]"
                :rules="item.rules"
                :style="{
                  width: item.width,
                  height: item.height,
                  color: item.color,
                }"
              >
                <template slot="label" v-if="item.titlesort">
                  <RenderDom
                    :key="index"
                    :row="data[item.key]"
                    :render="item.render"
                  />
                </template>
                <!-- solt自定义表单 -->
                <template v-if="item.type === 'slot'">
                  <!-- 1111 {{item.key}} -->
                  <slot :name="`form-${item.key}`" />
                </template>
                <!-- 普通输入框 -->
                <el-input
                  v-if="
                    item.type === 'input' ||
                    item.type === 'password' ||
                    item.type === 'text'
                  "
                  v-model="data[item.key]"
                  :type="item.type"
                  :disabled="item.disabled"
                  :placeholder="getPlaceholder(item)"
                  :readonly="item.readonly"
                  :maxlength="item.maxlength"
                  :minlength="item.minlength"
                  debounce="200"
                  show-word-limit
                  @blur="handleBlur(item)"
                  @focus="handleEvent(item.event)"
                  @input="item.change ? item.change : handleChange(item)"
                  :clearable="item.clearable"
                >
                  <template v-if="item.append" slot="append">
                    <RenderDom
                      :key="index"
                      :row="data[item.key]"
                      :render="item.append"
                    />
                  </template>
                </el-input>
                <!-- 计数器 -->
                <el-input-number
                  v-if="item.type === 'number'"
                  v-model="data[item.key]"
                  :disabled="item.disabled"
                  :controls-position="item.position"
                  :precision="item.precision"
                  :min="item.min"
                  :max="item.max"
                  :placeholder="getPlaceholder(item)"
                  @focus="handleEvent(item.event)"
                  @change="
                    (val) => {
                      if (item.change) {
                        item.change(val);
                      }
                    }
                  "
                />
                <el-input-number
                  v-if="item.type === 'number2'"
                  v-model="data[item.key]"
                  :disabled="item.disabled"
                  :controls-position="item.position"
                  :precision="item.precision"
                  :min="item.min"
                  :max="item.max"
                  :placeholder="getPlaceholder(item)"
                  @change="
                    (val) => {
                      if (item.change) {
                        item.change(val);
                      }
                    }
                  "
                />
                <!-- number输入框 -->
                <el-input
                  v-if="item.type === 'float'"
                  v-model="data[item.key]"
                  :type="item.type"
                  :disabled="item.disabled"
                  :placeholder="getPlaceholder(item)"
                  @focus="handleEvent(item.event)"
                  @input="checkNumber(item.key)"
                />
                <!-- 文本输入框 -->
                <el-input
                  v-if="item.type === 'textarea'"
                  v-model.trim="data[item.key]"
                  :resize="item.resize"
                  :maxlength="item.maxlength"
                  :type="item.type"
                  :disabled="item.disabled"
                  :placeholder="getPlaceholder(item)"
                  show-word-limit
                  :autosize="item.autosize || { minRows: 2, maxRows: 10 }"
                  @focus="handleEvent(item.event)"
                />
                <!-- 计数器 -->
                <el-input-number
                  v-if="item.type === 'inputNumber'"
                  v-model="data[item.key]"
                  :placeholder="getPlaceholder(item)"
                  :precision="item.precision"
                  :step="item.step"
                  :size="item.size"
                  :controls-position="item.controlsPositionRight"
                  :disabled="item.disabled"
                  :min="item.min"
                  :max="item.max"
                  v-bind="item"
                  :class="{ flatSpace: !!item.flatSpace }"
                  @change="handleEvent(item.event)"
                />
                <!-- 添加了 select 的 collapse-tags属性， 2020-12-10 -->
                <!-- 选择框 -->
                <el-select
                  :class="{ tnselect: item.clearable === false }"
                  v-if="item.type === 'select'"
                  :ref="item.key"
                  :key="item.keys ? item.keys : item.key"
                  v-model="data[item.key]"
                  :disabled="item.disabled"
                  :clearable="item.clearable == undefined ? true : item.clearable"
                  :filterable="
                    item.filterable == undefined ? true : item.filterable
                  "
                  :allow-create="item.allowCreate"
                  :filter-method="item.filter"
                  :remote="item.remote"
                  :remote-method="item.remoteMethod"
                  :loading="item.loading"
                  :placeholder="getPlaceholder(item)"
                  :value-key="item.valueKey"
                  :multiple="item.multiple"
                  :multiple-limit="item.multipleLmit || 0"
                  :collapse-tags="
                    item.collapseTags == undefined ? true : item.collapseTags
                  "
                  :props="item.props"
                  @change="
                    (val) => {
                      if (item.change) {
                        item.change(val, item);
                      }
                    }
                  "
                  @visible-change="
                    (val) => {
                      if (val && item.vchange) {
                        item.vchange(item);
                      }
                    }
                  "
                >
                  <!--   @change="selectEvent(item)"
                  @focus="focusEvent(item)"
                  @click.native="clickEvent(item)" -->
  
                  <el-option
                    v-for="(childItem, i) in listTypeInfo[
                      item.list ? item.list : item.key
                    ]"
                    :key="
                      item.hasOwnProperty('props')
                        ? `${childItem[item.props.value]}_${i}`
                        : i
                    "
                    :label="
                      item.hasOwnProperty('props')
                        ? childItem[item.props.label]
                        : childItem
                    "
                    :value="
                      item.hasOwnProperty('props')
                        ? childItem[item.props.value]
                        : childItem
                    "
                    :disabled="
                      childItem.hasOwnProperty('disabled')
                        ? childItem['disabled']
                        : false
                    "
                  />
                </el-select>
                <!-- 日期选择框  dateType定义多种类型-->
                <el-date-picker
                  style="margin-bottom: 0.5px"
                  v-if="item.type === 'date'"
                  v-model="data[item.key]"
                  :type="item.dateType"
                  :picker-options="item.TimePickerOptions"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  :placeholder="getPlaceholder(item)"
                  :format="item.format ? item.format : 'yyyy-MM-dd HH:mm:ss'"
                  :value-format="
                    item.valueFormat ? item.valueFormat : 'yyyy-MM-dd HH:mm:ss'
                  "
                  :start-placeholder="item.startPlaceholder || '开始日期'"
                  :end-placeholder="item.endPlaceholder || '结束日期'"
                  @focus="handleEvent(item.event)"
                  @change="timerChange(item, data[item.key])"
                  :default-time="
                    item.dateType && item.dateType.indexOf('range') != -1
                      ? ['00:00:00', '23:59:59']
                      : null
                  "
                />
                <!-- 时间点选择 -->
                <el-time-picker
                  v-if="item.type === 'timeSingle'"
                  v-model="data[item.key]"
                  class="showbox slot_el-time_piker"
                  :disabled="item.disabled"
                  :format="item.format || 'HH:mm:ss'"
                  :value-format="item.format || 'HH:mm:ss'"
                  :placeholder="getPlaceholder(item)"
                  @change="timerChange(item, data[item.key])"
                />
                <el-time-picker
                  v-if="item.type === 'time'"
                  v-model="data[item.key]"
                  :format="item.format || 'HH:mm:ss'"
                  :value-format="item.format || 'HH:mm:ss'"
                  placeholder="请选择时间"
                  :clearable="item.clearable"
                  :disabled="item.disabled"
                  @change="timerChange(item, data[item.key])"
                />
                <!-- 滑块 -->
                <el-switch
                  v-if="item.type === 'switch'"
                  v-model="data[item.key]"
                  @change="
                    (val) => {
                      if (item.change) {
                        item.change(val);
                      }
                    }
                  "
                ></el-switch>
                <!-- 时间点选择（开始结束） -->
                <div
                  v-if="item.type === 'timeDiy'"
                  class="slot_el-time_piker_containner"
                >
                  <el-time-picker
                    v-model="timeOne"
                    class="showbox slot_el-time_piker"
                    :disabled="item.disabled"
                    :is-range="item.isRange"
                    placeholder="开始时间"
                    value-format="HH:mm:ss"
                    :picker-options="{
                      selectableRange: selectableRange0,
                    }"
                    @change="selectOne"
                  />
                  <span class="zhi">-</span>
                  <el-time-picker
                    v-model="timeTwo"
                    class="showbox slot_el-time_piker"
                    :disabled="item.disabled"
                    :is-range="item.isRange"
                    placeholder="结束时间"
                    value-format="HH:mm:ss"
                    :picker-options="{
                      selectableRange: selectableRange1,
                    }"
                    @change="selectTwo"
                  />
                  <!-- 这里处理一下 -->
                  <el-time-picker
                    v-model="data[item.key]"
                    style="display: none"
                  />
                </div>
                <!-- Checkbox  多选框 -->
                <el-checkbox-group
                  v-if="item.type === 'checkbox'"
                  v-model="data[item.key]"
                  :disabled="item.disabled"
                  :min="item.min"
                  :max="item.max"
                  @change="
                    (val) => {
                      if (item.change) {
                        item.change(val);
                      }
                    }
                  "
                >
                  <el-checkbox
                    style="margin-right: 15px"
                    v-for="(childItem, k) in listTypeInfo[
                      item.list ? item.list : item.key
                    ]"
                    :key="k"
                    :label="item.props ? childItem[item.props.value] : childItem"
                    :disabled="
                      item.props ? childItem[item.props.disabled] : false
                    "
                    :border="item.border ? true : false"
                  >
                    {{ item.props ? childItem[item.props.label] : childItem }}
                  </el-checkbox>
                </el-checkbox-group>
                <!-- radio选择器  @change="radioChange(item)"-->
                <el-radio-group
                  v-if="item.type === 'radio'"
                  v-model="data[item.key]"
                  :disabled="item.disabled"
                  @change="
                    (val) => {
                      if (item.change) {
                        item.change(val);
                      }
                    }
                  "
                >
                  <el-radio
                    v-for="(childItem, k) in listTypeInfo[
                      item.list ? item.list : item.key
                    ]"
                    :key="k + '_s'"
                    :border="item.border ? true : false"
                    :label="item.props ? childItem[item.props.value] : childItem"
                    :disabled="childItem.disabled"
                    :style="{ width: item.compWidth }"
                    >{{
                      item.props ? childItem[item.props.label] : childItem
                    }}</el-radio
                  >
                </el-radio-group>
                <!-- {{ listTypeInfo[item.list?item.list:item.key] }} -->
                <!-- 级联选择器 -->
                <el-cascader
                  v-if="item.type == 'cascader'"
                  :ref="item.key"
                  :key="item.keys ? item.keys : item.key"
                  v-model="data[item.key]"
                  clearable
                  :disabled="item.disabled"
                  :options="
                    item.options
                      ? item.options
                      : listTypeInfo[item.list ? item.list : item.key]
                  "
                  :placeholder="getPlaceholder(item)"
                  :collapse-tags="
                    item.collapseTags == undefined ? true : item.collapseTags
                  "
                  :props="{
                    checkStrictly: item.checkStrictly
                      ? item.checkStrictly
                      : false,
                    expandTrigger: item.expandTrigger
                      ? item.expandTrigger
                      : 'hover',
                    multiple: item.multiple ? item.multiple : false,
                    emitPath: item.emitPath !== undefined ? item.emitPath : true,
                    label: item.customLabel ? item.customLabel : 'label',
                    value: item.customValue ? item.customValue : 'value',
                    children: item.children ? item.children : 'children',
                    ...item.props,
                  }"
                  class="shadow"
                  :filterable="
                    item.filterable == undefined ? true : item.filterable
                  "
                  :style="{ width: item.width || '100%' }"
                  @change="
                    (val) => {
                      if (item.change) {
                        item.change(val);
                      }
                    }
                  "
                >
                </el-cascader>
                <!-- 按钮 -->
                <el-button
                  v-if="item.type == 'button'"
                  :key="index"
                  :style="item.style"
                  :type="item.buttonType"
                  :class="item.className"
                  :disabled="item.disabled"
                  @click.stop.prevent="item.handleClick"
                >
                  {{ item.name }}
                </el-button>
                <!--render自定义表单  -->
                <template v-else-if="item.render">
                  <RenderDom
                    :key="index"
                    :row="data[item.key]"
                    :render="item.render"
                  />
                </template>
                <!-- 展示view类型 -->
                <div v-else-if="item.type === 'view'" class="tags">
                  <span
                    v-for="it in data[item.key]"
                    @click="getclickit(it, item)"
                    :key="it"
                    class="tags-item"
                    :title="getvalues(it, item)"
                  >
                    <span class="elipse"> {{ getvalues(it, item) }}</span>
                  </span>
                </div>
                <div v-else-if="item.type == 'dragrow'" class="tags">
                  <div
                    v-for="(it, index) in data[item.key]"
                    class="tags-item"
                    :key="it + '_s'"
                    @dragenter="dragenter($event, index, item.key)"
                    @dragover="dragover($event)"
                    @dragstart="dragstart(index)"
                    draggable
                    :title="getvalues(it, item)"
                  >
                    <span class="elipse">{{ getvalues(it, item) }}</span>
                    <i
                      class="el-icon-close dragrow-icon ml5"
                      @click.stop="getdelete(index, item.key)"
                    ></i>
                  </div>
                </div>
                <template v-if="item.appendrender">
                  <RenderDom
                    :key="index"
                    :row="data[item.key]"
                    :render="item.appendrender"
                  />
                </template>
              </el-form-item>
            </template>
          </el-col>
          <!-- 强制换行 -->
          <el-col
            v-if="item.isbr"
            :span="24"
            :key="item.key + index + '_n'"
          ></el-col>
          <el-col :key="item.key + index + '_add'" v-if="item.stype">
            <GeneralForm
              :data="data"
              :inline="inline"
              :label-width="labelWidth"
              :listTypeInfo="listTypeInfo"
              :formitemclassName="formitemclassName"
              :fieldList="
                fieldListchild.filter((it) => it.parent_key == item.key)
              "
            ></GeneralForm>
          </el-col>
        </template>
        <slot name="formtp" />
      </el-row>
      <!-- 自定义表单 -->
      <template v-if="formType === 'slot'">
        <slot name="form" />
      </template>
    </el-form>
  </template>
  
  <script>
  // const emptyObj = Object.create(null);
  export default {
    name: "GenForm",
    components: {
      RenderDom: {
        name: "RenderDom",
        functional: true,
        props: {
          row: [String, Object, Number, Array],
          render: Function,
          key: String,
        },
        render: (h, data) => {
          const params = {
            row: data.props.row,
            key: data.props.key,
          };
          return data.props.render(h, params);
        },
      },
    },
    props: {
      // 表单主题
      themeType: {
        type: String,
        default: "default",
      },
      formType: {
        type: String,
        default: "default",
      },
      // 自定义类名
      className: {
        type: String,
        default: "",
      },
      // 表单数据
      data: {
        type: Object,
        default: () => {},
      },
      // 相关字段信息
      fieldList: {
        type: Array,
        default: () => [],
      },
      // 验证规则
      rules: {
        type: Object,
        default: () => {},
      },
      // 相关的列表
      listTypeInfo: {
        type: Object,
        default: function () {
          return {};
        },
      },
      // label宽度
      labelWidth: {
        type: String,
        default: "",
      },
      labelPosition: {
        type: String,
        default: "right",
      },
      validatchange: {
        type: Boolean,
        default: true,
      },
      refObj: {
        type: Object,
        default: () => {},
      },
      gutter: {
        type: Number,
        default: 20,
      },
      tb: {
        type: String,
        default: "ts",
      },
      size: {
        type: String,
        default: "small",
      },
      inline: {
        type: Boolean,
        default: false,
      },
      formitemclassName: {
        type: String,
      },
      elcolClassName: {
        type: String,
      },
    },
    data() {
      return {
        // classify: {},
        timeOne: "", // 时间范围下选择的开始时间
        timeTwo: "", // 时间范围------的结束时间
        selectableRange0: "00:00:00 - 23:59:59", // timeOne 开始时间范围
        selectableRange1: "00:00:00 - 23:59:59", // timeTwo 结束时间范围
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
        dragIndex: null,
      };
    },
    computed: {
      timeKey() {
        const o = this.fieldList.find((item) => item.type === "timeDiy");
        if (o) return o.key;
        return null;
      },
      keyobj() {
        const objs = {};
        this.fieldList.forEach((it) => {
          if (it.props) {
            objs[it.key] = {};
            if (this.listTypeInfo[it.key]) {
              this.listTypeInfo[it.key].forEach((j) => {
                const key = j[it.props.value];
                const value = j[it.props.label];
                objs[it.key][key] = value;
              });
            }
          }
        });
        return objs;
      },
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
      timeOne(val) {
        if (this.timeKey && val && this.timeTwo) {
          this.data[this.timeKey] = [val, this.timeTwo];
        } else if (this.timeKey && (!val || !this.timeTwo)) {
          this.data[this.timeKey] = [];
        }
      },
      timeTwo(val) {
        if (this.timeKey && val && this.timeOne) {
          this.data[this.timeKey] = [this.timeOne, val];
        } else if (this.timeKey && (!val || !this.timeOne)) {
          this.data[this.timeKey] = [];
        }
      },
      data: {
        handler() {
          this.initdata();
        },
        deep: true,
      },
    },
    created() {
      const emptyObj = Object.create(null);
      this.classify = emptyObj;
      this.formchild = emptyObj;
      this.initdata();
    },
    methods: {
      getvalues(it, item) {
        if (item.gllist) {
          const list = this.listTypeInfo[item.gllist];
          return this.getnowvalue(list, item.gllabel, it) != ""
            ? this.getnowvalue(list, item.gllabel, it)
            : it;
        } else {
          return it;
        }
      },
      getnowvalue(arr, keyobj, val) {
        if (arr && arr.length > 0) {
          const liarr = arr.filter((it) => {
            return it[keyobj.name] == val;
          });
          if (liarr.length > 0) {
            return keyobj.value ? liarr[0][keyobj.value] : liarr[0];
          } else {
            return "";
          }
        }
      },
      dragstart(index) {
        this.dragIndex = index;
      },
      dragover(e) {
        e.preventDefault();
      },
      dragenter(e, index, key) {
        e.preventDefault();
        // 避免源对象触发自身的dragenter事件
        if (this.dragIndex !== index) {
          const source = this.data[key][this.dragIndex];
          this.data[key].splice(this.dragIndex, 1);
          this.data[key].splice(index, 0, source);
          // 排序变化后目标对象的索引变成源对象的索引
          this.dragIndex = index;
        }
      },
      getdelete(index, key) {
        this.data[key].splice(index, 1);
      },
      getclickit(it, item) {
        this.$nextTick(() => {
          if (this.data[item.related_items]) {
            // if (this.data[item.related_items].indexOf(it) == -1) {
            this.data[item.related_items].push(it);
            // }
          }
        });
      },
      initdata() {
        const keyobj = this.keyobj;
        const tarr = [];
        this.fieldList.forEach((it) => {
          if (it.stype && this.data[it.key] !== undefined) {
            if (it.stype == "add" && it.multiple == true) {
              const arr = this.data[it.key];
              arr.forEach((j) => {
                const key = it.add_key
                  ? `${it.add_key}${it.add_split ? it.add_split : "/"}${j}`
                  : j;
                const obj = {
                  key: key,
                  label:
                    keyobj[it.key] && keyobj[it.key][j] ? keyobj[it.key][j] : j,
                  type: "input",
                  parent_key: it.key,
                  span: it.span,
                };
                tarr.push(obj);
              });
            } else if (it.stype == "view") {
              const obj = {
                key: it.key,
                label: it.labelview ? it.labelview : it.label + "详情",
                props: it.props,
                related_items: it.related_items,
                parent_key: it.key,
                span: it.span,
                type: it.stype,
                list: it.list,
                gllist: it.gllist,
                gllabel: it.gllabel,
              };
              tarr.push(obj);
              this.$set(this.formchild, it.key, this.data[it.key]);
            }
            this.fieldListchild = tarr;
            console.log(this.fieldListchild);
          }
        });
      },
      //获取下拉框数组值对应对象
      getkeyobj(arr, obj) {
        const objs = {};
        arr.forEach((it) => {
          if (it.props) {
            objs[it.key] = {};
            if (obj[it.key]) {
              obj[it.key].forEach((j) => {
                const key = j[it.props.value];
                const value = j[it.props.label];
                objs[it.key][key] = value;
              });
            }
          }
        });
        return objs;
      },
      // 下拉框出现/隐藏时触发 只在cascaderDiy 有调用
      visibleChange(flag) {
        const _this = this;
        const liDoms = document.querySelectorAll(
          ".popperClass-radio-normal .el-cascader-menu .el-cascader-node"
        );
        liDoms.forEach((element) => {
          const checkDom = element.firstChild;
          const textDom = element.lastChild;
          function addClick() {
            const node = _this.$refs["cascader"][0].getCheckedNodes()[0];
            if (node && node.isLeaf) {
              // 最后一级了
              _this.$refs["cascader"][0].dropDownVisible = false;
            }
            textDom.click();
            checkDom.click();
          }
          if (flag) {
            // 添加监听
            element.addEventListener("click", addClick, false);
          } else {
            // 移除监听
            element.removeEventListener("click", addClick, false);
          }
        });
      },
      // 当展开节点发生变化时触发 只在cascaderDiy 有调用
      expandChange() {
        // 该回调在最后一级不会触发
        setTimeout(() => {
          this.visibleChange(true);
        }, 300);
      },
      timerChange(item, v) {
        if (item.handleChange) {
          item.handleChange(v, item);
        }
        return;
      },
      selectOne(time) {
        this.selectableRange1 = time + this.selectableRange1.slice(8);
      },
      selectTwo(time) {
        this.selectableRange0 = this.selectableRange0.slice(0, 11) + time;
      },
      // 数字组件
      checkNumber(val) {
        if (this.data[val].match(/\d+(\.\d{0,2})?/)) {
          this.data[val] = this.data[val].match(/\d+(\.\d{0,3})?/)[0] || null;
        } else {
          this.data[val] = null;
        }
      },
      // 获取字段列表
      getConfigList() {
        //只显示有的
        return this.fieldList.filter(
          (item) =>
            !item.hasOwnProperty("show") ||
            (item.hasOwnProperty("show") &&
              (item.show instanceof Function ? item.show() : item.show))
        );
      },
      // 得到placeholder的显示
      getPlaceholder(row) {
        if (row.placeholder) {
          return row.placeholder;
        } else {
          let placeholder;
          if (
            row.type === "input" ||
            row.type === "textarea" ||
            row.type == "text"
          ) {
            if (row.placeholder) {
              placeholder = row.placeholder;
            } else {
              placeholder = "请输入" + row.label;
            }
          } else if (
            row.type === "select" ||
            row.type === "time" ||
            row.type === "date" ||
            row.type === "cascader"
          ) {
            if (row.placeholder) {
              placeholder = row.placeholder;
            } else {
              placeholder =
                "请选择" + (row.filterable === false ? "" : "或输入") + row.label;
            }
          } else {
            placeholder = row.label;
          }
          return placeholder.replace("：", "");
        }
      },
      // 重置form
      resetFields() {
        this.$refs["generalForm"].resetFields();
      },
      // 重置form中指定项校验
      clearValidate(name) {
        this.$refs["generalForm"].clearValidate(name);
      },
      // 验证form
      validateSelf() {
        let bool = null;
        this.$refs["generalForm"].validate((valid) => {
          if (valid) {
            bool = true;
          } else {
            bool = false;
            return false;
          }
        });
        return bool;
      },
      // 绑定的相关事件
      handleEvent(evnet) {
        this.$emit("handleEvent", evnet);
      },
      handleChange(evnet, item) {
        this.handleEvent(evnet);
      },
      handleBlur(evnet, item) {
        this.handleEvent(evnet);
      },
      // 派发按钮点击事件
      handleClick(event, data) {
        this.$emit("handleClick", event, data);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  $type: (
      dark //主题名称
      #ffffff //formLabelFontColor-标签字体颜色
      #fff //borderColor-框线边框颜色
      #dcdfe6 //disCheckBorderColor-单（多）选框禁用边框颜色
      #59617e4d//tags背景颜色,
      #ffffff//---------------页面组件选中高亮选中高亮颜色
        rgba(245, 247, 250, 0.31) //禁用颜色
    ),
    (
      darkactive //主题名称
      #ffffff //formLabelFontColor-标签字体颜色
      #c4e1ff //borderColor-框线边框颜色
      rgba(245, 247, 250, 0.31) //disCheckBgColor-单（多）选框禁用背景颜色
      #59617e4d//tags背景颜色,
      #75cdff//---------------页面组件选中高亮选中高亮颜色
        rgba(245, 247, 250, 0.31)
    ),
    (light);
  .general-form {
    // ::v-deep .el-date-editor.el-range-editor.el-input__inner {
    //   border: 1px solid #dcdfe6;
    // }
    @each $name, $formLabelFontColor, $borderColor, $disCheckBgColor, $tagcolor,
      $activecolor, $disColor in $type
    {
      &.#{$name} {
        ::v-deep .el-form-item {
          &.el-form-item--medium {
            .el-radio__label {
              font-size: 1rem;
            }
          }
          .el-form-item__content {
            text-align: left;
            flex: 1;
          }
          //form组件Label
          .el-form-item__label {
            color: $formLabelFontColor;
          }
  
          //form组件-输入框
          .el-input {
            .el-input__inner {
              border: 0.1rem solid $borderColor;
              background: transparent;
              color: $formLabelFontColor;
            }
            &.is-disabled {
              > .el-input__inner {
                color: $disColor;
                border-color: $disColor;
                cursor: not-allowed;
              }
            }
          }
          .el-select__input {
            color: $formLabelFontColor;
          }
  
          //form组件-文本框
          .el-textarea__inner {
            border: 0.1rem solid $borderColor;
            background: transparent;
            color: $formLabelFontColor;
          }
  
          //form组件-number框
          .el-input-number__decrease {
            background: transparent;
            color: $formLabelFontColor;
            height: 28px;
            line-height: 28px;
            top: 4px;
          }
          .el-input__count-inner,
          .el-input__count,
          .el-cascader__search-input {
            background: rgba(0, 0, 0, 0);
            color: $formLabelFontColor;
          }
  
          //form组件-number框
          .el-input-number__increase {
            background: transparent;
            color: $formLabelFontColor;
            height: 28px;
            line-height: 28px;
            top: 4px;
          }
  
          //form组件-时间框
          .el-range-input {
            background: transparent;
            color: $formLabelFontColor;
          }
          .el-cascader {
            .el-input {
              input::placeholder {
                color: rgba(0, 0, 0, 0);
              }
            }
          }
          .el-cascader__tags {
          }
  
          //form组件-时间分割
          .el-range-separator {
            color: $formLabelFontColor;
          }
  
          //form组件-多选框
          .el-checkbox {
            .el-checkbox__inner {
              background-color: transparent;
              border-color: $borderColor;
              &:hover {
                border-color: $borderColor;
              }
            }
  
            .el-checkbox__label {
              color: $formLabelFontColor;
            }
            &.is-checked > .el-checkbox__label {
              color: $activecolor;
            }
  
            //禁用样式
            &.is-disabled > .el-checkbox__input.is-disabled {
              .el-checkbox__inner {
                background-color: $disCheckBgColor !important;
                border-color: $disColor !important;
                cursor: not-allowed;
              }
            }
            &.is-disabled > .el-checkbox__label {
              color: $disColor;
              cursor: not-allowed;
            }
            //选中样式
            &.is-checked > .el-checkbox__input.is-checked {
              .el-checkbox__inner {
                border-color: $activecolor;
                // &::after {
                // 	background-color: $activecolor;
                // }
              }
            }
            //带边框的属性-选中样式
            &.is-bordered.is-checked {
              border-color: $activecolor;
            }
          }
  
          //form组件-单选框
          .el-radio {
            .el-radio__inner {
              background-color: transparent;
              border-color: $borderColor;
              &:hover {
                border-color: $borderColor;
              }
            }
  
            .el-radio__label {
              color: $formLabelFontColor;
            }
            //禁用样式
            &.is-disabled > .el-radio__input.is-disabled {
              .el-radio__inner {
                background-color: $disColor;
                border-color: $disColor;
                cursor: not-allowed;
              }
            }
            &.is-disabled > .el-radio__label {
              color: $disColor;
              cursor: not-allowed;
            }
            &.is-checked > .el-radio__label {
              color: $activecolor;
            }
            //选中样式
            &.is-checked > .el-radio__input.is-checked {
              .el-radio__inner {
                border-color: $activecolor;
                // &::after {
                // 	background-color: $activecolor;
                // }
              }
            }
            //带边框的属性-选中样式
            &.is-bordered.is-checked {
              border-color: $activecolor;
            }
          }
  
          //form组件-下拉框
          .el-select {
            width: 100%;
            &.is-disabled > .el-select__label {
              color: $disColor;
              cursor: not-allowed;
            }
            > .el-input.is-disabled {
              .el-input__inner {
                color: $disColor;
                border-color: $disColor;
                //   border-color: $disCheckBorderColor;
                //   color: $disCheckBorderColor;
                cursor: not-allowed;
              }
            }
          }
  
          //form组件-标签
          .tags {
            min-height: 40px;
            background: $tagcolor;
            color: $formLabelFontColor;
            // border: 1px solid $borderColor;
            border-radius: 3px;
            display: flex;
            flex-wrap: wrap;
            .dragrow-icon {
              color: $formLabelFontColor;
              margin-left: 3px;
              color: #fe6666;
            }
          }
          //时间组件
          .el-date-editor {
            &.el-range-editor {
              border: 1px solid $borderColor !important;
              &.is-disabled {
                background-color: rgba(0, 0, 0, 0);
                border: 1px solid $disColor !important;
              }
            }
          }
        }
      }
    }
  
    .nbutton {
      margin-bottom: 0px !important;
    }
  
    .el-textarea.is-disabled .el-textarea__inner {
      background-color: #1d2c4c;
      border: 1px solid #1d2c4c;
      color: #adadad;
    }
  
    .el-input-number {
      width: 100%;
      line-height: 36px;
    }
  
    .el-input-number.flatSpace {
      width: 100%;
  
      .el-input__inner {
        text-align: left;
      }
    }
  
    .slot_el-time_piker_containner {
      display: flex;
      justify-content: space-around;
      align-items: center;
  
      span.zhi {
        padding: 0 5px;
      }
  
      .slot_el-time_piker {
        flex: 1;
        display: inline-block;
  
        &.is-disabled {
          background-color: transparent;
          border: 1px solid transparent;
          color: #adadad;
  
          input {
            background-color: #1d2c4c;
            color: #adadad;
            cursor: not-allowed;
          }
        }
      }
    }
  
    .el-input-number.is-disabled.is-controls-right {
      .el-input-number__decrease,
      .el-input-number__increase {
        background-color: #1d2c4c;
        border: 1px solid #1d2c4c;
        color: #adadad;
      }
    }
  
    .el-select .el-input.is-disabled .el-input__inner,
    .el-select .el-input .el-input__inner {
      // height: 36px !important;
    }
  
    /** selectSvg 颜色单独做处理 **/
    .selectSvg .el-input__inner {
      color: transparent !important;
    }
  }
  
  .general-form .el-input--suffix,
  .general-form .el-input__inner,
  .general-form .el-textarea__inner,
  .nav-form .el-input--suffix,
  .nav-form .el-input__inner,
  .nav-form .el-textarea__inner {
    // height: 36px !important;
    // line-height: 36px !important;
  }
  
  .general-form .el-radio.is-bordered {
    height: 36px !important;
    padding: 10px !important;
  }
  
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100% !important;
  }
  
  .el-radio {
    margin-top: 5px !important;
    margin-right: 10px !important;
  }
  
  .el-switch {
    vertical-align: middle !important;
  }
  
  .tnselect {
    width: 100%;
    ::v-deep .el-select__tags {
      .el-tag__close {
        display: none;
      }
    }
  }
  .tags {
    background: rgba(0, 0, 0, 0.3);
    padding: 5px 10px;
    text-align: left;
    &-item {
      padding: 0px 8px;
      border: 1px solid #fff;
      margin-left: 5px;
      margin-bottom: 5px;
      border-radius: 5px;
      cursor: pointer;
      height: 26px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      overflow: hidden;
    }
  }
  .bordersicon {
    display: none;
  }
  .pr {
    position: relative;
  }
  .elipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  </style>
  