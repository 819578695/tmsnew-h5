import Vue from 'vue'
import Router from 'vue-router'


import order from '@/views/order'
import user from '@/views/user/index'
import reporting from '@/views/reportTable/index'
import login from '@/views/login'
import orderDetails from '@/components/orderDetails'
import orders from '@/views/order/index'
import orderDetailsOut from '@/components/orderDetailsOut'
import orderDetailsPut from '@/components/orderDetailsPut'
// 首页
const Indexs = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/order',
    name: 'order',
    component: order
  },
  {
    path: '/user',
    name: 'user',
    component: user
  },
  {
    path: '/',
    name: 'reporting',
    component: reporting
  },
  {
    path: '/orderDetails',
    name: 'orderDetails',
    component: orderDetails
  },
  {
    path: '/orders',
    name: 'orders',
    component: orders
  },
  {
    path: '/orderDetailsOut',
    name: 'orderDetailsOut',
    component: orderDetailsOut
  },
  {
    path: '/orderDetailsPut',
    name: 'orderDetailsPut',
    component: orderDetailsPut
  }
]
// 报表中心
import dashBoard from '@/views/reportTable/dashBoard'
import make from '@/views/reportTable/make'
import warranty from '@/views/reportTable/warranty'
const Table = [
  {
    path: '/dashBoard',
    name: 'dashBoard',
    component: dashBoard
  },
  {
    path: '/make',
    name: 'make',
    component: make
  },
  {
    path: '/warranty',
    name: 'warranty',
    component: warranty
  },
]

import updataPsd from '@/views/user/updataPsd'
import record from '@/views/user/record'

const User = [
  {
    path: '/updataPsd',
    name: 'updataPsd',
    component: updataPsd
  },
  {
    path: '/record',
    name: 'record',
    component: record
  },
]

const route = [].concat(
  Indexs,Table,User
)


Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: route
})
