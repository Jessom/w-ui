import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import { FormInstance, Select, TreeSelect, Tooltip, Button,  Menu, Dropdown } from 'antd';
const { Option } = Select;
const { TreeNode } = TreeSelect;
import type { ActionType } from '@ant-design/pro-table';
import ProTable, { ProColumnType } from '@ant-design/pro-table';
import { CloudDownloadOutlined, CloudUploadOutlined, PlusOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons'
import { PropsTypes, FieldNamesTypes, ColumnTypes, SelectColumnTypes, TreeSelectColumnTypes, DateTimeColumnTypes, FormButtonColumnTypes, ActionColumn } from './index.interface';
import merge from 'lodash/merge'

const Table: React.FC<PropsTypes> = (props) => {
  const [selection, setSelection] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const options = merge({
    fullScreen: false,
    reload: false,
    setting: true,
    density: true,
    upload: false,
    download: true,
    add: true,
    delete: false
  }, props.options)

  if(props.showIndex) {
    props.columns.unshift({
      title: '序号',
      dataIndex: 'index',
      valueType: props.showIndex === true ? 'index' : 'indexBorder',
      width: 60,
    })
  }

  function toolBtns(): ReactElement[] {
    return [
      options.add && (
        <Button type='primary' key={`action_add`} onClick={() => options.onAdd && options.onAdd()}><PlusOutlined />新增</Button>
      ),

      options.delete && (
        <Button 
          type='primary'
          danger
          key={`action_delete`}
          disabled={ selection.selectedRowKeys.length > 0 ? false : true }
          onClick={() => options.onDelete && options.onDelete()}
        >
          <DeleteOutlined />删除
        </Button>
      )
    ]
  }

  return (
    <ProTable
      columns={props.columns}
      rowSelection={options.delete ? {
        selections: true,
        onChange: (selectedRowKeys: any, selectedRows: any) => setSelection({ selectedRowKeys, selectedRows })
      } : false}
      tableClassName={props.tableClassName}
      tableStyle={props.tableStyle}
      className={props.className}
      actionRef={actionRef}
      formRef={formRef}
      options={options}
      loading={props.loading}
      dataSource={props.data}
      columnsState={{
        persistenceKey: `${Date.now()}`,
        persistenceType: 'sessionStorage',
      }}
      rowKey={props.rowKey}
      search={{
        labelWidth: 'auto'
      }}
      pagination={props.pagination}
      dateFormatter={props.dateFormatter}
      headerTitle={
        <div style={{display: 'flex', justifyContent: "flex-end", gap: "8px"}}>
          {!props.tabs && toolBtns()}
        </div>
      }
      toolbar={{
        menu: {
          type: 'tab',
          ...props.tabs
        },

        actions: [
          props.children,
          
          props.tabs && toolBtns(),

          options.download && (
            <div key={`action_export`} className="ant-pro-table-list-toolbar-setting-item" style={{fontSize: '17px'}} onClick={() => options.onDwonload && options.onDwonload()}>
              <Tooltip title="导出">
                <CloudDownloadOutlined />
              </Tooltip>
            </div>
          ),

          options.upload && (
            <div key={`action_import`} className="ant-pro-table-list-toolbar-setting-item" style={{fontSize: '17px'}} onClick={() => options.onUpload && options.onUpload()}>
              <Tooltip title="导入">
                <CloudUploadOutlined />
              </Tooltip>
            </div>
          )
        ]
      }}
      defaultSize={props.defaultSize}
      debounceTime={props.debounceTime}
      onSubmit={props.onSubmit}
      onReset={props.onReset}
    />
  );
};

Table.defaultProps = {
  dateFormatter: 'string',
  rowKey: 'id',
  showIndex: true,
  pagination: {
    pageSize: 10
  },
  loading: false,
  options: {
    fullScreen: false,
    reload: true,
    setting: true
  },
  defaultSize: 'small'
}
export default Table;

/**
 * @description       序列化valueEnum
 * @param datas 
 * @param fieldNames 
 * @returns 
 */
export const serializeValue = (datas: any[], fieldNames: FieldNamesTypes) => {
  let valueEnum: any = {}
  for (let i = 0; i < datas.length; i++) {
    let key = datas[i][fieldNames.label]
    valueEnum[key] = {
      text: datas[i][fieldNames.value]
    }
  }
  return valueEnum
}

/**
 * @description       创建列数据
 * @param ProColumnType
 * @returns ProColumnType
 */
export const createColumn = (options: ColumnTypes) => {
  return merge({
    copyable: false,
    ellipsis: true,
    filters: false,
    placeholder: `请输入${options?.title}`
  }, options || {})
}

/**
 * @description       创建带有选择框的列
 * @param SelectColumnTypes
 * @returns ProColumnType
 */
export const createSelectColumn = (options: SelectColumnTypes) => {
  const defaultOption = createColumn(options || {})
  const { datas, fieldNames = { label: "id", value: "name" } } = options

  let valueEnum = serializeValue(datas, fieldNames)
  let props = merge({
    showSearch: true,
    filterOption: (input: string, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    placeholder: `请选择${options?.title}`,
    arr2Str: ","
  }, options.props)
  return {
    ...defaultOption,
    ellipsis: false,
    valueType: 'select',
    valueEnum: valueEnum,
    renderFormItem: (record: ProColumnType) => {
      return (
        <Select {...props}>
          {datas && datas.map((item: any) => (
            <Option key={item[fieldNames.label]} value={item[fieldNames.label]}>{item[fieldNames.value]}</Option>
          ))}
        </Select>
      );
    },
    search: {
      transform: (value: string | number | string[] | number[], dataIndex: string) => {
        if (Array.isArray(value) && props.arr2Str) {
          return { [dataIndex]: value.join(props.arr2Str) }
        } else {
          return { [dataIndex]: value }
        }
      }
    }
  }
}

/**
 * @description       创建树状结构的列
 */
export const createTreeSelectColumn = (options: TreeSelectColumnTypes) => {
  const defaultOption = createColumn(options || {})
  const { datas, fieldNames = { label: "id", value: "name", children: "children" } } = options

  let props = merge({
    showSearch: true,
    treeNodeFilterProp: fieldNames.label,
    multiple: true,
    showCheckedStrategy: TreeSelect.SHOW_ALL,
    arr2Str: ","
  }, options.props)

  return {
    ...defaultOption,
    ellipsis: false,
    valueType: 'treeSelect',
    fieldProps: {
      options: datas,
      fieldNames,
      placeholder: `请选择${options?.title}`,
      ...props
    },
    search: {
      transform: (value: string | number | string[] | number[], dataIndex: string) => {
        if (Array.isArray(value) && props.arr2Str) {
          return { [dataIndex]: value.join(props.arr2Str) }
        } else {
          return { [dataIndex]: value }
        }
      }
    }
  }
}

export const SHOW_ALL: string = TreeSelect.SHOW_ALL
export const SHOW_PARENT: string = TreeSelect.SHOW_PARENT
export const SHOW_CHILD: string = TreeSelect.SHOW_CHILD

/**
 * @description       创建时间日期结构的列
 */
export const createDateTimeColumn = (options: DateTimeColumnTypes) => {
  const defaultOption = createColumn(options || {})

  let props = merge({
    valueType: "dateRange",
    resultKeys: ['startTime', 'endTime'],
    placeholder: `请选择${options?.title}`
  }, options)
  return {
    ...defaultOption,
    ellipsis: false,
    ...props,
    search: {
      transform: (value: string | [string, string]) => {
        if (value instanceof Array) {
          return {
            [props.resultKeys[0]]: value[0],
            [props.resultKeys[1]]: value[1],
          }
        } else {
          return props.resultKeys instanceof Array ? { 'date': value } : { [props.resultKeys]: value }
        }
      },
    },
  }
}

/**
 * @description       创建单选框、多选框结构的列
 */
export const createFormButtonColumn = (options: FormButtonColumnTypes) => {
  const defaultOption = createColumn(options || {})
  const { datas, fieldNames = { label: "id", value: "name" } } = options

  let valueEnum = serializeValue(datas, fieldNames)
  let props = merge({
    valueType: "radio",
    arr2Str: ','
  }, options)

  return {
    ...defaultOption,
    ellipsis: false,
    ...props,
    valueEnum: valueEnum,
    search: {
      transform: (value: string | number | string[] | number[]) => {
        if (Array.isArray(value) && props.arr2Str) {
          return { [props.resultKeys]: value.join(props.arr2Str) }
        } else {
          return { [props.resultKeys]: value }
        }
      }
    }
  }
}

/**
 * @description       创建操作栏的列
 * @param options ActionColumn
 */
export const createActionColumn = (options: ActionColumn) => {
  const defaultOption = createColumn(options || {})
  const { datas } = options
  const menus = JSON.parse(JSON.stringify(datas)).splice(1)
  
  return {
    width: 120,
    title: '操作',
    key: 'action',
    valueType: 'option',
    ...defaultOption,
    ellipsis: false,
    render: (text: ReactNode, record: any, index: number) => renderBtn(datas, menus, text, record, index)
  }
}

const menu = (menus: any[], text: ReactNode, record: any, index: number) => {
  return (
    <Menu>
      { menus && menus.map((item: any, index: number) => (
        <Menu.Item key={`menu_${index}`}>
          <a href={item.href} target={item.blank ? "_blank" : ""} onClick={() => item.onClick(text, record, index)}>{item.name}</a>
        </Menu.Item>
      )) }
    </Menu>
  )
}

const renderBtn = (datas: any[], menus: any[], text: ReactNode, record: any, index: number) => {
  return (() => {
    if(datas.length > 2) {
      return [
        <a href={datas[0].href} key={`menu_first`} target={datas[0].blank ? "_blank" : ""} onClick={() => datas[0].onClick && datas[0].onClick(text, record, index)}>{datas[0].name}</a>,
        <Dropdown overlay={menu(menus, text, record, index)} key={`menu_more`}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            更多 <DownOutlined />
          </a>
        </Dropdown>
      ]
    } else {
      return datas.map((item, index) => {
        return <a href={item.href} key={`menu_${index}`} target={item.blank ? "_blank" : ""} onClick={() => item.onClick && item.onClick(text, record, index)}>{item.name}</a>
      })
    }
  })()
}
