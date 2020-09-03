<template>
  <div class="container-view">
    <!-- content -->
    <div class="content-view">
      <slot name="contentView"></slot>
    </div>

    <!-- search -->
    <div class="search-view">
      <slot name="searchView"></slot>
    </div>

    <!-- synopsis -->
    <div class="synopsis-view" v-if="showSynopsisView">
      <slot name="synopsisView"></slot>
    </div>

    <!-- table -->
    <div class="table-view">
      <div class="table-title" v-if="showTableView">
        <div class="tips" v-if="showTips"></div>
        <slot name="tableTitle"></slot>
      </div>
      <slot name="tableView"></slot>
    </div>

    <!-- pagination -->
    <div class="pagination-view" v-if="showPaginationView">
      <slot name="paginationView"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContainerView',
  props: {
    showTips: {
      type: Boolean,
      default: false
    },
    showSynopsisView: {
      type: Boolean,
      default: false
    },
    showTableView: {
      type: Boolean,
      default: false
    },
    showPaginationView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
.container-view {
  padding: 20px;
  background-color: #fff;
  .table-view {
    .table-title {
      padding-top: 20px;
      padding-bottom: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      color: #909399;
      .tips {
        height: 20px;
        border-left: 3px solid #ccc;
        border-radius: 30%;
        margin-right: 5px;
      }
    }
  }
  .pagination-view {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
