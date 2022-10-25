<template>
    <div class="flex flex-col p-2 max-w-[600px] mx-auto">
        <div v-for="data in store.state.blogs.data"
            class="border-2 border-gray-300 rounded-lg m-2 shadow flex flex-col overflow-hidden">
            <div class="p-2 border-b-2 border-gray-300 flex items-center justify-between">
                <router-link :to="{name: 'post',params:{id: data.id}}" class="flex rounded hover:bg-gray-300/30 p-2">
                    <div class="w-10 h-10 flex items-center justify-center rounded-full bg-[#0000004c]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <div class="px-2 flex flex-col">
                        <h3>{{data.title}}</h3>
                        <i class="text-xs">{{data.created_at}}</i>
                    </div>
                </router-link>
                <div class="flex items-center justify-center" v-if="store.state.user.data.id == data.user_id">
                    <button @click="editBlog(data.id)"
                        class="w-8 h-8 ml-2 flex items-center justify-center rounded-full bg-[#0000004c] hover:bg-[#0000002b]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="w-full p-2">
                <p class="ml-2 min-h-[50px]">{{data.body}}</p>
            </div>
            <div class="px-4 py-2 flex border-t-2 border-gray-300">
                <div class="p-2 bg-gray-200 rounded-lg flex mr-2">
                    <button @click="like(data.id)"
                        class="w-6 h-6 flex items-center justify-center rounded-full bg-[#0000004c] hover:bg-[#0000002b]">
                        <svg v-if="data.isliked" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" class="liked"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </button>
                    <span class="pl-2">{{data.likes}}</span>
                </div>
                <div class="p-2 bg-gray-200 rounded-lg flex mr-2">
                    <router-link :to="{name: 'post',params:{id: data.id}}"
                        class="w-6 h-6 flex items-center justify-center rounded-full bg-[#0000004c] hover:bg-[#0000002b]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    </router-link>
                    <span class="pl-2">{{data.comments}}</span>
                </div>
            </div>
        </div>
        <div v-if="store.state.blogs.data.length == 0" class="p-4 flex flex-col items-center justify-center">
            <div v-if="route.name == 'home'" class="flex flex-col items-center justify-center">
                <p class="italic text-gray-400 py-3">There is no blogs yet! Create a blogs to new feed!</p>
                <button class="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-200/40"
                    @click="store.state.modalBox.createfn">Create New Blogs</button>
            </div>
            <div v-if="route.name == 'search'" class="flex flex-col items-center justify-center">
                <p class="italic text-gray-400 py-3">No search data found!</p>
                <router-link :to="{name: 'home'}" class="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-200/40"
                    >Back</router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore()
const route = useRoute()
const editBlog = function(id){
    store.dispatch('getBlogById', id).then(res => {
        console.log(res)
        store.state.modalBox.input.title = res.data.blogs.title
        store.state.modalBox.input.body = res.data.blogs.body
        store.state.modalBox.data = {
            title: 'Update Blog',
            width: 'w-[50%]',
            height: 'h-[fit-content]',
            show: true,
            okBtn: 'Update',
            closable: true,
            cancelBtn: "Delete",
            animation: 'slideDown',
            create: false,
            update: true,
            refId: id,
            cancel: function(){
                if (store.state.modalBox.data.deleting || store.state.modalBox.data.loading) return false
                store.state.modalBox.data.deleting = true
                store.state.modalBox.data.show = false
                store.state.notification.data = {
                    show: true,
                    message: 'Deleting Blog...',
                    done: false
                }
                store.dispatch('updateBlog',{id: id, data:{"del_flag":true},delete: true}).then((res) => {
                    store.state.modalBox.data.deleting = false
                    store.state.modalBox.data.cancelBtn = null
                    itech().wait(2000, function () {
                        store.state.notification.data = {
                            show: true,
                            message: 'Blgs delete success',
                            done: true,
                            cls: 'show'
                        }
                    }, function () {
                        store.state.notification.data.cls = 'hide'
                        store.state.notification.data = {}
                    })
                })
            }
        }
    })
}
const like = function(id){
    store.dispatch('like',id);
}
</script>
<style>
.liked{
    fill: #f6331a;
    stroke: #f6331a;
}
</style>