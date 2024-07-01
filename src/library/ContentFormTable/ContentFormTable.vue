<script setup lang="ts">
import { reactive, ref, computed, onBeforeMount, shallowRef } from 'vue';
import type { QueryList, Cols } from '../ContentFormHeader';
import ContentFormHeader from '../ContentFormHeader';
import { Table, Pagination } from 'ant-design-vue';
import type { TableProps } from 'ant-design-vue';
import { isArray, isEmpty } from '@/utils';
import type { VNode, CSSProperties } from 'vue';
import './ContentFormTable.less';

// 获取数组项的类型
type ReturnColumn<T> = T extends Array<infer E> ? E : never;

type TableColumns = TableProps['columns'];

type TableColumn = ReturnColumn<TableColumns>;

// 合成类型
export type Columns = Array<
  TableColumn &
    QueryList[0] & {
      visibleInTable?: boolean;
    }
>;

type SorterList = Array<{ field: string; order: 'ascend' | 'descend' }>;

type ContentFormTableEmits = {
  paginationChange: [pageNum: number, pageSize: number];
};

type ContentFormTableProps = {
  cols?: Cols;
  rowKey: string;
  columns: Columns;
  bordered?: boolean;
  // 是否允许在组件初始化时就可以请求表格数据，默认为 true
  immediate?: boolean;
  showExport?: boolean;
  submitButtonText?: string;
  scroll?: TableProps['scroll'];
  paginationSize?: 'default' | 'small';
  tableSize?: 'small' | 'middle' | 'large';
  // 对表单进行验证，在正式请求表格数据之前会触发。返回 false 表示验证失败，终止请求。
  validateFields?: (query: any) => boolean;
  rowSelection?: TableProps['rowSelection'];
  // 获取表格数据
  queryTableList: (query: any) => Promise<any>;
  showTotal?: (total: number) => VNode | string;
  // 导出表格数据
  exportTableList?: (query: any) => Promise<any>;
  // 允许用户自定义 response
  customResponse?: (data: { code: number; data: any; msg: string }) => { total: number; tableList: any[] };
  // 允许用户自定义 tableSorter
  customTableSorter?: (data: SorterList) => any;
  class?: string | string[] | object;
  tableClass?: string | string[] | object;
  headerClass?: string | string[] | object;
  style?: CSSProperties | string;
  tableStyle?: CSSProperties | string;
  headerStyle?: CSSProperties | string;
};

const props = withDefaults(defineProps<ContentFormTableProps>(), {
  bordered: true,
  immediate: true,
  showTotal: (total: number) => `共${total}条数据`,
  customResponse: ({ data }: { code: number; data: any; msg: string }) => ({ tableList: data.list, total: data.total }),
});

const emits = defineEmits<ContentFormTableEmits>();

defineOptions({ name: 'ContentFormTable', inheritAttrs: false });

/**
 * @param loading            数据加载状态
 * @param sorter             表格排序字段
 * @param combinationColumns 根据 props.columns 分别计算出 ContentFormHeader、ContentFormTable 组件的 queryList 和 columns
 * @param searchCondition    表格查询条件
 * @param contentHeaderRef   ContentFormHeader 组件实例
 * @param tableResource      表格数据
 */
const loading = ref(false);
const sorter = shallowRef<SorterList>([]);
const combinationColumns = computed(computedColumns);
const searchCondition = ref(initialSearchCondition());
const contentHeaderRef = shallowRef<InstanceType<typeof ContentFormHeader>>();
const tableResource = reactive({
  total: 0,
  pageNum: 1,
  pageSize: 10,
  tableList: [] as any[],
});

// 请求表格数据，immediate 表示是否立即请求，false 表示只有当用户触发查询操作时再请求。
onBeforeMount(() => props.immediate && getTableList());

// 计算 queryList、tableColumns
function computedColumns() {
  const newQueryList: QueryList = [];
  const newTableColumns: TableColumns = [];

  props.columns.forEach((item) => {
    const { visibleInTable = true, component, formType } = item;

    if (formType || component) {
      newQueryList.push({
        // @ts-ignore
        name: item.name || item.dataIndex,
        title: item.title,
        watch: item.watch,
        options: item.options,
        formType: item.formType,
        component: item.component,
        dataFormat: item.dataFormat,
        properties: item.properties,
        placeholder: item.placeholder,
        initialValue: item.initialValue,
      });
    }

    if (visibleInTable === true) newTableColumns.push(item);
  });

  return { queryList: newQueryList, tableColumns: newTableColumns };
}

