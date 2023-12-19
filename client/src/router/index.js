import { createRouter,createWebHistory } from 'vue-router'

const routeDef = [
    { 
      name: 'Main', 
      path: '/',
      component: () => import('@/layouts/StandardLayout.vue'), 
      children: [
        {
          name: 'Home',
          path: '',
          component: () => import('@/views/Home.vue'),
        }, 
        {
          name: 'About',
          path: '/about',
          component: () => import('@/views/About.vue'),
        }, 
        {
          name: 'Contact',
          path: '/contacts',
          component: () => import('@/views/Contact.vue'),
        }
      ],
      componentName: 'Main' 
    },
    { 
      name: 'Login', 
      path: '/login',
      component: () => import('@/views/Login.vue'),
      componentName: 'Login' 
    },
    { 
      name: 'Register', 
      path: '/register',
      component: () => import('@/views/Register.vue'),
      componentName: 'Register' 
    },
    {
      name: 'ToDo',
      path: '/todo',
      component: () => import('@/components/Todo.vue'),
      componentName: 'ToDo'
    }
]

  // path: '/custom-page',
  // component: CustomLayout, // Use custom layout for this page
  // children: [
  //   {
  //     path: '',
  //     component: () => import('@/views/CustomPage.vue'),
  //   },
  // ],
  
// const routes = routeDef.map(function (def) {
//     return {
//       name: def.name,
//       path: def.path,
//       component: () => import(`../views/${def.componentName}.vue`)
//     }
//   })

  const router = createRouter({
    history:createWebHistory(),
    routes: routeDef,
})

export default router;