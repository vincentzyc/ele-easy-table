<template>
  <div>
    <ele-easy-table
      :form="form"
      :table="table"
      :formData.sync="formData"
      @getList="handleSearch"
      @selection-change="handleSelectionChange"
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
        <span>
          <span>自定义标题</span>
          <i class="el-icon-star-on"></i>
        </span>
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
        totalCount: 6,
      },
      defaultColumns:['data1','data3'],
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
        disabledCustom:true,
        textBtn: [{
          text: "操作一",
          funcConfig: row => {
            if (row.data1 === '333') return { disabled: true }
          },
          handleClick: row => { console.log(row, '操作一') }
        }, {
          text: "操作二",
          handleClick: row => { console.log(row, '操作二') }
        }, {
          text: "操作三",
          handleClick: row => { console.log(row, '操作三') }
        }]
      }, {
        key: 'data4',
        label: '编辑',
        type: 'slot',
        slot: 'slot2'
      }],
      form: {
        style: {
          background: '#f2f2f2',
          paddingTop: '20px'
        },
        list: [{
          type: 'datePicker',
          key: 'filterStartAndEndTime',
          startKey: 'filterStartTime',
          endKey: 'filterEndTime',
          label: '起止时间'
        }, {
          type: 'input',
          key: 'modelName',
          label: '输入框'
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
          type: 'button',
          text: '查询',
          handleClick: () => {
            console.log('11111111111');
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
          slot: 'slot1'
        }]
      },
      table: {
        selection: {
          show: true,
          config: {
            selectable: row => row.data1 !== '222'
          }
        },
        list: [{
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
        }],
        columns: []
      }
    }
  },
  methods: {
    async handleSearch() {
      console.log(this.formData);
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
  }
}
</script>

