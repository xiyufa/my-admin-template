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
      <main-header v-show="!isFullScreen"></main-header>
      <tages-view v-show="showTagViews && !isFullScreen"></tages-view>
      <!-- main-content -->
      <el-scrollbar wrap-class="scrollbar-wrap" ref="scrollbarWrap">
        <div class="main-content-wrap">
          <transition :name="isIE ? '' : 'fade-transform'" mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view :key="key"></router-view>
            </keep-alive>
          </transition>
        </div>

        <!-- 回到顶部 -->
        <back-to-top :scrollHeight=scrollHeight @scrollTo="scrollTo"></back-to-top>
      </el-scrollbar>
    </div>

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
  data() {
    return {
      scrollHeight: 0
    }
  },
  watch: {
    '$route': 'routeChangeHandle'
  },
  created() {
    this.routeChangeHandle()
  },
  mounted() {
    this.handleScrollbarWrap()
  },
  methods: {
    routeChangeHandle() {
      const { fullScreen } = this.$route.meta
      this.$store.commit('app/toggleFullScreen', !!fullScreen)
    },
    handleScrollbarWrap() {
      let { wrap } = this.$refs.scrollbarWrap
      wrap.onscroll = () => {
        this.scrollHeight = wrap.scrollTop
      }
    },
    scrollTo(val) {
      let { wrap } = this.$refs.scrollbarWrap
      wrap.scrollTop = val
    }
  }
}
</script>

<style scoped lang="less">
.layout-wrap {
  width: 100%;
  height: 100%;
  .main-container {
    min-width: 1200px;
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
  .layout-wrap {
    .main-container {
      height: 100%;
      .el-scrollbar {
        height: 100%;
      }
    }
  }

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
