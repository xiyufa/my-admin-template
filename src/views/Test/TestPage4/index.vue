<template>
  <container-view class="test-wrap view-container">
    <template #contentView>
      <div class="test-title">QRCode Test</div>
      <div class="test-content">
        <el-form label-width="110px" v-model="formData">
          <el-form-item label="content：">
            <el-input
              style="width: 500px;"
              type="textarea"
              v-model="formData.content"
              :rows="5"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="bg-color：">
            <el-color-picker
              v-model="formData.bgc"
              show-alpha
              :predefine="predefineColors">
            </el-color-picker>
          </el-form-item>
          <el-form-item label="text-color：">
            <el-color-picker
              v-model="formData.textc"
              show-alpha
              :predefine="predefineColors">
            </el-color-picker>
          </el-form-item>
          <el-form-item label="center logo">
            <el-switch v-model="formData.isShow"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-magic-stick" type="primary" @click="createQRcode">Create QRcode</el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          :visible.sync="showQRCode"
          title="Download QRCode"
          destroy-on-close
          width="30%"
        >
          <div class="dialog-wrap">
            <div class="centre-logo" v-if="formData.isShow">
              <img src="../../../assets/logo/logo.png" alt="" class="img">
            </div>
            <div class="qrcode-wrap" ref="qrcodeWrap"></div>
          </div>
          <template #footer>
            <el-button @click="showQRCode = false">cancel</el-button>
            <el-button icon="el-icon-download" type="primary" @click="downloadQRcode('qrcodeWrap')">download</el-button>
          </template>
        </el-dialog>
      </div>
    </template>
  </container-view>
</template>

<script>
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas'

export default {
  name: 'QRCodeTest',
  data() {
    return {
      formData: {
        content: 'http://xiongyufan.gitee.io/web-docs',
        bgc: 'rgba(255, 255, 255, 1)',
        textc: 'rgba(0, 0, 0, 1)',
        width: 256,
        height: 256,
        isShow: false
      },
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      showQRCode: false,
      qrcode: ''
    }
  },
  methods: {
    createQRcode() {
      this.showQRCode= true
      this.$nextTick(() => {
        new QRCode(this.$refs.qrcodeWrap, {
          text: this.formData.content,
          width: this.formData.width,
          height: this.formData.height,
          colorDark : this.formData.bgc,
          colorLight : this.formData.textc
        })
      })
    },
    downloadQRcode(elNode, text = '二维码') {
      const el = this.$refs[elNode]
      html2canvas(el)
        .then(canvas => {
          let imgUrl = canvas.toDataURL('image/png')

          let a = document.createElement('a')
          a.href = imgUrl
          a.download = text
          a.click()
          a.remove()
        })
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
    .dialog-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #909399;
      padding: 15px 0;
      position: relative;
      .centre-logo {
        position: absolute;
        height: 60px;
        width: 60px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, .3);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        .img {
          border-radius: 5px;
          border: 1px solid #C0C4CC;
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
</style>
