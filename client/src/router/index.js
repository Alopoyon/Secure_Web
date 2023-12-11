import { createRouter,createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routeDef = [
    { name: 'Home', path: '/', componentName: 'Home' },
    { name: 'Login', path: '/login', componentName: 'Login' },
    { name: 'Register', path: '/register', componentName: 'Register' }
  ]

const routes = routeDef.map(function (def) {
    return {
      name: def.name,
      path: def.path,
      component: () => import(`../views/${def.componentName}.vue`)
    }
  })

  const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;