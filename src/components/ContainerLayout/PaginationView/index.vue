<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageIndex"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :total="total"
    :layout="layout"
  ></el-pagination>
</template>

<script>
export default {
  name: 'PaginationView',
  props: {
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 50]
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.$emit('handleSizeChange', pageSize)
    },
    handleCurrentChange(pageIndex) {
      this.$emit('handleCurrentChange', pageIndex)
    }
  }
}
</script>

<style scoped>

</style>
