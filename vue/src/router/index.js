import { createRouter,createWebHistory, useRoute } from "vue-router";
import Layout from '../components/Layout.vue'
import AuthLayout from '../components/AuthLayout.vue'

import Profile from '../views/Profile.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Registeration from '../views/Registeration.vue';
import Post from '../components/ui/Post.vue'
import NotFound from '../components/ui/NotFound.vue'

import store from "../store";
import { blog_data, routeHistory } from "../js/blogs";

const routes = [
    {
        path: '/',
        name: 'top',
        redirect: '/home',
        meta: {requiresAuth: true,parent: 'top'},
        component: Layout,
        children: [
            {
                path: '/home',name: 'home', component: Home
            },
            {
                path: '/post/:id', name: 'post',component: Post
            },
            {
                path: '/:catchAll(.*)',name: '404',component: NotFound
            }
        ]
    },
    {
        path: '/me',
        name: 'me',
        redirect: '/me/profile',
        meta: {requiresAuth: true, parent: 'me'},
        component: Layout,
        children: [
            {
                path: '/me/profile', name: 'profile', component: Profile
            }
        ]

    },
    {
        path: '/auth',
        redirect: '/login',
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/registeration',
                name: 'registeration',
                component: Registeration
            }
        ]
    },
    
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to,from,next)=>{
    store.state.loadingScreen.data.show = true;
    store.state.loadingScreen.data.title = 'Loading'
    store.dispatch('currentUser').then(()=>{
        store.state.loadingScreen.data.show = false
        //for page
        if (store.state.user.token) {
            //this is home's sub page
            if (to.name == 'home') {
                store.state.page.sub = false
            } else if(from.name == undefined    ){
                store.state.page.sub = false
            }
            else {
                store.state.page.sub = true
            }
            //top page 
            if (to.name == 'top' || to.name == 'home') {
                store.state.page.history.data = {}
                store.state.page.history.route = {}
            }
        }
    })

    //for auth
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: 'login' })
    } else if (store.state.user.token && (to.name == 'login' || to.name == 'registeration')) {
        next({ name: 'home' })
    }
    //for post
    else if (from.name == 'post') {
        store.state.post.data = blog_data
        routeHistory(to, from)
        next()
    }
    //else
    else {
        routeHistory(to, from)
        next()
    }

})

export default router