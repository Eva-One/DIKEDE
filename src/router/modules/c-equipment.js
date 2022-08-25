import Layout from '@/layout'

export default {
  path: '/equipment',
  name: 'equipment',
  component: Layout,
  redirect: '/equipment/manage',
  meta: { title: '设备管理', icon: 'equipment' },
  children: [
    {
      path: 'manage',
      name: 'manage',
      component: () => import('@/views/equipment-manage'),
      meta: { title: '设备管理' }
    },
    {
      path: 'status',
      name: 'status',
      component: () => import('@/views/equipment-status'),
      meta: { title: '设备状态' }
    },
    {
      path: 'type',
      name: 'type',
      component: () => import('@/views/equipment-type'),
      meta: { title: '设备类型管理' }
    }
  ]
}
