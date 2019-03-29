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
|pagination|是否显示分页区域|Boolean|true|


- form 子配置项

|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|style|表格查询条件区域样式设置|Object|-|-|
|list|表格查询条件列表|Array|-|详见[demo源码](https://github.com/vincentzyc/ele-easy-table/blob/master/src/components/ele-easy-table-demo.vue)|

- table 子配置项

|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|list|表格数据列表|Array|-|-|
|columns|表格头部列表|Array|-|详见[demo源码](https://github.com/vincentzyc/ele-easy-table/blob/master/src/components/ele-easy-table-demo.vue)|
|isLoading|是否显示表格加载动画|Boolean|-|
|config|el-table原生配置|Object|-|

#### Methods

##### @getList()
页码切换或者每页显示数目更改时执行，获取数据，然后赋值给 table.list 更新列表