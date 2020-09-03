<template>
  <div class="search-view">
    <slot name="searchCondition"></slot>
    <div class="search-btn">
      <slot name="searchBtn"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchView',
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
.search-view {
  .search-btn {
    text-align: right;
    padding-top: 10px;
    padding-bottom: 15px;
  }
}
</style>
