<template>
  <el-dialog title="自定义列" :visible.sync="visible" width="880px" :showClose="false" class="custom-column-wrapper">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="mg-b20">全选</el-checkbox>
    <el-checkbox-group v-model="checkedColumns" @change="handleCheckedColumnsChange">
      <Draggable
        class="el-checkbox-wrapper"
        :list="allColumns"
        :group="{ name:'customColumn'}"
        :animation="166"
        ghostClass="ghost"
        handle=".el-checkbox__label"
      >
        <!-- <el-tooltip v-for="item in allColumns" :key="item.key" :content="item.label" :open-delay="800" placement="top"> -->
        <el-checkbox
          v-for="item in allColumns"
          :key="item.key"
          :label="item.key"
          :disabled="item.disabledCustom"
        >{{item.label}}</el-checkbox>
        <!-- </el-tooltip> -->
      </Draggable>
    </el-checkbox-group>

    <div class="text-center" slot="footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//  自定义表格列 && 自定义排序  
//  <CustomColumn 
//   :show.sync="showCustomColumn" //打开弹框
//   :localName="localName"  //存本地name
//   :baseColumns="baseColumns"  //全部列
//   :defaultColumns="defaultColumns" //首次默认显示的列(不传则显示全部)
//   :columns.sync="table.columns" //展示的列
//  />
import Draggable from 'vuedraggable'
export default {
  name: "CustomColumn",
  components: {
    Draggable
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    localName: {
      require: true,
      type: String
    },
    baseColumns: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    disabledColumns: {
      type: Array,
      default: () => []
    },
    defaultColumns: Array
  },
  data() {
    return {
      visible: false,
      checkAll: true,
      allColumns: [],
      checkedColumns: [],
      isIndeterminate: false
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        if (val) this.initShow()
        this.visible = val;
      }
    },
    visible(val) {
      this.$emit('update:show', val)
    }
  },
  methods: {
    setLStorage(key, value) {
      let str = window.JSON.stringify(value);
      window.localStorage.setItem(key, str);
    },
    getLStorage(key) {
      var str = "";
      str = window.localStorage.getItem(key);
      if (!str) return "";
      return window.JSON.parse(str);
    },
    initLocalStorage() {
      let checkedColumns = this.getLStorage(this.localName) || this.defaultColumns;
      if (Array.isArray(checkedColumns) && checkedColumns.length > 0) {
        let hadCheckedColumns = [], checkedColumn = {};
        checkedColumns.forEach((v, i) => {
          checkedColumn = this.baseColumns.find(item => item.key === v);
          checkedColumn && checkedColumn.key ? hadCheckedColumns.push(checkedColumn) : checkedColumns.splice(i, 1)
        })
        this.baseColumns.forEach(item => {
          if (!checkedColumns.includes(item.key)) this.allColumns.push(item);
        })
        this.allColumns = hadCheckedColumns.concat(this.allColumns);
        this.$emit('update:columns', hadCheckedColumns);
        return this.setLStorage(this.localName, checkedColumns);
      }
      this.allColumns = this.baseColumns;
      return this.$emit('update:columns', this.baseColumns);
    },
    initShow() {
      this.checkedColumns = this.columns.map(v => v.key);
      this.handleCheckedColumnsChange(this.columns)
    },
    cancel() {
      this.visible = false
    },
    confirm() {
      let hadCheckedColumns = [], newCheckedColumns = [];
      this.allColumns.forEach(item => {
        if (this.checkedColumns.includes(item.key)) {
          hadCheckedColumns.push(item);
          newCheckedColumns.push(item.key);
        }
      })
      this.setLStorage(this.localName, newCheckedColumns);
      this.$emit('update:columns', []);
      setTimeout(() => {
        this.$emit('update:columns', hadCheckedColumns);
      }, 10);
      this.visible = false
    },
    handleCheckAllChange(val) {
      this.checkedColumns = val ? this.allColumns.map(v => v.key) : this.allColumns.filter(item => item.disabledCustom).map(v => v.key);
      let checkedCount = this.checkedColumns.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allColumns.length;
    },
    handleCheckedColumnsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allColumns.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allColumns.length;
    }
  },
  created() {
    this.initLocalStorage()
  }
}
</script>

<style>
.custom-column-wrapper .el-dialog__header {
  line-height: 30px;
  color: #303133;
  font-size: 16px;
  padding: 20px 24px 15px 24px;
  background: #f5f5f5;
}

.custom-column-wrapper .el-checkbox-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.custom-column-wrapper .el-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  margin-right: 15px;
}

.custom-column-wrapper .el-checkbox__label {
  width: 180px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.custom-column-wrapper .el-checkbox__label:hover {
  cursor: move;
}
</style>