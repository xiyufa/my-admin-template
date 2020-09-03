<template>
  <div class="menu-bar-wrap" :class="{ collapse: isCollapse }">
    <!-- logo -->
    <logo v-if="showSidebarLogo"></logo>
    <!-- menu -->
    <el-scrollbar wrap-class="scrollbar-wrap">
      <el-menu
        :collapse="isCollapse"
        :default-active="defaultActive"
        @select="selectMenu"
      >
        <template v-for="(item, index) in userMenu">
          <menu-item v-if="!item.hidden" :route="item" :key="index"></menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Logo from './logo'
import MenuItem from './menu-item'

export default {
  name: 'MenuBar',
  components: {
    Logo,
    MenuItem
  },
  computed: {
    ...mapGetters(['isCollapse', 'userMenu', 'showSidebarLogo']),
    defaultActive() {
      const { name, meta } = this.$route
      const { highlightName } = meta
      return highlightName ? highlightName : name
    }
  },
  methods: {
    selectMenu(index) {
      this.$router.push({name: index}).catch(() => {})
    }
  }
}
</script>

<style scoped lang="less">
  .menu-bar-wrap {
    width: 210px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 500;
    transition: .28s width ease;
    &.collapse {
      width: 64px;
    }
  }
</style>

<style lang="less">
.menu-bar-wrap {
  .el-scrollbar {
    height: 100%;
  }
  .scrollbar-wrap{
    overflow-x: hidden;
    .el-menu {
      border: none !important;
    }

    // Elememnt-UI的el-menu-collapse-transition组件用到了Class为horizontal-collapse-transition的类
    .horizontal-collapse-transition {
      transition: width .28s ease,  0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }
  }
}
</style>
