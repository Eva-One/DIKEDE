<template>
  <div>
    <el-dialog
      title="工单配置"
      :visible="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="Replenishment">
        <span>补货预警值：</span>
        <el-input-number v-model="num" controls-position="right" />
      </div>
      <el-row justify="center" type="flex">
        <el-button type="primary" size="medium" class="allocationbtn" style="background-color: #fbf4f0;border:none;color: #655b56" @click="handleClose">取消</el-button>
        <el-button type="primary" size="medium" style="background: linear-gradient(135deg,#ff9743,#ff5e20);border:none">确认</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
