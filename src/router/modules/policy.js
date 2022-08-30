import Layout from '@/layout'

export default {
  path: '/policy',
  component: Layout,
  children: [
    {
      path: '',
      name: 'policy',
      component: () => import('@/views/policy'),
      meta: { title: '策略管理', icon: 'policy' }
    }
  ]
}
