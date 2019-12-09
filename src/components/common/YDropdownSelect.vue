<template>
  <el-select
    :placeholder="placeholder"
    v-model="currentValue"
    clearable
    @change="handleChange"
    :disabled="disabled"
  >
    <el-option
      v-for="item in data"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  components: {},
  props: {
    dicType: {
      type: String,
      required: false
    },
    dataList: {
      type: Array,
      required: false
    },
    placeholder: {
      type: String,
      default: "请选择",
      required: false
    },
    value: null,
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    rowIndex: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      selectValue: null,
      data: []
    }
  },
  watch: {
    value(value) {
      this.currentValue = value
    },
    dataList(value) {
      this.data = value
    }
  },
  created() {
    this.currentValue = this.value
    let data = []
    if (this.dicType) {
      data = []
    } else {
      data = this.dataList
    }
    this.data = data
    this.$logger.log(data)
  },
  mounted() {},
  computed: {
    currentValue: {
      // 动态计算currentValue的值
      get: function() {
        return this.selectValue
      },
      set: function(val) {
        this.selectValue = val
        this.$emit("input", val)
      }
    }
  },
  methods: {
    isEmpty() {
      return this.currentValue == null || this.currentValue.length == 0
    },
    handleChange(val) {
      let item = this.data.find(p => p.id === val)
      item.rowIndex = this.rowIndex
      this.$emit("change", item)
    }
  }
}
</script>
