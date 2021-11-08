import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LandingPet from '../views/users/LandingPet.vue'
import Signup from '../views/auth/Signup.vue'
import Login from '../views/auth/Login.vue'
import HomeBlog from '../views/blogs/HomeBlog.vue'
import FollowingBlog from '../views/blogs/FollowingBlog.vue'
import CreatePet from '../views/users/CreatePet.vue'
import UserInfo from '../views/users/UserInfo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'HomeBlog',
    component: HomeBlog
  },
  {
    path: '/pet/:id',
    name: 'LandingPet',
    component: LandingPet,
    props: true
  },
  {
    path: '/blog/following',
    name: 'FollowingBlog',
    component: FollowingBlog
  },
  // temporary path
  {
    path: '/createpet',
    name: 'CreatePet',
    component: CreatePet
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
