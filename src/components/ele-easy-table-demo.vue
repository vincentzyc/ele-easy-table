<template>
  <div>
    <!-- <ele-easy-table :condition="condition" :table="table" :pagination="false" :formData.sync="formData" @getList="handleSearch"> -->
    <ele-easy-table :condition="condition" :table="table" :formData.sync="formData" @getList="handleSearch">
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
    </ele-easy-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        filterStartTime: "2019-01-01",  //设置默认值
        filterEndTime: "2019-01-07",  //设置默认值
        filterStartAndEndTime: ["2019-01-01", "2019-01-07"], //设置默认值
        pageIndex: 1,
        pageSize: 2,
        totalCount: 6,
      },
      condition: [{
        type: 'datePicker',
        key: 'filterStartAndEndTime',
        startKey: 'filterStartTime',
        endKey: 'filterEndTime',
        label: '起止时间：'
      }, {
        type: 'input',
        key: 'modelName',
        label: '输入框：'
      }, {
        type: 'select',
        key: 'productType',
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
        label: '选择框：'
      }, {
        type: 'button',
        text: '查询',
        handleClick: () => {
          console.log('11111111111');
          this.handleSearch();
        }
      }, {
        type: 'slot',
        slot: 'slot1'
      }],
      table: {
        list: [{
          data1: '111',
          data2: '111111',
        }, {
          data1: '222',
          data2: '222222',
        }, {
          data1: '333',
          data2: '333333',
        }, {
          data1: '111',
          data2: '111111',
        }, {
          data1: '222',
          data2: '222222',
        }, {
          data1: '333',
          data2: '333333',
        }],
        columns: [{
          key: 'data1',
          label: '标题1'
        }, {
          key: 'data2',
          label: '标题2',
          type: 'format',
          format: row => {
            return row.data2 + '%';
          }
        }, {
          key: 'data3',
          label: '操作',
          type: 'textBtn',
          textBtn: [{
            text: "操作一",
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
        }]
      }
    }
  },
  methods: {
    handleSearch() {
      console.log('2222222222222');
    },
    test1() {
      console.log(this.formData);
    },
    handleView(command) {
      console.log(command);
    }
  }
}
</script>

