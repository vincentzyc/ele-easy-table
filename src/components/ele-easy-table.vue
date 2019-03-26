<template>
  <div class="base-tabel">
    <el-form :model="formData" :inline="true" size="small" class="relative" v-if="Object.keys(form).length>0" :style="form.style">
      <template v-for="(item,key) in form.list">
        <el-form-item :label="item.label?item.label+'：':''" :key="key" v-if="item.type!=='slot'">
          <el-date-picker
            v-if="item.type==='datePicker'"
            v-model="formData[item.key]"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="getDate(item)"
            size="small"
            :style="item.style"
          ></el-date-picker>
          <el-input v-if="item.type==='input'" v-model="formData[item.key]" :placeholder="'请输入'+item.label" size="small" :style="item.style"></el-input>
          <el-select
            v-if="item.type==='select'"
            v-model="formData[item.key]"
            size="small"
            :style="item.style"
            :placeholder="'请选择'+item.label"
            :multiple="item.multiple||false"
          >
            <el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value"></el-option>
          </el-select>
          <el-button v-if="item.type==='button'" type="primary" size="small" @click="item.handleClick()" :style="item.style">{{item.text}}</el-button>
        </el-form-item>
        <slot v-else :name="item.slot"></slot>
      </template>
    </el-form>

    <el-table
      v-loading="table.isLoading"
      element-loading-text="拼命加载中"
      :data="table.list"
      stripe
      tooltip-effect="light"
      border
      class="mg-t20"
      v-if="Object.keys(table).length>0"
    >
      <el-table-column
        :label="table.indexLabel||'序号'"
        align="center"
        type="index"
        :index="showTableIndex(formData.pageIndex,formData.pageSize)"
        width="55"
        v-if="pagination"
      ></el-table-column>
      <el-table-column v-for="column in table.columns" :key="column.key+column.label" :prop="column.key" :label="column.label" align="center">
        <template slot-scope="{row}">
          <template v-if="!column.hasOwnProperty('type')">{{ row[column.key] }}</template>
          <template v-if="column.type==='format'">
            <span v-html="column.format(row)"></span>
          </template>
          <template v-if="column.type==='textBtn'">
            <el-button v-for="(btn,key) in column.textBtn" :key="key" type="text" @click="btn.handleClick(row)" v-html="btn.text||btn.funcText(row)"></el-button>
          </template>
          <template v-if="column.type==='slot'">
            <slot :name="column.slot" :row="row"></slot>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination" v-if="Object.keys(table).length>0 && pagination && Array.isArray(table.list) && table.list.length>0">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 50, 100]"
        :current-page="formData.pageIndex||1"
        :page-size="formData.pageSize||10"
        :total="formData.totalCount||0"
        :layout="formData.layout||'total, sizes, prev, pager, next, jumper'"
      ></el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "ele-easy-table",
  props: {
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    table: {
      type: Object,
      default() {
        return {}
      }
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showTableIndex(pageIndex = 1, pageSize = 10) {
      return (pageIndex - 1) * pageSize + 1;
    },
    getDate(item) {
      this.formData[item.startKey] = this.formData[item.key] ? this.formData[item.key][0] : "";
      this.formData[item.endKey] = this.formData[item.key] ? this.formData[item.key][1] : "";
    },
    handleSizeChange(val) {
      this.$emit('update:formData', {
        ...this.formData,
        pageIndex: 1,
        pageSize: val
      })
      this.$emit('getList')
    },
    handleCurrentChange(val) {
      this.$emit('update:formData', {
        ...this.formData,
        pageIndex: val
      })
      this.$emit('getList')
    }
  }
};
</script>


<style scoped>
.mg-t20 {
  margin-top: 20px;
}
.relative {
  position: relative;
}
.pagination {
  float: right;
  margin: 20px 0;
}
</style>
