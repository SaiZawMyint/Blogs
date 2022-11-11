<template>
    <div class="w-full pt-4 max-w-[600px] mx-auto relative">
        <div class="w-full m-2 py-1 flex items-center sticky top-[62px] rounded backdrop-blur-sm bg-white-100/70 z-10">
            <button class="w-8 h-8 rounded-full bg-gray-200/40 flex items-center justify-center mr-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                    class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="float-icon font-mono r-gap-2 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[.6em] p-2 noti-color-bg">10</span>
            </button>
            <button class="w-8 h-8 rounded-full bg-gray-200/90 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                    class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            </button>
            <!-- <button class="w-8 h-8 rounded-full bg-gray-200/40 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button> -->
        </div>
        <div class="w-full p-4">
            <div v-for="d of store.state.userNotification.data"
                class="w-full p-2 mb-3 rounded-lg cursor-pointer flex justify-between hover:shadow"
                :class="d.seen ? 'bg-gray-100/40':'bg-blue-200/40'"
                @click="redirectTo(d.blogs_id,d.nid,d.seen)">
                <div class="flex">
                    <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                        </svg>

                        <span class="float-icon w-4 h-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4" v-if="d.type == 'like'">
                                <path stroke-linecap="round" stroke-linejoin="round" class="liked"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <svg v-if="d.type == 'comment'" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            <svg v-if="d.type == 'event'" xmlns="http://www.w3.org/2000/svg" fill="#0a637397"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="#0a6373" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                        </span>
                    </div>
                    <div class="px-2 flex flex-col">
                        <h3>{{d.blogs_title}}</h3>
                        <span class="text-sm text-gray-500">{{d.message}}</span>
                        <small class="text-[10px] text-gray-500">{{d.time}}</small>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button @click.stop="alert(d.nid)"
                        class="w-6 h-6 rounded-full bg-gray-300/70 flex ml-1 items-center justify-center hover:bg-red-400 hover:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                    </button>
                </div>
            </div>
            <div v-if="store.state.userNotification.data.length == 0" class="text-center text-sm">
                <p class="italic text-gray-400 py-3">You doesn't have any notification yet!</p>
                <router-link :to="{name: 'home'}" class="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-200/40"
                    >Back</router-link>
            </div>
        </div>
    </div>
    <!--Delete Notification alert box-->
    <Transition name="alert">
        <AlertBoxVue title="Delete notification" v-if="alertBox.show" :show="alertBox.show" @on-close="alertBox.show = false">
            <template v-slot:icon>
                <div
                    class="w-10 h-10 mt-7 flex items-center bg-red-600/80 text-gray-100 justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
            </template>
            <template v-slot:content>
                <p class="p-2 text-center text-red-400">Are you sure?</p>
            </template>
            <template v-slot:footer>
                <div class="flex items-center justify-center my-2 text-sm pt-3">
                    <button class="px-3 py-2 rounded mx-2 hover:bg-[#0000004c]" @click="alertBox.show = false">Cancel</button>
                    <button class="px-3 py-2 rounded mx-2 bg-red-500 hover:bg-red-300 text-white" @click="deleteNoti">Delete</button>
                </div>
            </template>
        </AlertBoxVue>
    </Transition>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AlertBoxVue from '../lightui/AlertBox.vue';
const store = useStore()
const router = useRouter()
const props = defineProps({
    data: {
        type: Array,
        default: []
    }
})
const redirectTo = function(id,nid,isSeen){
    if(isSeen){
        router.push({ name: 'post', params: { id: id } })
    }else{
        store.dispatch('seen', nid).then((res) => {
            if (res.ok)
                router.push({ name: 'post', params: { id: id } })
        })
    }
}
const alertBox = ref({
    show: false,
    targetId: 0
})
const alert = function(id){
    alertBox.value.show = true
    alertBox.value.targetId = id
}
const deleteNoti = function(){
    store.state.notification.data = {
        show: true,
        message: 'Deleting notification...',
        done: false
    }
    store.dispatch('deleteNoti',alertBox.value.targetId).then(res=>{
        alertBox.value.show = false
        itech().wait(2000, function () {
            store.state.notification.data = {
                show: true,
                message: 'Delete notification success!',
                done: true,
                cls: 'show'
            }
        }, function () {
            store.state.notification.data.cls = 'hide'
            store.state.notification.data = {}
        })
    })
}
</script>