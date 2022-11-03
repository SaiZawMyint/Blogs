import { createRouter,createWebHistory, useRoute } from "vue-router";
import Layout from '../components/Layout.vue'
import AuthLayout from '../components/AuthLayout.vue'

import Profile from '../views/Profile.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Registeration from '../views/Registeration.vue';
import Post from '../components/ui/Post.vue'
import NotFound from '../components/ui/NotFound.vue'
import MessageLayout from '../components/ui/MessageLayout.vue';
import NotificationLayout from '../components/ui/NotificationLayout.vue';

import store from "../store";
import { blog_data, clearAllFromStore, routeHistory } from "../js/blogs";

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
                path: '/search' , name: 'search', component: Home
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
        path: '/chat',
        name: 'chat',
        redirect: '/chat/top',
        meta: {requiresAuth: true, parent: 'chat'},
        component: Layout,
        children: [
            {
                path: '/chat/top', name: 'chat-top', component: MessageLayout
            }
        ]
    },
    {
        path: '/notifications',
        name: 'notifications',
        redirect: '/notifications/all',
        meta: {requiresAuth: true, parent: 'notifications'},
        component: Layout,
        children: [
            {
                path: '/notifications/all', name: 'notifications-all', component: NotificationLayout
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
    normalize(to,from,next).then(()=>{
        if (to.meta.requiresAuth && !store.state.user.token) {
            next({ name: 'login' })
        } else if (store.state.user.token && (to.name == 'login' || to.name == 'registeration')) {
            next({ name: 'top' })
        }
        //for post
        else if (from.name == 'post') {
            store.state.post.data = blog_data
            routeHistory(to, from)
            next()
        }
        //get notification data
        else if(to.name == 'notifications-all'){
            store.dispatch('loadNotification').then(()=>{
                routeHistory(to, from)
                next()
            });
        }
        //else
        else {
            routeHistory(to, from)
            next()
        }
    })
    //for auth
    

})

async function normalize(to,from,next){
    store.state.loadingScreen.data.show = true;
    store.state.loadingScreen.data.title = 'Loading'

    return Promise.all([
        store.dispatch('currentUser'),
        store.dispatch('hasUnseen')
    ])
    .finally(()=>{
        //
        store.state.loadingScreen.data.show = false
        //for page
        if (store.state.user.token) {
            //this is home's sub page
            if (to.name == 'home') {
                store.dispatch('getBlogs');
                store.state.page.sub = false
                store.state.page.search.is = false
                store.state.page.search.data = { s: '' }
            } else if(from.name == undefined){
                store.state.page.sub = false
                store.state.page.search.is = false
                store.state.page.search.data = { s: '' }
            }
            else {
                store.state.page.sub = true
                if(to.name != 'search'){
                    store.state.page.search.is = false
                }else{
                    store.dispatch('searchBlogs',store.state.page.search.data).then(()=>{
                        store.state.page.search.is = true
                    })
                    
                }
            }
            //top page 
            if (to.name == 'top' || to.name == 'home') {
                store.state.page.history.data = {}
                store.state.page.history.route = {}
            }
        }
    })
    .catch((err)=>{
        console.log(err.response.status)
        if(err.response.status == 401){
            sessionStorage.removeItem('TOKEN')
            clearAllFromStore()
        }
        store.state.loadingScreen.data.show = false
    })
}
export default router