import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/auth/Signup.vue'
import Login from '../views/auth/Login.vue'
import BlogLists from '../views/blogs/BlogLists.vue'
import FollowingBlog from '../views/blogs/FollowingBlog.vue'
import UserInfo from '../views/users/UserInfo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog/lists',
    name: 'BlogLists',
    component: BlogLists
  },
  {
    path: '/blog/following',
    name: 'FollowingBlog',
    component: FollowingBlog
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
