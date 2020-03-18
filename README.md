# ele-easy-table

## 安装
```
npm install ele-easy-table -S
```

### 引入

```
import 'ele-easy-table'
```

### 代码演示

```
<ele-easy-table :form="form" :table="table" :formData.sync="formData" @getList="handleSearch"></ele-easy-table>
```

详见 [demo源码](https://github.com/vincentzyc/ele-easy-table/blob/master/src/components/ele-easy-table-demo.vue)

### 注意

依赖 element-ui,你的项目必须安装 element-ui

源码使用的 Element-ui 版本

```
"element-ui": "^2.4.5"
```

### API

#### Props
|属性 | 说明 | 类型 | 默认值 |
|----|-----|------|------|
|form|表格查询条件区域|Object|{}|
|table|表格展示区域|Object|{}|
|formData.sync|表格查询字段|Object|{}|
|pagination|是否显示分页区域|[Boolean,Object]|true|
|other attributes|el-table原生属性|参考[el-table原生属性](https://element.eleme.cn/#/zh-CN/component/table)|-|

- form 子配置项

|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|class|表格查询条件区域样式设置|Object|-|-|
|style|表格查询条件区域内联样式设置|Object|-|-|
|list|表格查询条件列表|Array|-|详见[demo源码](https://github.com/vincentzyc/ele-easy-table/blob/master/src/components/ele-easy-table-demo.vue)|

- table 子配置项

|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|list|表格数据列表|Array|-|-|
|columns|表格头部列表|Array|-|详见[demo源码](https://github.com/vincentzyc/ele-easy-table/blob/master/src/components/ele-easy-table-demo.vue)|
|isLoading|是否显示表格加载动画|Boolean|-|
|showIndex|是否显示序号列|Boolean|true|
|indexFixed|是否固定序号列|Boolean|false|
|indexLabel|自定义序号列表头文字|String|序号|
|selection|表格多选配置|Object|{}|

- selection 子配置项

|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|config|表格多选属性|Object|-|-|

- pagination 子配置项

[el-pagination原生属性](https://element.eleme.cn/#/zh-CN/component/pagination)

#### Methods

##### @getList()
页码切换或者每页显示数目更改时执行，获取数据，然后赋值给 table.list 更新列表

##### other element table events
el-table原生事件，例如：@selection-change="handleSelectionChange" 详见[demo源码](https://github.com/vincentzyc/ele-easy-table/blob/master/src/components/ele-easy-table-demo.vue)

### History
##### v1.1.3 
- 1.新增表格多选配置
- 2.使用 v-bind="$attrs" v-on="$listeners" 移植el-table原生属性
- 使用方法详见 ele-easy-table-demo

##### v1.1.4
- el-pagination 组件新增原生配置项

##### v1.1.5
- 新增自定义表头内容

##### v1.1.6
- 表格序号显示条件优化

##### v1.1.7
- 新增输入框支持enter按键查询表格

##### v1.1.8
- 修复表格序号显示bug