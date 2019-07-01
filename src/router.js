import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products',
      name: 'products',
      component: ()=>import('./views/products.vue')
    },
    {
      path: '/types',
      name: 'categorias',
      component: ()=>import('./views/typeProducts.vue')
    },
    {
      path: '/brands',
      name: 'marcas',
      component: ()=>import('./views/brands.vue')
    }
  ]
})
