import { createRouter,createWebHistory } from 'vue-router'
import StandardLayout from '@/layouts/StandardLayout.vue';
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const routeDef = [
    { 
      name: 'Main', 
      path: '/',
      component: () => import('@/layouts/StandardLayout.vue'), 
      children: [{
        name: 'Home',
        path: '',
        component: () => import('@/views/Home.vue'),
      }, {
        name: 'About',
        path: '/about',
        component: () => import('@/views/About.vue'),
      }, {
        name: 'Contact',
        path: '/contacts',
        component: () => import('@/views/Contact.vue'),
      }
    ],
      componentName: 'Main' },
    { 
      name: 'Login', 
      path: '/login',
      component: Login, 
      componentName: 'Login' },
    { 
      name: 'Register', 
      path: '/register',
      component: Register, 
      componentName: 'Register' }
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