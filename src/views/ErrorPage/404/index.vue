<template>
  <div class="http404-container">
    <div class="http404-wrap">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/images/404.png" alt="404">
        <img class="pic-404__child left" src="../../../assets/images/404_cloud.png" alt="404">
        <img class="pic-404__child middle" src="../../../assets/images/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="../../../assets/images/404_cloud.png" alt="404">
      </div>
      <div class="text-404">
        <div class="text-404__oops">OOPS!</div>
        <div class="text-404__headline">没有找到相关页面哦~</div>
        <div class="text-404__info">请检查您输入的网址是否正确</div>
        <a href="https://www.taobao.com/" class="text-404__btn look" target="__bink">随便看看</a>
        <router-link to="/" class="text-404__btn">回首页</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.http404-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  .http404-wrap {
    position: relative;
    width: 1200px;
    padding: 0 50px;
    overflow: hidden;
  }
  .pic-404 {
    position: relative;
    float: left;
    width: 600px;
    overflow: hidden;
    &__parent {
      width: 100%;
    }
    &__child {
      position: absolute;
      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-delay: 1s;
        animation-fill-mode: forwards;
      }
      &.middle {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMiddle;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-delay: 1.2s;
        animation-fill-mode: forwards;
      }
      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }
        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }
        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }
        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }
      @keyframes cloudMiddle {
         0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }
        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }
        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }
        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }
      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }
        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }
        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }
        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }

    }
  }
  .text-404 {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__btn {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
      &.look {
        margin-right: 20px;
      }
    }
  }
  @keyframes slideUp {
    0% {
      transform: translateY(60px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
