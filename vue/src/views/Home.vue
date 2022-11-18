<template>
    <LeftMenuWidget>
        <template v-slot:content>
            <div class="bg-gray-200/20 backdrop-blur-sm p-2 flex rounded-lg shadow items-center justify-between">
                <div class="p-2 flex items-center">
                    <span class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200/40">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </span>
                    <h2 class="px-2">Create new Blogs</h2>
                </div>
                <div class="flex items-center justify-center">
                    <router-link :to="{name: 'create'}" class="w-8 h-8 rounded-full bg-gray-200/30 ml-2 flex items-center justify-center hover:bg-gray-200/10 hover:shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </router-link>
                    <button class="w-8 h-8 rounded-full bg-gray-200/30 ml-2 flex items-center justify-center hover:bg-gray-200/10 hover:shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </button>
                    <button class="w-8 h-8 rounded-full bg-gray-200/30 ml-2 flex items-center justify-center hover:bg-gray-200/10 hover:shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="my-2 bg-gray-200/20 backdrop-blur-sm rounded">
                <div class="p-2 border-b-2">
                    
                </div>
            </div>
        </template>
    </LeftMenuWidget>
    <div class="w-full">
        <BlogListsVue></BlogListsVue>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import BlogListsVue from '../components/ui/BlogLists.vue';
import LeftMenuWidget from '../components/Layouts/inc/LeftMenu.vue';
const store = useStore()
const route = useRoute()
if(route.name == 'home')
    store.dispatch('getBlogs')
</script>
