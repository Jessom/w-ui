---
nav:
  title: 组件
  path: /components
group:
  path: /
  title: 数据展示
---

## Table - 表格
本组件是基于[ProTable](https://procomponents.ant.design/components/table)的再次封装

```tsx
import React from 'react';
import { Button } from 'antd'
import Table, { createColumn, createSelectColumn, createTreeSelectColumn, createDateTimeColumn, createFormButtonColumn, createActionColumn } from 'w-ui/Table';

const data = [
  { key: '123', deptName: '今天是个好日子', orderNo: 'ON45646456432858', state: '安居客水电费',created_at: '2021-12-16' }
]

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const valueEnum = [
  { name: '运行中', id: '131' },
  { name: '已上线', id: '485' },
  { name: '异常', id: '879' },
];

const columns: any[] = [
  createTreeSelectColumn({
    datas: treeData,
    title: '部门',
    dataIndex: 'deptName',
    tip: '需要筛选的部门，可多选',
    fieldNames: {
      label: "title",
      value: "value"
    }
  }),
  createColumn({
    title: '订单编号',
    dataIndex: 'orderNo'
  }),
  createSelectColumn({
    title: '状态',
    dataIndex: 'state',
    datas: [
      { key: "123", title: "已解决" },
      { key: "987", title: "未解决" },
      { key: "465", title: "解决中" },
    ],
    fieldNames: {
      label: 'key',
      value: 'title'
    },
    props: {
      showSearch: true,
      mode: "multiple",
    }
  }),
  createDateTimeColumn({
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: "date",
    resultKeys: 'time'
  }),
  createFormButtonColumn({
    title: '单选状态',
    dataIndex: 'radio',
    resultKeys: 'danxuan',
    datas: valueEnum,
    hideInTable: true
  }),
  createFormButtonColumn({
    title: '单选按钮',
    dataIndex: 'radioButton',
    valueType: 'radioButton',
    resultKeys: 'danxuanbtn',
    datas: valueEnum
  }),
  createFormButtonColumn({
    title: '多选',
    dataIndex: 'checkbox',
    valueType: 'checkbox',
    resultKeys: 'duoxuan',
    datas: valueEnum
  }),
  createActionColumn({
    datas: [
      { name: '查看', onClick: (text, record) => {} },
      { name: '编辑', onClick: (text, record) => {} },
      { name: '操作', onClick: (text, record) => {} },
    ]
  })
];

const onSubmit = (e) => {
  console.log(e);
}
export default () => {
  return (
    <Table
      onSubmit={onSubmit}
      columns={columns}
      data={data}
      showIndex="indexBorder"
      rowKey="key"
      tabs={{
        activeKey: "tab1",
        onChange: (key) => {},
        items: [
          { key: "tab1", label: "已完成" },
          { key: "tab2", label: "未完成" },
          { key: "tab3", label: "待完成" },
        ]
      }}
      options={{delete: true}}
    ></Table>
  );
};
```

<API></API>
