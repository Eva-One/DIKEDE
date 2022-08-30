<template>
  <div>
    <el-dialog
      title="新增工单"
      :visible="dialogVisible"
      width="40%"
      :before-close="handleClose"
      custom-class="add-order"
    >
      <el-form
        ref="fromData"
        class="el-input"
        label-width="96px"
        label-position="left"
        :model="opOrderData"
        :rules="rules"
      >
        <el-form-item ref="innerCode" label="设备编号:" prop="innerCode">
          <el-input v-model="opOrderData.innerCode" placeholder="请输入" show-word-limit maxlength="15" />
        </el-form-item>
        <el-form-item label="工单类型:" prop="productType">
          <el-select
            v-model="opOrderData.productType"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in []"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="补货数量：">
          <el-button type="text">
            <i class="el-icon-notebook-2" /> 补货清单</el-button>
        </el-form-item>
        <el-form-item label="运营人员:" prop="userId">
          <el-select
            v-model="opOrderData.userId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in []"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="desc">
          <el-input v-model="opOrderData.desc" type="textarea" placeholder="请输入备注（不超过40个字）" show-word-limit maxlength="40" :autosize="{minRows: 4, maxRows: 4}" />
        </el-form-item>
        <el-row justify="center" type="flex">
          <el-button type="primary" size="medium" class="allocationbtn" style="background-color: #fbf4f0;border:none;color: #655b56" @click="handleClose">取消</el-button>
          <el-button type="primary" size="medium" style="background: linear-gradient(135deg,#ff9743,#ff5e20);border:none">确认</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <!----补货清单弹出层----->
    <!-- <el-dialog
      title="补货详情"
      :visible.sync="dialogVisible1"
      width="50%"
      :modal="false"
    >
      <div class="replenishmentDetails">
        <el-table
          ref="aabb"
          empty-text="暂无数据"
          :data="replenishmentDetailsData"
        >
          <el-table-column prop="channelCode" label="货道编号" />
          <el-table-column prop="sku.brandName" label="商品名称" />
          <el-table-column prop="currentCapacity" label="当前数量" />
          <el-table-column prop="expectCapacity1" label="还可添加" />
          <el-table-column prop="expectCapacity" label="补满数量">
            <template slot-scope="scope">
              <el-input-number
                v-if="scope.row.price"
                v-model="scope.row.expectCapacity"
                controls-position="right"
                :min="0"
                :max="scope.row.Capacity"
              />
              <span v-else>货道暂无商品</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="addWorkBtn">
          <lsButton title="取消" color="config" @click="onClose1" />
          <lsButton title="确定" color="addBtn" @click="onSave1" />
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      opOrderData: {
        innerCode: '',
        productType: null,
        details: {},
        userId: null,
        desc: ''
      },
      rules: {

      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
    }
  }
}
</script>

<style lang="scss">
.add-order{
    border-radius: 8px;
    padding-left: 40px;
    padding-right: 40px;
    .el-dialog__header{
        padding-left: 0;
        .el-dialog__title{
        font-size: 16px;
        color: #333;
        font-weight: bold;
    }
    }

}
</style>
