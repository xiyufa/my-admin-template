<template>
  <el-dropdown class="select-lang-dropdown" trigger="click" @command="handleSetLanguage">
    <i class="template-iconfont icon-yuyanqiehuan"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SelectLanguage',
  computed: {
    ...mapGetters(['language'])
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.commit('app/toggleLang', lang)
      this.refreshView()
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
.select-lang-dropdown {
  .icon-yuyanqiehuan {
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
