import Layout from '@/layout'

export default {
  path: '/personnel',
  name: 'personnel',
  component: Layout,
  redirect: '/personnel/list',
  meta: { title: '人员管理', icon: 'personnel' },
  children: [
    {
      path: 'list',
      name: 'list',
      component: () => import('@/views/personnel-list'),
      meta: { title: '人员列表' }
    },
    {
      path: 'total',
      name: 'total',
      component: () => import('@/views/personnel-total'),
      meta: { title: '人效统计' }
    },
    {
      path: 'worklist',
      name: 'worklist',
      component: () => import('@/views/personnel-work'),
      meta: { title: '工作量列表' }
    }
  ]
}
