import requset from '@/utils/request'

// 获取工单列表
export const getOrderList = (params) => {
  return requset({
    url: '/task-service/task/search',
    params
  })
}

// 获取状态列表
export const getOrderStatus = () => {
  return requset({
    url: '/task-service/task/allTaskStatus'
  })
}

// 获取工单类型列表
export const getOrderType = () => {
  return requset({
    url: '/task-service/taskType/list'
  })
}

// 搜索工单
export const searchOrder = (params) => {
  return requset({
    url: '/task-service/task/search',
    params
  })
}
