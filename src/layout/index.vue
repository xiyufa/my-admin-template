<template>
  <div class="layout-wrap">
    <!-- menu -->
    <template v-if="!isFullScreen">
      <menu-bar></menu-bar>
    </template>
    <!-- main -->
    <div
      class="main-container"
      :class="{
        collapse: isCollapse,
        showTagViews: showTagViews,
        fullScreen: isFullScreen
      }"
    >
      <!-- main header-->
      <template v-if="!isFullScreen">
        <main-header></main-header>
        <tages-view v-show="showTagViews"></tages-view>
      </template>
      <!-- main-content -->
      <div class="main-content-wrap">
        <transition :name="isIE ? '' : 'fade-transform'" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>

    <!-- 回到顶部 -->
    <back-to-top></back-to-top>
  </div>
</template>

<script>
import MenuBar from './components/MenuBar'
import MainHeader from './components/MainHeader'
import TagesView from './components/TagsView'
import BackToTop from '@/components/BackToTop'

import { mapGetters } from 'vuex'

export default {
  components: {
    MenuBar,
    MainHeader,
    TagesView,
    BackToTop
  },
  computed: {
    ...mapGetters(['isCollapse', 'isFullScreen', 'showTagViews', 'isIE', 'cachedViews']),
    key() {
      return this.$route.name
    }
  },
  watch: {
    '$route': 'routeChangeHandle'
  },
  created() {
    this.routeChangeHandle()
  },
  methods: {
    routeChangeHandle() {
      const { fullScreen } = this.$route.meta
      this.$store.commit('app/toggleFullScreen', !!fullScreen)
    }
  }
}
</script>

<style scoped lang="less">
.layout-wrap {
  width: 100%;
  height: 100%;
  .main-container {
    margin-left: 210px;
    padding-top: 50px;
    transition: margin-left .28s ease;
    &.collapse {
      margin-left: 64px;
    }
    &.showTagViews {
      padding-top: calc( 50px + 34px );
    }
    &.fullScreen {
      padding-top: 0;
      margin-left: 0;
      .main-content-wrap {
        padding: 0;
        height: auto;
        overflow-x: auto;
      }
    }
    .main-content-wrap {
      padding: 8px 10px;
      height: 100%;
      overflow-x: hidden;
    }
  }
}
</style>
<style lang="less">
  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all .3s;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
