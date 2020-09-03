<template>
  <el-dropdown class="select-size-dropdown" trigger="click" @command="handleSetSize">
    <i class="template-iconfont icon-size"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in sizeOptions"
        :key="item.value"
        :disabled="size === item.value"
        :command="item.value"
      >{{ $t(`size.${item.label}`) }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SelectSize',
  computed: {
    ...mapGetters(['size'])
  },
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },
  methods: {
    handleSetSize(size) {
      this.$ELEMENT.size = size
      this.$store.commit('app/toggleSize', size)
      this.refreshView()
      this.$message({
        message: 'Switch Size Success',
        type: 'success'
      })
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.commit('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route
      this.$nextTick(() => {
        this.$router.replace({
          path: `/redirect${fullPath}`
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.select-size-dropdown {
  .icon-size {
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
