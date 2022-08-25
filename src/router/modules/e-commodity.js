import Layout from '@/layout'

export default {
  path: '/commodity',
  name: 'commodity',
  component: Layout,
  redirect: '/commodity/type',
  meta: { title: '商品管理', icon: 'commodity' },
  children: [
    {
      path: 'type',
      name: 'type',
      component: () => import('@/views/commodity-type'),
      meta: { title: '商品类型' }
    },
    {
      path: 'manage',
      name: 'manage',
      component: () => import('@/views/commodity-manage'),
      meta: { title: '商品管理' }
    }
  ]
}
