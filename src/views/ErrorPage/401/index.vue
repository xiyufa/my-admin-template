<template>
  <div class="error-page-container">
    <div class="padding100"></div>
    <el-button class="go-back-btn" @click="$router.go(-1)">{{ $t('401.return') }}</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-tremendous">Oops!</h1>
        <h2>{{ $t('401.title') }}</h2>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/">{{ $t('401.goHome') }}</router-link>
          </li>
          <li class="link-type"><a href="https://www.taobao.com/" target="_blank">{{ $t('401.look') }}</a></li>
          <!-- errorType = 1 前后端路由表不一致 -->
          <li class="error-type" v-if="errorType === 1">error message: {{ errorMsg }}</li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errorGif" width="313" height="428" alt="The girl dropped her ice cream">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errorGif from '@/assets/images/401.gif'

export default {
  data() {
    return {
      errorType: 0,
      errorMsg: '',
      errorGif: `${errorGif  }?${ +new Date()}`
    }
  },
  created() {
    const { errorType = 0, errorMsg = '' } =  this.$route.params
    this.errorType = errorType
    this.errorMsg = errorMsg
  }
}
</script>

<style scoped lang="less">
.error-page-container {
  width: 100%;
  height: 100%;
  padding: 0 25%;
  background-color: #fff;
  .padding100 {
    height: 100px;
    width: 100%;
  }
  .go-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .text-tremendous {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
      a {
        cursor: pointer;
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
      &.error-type {
        color: red;
        font-size: 18px;
        margin-top: 20px;
      }
    }
  }
}
</style>
