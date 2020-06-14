<template>
  <transition :name="transitionName">
    <div v-show="visible" :style="customStyle" class="back-to-ceiling" @click="backToTop">
      <svg
      t="1582704527073"
      class="Icon Icon--backToTopArrow"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2068"
      width="32"
      height="32"
    >
      <path
        d="M324.022051 641.270121c-7.902977 0-14.676957-2.257993-20.321941-5.644983s-9.031974-9.031974-10.16097-14.676957c-1.128997-5.644983-1.128997-12.418964 1.128997-20.321941s6.77398-15.805954 13.54796-23.70893c28.224917-32.740904 55.320838-63.223815 80.158765-91.448732 24.837927-28.224917 49.675854-55.320838 74.513782-82.416759 5.644983-6.77398 13.54796-12.418964 22.579934-15.805954s18.063947-5.644983 27.09592-5.644983c9.031974 0 18.063947 1.128997 27.095921 4.515987 9.031974 3.38699 15.805954 7.902977 22.579934 14.676957 13.54796 13.54796 28.224917 28.224917 42.901874 44.030871 14.676957 15.805954 29.353914 30.482911 44.030871 46.288864 14.676957 15.805954 28.224917 30.482911 42.901874 46.288865 13.54796 15.805954 27.095921 30.482911 40.643881 44.030871 5.644983 6.77398 10.16097 13.54796 11.289967 20.32194 2.257993 6.77398 1.128997 13.54796 0 19.192944-2.257993 5.644983-5.644983 11.289967-10.16097 14.676957-5.644983 3.38699-12.418964 5.644983-20.32194 5.644983H324.022051z"
        :fill="iconColor"
        p-id="2069"
      />
    </svg>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
export default {
  name: 'BackToTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    },
    scrollHeight: {
      type: Number,
      default: 0
    },
    backPosition: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: Object,
      default: () => {
        return {
          right: '50px',
          bottom: '100px',
          width: '40px',
          height: '40px',
          'border-radius': '40px',
          'line-height': '58px',
          'box-shadow': '0 0 6px rgba(0,0,0, .12)',
          background: '#f7f8fa'
        }
      }
    },
    iconColor: {
      type: String,
      default: '#409eff'
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false,
      scrollHeights: 0
    }
  },
  watch: {
    scrollHeight(newValue) {
      this.handleScroll(newValue)
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll(scrollHeight) {
      this.visible = scrollHeight > this.visibilityHeight
      this.scrollHeights = scrollHeight
    },
    backToTop() {
      if (this.isMoving) return
      const start = this.scrollHeights
      let i = 0
      this.isMoving = true
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 300))
        if (next <= this.backPosition) {
          this.$emit('scrollTo', this.backPosition)
          clearInterval(this.interval)
          this.isMoving = false
        } else {
          this.$emit('scrollTo', next)
        }
        i++
      }, 16.7)
    },
    easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    }
  }
}
</script>

<style scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.back-to-ceiling:hover {
  background: #d5dbe7;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
