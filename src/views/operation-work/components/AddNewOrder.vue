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
        ref="addNewOrderForm"
        class="el-input"
        label-width="96px"
        label-position="left"
        :model="opOrderData"
        :rules="rules"
      >
        <el-form-item ref="innerCode" label="设备编号:" prop="innerCode">
          <el-input v-model="opOrderData.innerCode" placeholder="请输入" show-word-limit maxlength="15" @change="getOperatePeopleList" />
        </el-form-item>
        <el-form-item label="工单类型:" prop="productType">
          <el-select
            v-model="opOrderData.productType"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in orderType"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="补货数量：">
          <el-button type="text" @click="showGoodsOrder">
            <i class="el-icon-notebook-2" /> 补货清单</el-button>
        </el-form-item>
        <el-form-item label="运营人员:" prop="assignorId">
          <el-select
            v-model="opOrderData.assignorId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in operatorList"
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
          <el-button type="primary" size="medium" style="background: linear-gradient(135deg,#ff9743,#ff5e20);border:none" @click="addNewOrder">确认</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 补货清单 -->
    <AddGoodsOrder ref="goodsDetail" :dialog-visible.sync="showAddGoodsOrder" @setDetail="opOrderData.details=[...$event]" />
  </div>
</template>

<script>
import { getOperatePeopleList, getOrderType, getAddGoodsOrder, createOrder } from '@/api/operation'
import AddGoodsOrder from './AddGoodsOrder.vue'
export default {
  components: {
    AddGoodsOrder
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      opOrderData: {
        createType: 1,
        innerCode: '',
        productType: null,
        details: [],
        userId: 1,
        desc: '',
        assignorId: null
      },
      rules: {
        innerCode: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 15, message: '不能超过15位', trigger: 'blur' }
        ],
        productType: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 1, max: 40, message: '不能超过40位', trigger: 'blur' }

        ]
      },
      operatorList: [],
      orderType: [],
      showAddGoodsOrder: false
    }
  },
  created() {
    this.getOrderType()
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
      this.$refs.addNewOrderForm.resetFields()
      this.opOrderData = {
        innerCode: '',
        productType: null,
        details: [],
        userId: null,
        desc: ''
      }
    },

    async getOperatePeopleList() {
      this.operatorList = await getOperatePeopleList(this.opOrderData.innerCode)
    },

    async getOrderType() {
      const res = await getOrderType()
      this.orderType = res.filter(ele => ele.type === 2)
    },

    showGoodsOrder() {
      this.$refs.addNewOrderForm.validateField('innerCode', async(val) => {
        if (!val) {
          this.showAddGoodsOrder = true
          const data = await getAddGoodsOrder(this.opOrderData.innerCode)
          data.forEach(ele => {
            ele.expectCapacity = ele.maxCapacity - ele.currentCapacity
            ele.expectCapacity1 = ele.maxCapacity - ele.currentCapacity
          })
          this.$refs.goodsDetail.goodsList = data
        }
      })
    },

    // 按确认增加表单
    async addNewOrder() {
      try {
        await this.$refs.addNewOrderForm.validate()
        await createOrder(this.opOrderData)
        this.handleClose()
        this.$message.success('新建工单成功')
        this.$emit('refreshOrder')
      } catch (e) {
        // this.$message.error(e.response.data)
        console.log(e)
      }
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
