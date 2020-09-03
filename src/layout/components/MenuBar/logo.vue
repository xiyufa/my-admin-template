<template>
  <div class="sidebar-logo-container" :class="{ collapse: isCollapse }">
    <router-link v-if="isCollapse" class="sidebar-logo-link" to="/">
      <el-image v-if="logo" :src="logo" fit="fill" class="sidebar-logo"></el-image>
      <h1 v-else class="sidebar-title">{{ title }} </h1>
    </router-link>
    <router-link v-else class="sidebar-logo-link" to="/">
      <el-image :src="logo" fit="fill" class="sidebar-logo">
        <template #error>
          <i class="el-icon-picture-outline"></i>
        </template>
      </el-image>
      <h1 class="sidebar-title">{{ title }} </h1>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import defaultSettings from '@/setting'

export default {
  name: 'Logo',
  data() {
    return {
      logo: require('@/assets/logo/logo.png'),
      title: defaultSettings.title || 'Vue Template Admin'
    }
  },
  computed: {
    ...mapGetters(['isCollapse','isIE'])
  }
}
</script>

<style scoped lang="less">
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #fff;
  text-align: center;
  overflow: hidden;
  .sidebar-logo-link {
    height: 100%;
    width: 100%;
    .sidebar-logo {
      height: 32px;
      width: 32px;
      vertical-align: middle;
      margin-right: 12px;
      .el-icon-picture-outline {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #97a8be;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}

</style>
