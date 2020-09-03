import layout from '@/layout'

const route = {
  path: '/test',
  name: 'test',
  component: layout,
  redirect: 'page1',
  meta: {
    title: 'Test',
    icon: 'el-icon-s-tools'
  },
  children: [
    {
      path: 'page1',
      name: 'testPage1',
      component: () => import('@/views/Test/TestPage1'),
      meta: {
        title: 'TestPage1'
      }
    },
    {
      path: 'page2',
      name: 'testPage2',
      component: () => import('@/views/Test/TestPage2'),
      meta: {
        title: 'TestPage2'
      }
    },
    {
      path: 'page3',
      name: 'testPage3',
      component: () => import('@/views/Test/TestPage3'),
      meta: {
        title: 'TestPage3'
      }
    }
  ]
}

export default route
