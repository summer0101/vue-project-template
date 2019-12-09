/** * 远程搜索---从服务端搜索数据 */
<template>
  <el-autocomplete
    ref="input"
    v-model="currentValue"
    @blur="setCurrentValue"
    @select="setCurrentValue"
    :fetch-suggestions="querySearch"
    value-key="Name"
  ></el-autocomplete>
</template>

<script>
export default {
  name: "DicAutoComplete",
  props: {
    /**
     * 字典类别
     */
    dic: {
      type: String,
      required: true
    },
    value: {}
  },
  data: function() {
    return {
      currentValue: this.value
    }
  },
  computed: {},
  watch: {
    value: function(val) {
      this.currentValue = val
    },
    currentValue: function(val) {
      this.$emit("select", val)
      this.$emit("input", val)
    }
  },
  mounted() {},
  methods: {
    setCurrentValue(newObject) {
      let newVal = null
      if (newObject.currentTarget) {
        newVal = newObject.currentTarget.value
      } else {
        newVal = newObject == null ? "" : newObject.Name
      }
      this.currentValue = newVal
    },
    querySearch(queryString, cb) {
      //通过dic做请求结果给list
      var list = []
      if (list == null) {
        cb([])
        return
      }
      let results = queryString
        ? list.filter(this.createFilter(queryString))
        : list
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return item => {
        return item.Name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    }
  }
}
</script>
