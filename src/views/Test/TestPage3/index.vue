<template>
  <container-view class="test-wrap view-container">
    <template #contentView>
      <div class="test-title">logo Test</div>
      <div class="test-content">
        <!-- <div class="poster-wrap" ref="posterWrap" hidden>
          <img src="./components/images/bg.jpg" alt="" class="bg-img">
          <div class="left team-wrap">
            <div class="team-item" v-for="(item, index) in leftTeam" :key="index">
              <img :src="item.value" alt="" class="img">
              <div class="name">{{ item.label }}</div>
            </div>
          </div>
          <div class="right team-wrap">
            <div class="team-item" v-for="(item, index) in rightTeam" :key="index">
              <img :src="item.value" alt="" class="img">
              <div class="name">{{ item.label }}</div>
            </div>
          </div>
        </div> -->
        <el-input v-model="text" style="width: 300px;"></el-input>
        <el-button type="primary" @click="downPoster('logoWrap', 'logo')">download Logo</el-button>
        <div class="logo-wrap" ref="logoWrap">
          <div class="button">{{ text }}</div>
        </div>
      </div>
    </template>
  </container-view>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
      leftTeam: [
        {
          label: '队长付文静',
          value: require('./components/images/队长付文静.jpg')
        },
        {
          label: '纪彤',
          value: require('./components/images/纪彤.jpg')
        },
        {
          label: '汪倩君',
          value: require('./components/images/汪倩君.jpg')
        },
        {
          label: '朱均瑶',
          value: require('./components/images/朱均瑶.jpg')
        }
      ],
      rightTeam: [
        {
          label: '队长马倩',
          value: require('./components/images/队长马倩.jpg')
        },
        {
          label: '郑文瑞',
          value: require('./components/images/郑文瑞.jpg')
        },
        {
          label: '王闪',
          value: require('./components/images/王闪.jpg')
        },
        {
          label: '张慧琴',
          value: require('./components/images/张慧琴.jpg')
        }
      ],
      text: 'hover me'
    }
  },
  methods: {
    downPoster(elNode, text = 'test') {
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
    // .poster-wrap {
    //   .bg-img {
    //     height: 100%;
    //     width: 100%;
    //   }
    //   position: relative;
    //   .team-wrap {
    //     width: 100px;
    //     height: 100%;
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     justify-content: center;
    //     .team-item {
    //       display: flex;
    //       flex-direction: column;
    //       justify-content: center;
    //       align-items: center;
    //       margin-bottom: 50px;
    //       .img {
    //         height: 150px;
    //         width: 150px;
    //         border-radius: 50%;
    //       }
    //       .name {
    //         margin-top: 30px;
    //         color: white;
    //         font-size: 16px;
    //         font-family: "楷体", "楷体_GB2312";
    //       }
    //     }
    //   }
    //   .left {
    //     position: absolute;
    //     left: 150px;
    //     top: 0;
    //     &.team-wrap {
    //       .img {
    //         box-shadow: 0px 0px 10px 4px #F56C6C;
    //       }
    //       .name {
    //         color: #F56C6C;
    //       }
    //     }
    //   }
    //   .right {
    //     position: absolute;
    //     right: 150px;
    //     top: 0;
    //     &.team-wrap {
    //       .img {
    //         box-shadow: 0px 0px 10px 4px #409EFF;
    //       }
    //       .name {
    //         color: #409EFF;
    //       }
    //     }
    //   }
    // }
    .logo-wrap {
      height: 800px;
      width: 800px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .button  {
        background-color: transparent;
        border: 0;
        background: #2ec4b6;
        text-transform: uppercase;
        color: white;
        font-size: 64px;
        font-weight: bold;
        padding: 60px 120px;
        outline: none;
        position: relative;
        border-bottom-right-radius: 200px;
        border-top-left-radius: 200px;
        border-bottom-left-radius: 40px;
        border-top-right-radius: 40px;
      }
    }
  }
}
</style>
