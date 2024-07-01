<script setup lang="ts">
import { ref, reactive, onMounted, computed, watchEffect, shallowRef } from 'vue';
import { UpOutlined, DownOutlined } from '@ant-design/icons-vue';
import { Form, Button, Row, Col } from 'ant-design-vue';
import RenderItem from './RenderItem.vue';
import { isEmpty } from '@/utils';
import './ContentFormHeader.less';
import type { VNode } from 'vue';

export type Cols = 2 | 3 | 4 | 6 | 8 | 12 | 24;

export type QueryList = Array<{
  title: string;
  name?: string;
  properties?: any;
  formType?: string;
  initialValue?: any;
  dataIndex?: string;
  options?: Array<any>;
  component?: () => VNode;
  placeholder?: string | [string, string];
  watch?: (value: any, formModel: any) => void;
  dataFormat?: (value: any) => { [propName: string]: any };
}>;

type ContentFormHeadProps = {
  cols?: Cols;
  queryList: QueryList;
  showExport?: boolean;
  defaultExpand?: boolean;
  submitButtonText?: string;
  hideResetButton?: boolean;
  submit?: (value: any) => Promise<any>;
  export?: (value: any) => Promise<any>;
  reset?: (value: any) => Promise<any>;
};

const props = withDefaults(defineProps<ContentFormHeadProps>(), {
  showExport: false,
  defaultExpand: true,
  hideResetButton: false,
  hideExportButton: true,
  submitButtonText: '提交',
}); // 定义每个 Col 元素的宽度
enum ColSpanEnum {
  xxl = 6,
  xl = 8,
  lg = 8,
  md = 12,
  sm = 12,
  xs = 12,
}

const { useForm, Item: FormItem } = Form;

defineOptions({ name: 'ContentFormHeader' });

/**
 * @param containerRef 容器节点对象
 * @param formModel    表单数据
 * @param colsNumber   一行可以展示几列
 * @param colSpan      每列占多少个 span，一行共 24 个 span
 * @param expand       表单是否展开
 * @param form         表单对象
 */
const containerRef = shallowRef<HTMLDivElement>();
const formModel = reactive(initialFormModal()); // eslint-disable-line
const colsNumber = ref<Cols>(props?.cols ?? 4); // eslint-disable-line
const colSpan = ref(24 / colsNumber.value); // eslint-disable-line
const expand = ref(props.defaultExpand); // eslint-disable-line
const form = useForm(formModel);

const submitLoading = ref(false);
const exportLoading = ref(false);
const resetLoading = ref(false);

onMounted(() => {
  if (typeof props.cols === 'undefined') computedColSpan();
});

watchEffect(() => {
  if (props.cols) {
    colsNumber.value = props.cols;
    colSpan.value = 24 / props.cols;
  }
});

// 计算共多少行
const rowsNumber = computed(() => Math.ceil((props.queryList.length + 1) / colsNumber.value));
// 最后一列（提交、收起按钮所在的列）的 offset
const buttonGroupOffset = computed(() => {
  const total = props.queryList.length;
  const cols = colsNumber.value;
  const reset = total % cols;

  if (total < cols) return cols - total - 1;

  if (!expand.value) return 0;

  if (total === cols) return cols - 1;
  return cols - reset - 1;
});

function initialFormModal() {
  return props.queryList.reduce(
    (memo, item) => {
      const { dataIndex, name = dataIndex, initialValue } = item;
      memo[name!] = initialValue || null;
      return memo;
    },
    {} as { [propName: string]: string | number | Array<any> },
  );
}

function computedColSpan() {
  const width = containerRef.value!.offsetWidth;
  let span: number;
  if (width >= 1600) {
    span = ColSpanEnum.xxl;
  } else if (width >= 1200) {
    span = ColSpanEnum.xl;
  } else if (width >= 992) {
    span = ColSpanEnum.lg;
  } else if (width >= 768) {
    span = ColSpanEnum.md;
  } else {
    span = ColSpanEnum.sm;
  }
  colSpan.value = span;
  colsNumber.value = (24 / span) as Cols;
}

// 表单数据格式化，
function formModelsFormat() {
  const result = { ...formModel };
  props.queryList.forEach((item) => {
    const { dataIndex, name = dataIndex, dataFormat } = item;
    const fieldValue = result[name!];
    // 如果值为 null、undefined 则删除该数据
    // eslint-disable-next-line
    if (fieldValue == null) {
      delete result[name!];
    } else if (typeof dataFormat === 'function') {
      delete result[name!];
      // 先判断表单项是否有值，如果有值则进行数据格式话操作。
      !isEmpty(fieldValue) && Object.assign(result, dataFormat(formModel[name!]));
    }
  });
  return result;
}

function handleSubmit() {
  submitLoading.value = true;
  props?.submit?.(formModelsFormat()).finally(() => (submitLoading.value = false));
}

function handleReset() {
  form.resetFields();
  resetLoading.value = true;
  props?.reset?.(formModelsFormat()).finally(() => (resetLoading.value = false));
}

function handleExport() {
  exportLoading.value = true;
  props?.export?.(formModelsFormat()).finally(() => (exportLoading.value = false));
}

defineExpose({
  form,
  getCurrentFormData: formModelsFormat,
});
</script>

<template>
  <div ref="containerRef" class="content-form-head">
    <Form :model="formModel">
      <Row class="content-form-head-row" :style="{ height: expand ? `${56 * rowsNumber}px` : '56px' }">
        <template v-for="(item, index) in queryList" :key="item.name || item.dataIndex">
          <Col v-show="expand || (!expand && index + 1 < colsNumber)" :span="colSpan">
            <FormItem :name="item.name || item.dataIndex" :label="item.title">
              <RenderItem
                v-model:value="formModel[item.name || item.dataIndex!]"
                :form="form"
                :title="item.title"
                :watch="item.watch"
                :options="item.options"
                :formType="item.formType"
                :component="item.component"
                :properties="item.properties"
                :placeholder="item.placeholder"
              />
            </FormItem>
          </Col>
        </template>

        <Col :offset="buttonGroupOffset * colSpan" :span="colSpan">
          <FormItem>
            <div style="display: flex; justify-content: flex-end; align-items: flex-start">
              <Button type="primary" :loading="submitLoading" @click="handleSubmit">
                {{ submitButtonText }}
              </Button>

              <Button v-if="!hideResetButton" :loading="resetLoading" style="margin-left: 8px" @click="handleReset">
                重置
              </Button>

              <Button v-if="showExport" :loading="exportLoading" style="margin-left: 8px" @click="handleExport">
                导出
              </Button>
              <slot name="insertNode" />
              <Button v-if="queryList.length >= colsNumber" type="link" @click="expand = !expand">
                {{ expand ? '收起' : '展开' }}
                <UpOutlined v-if="expand" />
                <DownOutlined v-else />
              </Button>
            </div>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>
