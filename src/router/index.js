import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LandingPet from '../views/users/LandingPet.vue'
import Signup from '../views/auth/Signup.vue'
import Login from '../views/auth/Login.vue'
import Explore from '../views/Explore.vue'
import FollowingBlog from '../views/blogs/FollowingBlog.vue'
import CreatePet from '../views/users/CreatePet.vue'
import UserInfo from '../views/users/UserInfo.vue'
import CreateBlog from '../views/blogs/CreateBlog.vue'
import Blogview from '../views/blogs/Blogview.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
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
    path: '/blog/create',
    name: 'CreateBlog',
    component: CreateBlog,
    props: true
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/pet/creat',
    name: 'CreatePet',
    component: CreatePet,
  },
  {
    path: '/blog/:blogId',
    name: 'Blogview',
    component: Blogview,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
