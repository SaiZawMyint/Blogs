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
import CreateBlogWidget from '../components/ui/Widgets/CreateBlogWidget.vue'
import UpdateBlog from '../components/ui/UpdateBlog.vue'

import AccountInformation from '../components/AccountInfos/AccountInformation.vue'

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
                path: '/home',name: 'home', component: Home, meta: {view: 'normal'}
            },
            {
                path: '/post/:id', name: 'post',component: Post, meta: {view: 'large'}
            },
            {
                path: '/post/:id/edit', name: 'edit-post',component: UpdateBlog, meta: {view: 'normal'}
            },
            {
                path: '/search' , name: 'search', component: Home, meta: {view: 'normal'}
            },
            {
                path: '/create' , name: 'create', component: CreateBlogWidget, meta: {view: 'normal'}
            },
            {
                path: '/:catchAll(.*)',name: '404',component: NotFound, meta: {view: 'normal'}
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
                path: '/me/profile', name: 'profile', component: Profile, meta: {view: 'normal'}
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
                path: '/chat/top', name: 'chat-top', component: MessageLayout, meta: {view: 'normal'}
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
                path: '/notifications/all', name: 'notifications-all', component: NotificationLayout, meta: {view: 'normal'}
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
    {
        path: '/accounts',
        name: 'accounts',
        component: AccountInformation
    }
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

})

async function normalize(to,from){
    if(from.name == 'login' || from.name == 'registeration') 
        store.state.loadingScreen.data.show = true
    else 
        store.state.loadingBar.data.show = true

    if(to.name != 'login' && to.name != 'registeration'){

        let callData = [store.dispatch('currentUser'),store.dispatch('hasUnseen')]
        if(to.name == 'edit-post' || to.name == 'post'){
            callData.push(store.dispatch('getBlogById',to.params.id))
        }
        if(to.name == 'search'){
            callData.push(store.dispatch('searchBlogs',store.state.page.search.data))
        }
        return Promise.all(callData)
        .finally(()=>{
            if (to.meta) {
                if ('view' in to.meta) {
                    if (to.meta['view'] == 'large') {
                        store.state.page.view = 'lg:w-[100%] md:w-[100%] sm:w-[100%]'
                    } else if (to.meta['view'] == 'normal') {
                        store.state.page.view = 'lg:w-[60%] md:w-[100%] sm:w-[100%]'
                    }
                }
            }
            //
            if (from.name == 'login' || from.name == 'registeration')
                store.state.loadingScreen.data.show = false
            store.state.loadingBar.data.show = false
            //for page
            if (store.state.user.token) {
                //this is home's sub page
                if (to.name == 'home') {
                    store.dispatch('getBlogs').then(()=>{
                        store.state.page.sub = false
                        store.state.page.search.is = false
                        store.state.page.search.data = { s: '' }
                    })
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
                        store.state.page.search.is = true
                    }
                }
                //top page 
                if (to.name == 'top' || to.name == 'home') {
                    store.state.page.history.data = {}
                    store.state.page.history.route = {}
                }else{
                    store.state.page.sub = true
                }
            }
        })
        .catch((err)=>{
            //unauthorized case
            if(err.response.status == 401){
                sessionStorage.removeItem('TOKEN')
                clearAllFromStore()
            }
            if (from.name == 'login' || from.name == 'registeration')
                store.state.loadingScreen.data.show = false
            store.state.loadingBar.data.show = false
        })
    }else{
        store.state.loadingScreen.data.show = false
    }
    
}
export default router