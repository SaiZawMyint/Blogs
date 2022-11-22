<template>
    <div class="flex flex-col p-2 w-full grid grid-cols-2 gap-4">
        <div v-for="data in store.state.blogs.data"
            class="border-2 border-gray-300 rounded-lg m-2 shadow flex flex-col overflow-hidden" data-aos="fade-up" data-aos-duration="4000">
            <div class="border-b-2 border-gray-300 flex items-center justify-between">
                <router-link :to="{name: 'post',params:{id: data.id}}" class="flex rounded p-2">
                    <div class="w-10 h-10 flex items-center justify-center rounded-full bg-[#0000004c]"
                    v-html="getBlogTypeIcon(data.type)"></div>
                    <div class="px-2 flex flex-col">
                        <h3>{{data.title}}</h3>
                        <i class="text-xs">{{itechObject().date(data.created_at,true).format('dd,mm yy').withTime('h:m:s a')}}</i>
                    </div>
                </router-link>
                <div class="flex items-center justify-center mx-2" v-if="store.state.user.data.id == data.user_id">
                    <router-link :to="{name: 'edit-post',params: {id: data.id}}"
                        class="w-8 h-8 ml-2 flex items-center justify-center rounded-full bg-[#0000004c] hover:bg-[#0000002b]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </router-link>
                </div>
            </div>
            <router-link :to="{name: 'post',params:{id: data.id}}" class="w-full relative blog-cov h-[250px]">
                <img :src="data.coverPhoto" :alt="data.title" class="min-h-[150px] w-full">
                <div class="absolute p-2 bottom-0 bg-gray-100/60 backdrop-blur-sm w-full"> 
                    <div class="line-clamp-3 text-gray-800">{{data.description}}</div>
                </div>
            </router-link>
            <div class="px-4 py-2 flex border-t-2 border-gray-300">
                <div class="flex mr-2">
                    <button @click="like(data.id)"
                        class="w-6 h-6 flex items-center justify-center rounded-full bg-blue-400/30 hover:bg-[#0000002b]">
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
                <div class="flex mr-2">
                    <router-link :to="{name: 'post',params:{id: data.id}}"
                        class="w-6 h-6 flex items-center justify-center rounded-full bg-green-300/40 hover:bg-[#0000002b]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    </router-link>
                    <span class="pl-2">{{data.comments}}</span>
                </div>
                <div class="flex mr-2">
                    <button
                        class="w-6 h-6 flex items-center justify-center text-red-800 rounded-full bg-red-200/30 hover:bg-red-600/30">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                        </svg>
                    </button>
                    <span class="pl-2">0</span>
                </div>
            </div>
        </div>
        <div v-if="store.state.blogs.data.length == 0" class="p-4 flex flex-col items-center justify-center">
            <div v-if="route.name == 'home'" class="flex flex-col items-center justify-center">
                <p class="italic text-gray-400 py-3">There is no blogs yet! Create a blogs to new feed!</p>
                <router-link :to="{name: 'create'}" class="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-200/40"
                    >Create New Blogs</router-link>
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
import { getBlogTypeIcon } from '../../js/blogs';
import itechObject from '../../js/itech-objects';
const store = useStore()
const route = useRoute()

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