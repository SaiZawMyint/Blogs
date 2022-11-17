<template>
    <div class="w-full flex justify-center relative">
        <div class="flex flex-col p-2 w-[25%] max-w-[600px] h-full fixed left-0 my-2">
            <div class="border-2 border-gray-300 rounded-lg shadow flex flex-col overflow-hidden">
                <div class="p-3 border-b-2 border-gray-300 flex items-center justify-between">
                    <div class="flex w-[60%]">
                        <div class="w-10 h-10 flex items-center justify-center rounded-full bg-[#0000004c] min-w-[40px]"
                            v-html="getBlogTypeIcon(data.type)">
                        </div>
                        <div class="px-2 flex flex-col w-full">
                            <h3 class="truncate overflow-hidden">{{data.title}}</h3>
                            <i class="text-xs">{{convertDate(data.created_at)}}</i>
                        </div>
                    </div>
                    <div class="flex items-center justify-center" v-if="store.state.user.data.id == data.user_id">
                        <router-link :to="{name: 'edit-post',params:{id: data.id}}"
                            class="w-8 h-8 min-w-[30px] ml-2 flex items-center bg-[#0000004c] hover:bg-[#0000002b] text-gray-100 justify-center rounded-full ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </router-link>
                        <button @click="alert"
                            class="w-8 h-8 min-w-[30px] ml-2 flex items-center bg-red-600/80 text-gray-100 justify-center rounded-full hover:bg-red-600/60">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="w-full p-2">
                    <p class="ml-2 min-h-[150px] max-h-[250px] overflow-y-auto">{{data.description}}</p>
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
                        <button
                            class="w-6 h-6 flex items-center justify-center rounded-full bg-[#0000004c] hover:bg-[#0000002b]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                        </button>
                        <span class="pl-2">{{data.comments}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col p-2 mx-2 my-4 w-[50%] rounded border-2" v-html="blogsTemplate"></div>
        <div class="flex flex-col p-2 text-sm w-[24%] rounded border-2 my-4 mx-2 fixed fixed-rl-box right-0">
            <div class="w-full h-full overflow-y-auto overflow-x-hidden p-0">
                <div v-for="com in data.data.comment"
                    class="w-full border-2 border-gray-300 rounded-lg mb-2 shadow flex flex-col overflow-hidden">
                    <div class="p-2 border-b-2 border-gray-300 flex items-center justify-between">
                        <div class="flex">
                            <div class="w-7 h-7 flex items-center justify-center rounded-full bg-[#0000004c]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>

                            </div>
                            <div class="px-2 flex flex-col">
                                <h3>{{com.username}}</h3>
                                <i class="text-xs">{{convertDate(com.created_at)}}</i>
                            </div>
                        </div>
                    </div>
                    <p class="w-full p-3">
                        {{com.comments}}
                    </p>
                    <div class="w-full p-2 border-t-2 flex items-center">
                        <button v-if="com.isMe" @click="comAlert(com.id)"
                            class="w-6 h-6 flex items-center justify-center rounded-full bg-[#0000004c] hover:bg-[#0000002b]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <button v-else
                            class="w-6 h-6 flex items-center justify-center rounded-full bg-[#0000004c] hover:bg-[#0000002b]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex items-center justify-center h-[400px] max-h-[80%]"
                    v-if="data.data.comment.length == 0">
                    <i class="text-sm text-gray-300">No comments here</i>
                </div>
            </div>
            <form @submit.prevent="comment(data.id)" class="flex items-center">
                <input v-model="inputData.comment" name="comment" type="text" placeholder="Write comment here..."
                    class="w-[70%] h-full appearence-none px-3 py-2 rounded-lg border-2">
                <button type="submit"
                    class="w-[35px] h-[35px]  mx-3 flex items-center justify-center rounded-full bg-[#0000004c] hover:bg-[#0000002b]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </form>
        </div>
    </div>

    <!--Blog Delete alert box-->
    <Transition name="alert">
        <AlertBoxVue title="Delete Blog" v-if="alertBox.show" :show="alertBox.show" @on-close="alertBox.show = false">
            <template v-slot:icon>
                <div class="w-10 h-10 mt-7 flex items-center bg-red-600/80 text-gray-100 justify-center rounded-full">
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
                    <button class="px-3 py-2 rounded mx-2 hover:bg-[#0000004c]"
                        @click="alertBox.show = false">Cancel</button>
                    <button class="px-3 py-2 rounded mx-2 bg-red-500 hover:bg-red-300 text-white"
                        @click="postdelete(data.id)">Delete</button>
                </div>
            </template>
        </AlertBoxVue>
    </Transition>
    <!--Comment Delete alert box-->
    <Transition name="alert">
        <AlertBoxVue title="Delete Comment" v-if="comAlertBox.show" :show="comAlertBox.show"
            @on-close="comAlertBox.show = false">
            <template v-slot:icon>
                <div class="w-10 h-10 mt-7 flex items-center bg-red-600/80 text-gray-100 justify-center rounded-full">
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
                    <button class="px-3 py-2 rounded mx-2 hover:bg-[#0000004c]"
                        @click="comAlertBox.show = false">Cancel</button>
                    <button class="px-3 py-2 rounded mx-2 bg-red-500 hover:bg-red-300 text-white"
                        @click="commentdelete()">Delete</button>
                </div>
            </template>
        </AlertBoxVue>
    </Transition>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router'
import AlertBoxVue from '../lightui/AlertBox.vue';
import itech from '../../js/itech';
import { getBlogTypeIcon } from '../../js/blogs';
import {convertDate} from '../../js/blogs'

const store = useStore()
const route = useRoute()
const router = useRouter()
const id = route.params.id
const data = ref(store.state.post.data)
const blogsTemplate = ref('<i class="text-sm text-gray-300 my-10 text-center w-full">Loading blogs</i>')
const inputData = ref({
    comment: ''
})
store.dispatch('getBlogById',id).then((res)=>{
    if(res.ok){
        data.value = store.state.post.data
    }else{
        router.push({name: 'home'})
    }
    console.log(data.value.postData)
    blogsTemplate.value = data.value.postData.length == 0 ? `<i class="text-sm text-gray-300 my-10 text-center w-full">No template created! </i>`: (itech().cms().previewTemplate(data.value.postData))
})
const like = function(id){
    store.dispatch('postlike',id)
}
const comment = function(id){
    store.dispatch('postComment',{id: id,data: inputData.value}).then(()=>{
        inputData.value.comment = ''
    })
}

const alertBox = ref({
    show: false
})
const comAlertBox = ref({
    show: false,
    target: 0
})
const alert = function(){
    alertBox.value.show = true
}
const comAlert = function(id){
    comAlertBox.value.show = true
    comAlertBox.value.target = id
}
const postdelete = function(id){
    store.state.notification.data = {
        show: true,
        message: 'Deleting Blog...',
        done: false
    }
    alertBox.value.show = false
    store.dispatch('deleteBlog',id).then((res)=>{
        itech().wait(4000, function () {
            store.state.notification.data = {
                show: true,
                message: "Blog delete success",
                done: true,
                cls: 'show'
            }
        }, function () {
            store.state.notification.data.cls = 'hide'
            store.state.notification.data = {}
        })
        router.push({name: 'top'})
    })
}
const commentdelete = function(){
    store.state.notification.data = {
        show: true,
        message: 'Deleting comment...',
        done: false
    }
    comAlertBox.value.show = false

    store.dispatch('deleteComment',{blogId: data.value.id,id: comAlertBox.value.target})
    .then(res=>{
        itech().wait(4000, function () {
            store.state.notification.data = {
                show: true,
                message: "Comment delete success",
                done: true,
                cls: 'show'
            }
        }, function () {
            store.state.notification.data.cls = 'hide'
            store.state.notification.data = {}
        })
        console.log(res);
    })
}

</script>
