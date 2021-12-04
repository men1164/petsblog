import { createRouter, createWebHistory } from 'vue-router'

/**
 * Import all .vue files in view folder, to specify path for each page.
 */
import Home from '../views/Home.vue'
import LandingPet from '../views/users/LandingPet.vue'
import Signup from '../views/auth/Signup.vue'
import Login from '../views/auth/Login.vue'
import Explore from '../views/Explore.vue'
import FollowingPets from '../views/users/FollowingPets.vue'
import CreatePet from '../views/users/CreatePet.vue'
import UserInfo from '../views/users/UserInfo.vue'
import CreateBlog from '../views/blogs/CreateBlog.vue'
import Blogview from '../views/blogs/Blogview.vue'
import YourPet from '../views/users/YourPet.vue'
import YourBlog from '../views/blogs/YourBlog.vue'
import Feed from '../views/blogs/Feed.vue'
import VCreateBlog from '../views/veterinarian/VCreateBlog.vue'
import VBlogview from '../views/veterinarian/VBlogview.vue'

import { projectAuth } from '../firebase/config'

/**
 * Check if user already logged in and try to access home page,
 * redirect to explore page.
 */
const isLoggedIn = (to, from, next) => {
    let user = projectAuth.currentUser
    if(user) {
        next({ name: 'Explore' })
    }
    else {
        next()
    }
}

/**
 * Check if user is logged in or not,
 * if not redirect to Home page to force logging in. 
 */
const isAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if(!user) {
        next({ name: 'Home' })
    }
    else {
        next()
    }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isLoggedIn
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
    beforeEnter: isAuth
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
    component: UserInfo,
    beforeEnter: isAuth
  },
  {
    path: '/pet/:id',
    name: 'LandingPet',
    component: LandingPet,
    props: true,
    beforeEnter: isAuth
  },
  {
    path: '/pet/following',
    name: 'FollowingPets',
    component: FollowingPets,
    beforeEnter: isAuth
  },
  {
    path: '/pet/create',
    name: 'CreatePet',
    component: CreatePet,
    beforeEnter: isAuth
  },
  {
    path: '/pet/yourpets',
    name: 'YourPet',
    component: YourPet,
    beforeEnter: isAuth
  },
  {
    path: '/blog/create',
    name: 'CreateBlog',
    component: CreateBlog,
    props: true,
    beforeEnter: isAuth
  },
  {
    path: '/blog/:blogId',
    name: 'Blogview',
    component: Blogview,
    props: true,
    beforeEnter: isAuth
  },
  {
    path: '/blog/yourblogs',
    name: 'YourBlog',
    component: YourBlog,
    beforeEnter: isAuth
  },
  {
    path: '/blog/feed',
    name: 'Feed',
    component: Feed,
    beforeEnter: isAuth
  },
  {
    path: '/blog/veterinarian/create',
    name: 'VCreateBlog',
    component: VCreateBlog
  },
  {
    path: '/blog/veterinarian/:blogId',
    name: 'VBlogview',
    component: VBlogview,
    props: true,
    beforeEnter: isAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
