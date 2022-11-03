<template>
    <div class="flex flex-col w-full h-full p-2">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-first-name">
                    Title
                </label>
                <input v-model="store.state.modalBox.input.title"
                    class="appearance-none block w-full bg-white-100 text-gray-800 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    id="grid-tile" type="text" placeholder="Title">
                <p class="text-red-400 text-sm" v-if="error!=null && error.title">{{error.title}}</p>
            </div>
            
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            
            <div class="w-full md:w-1/1 px-3">
                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-last-name">
                    Blogs
                </label>
                <textarea v-model="store.state.modalBox.input.body"
                    class="appearance-none block w-full min-h-[200px] bg-white-100 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name" type="text" placeholder="Enter text here..."></textarea>
                <p class="text-red-400 text-sm" v-if="error!=null && error.body">{{error.body}}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const route = useRoute()
const store = useStore()
const error = ref()
const refId = store.state.modalBox.data.refId
store.state.modalBox.data.ok = function(){
    store.state.modalBox.data.create ? create() :
        store.state.modalBox.data.update ? update(refId) : null
}
function create(){
    if (store.state.modalBox.data.loading) return false
    store.state.modalBox.data.loading = true
    store.state.modalBox.data.show = false
    store.state.notification.data = {
        show: true,
        message: 'Creating blog...',
        done: false
    }
    store.dispatch('createBlog', store.state.modalBox.input).then((res) => {
        if (res.ok) {
            store.state.modalBox.data.loading = false
            if (router.currentRoute.value.name != 'home') {
                router.push({ name: 'home' })
            }
            itech().wait(2000, function () {
                store.state.notification.data = {
                    show: true,
                    message: res.message,
                    done: true,
                    cls: 'show'
                }
            }, function () {
                store.state.notification.data.cls = 'hide'
                store.state.notification.data = {}
            })
        } else {
            error.value = {
                title: 'title' in res.message ? res.message.title[0]:null,
                body: 'body' in res.message ? res.message.body[0]:null
            }
            let str = ``
            for (let key in res.message) {
                str += res.message[key] + " "
            }
            itech().wait(2000, function () {
                store.state.notification.data = {
                    show: true,
                    message: str,
                    done: true,
                    error: true,
                    cls: 'show'
                }
            }, function () {
                store.state.notification.data.cls = 'hide'
                store.state.notification.data = {}
            })
            store.state.modalBox.data.loading = false
            store.state.modalBox.data.okBtn = 'Create Blog'
        }
    })
}
function update(id){
    if (store.state.modalBox.data.loading || store.state.modalBox.data.deleting) return false
    store.state.modalBox.data.loading = true
    store.state.modalBox.data.show = false
    store.state.notification.data = {
        show: true,
        message: 'Updating blog...',
        done: false
    }
    store.dispatch('updateBlog', { id: id, data: store.state.modalBox.input }).then((res) => {
        store.state.modalBox.data.loading = false
        store.state.modalBox.data.cancelBtn = null
        itech().wait(2000, function () {
            store.state.notification.data = {
                show: true,
                message: 'Update blog success',
                done: true,
                cls: 'show'
            }
        }, function () {
            store.state.notification.data.cls = 'hide'
            store.state.notification.data = {}
        })
        if(route.name == 'profile'){
            let index = store.state.profile.blogs.findIndex(b=>b.id == id)
            store.state.profile.blogs[index].title = res.title
            store.state.profile.blogs[index].body = res.body
            store.state.profile.blogs[index].updated_at = res.updated_at
        }else{
            let index = store.state.blogs.data.findIndex(b=>b.id == id)
            store.state.blogs.data[index].title = res.title
            store.state.blogs.data[index].body = res.body
            store.state.blogs.data[index].updated_at = res.updated_at
        }
    })
}
</script>
