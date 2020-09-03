<template>
  <div class="tinymce-editor">
    <Editor
      :id="editorId"
      v-model="editorValue"
      :init="editorInit"
    />
    <div class="editor-custom-btn-container">
      <editorImage
        class="editor-upload-btn"
        :uploadParams="uploadParams"
        @successCBK="imageSuccessCBK"
        @file-upload-error=" (...args) => $emit('file-upload-error', ...args)"
        @remove-files="fileList => $emit('remove-files', fileList)"
      />
    </div>
  </div>
</template>

<script>
import editorImage from './components/EditorImage'

import plugins from './plugins'
import toolbar from './toolbar'

import { content_style, font_formats, fontsize_formats, lineheight_val } from './config'

// 引入组件
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'

// icon
import 'tinymce/icons/default/icons'

// 引入富文本编辑器主题的js和css
import 'tinymce/themes/silver'
import 'tinymce/skins/ui/oxide/skin.css'
// import 'tinymce/skins/ui/oxide-dark/skin.css'

// 引入语言
import './tinymce/langs/zh_CN'

// 扩展第三方插件
import './tinymce/plugins/lineheight'

// 扩展插件
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/help'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'

export default {
  name: 'TinymceEditor',
  components: {
    Editor,
    editorImage
  },
  props: {
    height: {
      type: Number,
      default: 500
    },
    id: {
      type: String,
      default: 'tinymceEditor'
    },
    value: {
      type: String,
      default: ''
    },
    uploadParams: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      editorInit: {
        language: 'zh_CN',
        height: this.height,
        plugin_preview_width: 375, // 预览宽度
        plugin_preview_height: 500,
        content_style,
        font_formats,
        lineheight_val,
        fontsize_formats,
        plugins,
        toolbar,
        powerpaste_word_import: 'merge',
        paste_data_images: true,
        statusbar: true, // 底部的状态栏
        menubar: true, // 最上方的菜单
        branding: false, // 水印'Powered by TinyMCE'
        images_upload_handler: (blobInfo, success, failure) => {
          this.$emit('handleImgUpload', blobInfo, success, failure)
        }
      },
      editorId: this.id,
      newValue: ''
    }
  },
  watch: {
    newValue(newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted() {
    tinymce.init({})
  },
  computed: {
    editorValue: {
      get() {
        return this.value
      },
      set(val) {
        this.newValue = val
      }
    }
  },
  methods: {
    // https://github.com/tinymce/tinymce-vue => All available events
    clear() {
      this.editorValue = ''
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        tinymce
          .get(_this.editorId)
          .insertContent(`<img class='wscnph' src='${v.url}' >`)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tinymce-editor {
  position: relative;
  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 0px;
    z-index: 100;
  }
}
</style>

