<template>
    <div class="fixed p-3 w-full backdrop-blur-sm bg-gray-200/30 header">
        <div class="w-[90%] flex items-center justify-between mx-auto">
            <div class="w-[fit-content] h-full flex items-center">
                <Transition name="slide-left">
                    <router-link :to="store.state.page.history.route"
                        class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-200/50 mr-2"
                        v-if="store.state.page.sub">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </router-link>
                </Transition>
                <router-link :to="{name:'top'}" class="w-10 h-10">
                    <img src="../assets/img/logo.svg" class="w-full h-full" alt="">
                </router-link>
            </div>
            <div class="flex px-2 items-center justify-center"
                v-if="!store.state.page.sub || store.state.page.search.is">
                <form class="flex px-2 items-center" @submit.prevent="search">
                    <input type="text"  placeholder="Search Blogs" v-model="store.state.page.search.data.s"
                        class="appearance-none block bg-white-100 text-gray-800 border-2 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white">
                    <button type="submit"
                        class="w-8 h-8 flex items-center justify-center rounded-full ml-2 bg-gray-200 hover:bg-gray-200/50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </form>
                <router-link :to="{name: 'create'}"
                    class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-200/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </router-link>
            </div>
            <div class="flex items-center justify-center">
                <router-link :to="{name: 'home'}"
                    :class="this.$route.meta.parent == 'top'?'bg-[#33c6bc89] text-gray-800':'bg-gray-200'"
                    class="w-8 h-8 ml-2 flex items-center justify-center rounded-full  hover:bg-gray-200/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </router-link>
                <router-link :to="{name: 'notifications'}"
                    :class="this.$route.meta.parent == 'notifications'?'bg-[#33c6bc89] text-gray-800':'bg-gray-200'"
                    class="w-8 h-8 ml-2 flex items-center justify-center rounded-full  hover:bg-gray-200/50 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    <span class="unseen-noti" v-if="store.state.userNotification.hasUnseen"></span>
                </router-link>
                <router-link :to="{name: 'me'}"
                    :class="this.$route.meta.parent == 'me'?'bg-[#33c6bc89] text-gray-800':'bg-gray-200'"
                    class="w-8 h-8 ml-2 flex items-center justify-center rounded-full  hover:bg-gray-200/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </router-link>
                <button @click="logout"
                    class="w-8 h-8 ml-2 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-200/50">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                        </path>
                    </svg>
                </button>
            </div>

        </div>
    </div>
    <div class="content-view pt-[60px]  mx-auto"
    :class="store.state.page.view">
        <router-view></router-view>
    </div>
    <Transition name="slide-up">
        <ModalBoxVue v-if="store.state.modalBox.data.show">
            <template v-slot:content>
                <div class="flex flex-col w-full h-full">
                    <div class="p-2 border-b-2 border-gray-200 text-left">
                        <h3 class="text-2xl text-gray-800">{{store.state.modalBox.data.title}}</h3>
                    </div>
                    <CreateBlogVue></CreateBlogVue>
                </div>
            </template>
        </ModalBoxVue>
    </Transition>
    <Transition name="fade">
        <LoadingScreen v-if="store.state.loadingScreen.data.show"></LoadingScreen>
    </Transition>
    <Transition>
        <Notification v-if="store.state.notification.data.show"></Notification>
    </Transition>
    <Transition name="fade">
        <LoadingBar v-if="store.state.loadingBar.data.show"></LoadingBar>
    </Transition>
</template>
<script setup>
import { useStore } from 'vuex';
import ModalBoxVue from './ui/ModalBox.vue';
import CreateBlogVue from './ui/CreateBlog.vue';
import { useRoute, useRouter } from 'vue-router';
import LoadingScreen from './lightui/LoadingScreen.vue';
import Notification from './lightui/Notification.vue';
import LoadingBar from './lightui/LoadingBar.vue';

const store = useStore()
const router = useRouter()
const route = useRoute()

const defaultdata = {
    title: 'Create Blog',
    width: 'w-[50%]',
    height: 'h-[fit-content]',
    show: false,
    okBtn: 'Create Blog',
    closable: true,
    animation: 'slideDown',
    create: true,
    update: false
}
store.state.modalBox.data = Object.assign({},defaultdata)
store.state.modalBox.createfn = function(){
    store.state.modalBox.data = Object.assign({},defaultdata)
    store.state.modalBox.data.show = true
    store.state.modalBox.input = {}
    
}
const logout = function(){
    store.dispatch('logout').then(()=>{
        router.push({name: 'login'})
    })
}
const search = function(){
    store.dispatch('searchBlogs',store.state.page.search.data).then((res)=>{
        store.state.page.search.is = true
        router.push({name: 'search'})
    })
}
</script>
<style>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease-out;
}

.slide-left-enter-from,
.slide-left-leave-to{
  opacity: 0;
  margin-left: -50px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}
.alert-enter-active {
    animation: fade 0.3s;
}
.alert-leave-active {
    animation: fade 0.3s reverse;
}
.alert-enter-active .modal-box {
    animation: alert 0.3s;
}
.alert-leave-active .modal-box {
    animation: alert 0.3s reverse;
}
@keyframes fade {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
@keyframes alert {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.15);
    }

    100% {
        transform: scale(1);
    }
}
</style>
