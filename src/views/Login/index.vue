<template>
  <div class="login-container">
  <div class="bg-wrap"><!-- bg --></div>
  <div class="form-wrap">
    <div class="login-wrap">
      <el-form
        width="100%"
        ref="loginForm"
        :model="loginForm"
        class="login-form"
        label-position="left"
      >
        <h3 class="title">系统登录</h3>
        <el-form-item
          prop="userName"
          :rules="[
            {
              required: true,
              message: 'User name'
            }
          ]"
        >
          <span class="template-iconfont icon-yonghu1"></span>
          <el-input
            v-model="loginForm.userName"
            name="userName"
            type="text"
            placeholder="User name"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[
            {
              required: true,
              message: 'Password'
            }
          ]"
        >
          <span class="template-iconfont icon-yidongduanicon-"></span>
          <el-input
            v-model="loginForm.password"
            name="password"
            :type="inputType"
            auto-complete="on"
            placeholder="Password"
            @keyup.enter.native="handleLogin"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <span class="template-iconfont" :class="[inputType ? 'icon-bukejian' : 'icon-kejian']"></span>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            :loading="submitBtnLoding"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
      <div class="other"></div>
    </div>
  </div>
  </div>
</template>

<script>
import { userLogin } from '@/api/user'

import Cookie from 'js-cookie'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      inputType: 'password',
      submitBtnLoding: false
    }
  },
  methods: {
    showPwd() {
      this.inputType = this.inputType === 'password' ? '' : 'password'
    },
    handleLogin() {
      // 登录
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          return
        }
        this.submitBtnLoding = true
        try {
          const result = await userLogin(this.loginForm)
          const { authorization } = result
          Cookie.set('authorization', authorization, { expires: 15 })
          this.$store.commit('user/setAuthorization', authorization)
          this.$router.replace({ path: '/' }).catch(() => {})
        } catch (err) {
          this.$alert((err.message || '发生了预期之外的错误，请稍后再试'), '提示', { type: 'error' })
            .then(() => {})
            .catch(() => {})
        } finally {
          this.submitBtnLoding = false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  .bg-wrap {
    flex: 1;
    background-image: url('../../assets/images/login-bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .form-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-wrap {
      width: 480px;
      .title {
        font-size: 24px;
        font-weight: 400;
        color: #000;
        margin: 0px auto 40px;
      }
      .template-iconfont {
        color: #889aa4;
        padding: 0px 5px 0 10px;
        vertical-align: middle;
        display: inline-block;
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 3px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>

<style lang="less">
.login-container {
  .form-wrap {
    .login-wrap {
      .el-form-item__content {
        border-bottom: 1px solid #e5e5e5;
        .el-input {
          display: inline-block;
          height: 45px;
          width: 85%;
          input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #000;
            height: 47px;
            &:-webkit-autofill {
              -webkit-text-fill-color: #000 !important;
            }
          }
        }
      }
    }
  }
}
</style>
