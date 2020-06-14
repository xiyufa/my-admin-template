<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible=true">图片上传</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%"
      append-to-body
    >
      <el-upload
        ref="upload"
        class="editor-slide-upload"
        :action="uploadParams.action"
        multiple
        :headers="uploadParams.headers"
        :data="uploadParams.data"
        :name="uploadParams.name"
        :with-credentials="uploadParams.withCredentials"
        :show-file-list="true"
        list-type="picture-card"
        :before-upload="beforeUploadHandle"
        :on-success="uploadSuccessHandle"
        :on-error="(...args) => $emit('file-upload-error', ...args)"
        :on-remove="removeFileHandle"
      >
        <el-button size="small" type="primary">点击添加</el-button>
      </el-upload>
      <el-button @click="cencel" size="small">取消</el-button>
      <el-button type="primary" @click="done" size="small">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 组件参数 uploadParams
 *
 * action: 必选参数，上传的地址
 * headers: 设置上传的请求头部
 * multiple: 是否支持多选文件
 * data: 上传时附带的额外参数
 * name: 上传的文件字段名
 * withCredentials: 支持发送 cookie 凭证信息
 * beforeUpload: 上传之前的回调
 * uploadSuccess： 上传成功的回调
 *
 */
export default {
  name: 'editorSlideUpload',
  props: ['uploadParams'],
  data() {
    return {
      dialogVisible: false,
      fileList: []
    }
  },
  methods: {
    cencel() {
      this.dialogVisible = false
      this.$emit('remove-files', [...this.fileList])
      this.fileList = []
      this.$refs.upload.clearFiles()
    },
    done() {
      this.dialogVisible = false
      this.$emit('successCBK', [...this.fileList])
      this.fileList = []
      this.$refs.upload.clearFiles()
    },
    beforeUploadHandle(file) {
      const { beforeUpload } = this.uploadParams
      return beforeUpload ? beforeUpload(file) : true
    },
    uploadSuccessHandle(response, file, fileList) {
      const { uploadSuccess } = this.uploadParams
      const result = uploadSuccess
        ? uploadSuccess(response, file, fileList)
        : response
      const { uid, name } = file
      this.fileList.push({
        uid,
        name,
        ...result
      })
    },
    removeFileHandle(file) {
      const index = this.fileList.findIndex(item => item.uid === file.uid)
      if (index !== -1) {
        const removed = this.fileList.splice(index, 1)
        this.$emit('remove-files', removed)
      }
    }
  }
}
</script>

<style scoped>
.editor-slide-upload {
  margin-bottom: 20px;
}
</style>
