<template>
  <div class="main-header-wrap" :class="{ collapse: isCollapse }">
    <!-- 折叠按钮 -->
    <fold-button :isCollapse="isCollapse" @toggle-click="toggleCollapse"></fold-button>

    <!-- 面包屑导航 -->
    <breadcrumb class="breadcrumb"></breadcrumb>

    <!-- 昵称 -->
    <el-dropdown class="nickname-dropdown" :show-timeout="0">
      <span class="el-dropdown-link">
        <i class="template-iconfont icon-yonghu i-user"></i>
        <span>{{ userInfo.name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookie from 'js-cookie'

import FoldButton from '@/components/FoldButton'
import Breadcrumb from '@/components/Breadcrumb'

import { userLogout } from '@/api/user'


export default {
  name: 'MainHeader',
  components: {
    FoldButton,
    Breadcrumb
  },
  computed: {
    ...mapGetters(['isCollapse', 'userInfo'])
  },
  data() {
    return {}
  },
  methods: {
    toggleCollapse(flag) {
      this.$store.commit('app/toggleCollapse', flag)
    },
    logout() {
      this.$confirm('确认退出登录', '提示', { type: 'waring' })
        .then(async () => {
          try {
            await userLogout()
            Cookie.remove('authorization')
            window.location.reload()
          } catch (err) {
            this.$alert(err.message || '发生了预期之外的错误，请稍后再试', '提示', { type: 'error' })
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="less">
  .main-header-wrap {
    width: calc(100% - 210px);
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    padding: 0 10px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    transition: width .28s ease;
    &.collapse {
      width: calc(100% - 64px)
    }
    .breadcrumb {
      float: left;
      line-height: 50px;
      margin-left: 20px;
    }
    .nickname-dropdown {
      float: right;
      .el-dropdown-link {
        cursor: pointer;
        .i-user {
          margin-right: 5px;
          font-weight: 700;
        }
      }
    }
  }
</style>
