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
      <el-button type="primary" size="medium" icon="el-icon-search" style="background: linear-gradient(135deg,#ff9743,#ff5e20);border:none" @click="addOrderShow=true">新建</el-button>
      <el-button type="primary" size="medium" class="allocationbtn" style="background-color: #fbf4f0;border:none;color: #655b56">工单配置</el-button>
      <el-table
        :data="tableData"
        style="width: 100%"
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
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="ViewDetails(scope)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <BottomBtn :total="totalCount" :page-size="getListData.pageSize" :current-page="getListData.pageIndex" @changePageEvent="getOrderList" />
    </el-card>

    <!-- 新建工单弹出 -->
    <AddNewOrder :dialog-visible.sync="addOrderShow" />
  </div>
</template>

<script>
import { getOrderList, getOrderStatus, searchOrder } from '@/api/operation'
import BottomBtn from '@/components/BottomBtn'
import AddNewOrder from './components/AddNewOrder.vue'
import moment from 'moment'
export default {
  components: {
    BottomBtn,
    AddNewOrder
  },
  data() {
    return {
      formInline: {
        taskCode: '',
        status: ''
      },
      addOrderShow: false,
      orderStatus: [],
      getListData: {
        pageIndex: 1,
        pageSize: 10,
        isRepair: false
      },
      tableData: [],
      totalCount: null,
      totalPage: null,
      moment
    }
  },

  created() {
    this.getOrderList()
    this.getOrderStatus()
  },
  methods: {
    async getOrderList(val) {
      this.getListData.pageIndex = val
      const { totalCount, totalPage, currentPageRecords } = await getOrderList(this.getListData)
      this.tableData = this.ProcessingWorkOrderStatus(currentPageRecords)
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
        this.tableData = currentPageRecords
        this.totalCount = parseInt(totalCount)
        this.totalPage = totalPage
      } catch (e) {
        console.log(e)
      }
    },
    // 处理工单状态
    ProcessingWorkOrderStatus(data) {
      data.forEach((ele) => {
        ele.createType === 0 ? (ele.createType = '自动') : (ele.createType = '手动')
        ele.updateTime = this.moment(ele.updateTime).utcOffset(8).format('YYYY.MM.DD HH:mm:ss')
      })
      return data
    }
  }
}
</script>

<style lang="scss">
.header-choose{
  height: 65px;
  margin-bottom: 20px;
  .el-card__body{
    margin-top: 12px;
    margin-left: 20px;
    padding:unset;
    .el-form-item{
      margin-bottom: unset;
      label{
        font-weight: normal;
      }
    }
  }
}

.el-table{
  td {
    border-bottom:unset
  }
}
</style>
