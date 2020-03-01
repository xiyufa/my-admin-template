<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span 
          v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" 
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a style="display: inline;" v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'

export default {
  name: 'Breadcrumb',
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'DashBoard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      let toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      // Vue-router 报NavigationDuplicated
      // 因在于Vue-router在3.1之后把$router.push()方法改为了Promise。
      // 所以假如没有回调函数，错误信息就会交给全局的路由错误处理，因此就会报上述的错误。
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect).catch(() => {})
        return
      }
      this.$router.push(this.pathCompile(path)).catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
  /* breadcrumb transition */
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all .5s;
  }

  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-move {
    transition: all .5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
</style>
