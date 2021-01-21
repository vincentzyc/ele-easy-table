<template>
  <el-dialog :showClose="false" :visible.sync="visible" class="custom-column-wrapper" width="880px">
    <template slot="title">
      <div class="custom-column-title-wrapper">
        <div class="custom-column-title">自定义列</div>
        <span class="custom-column-search">搜索列：</span>
        <el-input
          @input="searchColumns"
          placeholder="请输入列名称"
          size="mini"
          style="width:200px"
          v-model="keyWord"
        ></el-input>
      </div>
    </template>
    <div v-show="showColumns.length>0">
      <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckAllChange" v-model="checkAll">全选</el-checkbox>
      <el-checkbox-group @change="handleCheckedColumnsChange" v-model="checkedColumns">
        <Draggable
          :animation="166"
          :group="{ name:'customColumn'}"
          :list="showColumns"
          class="el-checkbox-wrapper"
          ghostClass="ghost"
          handle=".el-checkbox__label"
        >
          <!-- <el-tooltip v-for="item in showColumns" :key="item.key" :content="item.label" :open-delay="800" placement="top"> -->
          <el-checkbox
            :disabled="item.disabledCustom"
            :key="item.key"
            :label="item.key"
            v-for="item in showColumns"
          >{{item.label}}</el-checkbox>
          <!-- </el-tooltip> -->
        </Draggable>
      </el-checkbox-group>
      <div class="text-center" slot="footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button @click="confirm()" type="primary">确 定</el-button>
      </div>
    </div>
    <div v-show="showColumns.length===0">
      <p class="text-center custom-column-search">暂无列数据</p>
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
    defaultColumns: Array
  },
  data() {
    return {
      keyWord: '',
      visible: false,
      checkAll: true,
      allColumns: [],
      showColumns: [],
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
      const str = window.JSON.stringify(value);
      window.localStorage.setItem(key, str);
    },
    getLStorage(key) {
      const str = window.localStorage.getItem(key);
      if (!str) return "";
      try {
        return window.JSON.parse(str);
      } catch (error) {
        window.localStorage.removeItem(key);
        window.location.reload();
      }
    },
    searchColumns(v) {
      this.showColumns = this.allColumns.filter(val => val.label.toUpperCase().includes(v.toUpperCase()))
      this.handleCheckedColumnsChange()
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
        this.showColumns = hadCheckedColumns.concat(this.allColumns);
        this.allColumns = hadCheckedColumns.concat(this.allColumns);
        this.$emit('update:columns', hadCheckedColumns);
        return this.setLStorage(this.localName, checkedColumns);
      }
      this.allColumns = this.baseColumns;
      this.showColumns = this.baseColumns;
      return this.$emit('update:columns', this.baseColumns);
    },
    initShow() {
      this.checkedColumns = this.columns.map(v => v.key);
      this.handleCheckedColumnsChange()
    },
    cancel() {
      this.visible = false
    },
    async confirm() {
      let hadCheckedColumns = [], newCheckedColumns = [];
      this.allColumns.forEach(item => {
        if (this.checkedColumns.includes(item.key)) {
          hadCheckedColumns.push(item);
          newCheckedColumns.push(item.key);
        }
      })
      this.setLStorage(this.localName, newCheckedColumns);
      this.$emit('update:columns', []);
      await this.$nextTick()
      this.$emit('update:columns', hadCheckedColumns);
      this.visible = false
    },
    handleCheckAllChange(bool) {
      const showColumnsKeys = bool ? this.showColumns.map(v => v.key) : this.showColumns.filter(item => !item.disabledCustom).map(v => v.key)
      this.checkedColumns = bool
        ? this.checkedColumns = [...new Set([...this.checkedColumns, ...showColumnsKeys])]
        : this.checkedColumns.filter(key => !showColumnsKeys.includes(key))
      this.handleCheckedColumnsChange()
    },
    handleCheckedColumnsChange() {
      this.checkAll = this.showColumns.every(v => this.checkedColumns.includes(v.key))
      this.isIndeterminate = !this.checkAll && this.showColumns.some(v => this.checkedColumns.includes(v.key))
    }
  },
  beforeDestroy() {
    this.allColumns = null
    this.showColumns = null
    this.checkedColumns = null
  },
  created() {
    this.initLocalStorage()
  }
}
</script>

<style>
.custom-column-wrapper .custom-column-title-wrapper {
  display: flex;
  align-content: center;
}
.custom-column-wrapper .custom-column-title {
  flex: auto;
  font-size: 18px;
}
.custom-column-wrapper .custom-column-search {
  font-size: 14px;
  color: #666;
}
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
  width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.custom-column-wrapper .el-checkbox__label:hover {
  cursor: move;
}
.custom-column-wrapper .text-center {
  text-align: center;
}
</style>