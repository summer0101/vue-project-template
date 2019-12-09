<template>
  <div>
    <y-table
      :options="gridOptions"
      :empty-text="emptyText"
      :data="data"
      :total="total"
      :current-page-index="currentPageIndex + 1"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @filter-change="handleFilterChange"
      @current-change-list="handleSingleChange"
      :disabled="disabled"
    >
      <template
        slot="columnDataHeader"
        v-if="gridOptions.customColumnDataHeader"
      >
        <slot name="columnDataHeader"></slot>
      </template>
    </y-table>
  </div>
</template>
<script>
import YTable from "./YTable.vue";

const defaultGridOptions = {
  pageable: true, //是否分页
  mutiSelect: true, // 是否支持列表项选中功能,显示Checkbox选项框
  showOverflowTooltip: true,
  customColumnDataHeader: false,
  operates: {
    type: Object,
    default: {} // width:按钮列宽，fixed：是否固定（left,right）,按钮集合 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
  },
  pagination: {
    pageSize: 10, //pagination分页选择中的默认页数
    pageSizes: [10, 20, 50, 100] //每页最多条数
  },
  treeable: false,
  tree: {
    treeKey: "id",
    parentKey: "parentId",
    levelKey: "level",
    childKey: "items"
  },
  treeColumn: {
    label: "名称",
    prop: "name",
    width: "150px",
    minWidth: "150px",
    treeKey: "id",
    parentKey: "parentId",
    levelKey: "level",
    childKey: "items"
  }
};
const defaultDataSourceOptions = {
  loadDataOnFirst: true,
  serviceInstance: null,
  serviceInstanceInputParameters: null
};

