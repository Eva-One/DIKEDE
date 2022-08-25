import Layout from '@/layout'

export default {
  path: '/point',
  name: 'point',
  component: Layout,
  redirect: '/point/area',
  meta: { title: '点位管理', icon: 'point' },
  children: [
    {
      path: 'area',
      name: 'area',
      component: () => import('@/views/area'),
      meta: { title: '区域管理' }
    },
    {
      path: 'points',
      name: 'points',
      component: () => import('@/views/point'),
      meta: { title: '点位管理' }
    },
    {
      path: 'partners',
      name: 'partners',
      component: () => import('@/views/partners'),
      meta: { title: '合作商管理' }
    }
  ]
}
