import layout from '@/layout'

const route = {
  path: '/test',
  name: 'test',
  component: layout,
  redirect: 'page1',
  meta: {
    title: '测试',
    icon: 'el-icon-s-tools'
  },
  children: [
    {
      path: 'page1',
      name: 'testPage1',
      component: () => import('@/views/Test/TestPage1'),
      meta: {
        title: '测试页1'
      }
    },
    {
      path: 'page2',
      name: 'testPage2',
      component: () => import('@/views/Test/TestPage2'),
      meta: {
        title: '测试页2'
      }
    }
  ]
}

export default route
