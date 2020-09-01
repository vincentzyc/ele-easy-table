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
|foldNum|表格查询条件超过多少个时折叠|Number|-|无此参数则全部展示|
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

##### v1.1.9
- 修复无翻页情况下表格序号显示bug

##### v1.2.0
- 查询条件支持折叠

##### v1.2.1
- slot类型查询条件支持配置是否折叠

##### v1.2.2
- 表格handleClick事件支持第二个参数scope，可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考[demo源码](https://github.com/vincentzyc/ele-easy-table/blob/master/src/components/ele-easy-table-demo.vue)

##### v1.2.3
- 新增 handleExpand 事件（条件折叠后的回调事件）

| 事件 | 说明 | 参数 |
|----|-----|------|
|handleExpand|条件折叠后的回调事件|isExpand|

- 表格新增内联样式 overflow: visible; 
  实现表头粘性布局只需添加以下样式即可
  > 注意：如果是 scoped 样式需使用 >>> 操作符（详情见文档[CSS作用域](https://vue-loader-v14.vuejs.org/zh-cn/features/scoped-css.html)）

  ```css
  /* 全局样式 */
  .el-table__header-wrapper{
    position: sticky;
    top: 0;
    z-index: 999;
  }
  /* scoped 局部样式 */
  .ele-easy-table-demo >>> .el-table__header-wrapper {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  ```
  详情见[demo源码](https://github.com/vincentzyc/ele-easy-table/blob/master/src/components/ele-easy-table-demo.vue)

##### v1.2.4
- 查询条件支持配置placeholder

##### v1.2.5
- 自定义事件改用 kebab-case 命名,详情见[vuejs官网-自定义事件#事件名](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E4%BA%8B%E4%BB%B6%E5%90%8D)