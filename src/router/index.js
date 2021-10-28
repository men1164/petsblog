import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/auth/Signup.vue'
import Login from '../views/auth/Login.vue'
import UserInfo from '../views/users/UserInfo.vue'
import CreateBlog from '../views/blogs/CreateBlog.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/createblog',
    name: 'CreateBlog',
    component: CreateBlog
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: UserInfo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
