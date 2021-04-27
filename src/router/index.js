import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainIndex from '@/components/MainIndex'
import SearchIndex from '@/components/SearchIndex'
import ProductIndex from '@/components/ProductIndex'
import NCartIndex from '@/components/NCartIndex'
import RegisterIndex from '@/components/RegisterIndex'
import LoginIndex from '@/components/LoginIndex'
import ECartIndex from '@/components/ECartIndex'
import ListIndex from '@/components/CRUD/ListIndex'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'MainIndex',
      component: MainIndex
    },
    {
      path: '/main-index',
      name: 'MainIndex',
      component: MainIndex
    },
    {
      path: '/search-index',
      name: 'SearchIndex',
      component: SearchIndex
    },
    {
      path: '/product-index',
      name: 'ProductIndex',
      component: ProductIndex
    },
    {
      path: '/ncart-index',
      name: 'NCartIndex',
      component: NCartIndex
    },
    {
      path: '/register-index',
      name: 'RegisterIndex',
      component: RegisterIndex
    },
    { 
      path: '/Login-index',
      name: 'LoginIndex',
      component: LoginIndex
    },
    { 
      path: '/ecart-index',
      name: 'ECartIndex',
      component: ECartIndex
    },
    { 
      path: '/list-index',
      name: 'ListIndex',
      component: ListIndex
    },

  ]
})