/**
 * 初始化表格查询条件（ searchCondition ）
 * 注意，computedColumns 函数一定要在本函数之前执行。
 * 否则，就会出现一个暂时性死区，导致系统异常。
 */
function initialSearchCondition() {
  const result: { [propName: string]: any } = {};

  combinationColumns.value.queryList.forEach((item) => {
    const { dataIndex, name = dataIndex, dataFormat, initialValue } = item;
    if (initialValue) {
      if (typeof dataFormat === 'function') {
        Object.assign(result, dataFormat(initialValue));
      } else {
        result[name!] = initialValue;
      }
    }
  });

  return result;
}

/**
 * 发送请求，获取表格相关资源
 * 只要 props.validateFields() 函数不返回 false，就认定表单验证成功，否则就是失败。
 * 失败不发送请求。
 */
async function getTableList() {
  const params = {
    ...searchCondition.value,
    pageNum: tableResource.pageNum,
    pageSize: tableResource.pageSize,
    order: isEmpty(sorter.value) ? null : sorter.value,
  };

  if (props.validateFields?.(params) !== false) {
    loading.value = true;
    try {
      const resp = await props.queryTableList(params);
      Object.assign(tableResource, props.customResponse(resp));
    } finally {
      loading.value = false;
    }
  } else {
    throw Error('查询条件验证未通过！');
  }
}

// 提交
async function handleSubmit(values: any) {
  searchCondition.value = values;
  Object.assign(tableResource, { pageSize: 10, pageNum: 1 });
  return getTableList();
}

// 重置
async function handleReset(values: any) {
  searchCondition.value = values;
  Object.assign(tableResource, { pageSize: 10, pageNum: 1 });
  return getTableList();
}

// 导出
async function handleExport(values: any) {
  if (props.validateFields?.(values) !== false) {
    return props?.exportTableList?.(values);
  } else {
    return Promise.reject('查询条件验证未通过！');
  }
}

// 分页
function handlePaginationChange(pageNum: number, pageSize: number) {
  Object.assign(tableResource, { pageSize, pageNum });
  emits('paginationChange', pageNum, pageSize);
  getTableList();
}

// 表格排序
function handleTableChange() {
  const sort = arguments[2];
  const result: SorterList = [];
  if (isArray(sort)) {
    sort.forEach((item: any) => {
      const { field, order } = item;
      order && result.push({ field, order });
    });
  } else {
    sort.order && result.push({ field: sort.field, order: sort.order });
  }

  sorter.value = props.customTableSorter?.(result) ?? result;
  getTableList();
}

// 导出内容
const expose = {
  form: contentHeaderRef!.value?.form,
  forceUpdate: async () => getTableList(),
  getQueryData: () => contentHeaderRef.value?.getCurrentFormData?.(),
};
Object.defineProperty(expose, 'form', { get: () => contentHeaderRef.value!.form });
defineExpose(expose);
</script>

<template>
  <!-- eslint-disable-next-line -->
  <section class="qm-content-form-table" :class="class" :style="style">
    <template v-if="combinationColumns.queryList.length">
      <ContentFormHeader
        ref="contentHeaderRef"
        :cols="cols"
        :class="headerClass"
        :style="headerStyle"
        :reset="handleReset"
        :export="handleExport"
        :submit="handleSubmit"
        :showExport="showExport"
        :submitButtonText="submitButtonText"
        :queryList="combinationColumns.queryList"
      >
        <template #insertNode>
          <slot name="insertHeadNode" />
        </template>
      </ContentFormHeader>
    </template>

    <div class="qm-content-form-table-body" :class="tableClass" :style="tableStyle">
      <div class="qm-content-form-table-body-head">
        <p style="margin-left: 16px">查询表格</p>
        <slot name="extra"></slot>
      </div>

      <Table
        bordered
        v-bind="$attrs"
        :rowKey="rowKey"
        :scroll="scroll"
        :size="tableSize"
        :loading="loading"
        :pagination="false"
        :rowSelection="rowSelection"
        :dataSource="tableResource.tableList"
        :columns="combinationColumns.tableColumns"
        @change="handleTableChange"
      >
        <template #bodyCell="bodyCellProps">
          <slot name="bodyCell" v-bind="bodyCellProps"></slot>
        </template>
      </Table>
      <Pagination
        :size="paginationSize"
        :showTotal="showTotal"
        :total="tableResource.total"
        :current="tableResource.pageNum"
        :pageSize="tableResource.pageSize"
        class="qm-content-form-table-pagination"
        @change="handlePaginationChange"
      />
    </div>
  </section>
</template>
