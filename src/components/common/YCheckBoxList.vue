<template>
  <div>
    <el-checkbox-group
      v-model="currentValue"
      @change="handleChange"
      :disabled="disabled"
    >
      <el-checkbox
        v-for="item in data"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        >{{ item.name }}</el-checkbox
      >
    </el-checkbox-group>
  </div>
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
    value: {
      type: Array,
      default: null,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      selectValue: [],
      data: []
    }
  },
  watch: {
    value(value) {
      this.currentValue = value || []
    },
    dataList(value) {
      this.data = value
    }
  },
  created() {
    this.currentValue = this.value || []
    let data = []
    if (this.dicType) {
      /*通过dictype传参做请求*/
      /*data = */
    } else {
      data = this.dataList
    }
    this.data = data
  },
  mounted() {},
  computed: {
    currentValue: {
      // 动态计算currentValue的值
      get: function() {
        return this.selectValue || []
      },
      set: function(val) {
        this.selectValue = val || []
        this.$emit("input", this.selectValue)
      }
    }
  },
  methods: {
    isEmpty() {
      return this.currentValue == null || this.currentValue.length == 0
    },
    handleChange(val) {
      this.$emit("change", val)
    }
  }
}
</script>
