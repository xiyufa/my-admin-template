<template>
  <container-view class="test-wrap view-container">
    <template #contentView>
      <div class="test-title">富文本</div>
      <div class="test-content">
        <div class="test-text">
          <p>输入内容</p>
          <p>{{ timymceVal }}</p>
        </div>
        <Tinymce :uploadParams="uploadParams" style="width: 80%;" @input="input"></Tinymce>
      </div>
    </template>
  </container-view>
</template>

<script>
import Tinymce from '@/components/TinymceV5.0'

export default {
  components: {
    Tinymce
  },
  data() {
    return {
      timymceVal: '',
      uploadParams: {
        action: ''
        /**
        * action: 必选参数，上传的地址
        * headers: 设置上传的请求头部
        * multiple: 是否支持多选文件
        * data: 上传时附带的额外参数
        * name: 上传的文件字段名
        * withCredentials: 支持发送 cookie 凭证信息
        * beforeUpload: 上传之前的回调
        * uploadSuccess： 上传成功的回调
        */
      }
    }
  },
  methods: {
    input(val) {
      this.timymceVal = val
    }
  }
}
</script>

<style scoped lang="less">
.test-wrap {
  .test-title {
    font-size: 22px;
  }
  .test-content {
    margin-top: 20px;
    .test-text {
      margin-bottom: 20px;
    }
  }
}
</style>
