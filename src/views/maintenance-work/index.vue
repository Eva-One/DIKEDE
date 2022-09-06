<template>
  <div class="app-container">
    <el-card shadow="always" class="header-choose">
      <el-form
        :inline="true"
        :model="formInline"
        size="medium"
      >
        <el-form-item label="工单编号:">
          <el-input v-model="formInline.taskCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="工单状态:">
          <el-select v-model="formInline.status" filterable placeholder="请选择" :clearable="true" style="width:100%">
            <el-option
              v-for="item in orderStatus"
              :key="item.statusId"
              :label="item.statusName"
              :value="item.statusId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" style="background:#5f84ff;border:none" @click="searchOrder">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card
      shadow="always"
    >
      <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" style="background: linear-gradient(135deg,#ff9743,#ff5e20);border:none" @click="addOrderShow=true">新建</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
        header-row-class-name="my-table-header"
        row-class-name="my-table-row"
        class="my-table-main"
      >
        <el-table-column
          type="index"
          label="序号"
          width="83px"
        />
        <el-table-column
          prop="taskCode"
          label="工单编号"
        />
        <el-table-column
          prop="innerCode"
          label="设备编号"
        />
        <el-table-column
          prop="taskType.typeName"
          label="工单类型"
        />
        <el-table-column
          prop="createType"
          label="工单方式"
        />
        <el-table-column
          prop="taskStatusTypeEntity.statusName"
          label="工单状态"
        />
        <el-table-column
          prop="userName"
          label="运营人员"
        />
        <el-table-column
          prop="updateTime"
          label="创建日期"
          width="180px"
        />
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text" @click="ViewDetails(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <BottomBtn :total="totalCount" :page-size="getListData.pageSize" :current-page="getListData.pageIndex" @changePageEvent="getOrderList" />
    </el-card>

    <!-- 新建工单弹出 -->
    <AddNewOrder :dialog-visible.sync="addOrderShow" @refreshOrder="getOrderList" />

    <!-- 查看详情弹出 -->
    <OrderDetail ref="orderDetail" :dialog-visible.sync="orderDetailShow" @refreshOrder="getOrderList" />
  </div>
</template>

<script>
import { getOrderList, getOrderStatus, searchOrder } from '@/api/operation'
import BottomBtn from '@/components/BottomBtn'
import AddNewOrder from './components/AddNewOrder.vue'
import OrderDetail from './components/OrderDetail.vue'
import { ProcessingWorkOrderStatus } from '@/utils'

export default {
  components: {
    BottomBtn,
    AddNewOrder,
    OrderDetail
  },
  data() {
    return {
      formInline: {
        taskCode: '',
        status: ''
      },
      addOrderShow: false,
      orderSetShow: false,
      orderDetailShow: false,
      orderStatus: [],
      getListData: {
        pageIndex: 1,
        pageSize: 10,
        isRepair: true
      },
      tableData: [],
      totalCount: null,
      totalPage: null
    }
  },

  created() {
    this.getOrderList()
    this.getOrderStatus()
  },
  methods: {
    async getOrderList(val) {
      console.log(66)
      this.getListData.pageIndex = val
      const { totalCount, totalPage, currentPageRecords } = await getOrderList(this.getListData)
      this.tableData = ProcessingWorkOrderStatus(currentPageRecords)
      this.totalCount = parseInt(totalCount)
      this.totalPage = totalPage
    },
    async getOrderStatus() {
      this.orderStatus = await getOrderStatus()
    },
    // async getOrderType() {
    //   const res = await getOrderType()
    //   console.log(res)
    // },
    async searchOrder() {
      try {
        const { totalCount, totalPage, currentPageRecords } = await searchOrder(this.formInline)
        this.tableData = ProcessingWorkOrderStatus(currentPageRecords)
        this.totalCount = parseInt(totalCount)
        this.totalPage = totalPage
      } catch (e) {
        console.log(e)
      }
    },
    orderSet() {
      this.$refs.orderSetAlert.getSupplyAlert()
      this.orderSetShow = true
    },
    ViewDetails(row) {
      this.$refs.orderDetail.getWorkOrderDetail(row.taskId)
      this.orderDetailShow = true
    }
  }
}
</script>

<style lang="scss">
.allocationbtn{
  height: 34px;
}
</style>
