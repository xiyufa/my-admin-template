<template>
  <div id="tags-view-container" class="tags-view-container" :class="{ collapse: isCollapse }">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :to="{ name: tag.name, query: tag.query, params: tag.params }"
        tag="span"
        :class="isActive(tag) ? 'active' : ''"
        class="tags-view-item"
        ref="tag"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import path from 'path'

import { mapGetters } from 'vuex'

import ScrollPane from './ScrollPane'

export default {
  name: 'TagsView',
  components: {
    ScrollPane
  },
  computed: {
    ...mapGetters(['isCollapse', 'userMenu', 'visitedViews'])
  },
  data() {
    return {
      affixTags: [],
      visible: false,
      left: 0,
      top: 0,
      selectedTag: {}
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  created() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive({ name }) {
      return name === this.$route.name
    },
    filterAffixTags(userMenu, basePath = '/') {
      let tags = []
      userMenu.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagsPath = path.resolve(basePath, route.path)
          tags.push({
            path: tagsPath,
            fullPath: tagsPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.filterAffixTags(this.userMenu)
      this.affixTags = affixTags
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.commit('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.name === this.$route.name) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.commit('tagsView/updateVisitedView', this.$route)
            }
          }
          break
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.commit('tagsView/delCachedView', view)
      const { fullPath } = view
      this.$nextTick(() => {
        this.$router.replace({
          path: `/redirect${fullPath}`
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view)
      if (this.isActive(view)) {
        this.toLastView(this.visitedViews, view)
      }
    },
    closeOthersTags() {
      const { currentRoute } = this.$router
      if (currentRoute.name !== this.selectedTag.name) {
        this.$router.replace(this.selectedTag)
      }
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag)
      this.moveToCurrentTag()
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews')
      this.toLastView(this.visitedViews, view)
    },
    toLastView(visitedViews) {
      const { currentRoute } = this.$router
      if (visitedViews.length !== 0) {
        const lastVisitedView =  visitedViews[visitedViews.length - 1]
        if (lastVisitedView.name !== currentRoute.name) {
          this.$router.push(lastVisitedView)
        }
      } else {
        if (currentRoute.name === 'dashboard') {
          this.$router.push({ path: `/redirect${currentRoute.fullPath}`, params: currentRoute.params})
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const { offsetWidth } = this.$el // container width
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.layerY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="less">
.tags-view-container {
  width: calc( 100% - 210px );
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 1000;
  transition: .28s width ease;
  &.collapse{
    width: calc( 100% - 64px );
  }
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background-color: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px; 
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
<style lang="less">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
