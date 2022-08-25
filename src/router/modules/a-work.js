import Layout from '@/layout'

export default {
  path: '/task',
  name: 'task',
  component: Layout,
  redirect: '/task/operation',
  meta: { title: '工单管理', icon: 'work' },
  children: [
    {
      path: 'operation',
      name: 'operation-work',
      component: () => import('@/views/operation-work'),
      meta: { title: '运营工单' }
    },
    {
      path: 'maintenance',
      name: 'maintenance-work',
      component: () => import('@/views/maintenance-work'),
      meta: { title: '运维工单' }
    }
  ]
}