export default {
  components: {
    TTable
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    options: {
      dataSource: {},
      grid: {}
    } // table 表格的控制参数
  },
  data() {
    return {
      isFirstEnter: false, //是否首次加载
      keepAlive: this.$router
        ? this.$router.currentRoute.meta.keepAlive
        : false,
      gridOptions: Object.assign(
        {},
        defaultGridOptions,
        this.options.grid || {}
      ),
      dataSourceOptions: Array.isArray(this.options.dataSource)
        ? this.options.dataSource
        : Object.assign(
            {},
            defaultDataSourceOptions,
            this.options.dataSource || {}
          ),
      emptyText: "...数据待加载",
      data: [],
      total: 0,
      currentPageIndex: 0,
      pageSize: 10,
      sortField: "",
      sortDirection: "",
      filters: {}
    };
  },
  computed: {},
  created() {
    this.isFirstEnter = true;
    this.sortField = this.gridOptions.defaultSort.prop;
    this.sortDirection = this.gridOptions.defaultSort.order;
    this.gridOptions.sortable =
      this.dataSourceOptions.serviceInstance == null ? true : "custom";
    if (
      Array.isArray(this.dataSourceOptions) ||
      this.dataSourceOptions.loadDataOnFirst === true
    ) {
      this.pageSize =
        this.gridOptions.pagination && this.gridOptions.pagination.pageSize;
      this.bindGrid();
    } else {
      this.emptyText = "暂无数据";
    }
  },
  activated() {
    if (this.isFirstEnter == true) {
      this.isFirstEnter = false;
    } else {
      this.bindGrid();
    }
  },
  mounted() {
    if (this.isFirstEnter && !this.keepAlive) {
      this.isFirstEnter = false;
    }
  },
  watch: {
    "options.grid": {
      handler(newValue) {
        this.gridOptions = newValue;
      },
      deep: true
    },
    "options.dataSource": {
      handler(newValue) {
        this.dataSourceOptions = newValue;
        if (
          Object.prototype.toString.call(this.dataSourceOptions) ===
            "[object Object]" ||
          Object.prototype.toString.call(this.dataSourceOptions) ===
            "[object Array]"
        ) {
          this.pageSize =
            this.gridOptions.pagination && this.gridOptions.pagination.pageSize;
          this.bindGrid();
        }
      },
      deep: true
    }
  },

  methods: {
    async bindGrid() {
      this.emptyText = "...数据待加载";
      let isPageable = this.gridOptions.pageable;
      let self = this;
      let skip = null;
      let take = null;
      if (this.gridOptions && this.gridOptions.pagination) {
        skip = this.currentPageIndex;
        take = this.pageSize;
      }
      let result = await this.getDataPromise(isPageable, skip, take);
      self.data = result.data;
      self.total = result.total;

      if (result.data == null || result.data.length == 0) {
        this.emptyText = "暂无数据";
      }

      this.$emit("data-change", {
        data: self.data,
        total: result.total || result.data.length
      });
    },
    getDataPromise(isPageable, skip, take) {
      let self = this;
      if (Array.isArray(self.dataSourceOptions)) {
        return new Promise(function(resolve) {
          resolve({
            data: self.dataSourceOptions,
            total:
              self.dataSourceOptions == null ? 0 : self.dataSourceOptions.length
          });
        });
      }
      if (
        self.dataSourceOptions == null ||
        self.dataSourceOptions.serviceInstance == null
      ) {
        return new Promise(function(resolve) {
          resolve({
            data: [],
            total: 0
          });
        });
      }
      let mDatasourceService = self.dataSourceOptions.serviceInstance;
      let mDatasourceRequestParameters =
        self.dataSourceOptions.serviceInstanceInputParameters;

      var iRequestData = {};
      if (isPageable) {
        iRequestData.page = skip;
        iRequestData.size = take;
      }
      if (self.sortField && self.sortDirection) {
        iRequestData.sorting = self.sortField + " " + self.sortDirection;
      }
      if (mDatasourceRequestParameters != null) {
        if (
          typeof mDatasourceRequestParameters != "object" ||
          Array.isArray(mDatasourceRequestParameters)
        ) {
          iRequestData = mDatasourceRequestParameters;
        } else {
          var parameters = {};
          if (mDatasourceRequestParameters) {
            for (var i in mDatasourceRequestParameters) {
              if (mDatasourceRequestParameters.hasOwnProperty(i)) {
                //filter,只输出man的私有属性
                var source = mDatasourceRequestParameters[i];
                if (typeof source == "function") {
                  parameters[i] = mDatasourceRequestParameters[i]();
                } else {
                  parameters[i] = mDatasourceRequestParameters[i];
                }
              }
            }
          }

          iRequestData = { ...iRequestData, ...parameters };
        }
      }

      //异步执行dataSourceOptions.serviceInstance,
      return new Promise(function(resolve) {
        return mDatasourceService(iRequestData).then(function(result) {
          if (result.data) {
            result = result.data;
          }
          if (isPageable) {
            resolve({
              data: self.gridOptions.treeable
                ? self.$util.treeToArray(result.list)
                : result.list,
              total: result.total
            });
          } else {
            resolve({
              data: self.gridOptions.treeable
                ? self.$util.treeToArray(result)
                : result,
              total: result.length
            });
          }
        });
      });
    },
    refresh() {
      this.$nextTick(() => {
        this.currentPageIndex = 0;
        this.bindGrid();
      });
    },
    clear() {
      this.$nextTick(() => {
        if (this.gridOptions.pagination) {
          this.currentPageIndex = 0;
          this.total = 0;
        }
        this.data = [];
      });
    },
    handleSelectionChange(val) {
      this.$emit("selection-change", val);
    },
    // 切换每页显示的数量
    handleSizeChange(size) {
      this.currentPageIndex = 0;
      this.pageSize = size;
      this.bindGrid();
    },
    //单选行
    handleSingleChange(arg) {
      this.$emit("current-change-list", arg);
    },
    // 切换页码
    handleIndexChange(skip) {
      this.currentPageIndex = skip - 1;
      this.bindGrid();
    },
    handleSortChange(sort) {
      let { prop, order } = sort;
      this.sortField = prop;
      this.sortDirection = order === "descending" ? "desc" : "asc";
      this.bindGrid();
    },
    handleFilterChange(filters) {
      this.filters = filters;
      this.bindGrid();
    }
  }
};
</script>
