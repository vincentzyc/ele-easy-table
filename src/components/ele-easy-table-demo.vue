<template>
  <div>
    <ele-easy-table
      :form="form"
      :table="table"
      :formData.sync="formData"
      @getList="handleSearch"
      @selection-change="handleSelectionChange"
      @handleExpand="handleExpand"
      class="ele-easy-table-demo"
    >
      <template slot="slot1">
        <el-button type="primary" size="small" @click="test1()">测试测试</el-button>
      </template>
      <template slot="slot2" slot-scope="{row}">
        <el-dropdown :hide-on-click="false" @command="handleView">
          <span class="el-dropdown-link">
            <el-button type="text">操作</el-button>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{item:row,handle:'RecordDetail'}">查看详情</el-dropdown-item>
            <el-dropdown-item :command="{item:row,handle:'RecordLog'}">查看日志</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template slot="header1">
        <span style="margin-right:8px">自定义标题</span>
        <el-tooltip effect="dark" content="Top Center 提示文字" placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </template>
    </ele-easy-table>
    <CustomColumn
      :show.sync="showCustomColumn"
      localName="ELEEASYTABLE_CUSTOM_COLUMNS"
      :baseColumns="baseColumns"
      :defaultColumns="defaultColumns"
      :columns.sync="table.columns"
    />
  </div>
</template>
<script>
import CustomColumn from './custom-column'
const allList = [{
  data1: '000',
  data2: '第000000',
}, {
  data1: '111',
  data2: '第111111',
}, {
  data1: '222',
  data2: '第222222',
}, {
  data1: '333',
  data2: '第333333',
}, {
  data1: '444',
  data2: '第444444',
}, {
  data1: '555',
  data2: '第555555',
}, {
  data1: '666',
  data2: '第666666',
}, {
  data1: '777',
  data2: '第777777',
}, {
  data1: '888',
  data2: '第888888',
}, {
  data1: '999',
  data2: '第999999',
}, {
  data1: '101010',
  data2: '第10101010',
}]
export default {
  components: {
    CustomColumn
  },
  data() {
    return {
      showCustomColumn: false,
      formData: {
        filterStartTime: "2019-01-01",  //设置默认值
        filterEndTime: "2019-01-07",  //设置默认值
        filterStartAndEndTime: ["2019-01-01", "2019-01-07"], //设置默认值
        pageIndex: 1,
        pageSize: 10,
        totalCount: 11,
      },
      defaultColumns: ['data1', 'data3'],
      baseColumns: [{
        key: 'data1',
        label: '标题1',
        config: {
          sortable: true
        }
      }, {
        key: 'data2',
        label: '标题2',
        header: "header1",
        type: 'format',
        format: row => {
          return row.data2 + '%';
        }
      }, {
        key: 'data3',
        label: '操作',
        type: 'textBtn',
        disabledCustom: true,
        textBtn: [{
          text: "操作一",
          funcConfig: row => {
            if (row.data1 === '333') return { disabled: true }
          },
          handleClick: (row, scope) => { console.log(row, scope) }
        }, {
          text: "操作二",
          handleClick: (row, scope) => { console.log(row, scope) }
        }, {
          text: "操作三",
          handleClick: (row, scope) => { console.log(row, scope) }
        }]
      }, {
        key: 'data4',
        label: '编辑',
        type: 'slot',
        slot: 'slot2'
      }],
      form: {
        foldNum: 3,
        style: {
          background: '#f2f2f2',
          padding: '20px'
        },
        list: [{
          type: 'datePicker',
          key: 'filterStartAndEndTime',
          startKey: 'filterStartTime',
          endKey: 'filterEndTime',
          label: '起止时间'
        }, {
          type: 'input',
          key: 'modelName1',
          label: '输入框1',
          placeholder:"请输入姓名"
        }, {
          type: 'input',
          key: 'modelName2',
          label: '输入框2'
        }, {
          type: 'input',
          key: 'modelName3',
          label: '输入框3'
        }, {
          type: 'select',
          key: 'productType',
          config: {
            filterable: true
          },
          options: [{
            label: '全部',
            value: ''
          }, {
            label: 'API',
            value: 'API'
          }, {
            label: 'H5',
            value: 'H5'
          }],
          label: '选择框'
        }, {
          type: 'select',
          key: 'productName',
          config: {
            filterable: true
          },
          options: ['产品名称1', '产品名称2', '产品名称3'],
          label: '产品名称'
        }, {
          type: 'select',
          key: 'adType',
          config: {
            filterable: true
          },
          options: ['广告类型1', '广告类型2', '广告类型3'],
          label: '广告类型'
        }, {
          type: 'button',
          text: '查询',
          handleClick: (row, key) => {
            console.log(row, key);
            this.handleSearch();
          }
        }, {
          type: 'button',
          text: '自定义列',
          handleClick: () => {
            this.showCustomColumn = true;
          }
        }, {
          type: 'slot',
          slot: 'slot1',
          fold: false
        }]
      },
      table: {
        selection: {
          show: true,
          config: {
            selectable: row => row.data1 !== '222'
          }
        },
        list: [],
        columns: []
      }
    }
  },
  methods: {
    handleExpand(isExpand) {
      console.log(isExpand ? "展开" : "收起");
    },
    getList() {
      return allList.filter((item, key) =>
        key < this.formData.pageSize * this.formData.pageIndex && key >= this.formData.pageSize * (this.formData.pageIndex - 1)
      );
    },
    async handleSearch() {
      console.log(this.formData);
      this.table.list = this.getList()
    },
    handleSelectionChange(multipleSelection) {
      console.log(multipleSelection);
    },
    test1() {
      console.log('test1test1test1test1');
    },
    handleView(command) {
      console.log(command);
    }
  },
  created() {
    this.table.list = this.getList()
  }
}
</script>

<style scoped>
.ele-easy-table-demo >>> .el-table__header-wrapper {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>