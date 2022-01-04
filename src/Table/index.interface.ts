import { CSSProperties, ReactElement, ReactNode } from "react";
import { PaginationProps, SpinProps, SelectProps, TreeSelectProps } from 'antd'
import type { ProColumns, ProColumnType } from '@ant-design/pro-table';

export interface PropsTypes {
  data: any[];

  /**
   * @description       列定义，参考 https://procomponents.ant.design/components/table#api
   */
  columns: ProColumns[];

  /**
   * @description       是否显示表格索引
   */
  showIndex?: boolean | 'indexBorder';

  /**
   * @description       渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-right，相当于toolBarRender
   */
  children?: ReactElement;

  /**
   * @description       封装的 table 的 className
   */
  tableClassName?: string;

  /**
   * @description       封装的 table 的 style
   */
  tableStyle?: CSSProperties;

  /**
   * @description       class
   */
  className?: string;

  /**
   * @description       table 工具栏，设为 false 时不显示
   * @default           { fullScreen: false, reload: false, setting: true, density: true, upload: false, download: true, add: true, delete: false }
   */
  options?: false | {
    fullScreen: boolean,
    reload: boolean,
    setting: true,
    density?: boolean,
    upload?: boolean,
    download?: boolean,
    add?: boolean;
    delete?: boolean;

    /**
     * @description       导入
     */
    onUpload?: () => void;

    /**
     * @description       导出
     */
    onDwonload?: () => void;

    /**
     * @description       新增
     */
    onAdd?: () => void;

    /**
     * @description       删除
     */
    onDelete?: () => void;
  } | undefined;

  /**
   * @description       标签
   */
  tabs?: {
    type?: 'inline' | 'dropdown' | 'tab';
    activeKey: string;
    onChange?: (activeKey?: React.Key) => void;
    items: {
      key: string;
      label: React.ReactNode;
      disabled?: boolean;
    }[]
  };

  /**
   * @description       转化 moment 格式数据为特定类型，false 不做转化
   * @default           string
   */
  dateFormatter?: false | "string" | "number" | undefined;

  /**
   * @description       确定数据的唯一值
   */
  rowKey?: string;

  /**
   * @description      分页，参考 https://ant.design/components/pagination-cn/
   */
  pagination?: PaginationProps;

  /**
   * @description       页面是否加载中
   */
  loading?: boolean | SpinProps;

  /**
   * @description       大小
   */
  defaultSize?: 'small' | 'middle' | 'large' | undefined;

  /**
   * @description       提交表单时触发
   */
  onSubmit?: ((params: any) => void) | undefined;

  /**
   * @description       重置表单时触发
   */
  onReset?: () => void;

  /**
   * @description       防抖时间
   * @default           10
   */
  debounceTime?: number;
}

export interface ColumnTypes extends ProColumnType {

}

export interface FieldNamesTypes {
  label: string;
  value: string;
  children?: string;
}

/**
 * @description       创建带有选择框的列
 */
export interface SelectColumnTypes extends ProColumnType {
  /**
   * @description       选项
   */
  datas: any[];
  /**
   * @description       自定义节点 label、value 的字段
   * @default           { label: "name", value: "id" }
   */
  fieldNames?: FieldNamesTypes;

  /**
   * @description       选中结果数组转成字符串
   * @default           ,
   */
  arr2Str?: boolean | string;

  /**
   * @description       select API https://ant.design/components/select-cn/#API
   */
  props?: SelectProps;
}

/**
 * @description       创建树状结构的列
 */
export interface TreeSelectColumnTypes extends ProColumnType {
  /**
   * @description       选项
   */
  datas: any[];

  /**
   * @description       自定义节点 label、value 的字段
   * @default           { label: "name", value: "id" }
   */
  fieldNames?: FieldNamesTypes;

  /**
   * @description       选中结果数组转成字符串
   * @default           ,
   */
  arr2Str?: boolean | string;

  /**
   * @description       tree-select API https://ant.design/components/tree-select-cn/#API
   */
  props?: TreeSelectProps;
}

/**
 * @description       创建时间日期结构的列
 */
export interface DateTimeColumnTypes extends ProColumnType {
  /**
   * @description       类型
   * @default           dateRange
   */
  valueType?: "date" | "dateRange" | "time" | "timeRange" | "dateTime" | "dateTimeRange",

  /**
   * @description       返回值key
   * @default           为数组默认['startTime', 'endTime']  为字符串默认 'date'
   */
  resultKeys?: string | [string, string];
}

/**
 * @description       创建单选框、多选框结构的列
 */
export interface FormButtonColumnTypes extends ProColumnType {
  /**
   * @description       选项
   */
  datas: any[];

  /**
   * @description       返回值key
   */
  resultKeys: string;

  /**
  * @description       类型
  * @default           radio
  */
  valueType?: "radio" | "radioButton" | "checkbox",

  /**
   * @description       自定义节点 label、value 的字段
   * @default           { label: "name", value: "id" }
   */
  fieldNames?: FieldNamesTypes;

  /**
   * @description       选中结果数组转成字符串
   * @default           ,
   */
   arr2Str?: boolean | string;

  /**
   * @description       tree-select API https://ant.design/components/tree-select-cn/#API
   */
  props?: TreeSelectProps;
}

export interface ActionColumn extends ProColumnType {
  /**
   * @description       选项
   */
  datas: {
    name: string;
    onClick: (text: ReactNode, record: any, index: number) => void;
    href?: string;
    blank?: boolean;
  }[];

  /**
   * @description       
   */
  title?: string;

  key?: string;

  renderButton?: () => void;
}

