<template>
  <div class="clearfix">
    <el-form
      :class="form.class"
      :inline="true"
      :model="formData"
      :style="form.style"
      class="relative"
      size="small"
      v-bind="form.config"
      v-if="Object.keys(form).length>0"
    >
      <span :key="key" v-for="(item,key) in form.list" v-show="showFormItem(item,key)">
        <el-form-item
          :label="item.label?item.label+'：':''"
          v-bind="item.formConfig"
          v-if="item.type!=='slot'"
        >
          <el-date-picker
            :style="item.style||form.formItemStyle"
            @change="getDate(item)"
            end-placeholder="结束日期"
            size="small"
            start-placeholder="开始日期"
            type="daterange"
            v-bind="item.config"
            v-if="item.type==='datePicker'"
            v-model="formData[item.key]"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <el-input
            :placeholder="item.placeholder?item.placeholder:'请输入'+item.label"
            :style="item.style||form.formItemStyle"
            @keyup.enter.native="$emit('get-list')"
            size="small"
            v-bind="item.config"
            v-if="item.type==='input'"
            v-model="formData[item.key]"
          ></el-input>
          <el-select
            :placeholder="item.placeholder?item.placeholder:'请选择'+item.label"
            :style="item.style||form.formItemStyle"
            size="small"
            v-bind="item.config"
            v-if="item.type==='select'"
            v-model="formData[item.key]"
          >
            <el-option
              :key="typeof(option.value)!=='undefined'?option.value:option"
              :label="typeof(option.label)!=='undefined'?option.label:option"
              :value="typeof(option.value)!=='undefined'?option.value:option"
              v-for="option in item.options"
            ></el-option>
          </el-select>
          <el-button
            :disabled="item.disabled?item.disabled():false"
            :style="item.style"
            @click="item.handleClick(item,key)"
            size="small"
            type="primary"
            v-bind="item.config"
            v-if="item.type==='button'"
          >{{typeof item.text==='function'?item.text():item.text}}</el-button>
        </el-form-item>
        <slot :name="item.slot" v-else></slot>
      </span>
      <div class="text-center" v-if="showFold">
        <el-button @click="handleExpand()" type="text">
          {{isExpand?'收起':'展开'}}
          <svg
            :class="{'arrow-expand':isExpand}"
            class="arrow-icon"
            fill="#409EFF"
            height="12px"
            viewBox="0 0 48 48"
            width="12px"
          >
            <g fill-rule="evenodd">
              <path
                d="M24 21.91l10.586-10.586a2 2 0 0 1 2.828 2.828l-12 12a2 2 0 0 1-2.828 0l-12-12a2 2 0 0 1 2.828-2.828L24 21.91zm-10.586 1.414L24 33.91l10.586-10.586a2 2 0 0 1 2.828 2.828l-12 12a2 2 0 0 1-2.828 0l-12-12a2 2 0 0 1 2.828-2.828z"
                fill-rule="nonzero"
              />
            </g>
          </svg>
        </el-button>
      </div>
    </el-form>

    <el-table
      :data="table.list"
      border
      element-loading-text="拼命加载中"
      stripe
      style="overflow: visible;margin-top:20px;"
      tooltip-effect="light"
      v-bind="$attrs"
      v-if="Object.keys(table).length>0"
      v-loading="table.isLoading"
      v-on="$listeners"
    >
      <el-table-column
        align="center"
        type="selection"
        v-bind="table.selection.config"
        v-if="table.selection&&table.selection.show&&table.list.length>0"
      ></el-table-column>
      <el-table-column
        :fixed="table.indexFixed||false"
        :index="tableIndex"
        :label="table.indexLabel||'序号'"
        align="center"
        type="index"
        v-if="table.showIndex!==false"
        width="55"
      ></el-table-column>
      <el-table-column
        :key="column.key+column.label"
        :label="column.label"
        :prop="column.key"
        align="center"
        v-bind="column.config"
        v-for="column in table.columns"
      >
        <template slot="header" slot-scope="scope">
          <slot :name="column.header" :row="scope.row" v-if="column.header"></slot>
          <template v-else>{{column.label}}</template>
        </template>

        <template slot-scope="scope">
          <template v-if="!column.hasOwnProperty('type')">{{ scope.row[column.key] }}</template>
          <template v-if="column.type==='format'">
            <span v-html="column.format(scope.row,scope)"></span>
          </template>
          <template v-if="column.type==='textBtn'">
            <span :key="key" v-for="(btn,key) in column.textBtn">
              <el-button
                @click="btn.handleClick(scope.row,scope)"
                class="mg-r10"
                type="text"
                v-bind="btn.config||btn.funcConfig?btn.funcConfig(scope.row,scope):{}"
                v-html="btn.text||btn.funcText(scope.row,scope)"
                v-if="btn.text||btn.funcText(scope.row,scope)"
              ></el-button>
            </span>
          </template>
          <template v-if="column.type==='slot'">
            <slot :name="column.slot" :row="scope.row"></slot>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <div
      class="pagination"
      v-if="Object.keys(table).length>0 && pagination && Array.isArray(table.list) && table.list.length>0"
    >
      <el-pagination
        :current-page="formData.pageIndex||1"
        :layout="pagination.layout||'total, sizes, prev, pager, next, jumper'"
        :page-size="formData.pageSize||10"
        :page-sizes="pagination.pageSizes||[10, 20, 50, 100]"
        :total="formData.totalCount||0"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        v-bind="typeof(pagination)==='object'?pagination:{}"
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
        return {
          list: []
        }
      }
    },
    pagination: {
      type: [Boolean, Object],
      default: true
    }
  },
  data() {
    return {
      isExpand: false,
      tableIndex: 0,
    }
  },
  watch: {
    'table.list': {
      handler() {
        if (this.formData.totalCount > 0) {
          let maxPageIndex = Math.ceil(this.formData.totalCount / this.formData.pageSize);
          if (this.formData.pageIndex > maxPageIndex) this.formData.pageIndex = maxPageIndex;
        }
        if (this.formData.pageSize > 0 && this.formData.pageIndex > 0) {
          this.tableIndex = this.formData.pageSize * (this.formData.pageIndex - 1) + 1;
        } else {
          //没有翻页功能
          this.tableIndex = 1;
        }
      },
      immediate: true
    }
  },
  computed: {
    showFold() {
      if (typeof this.form.foldNum !== 'number' || this.form.foldNum <= 0) return false
      let num = this.form.list.filter(v => !(v.type === 'button' || v.fold === false)).length
      return num > this.form.foldNum - 1
    }
  },
  methods: {
    handleExpand() {
      this.isExpand = !this.isExpand;
      this.$emit('handle-expand', this.isExpand);
    },
    showFormItem(item, key) {
      if (typeof this.form.foldNum !== 'number' || this.form.foldNum <= 0 || item.type === 'button' || item.fold === false || this.isExpand) return true
      return key <= this.form.foldNum - 1
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
      this.$emit('get-list');
    },
    handleCurrentChange(val) {
      this.$emit('update:formData', {
        ...this.formData,
        pageIndex: val
      })
      this.$emit('get-list');
    }
  }
}
</script>


<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: " ";
}
.clearfix:after {
  clear: both;
}
.mg-r10 {
  margin-right: 10px;
}
.relative {
  position: relative;
}
.pagination {
  float: right;
  margin: 20px 0;
}
.text-center {
  text-align: center;
}
.arrow-icon {
  transition: 0.5s;
}
.arrow-expand {
  transform: rotate(180deg);
}
</style>
