<template>
    <div class="w-full mt-2 flex-col">
        <div class="w-full p-2 flex justify-between">
            <div class="p-2 w-[35%] flex flex-col rounded-lg shadow-lg border-2">
                <div class="mx-auto w-[90px] h-[90px] rounded-full my-[20px]">
                    <img src="../../assets/img/logo.svg" alt="">
                </div>
                <div class="w-full text-sm">
                    <div class="flex p-2 items-center justify-between">
                        <label for="name" class="mr-3">Name</label>
                        <input type="text" id="name"
                            class="appearence-none px-2 py-1 border-none rounded w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
                            v-model="inputData.name" :readonly="edit.name">
                        <button
                            class="w-[30px] h-[30px] rounded-full hover:bg-[#0000004c] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex p-2 items-center justify-between">
                        <label for="email" class="mr-3">Email</label>
                        <input type="text" id="email"
                            class="appearence-none px-2 py-1 border-none rounded w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
                            v-model="inputData.email" :readonly="edit.email">
                        <button
                            class="w-[30px] h-[30px] rounded-full hover:bg-[#0000004c] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="p-8 w-[65%] flex flex-col rounded-lg shadow-lg border-2 ml-2">
                <div class="mx-auto w-full h-full my-[10px] flex items-center justify-center">
                    <img src="../../assets/img/logo.svg" width="70" alt="">
                </div>
                <div class="w-full flex items-center mt-1">
                    <label for="" class="text-gray-800 w-[40%] text-left">Posts</label>
                    <ProgressBar color="#FFF" :status="`${progress.posts}%`" :label="`${progress.posts}`" class="mx-3"></ProgressBar>
                </div>
                <div class="w-full flex items-center mt-1">
                    <label for="" class="text-gray-800 w-[40%] text-left">Likes</label>
                    <ProgressBar background="#0a6373" color="#FFF" :status="`${progress.likes}%`" :label="`${progress.likes}%`" class="mx-3"></ProgressBar>
                </div>
                <div class="w-full flex items-center mt-1">
                    <label for="" class="text-gray-800 w-[40%] text-left">Comments</label>
                    <ProgressBar background="#94bbe9" color="#FFF" :status="`${progress.comments <= 0 ? '0px':`${progress.comments}%`}`" :label="`${progress.comments}%`" class="mx-3"></ProgressBar>
                </div>
            </div>
        </div>
        <div class="w-full p-2 mt-4">
            <div class="w-full rounded">
                <h3 class="px-2 mb-3">My Blogs</h3>
                <div class="w-full border-2 rounded-lg overflow-hidden">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    Blogs Title
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Created
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Likes
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Comments
                                </th>
                                <th scope="col" class="py-3 px-6 text-center">
                                    <button class="px-3 py-2 bg-[#0f857d] hover:bg-[#33c6bc] rounded text-gray-200" @click="store.state.modalBox.createfn">Create</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b hover:bg-gray-50" v-for="data in store.state.profile.blogs">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {{data.title}}
                                </th>
                                <td class="py-4 px-6">
                                    {{data.created_at}}
                                </td>
                                <td class="py-4 px-6">
                                    {{data.likes}}
                                </td>
                                <td class="py-4 px-6">
                                    {{data.comments}}
                                </td>
                                <td class="py-4 px-6 text-center">
                                    <button @click="editBlog(data.id)"
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                </td>
                            </tr>
                            <tr v-if="store.state.profile.blogs.length == 0">
                                <td colspan="5" class="text-center py-2">
                                    You have not post any blogs yet! <br>
                                    <button class="px-3 py-2 rounded bg-gray-200 hover:bg-gray-200/60 mt-2"
                                    @click="store.state.modalBox.createfn">
                                        Create
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { calculateStatus } from '../../js/blogs';
import ProgressBar from '../lightui/ProgressBar.vue';
const store = useStore()
const progress = ref({posts:0,likes:0,comments: 0})
const inputData = ref({name:'',email: ''})
const edit = ref({name: true,email: true})
store.dispatch('me').then(res=>{
    store.dispatch('getMyBlogs').then((res)=>{
        storeStatus(res.data)
    })
})
const editBlog = function(id){
    store.dispatch('getBlogById', id).then(res => {
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
                    store.dispatch('getMyBlogs').then((res)=>{
                        storeStatus(res.data)
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
                })
            }
        }
    })
}
function storeStatus(data){
    let posts = data.length;
    let likes = 0, comments = 0
    for (let b of data) {
        likes += b.likes.length
        comments += b.comments.length
    }
    let pdata = {
        posts: posts,
        likes: likes,
        comments: comments
    }
    inputData.value.name = store.state.profile.data.name
    inputData.value.email = store.state.profile.data.email
    progress.value = calculateStatus(pdata)
}
</script>