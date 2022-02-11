import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/about',
    name: 'About',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   // console.log('router.beforeach calıstı')
//   const idToken = localStorage.getItem("acsessToken") ?
//     localStorage.getItem("accessToken") :
//     "";
//   if (to.name !== 'Login' && !idToken) next({
//     name: 'Login'
//   })
//   else next()
// })

export default router
