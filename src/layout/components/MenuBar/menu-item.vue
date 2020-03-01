<template>
  <el-menu-item v-if="!route.children || !route.children.length === 0" :index="route.name">
    <i :class="route.meta.icon" v-if="!noIcon"></i>
    <span slot="title">{{ route.meta.title }}</span>
  </el-menu-item>
  <el-submenu v-else :index="route.name">
    <template slot="title">
      <i :class="route.meta.icon"></i>
      <span>{{ route.meta.title }}</span>
    </template>
    <template v-for="(item, index) in route.children">
      <menu-item v-if="!item.hidden" :route="item" :key="index" :noIcon="true"></menu-item>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    route: {
      type: Object
    },
    noIcon: {
      type: Boolean
    }
  }
}
</script>

<style scoped>

</style>
