<template>
  <div>
    <el-dialog title="工单详情" :visible="dialogVisible" width="45%" :before-close="handleClose" custom-class="add-order">
      <div v-if="orderInfo.taskStatus*1 === 1">
        <div class="img">
          <div class="img1">
            <img src="@/assets/common/daiban.png" alt="">
            <span>待办</span>
          </div>
          <img
            src="http://likede2-admin.itheima.net/img/pic_1.834b274c.png"
            alt=""
          >
        </div>
        <el-row :gutter="20">
          <el-col
            :span="8"
            :offset="2"
          ><div class="grid-content bg-purple">
            设备编号：{{ orderInfo.innerCode }}
          </div></el-col>
          <el-col
            :span="10"
            :offset="2"
          ><div class="grid-content bg-purple">
            创建日期：{{ orderInfo.createTime }}
          </div></el-col>
          <el-col
            :span="8"
            :offset="2"
          ><div class="grid-content bg-purple">
            运营人员：{{ orderInfo.userName }}
          </div></el-col>
          <el-col
            :span="8"
            :offset="2"
          ><div class="grid-content bg-purple">
            工单类型：{{ orderInfo.taskType.typeName }}
          </div></el-col>
          <el-col
            :span="8"
            :offset="2"
          ><div class="grid-content bg-purple">
            工单方式：{{ orderInfo.createType }}
          </div></el-col>
          <el-col
            :span="20"
            :offset="2"
          ><div class="grid-content bg-purple">
            备注：{{ orderInfo.desc }}
          </div></el-col>
        </el-row>
        <div class="addWorkBtn">
          <!-- 待办区分取消与确定弹框 -->
          <el-button type="primary" size="medium" class="allocationbtn" style="background-color: #fbf4f0;border:none;color: #655b56" @click="cancelWorkOrder">取消工单</el-button>
        </div>
      </div>
      <div v-else>
        <div class="img">
          <div class="img1">
            <img v-if="orderInfo.taskStatus*1 === 3" src="@/assets/common/quxiao.png" alt="">
            <img v-else-if="orderInfo.taskStatus*1 === 4" src="@/assets/common/wancheng.png" alt="">
            <span v-if="orderInfo.taskStatus*1 === 3">取消</span>
            <span v-else-if="orderInfo.taskStatus*1 === 4">完成</span>
          </div>
          <img
            v-if="orderInfo.taskStatus*1 === 3"
            src="http://likede2-admin.itheima.net/img/pic_3.e8208e34.png"
            alt=""
          >
          <img
            v-else-if="orderInfo.taskStatus*1 === 4"
            src="http://likede2-admin.itheima.net/img/pic_4.3b5af41c.png"
            alt=""
          >
        </div>
        <el-row :gutter="20">
          <el-col
            :span="10"
            :offset="2"
          ><div class="grid-content bg-purple">
            设备编号：{{ orderInfo.innerCode }}
          </div></el-col>
          <el-col
            :span="10"
            :offset="2"
          ><div class="grid-content bg-purple">
            创建日期：{{ orderInfo.createTime }}
          </div></el-col>
          <el-col
            :span="10"
            :offset="2"
          ><div v-if="orderInfo.taskStatus*1 === 3" class="grid-content bg-purple">
             取消日期：{{ orderInfo.updateTime }}
           </div>
            <div v-if="orderInfo.taskStatus*1 === 4" class="grid-content bg-purple">
              完成日期：{{ orderInfo.updateTime }}
            </div></el-col>
          <el-col
            :span="10"
            :offset="2"
          ><div class="grid-content bg-purple">
            运营人员：{{ orderInfo.userName }}
          </div></el-col>
          <el-col
            :span="10"
            :offset="2"
          ><div class="grid-content bg-purple">
            工单类型：{{ orderInfo.taskType&&orderInfo.taskType.typeName }}
          </div></el-col>
          <el-col
            :span="10"
            :offset="2"
          ><div class="grid-content bg-purple">
            工单方式：{{ orderInfo.createType }}
          </div></el-col>
          <el-col
            :span="10"
            :offset="2"
          ><div v-if="orderInfo.taskStatus*1 === 3" class="grid-content bg-purple">
             取消原因：{{ orderInfo.desc }}
           </div>
            <div v-if="orderInfo.taskStatus*1 === 4" class="grid-content bg-purple">
              备注：{{ orderInfo.desc }}
            </div>
          </el-col>
        </el-row>
        <div class="addWorkBtn">
          <!-- 待办区分取消与确定弹框 -->
          <el-button v-if="orderInfo.taskStatus*1 === 3" type="primary" size="medium" class="allocationbtn" style="background-color: #fbf4f0;border:none;color: #655b56" @click="reCreate">重新创建</el-button>
        </div>
      </div>
    </el-dialog>

    <AddNewOrder ref="addNewOrder" :dialog-visible.sync="showAddNewOrder" />
  </div>
</template>

<script>
import { getWorkOrderDetail, cancelWorkOrder } from '@/api/operation'
import { ProcessingWorkOrderStatus } from '@/utils'
import AddNewOrder from './AddNewOrder.vue'
export default {
  components: {
    AddNewOrder
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      orderInfo: {},
      showAddNewOrder: false,
      taskId: null
    }
  },
  methods: {
    async getWorkOrderDetail(taskId) {
      this.taskId = taskId
      const res = await getWorkOrderDetail(taskId)
      this.orderInfo = ProcessingWorkOrderStatus(res)
    },
    handleClose() {
      this.$emit('update:dialog-visible', false)
    },
    async cancelWorkOrder() {
      try {
        await this.$confirm('确认要取消工单？', '提示', {
          type: 'warning'
        })
        await cancelWorkOrder(this.orderInfo.taskId, { taskId: this.orderInfo.taskId, desc: this.orderInfo.desc })
        this.handleClose()
        this.$message.success('取消工单成功')
        this.$emit('refreshOrder')
      } catch (e) {
        console.log(e)
      }
    },
    async reCreate() {
      this.$refs.addNewOrder.opOrderData = await getWorkOrderDetail(this.taskId)
      this.$refs.addNewOrder.opOrderData.userId = 1
      this.$refs.addNewOrder.opOrderData.productType = this.orderInfo.taskType.typeId
      this.$refs.addNewOrder.getOperatePeopleList()
      this.showAddNewOrder = true
      this.$emit('update:dialog-visible', false)
    }
  }
}
</script>

<style lang="scss">
.img {
  display: flex;
  height: 54px;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background-color: #e5e5e5;
  border-radius: 10px;
  margin-bottom: 20px;
}
.img1 {
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }
}
.addWorkBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.el-col-8 {
  margin-bottom: 15px;
}
.el-col-10 {
  margin-bottom: 15px;
}
.el-button {
  line-height: 0;
}
</style>
