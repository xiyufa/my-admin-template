<template>
  <container-view class="test-wrap view-container">
    <template #contentView>
      <div class="test-title">Size Test</div>
      <div class="test-content">
        <el-form label-width="110px">
          <el-form-item label="button：">
            <el-button type="primary">primary</el-button>
          </el-form-item>
          <el-form-item label="input：">
            <el-input class="_w300"></el-input>
          </el-form-item>
          <el-form-item label="date-picker">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </container-view>
</template>

<script>
export default {
  data() {
    return {
      value1: []
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
  }
}
</style>
