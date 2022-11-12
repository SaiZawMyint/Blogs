<template>
    <div class="flex flex-col w-full h-full p-2">
        <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-first-name">
                    Title
                </label>
                <div class="flex items-center justify-center w-full">
                    <input v-model="inputData.title"
                        class="appearance-none block w-full bg-white-100 text-gray-800 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-tile" type="text" placeholder="Title">
                    <Listbox v-model="selectedType">
                        <div class="relative mx-2">
                            <ListboxButton
                                class="relative w-full cursor-pointer rounded-lg bg-white p-1 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <div class="w-5 h-5 flex items-center justify-center rounded-full  text-green-dark"
                                    v-html="selectedType.icon">
                                </div>
                            </ListboxButton>
                            <transition leave-active-class="transition duration-100 ease-in"
                                leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions
                                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption v-slot="{ active, selected }" v-for="person in type"
                                        class="overflow-x-hidden w-auto" :key="person.id" :value="person" as="template">
                                        <li :class="[
                                            active ? 'bg-green-100 text-amber-900' : 'text-gray-900',
                                            'relative cursor-pointer select-none flex items-center justify-center text-green-dark',
                                            ]">
                                            <div class="py-1">
                                                <div class="w-6 h-6 flex items-center justify-center rounded-full"
                                                    v-html="person.icon">
                                                </div>
                                            </div>
                                        </li>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>
                </div>
                <p class="text-red-400 text-sm" v-if="error!=null && error.title">{{error.title}}</p>
            </div>
        </div>
        <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/1 px-3">
                <Template title="Create Your Blog" :autosave="false" @created="cmsModule" :cms-data="cmsModuleData"></Template>
            </div>
        </div>

        <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/1 px-3 flex items-center justify-end">
                <button class="px-2 py-1 btn rounded-lg" @click="renderPreview">Create</button>
            </div>
        </div>
    </div>
    <Transition name="alert">
        <AlertBox title="Preview" width="50%" v-if="alertBox.show" :show="alertBox.show" @on-close="alertBox.show = false">
            <template v-slot:content>
                <div class="flex flex-wrap mb-6 mx-auto overflow-auto">
                    <div class="w-full md:w-1/1 px-3" v-html="preview"></div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex items-center justify-center my-2 text-sm pt-3">
                    <button class="px-3 py-2 rounded mx-2 hover:bg-[#0000004c]" @click="alertBox.show = false">Cancel</button>
                    <button class="px-3 py-2 rounded mx-2 btn text-white" @click="commentdelete()">Upload</button>
                </div>
            </template>
        </AlertBox>
    </Transition>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AlertBox from '../lightui/AlertBox.vue';
import itech from '../../js/itech';
import json from '../Itech/CMS/template.json'
import itechObject from '../../js/itech-objects';

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import Template from '../Itech/CMS/Template.vue';
const alertBox = ref({
    show: false
})
const type = [
    {
        icon: `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
        </svg>
        `,
        id: 0
    },
    { 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
        </svg>
        `,
        id: 1
    },
    { 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
        </svg>
        `,
        id: 2
    }
]
const selectedType = ref(type[0])

const router = useRouter()
const route = useRoute()
const store = useStore()
const error = ref()
const refId = store.state.modalBox.data.refId
const inputData = ref({
    title: '',
    blogs: ''
})

const preview = ref()
const cmsData = ref();
const cmsModuleData = ref([])
const cmsModule = function(data){
    cmsData.value = data
}

const renderPreview = function(){
    let blogtypeicon = selectedType.value.icon
    let title = inputData.value.title.trim().length == 0 ? `<span class='text-red-400'>Please insert title</span>`: inputData.value.title
    let data = cmsData.value ? cmsData.value:`<i class='text-center p-3 text-red-400'>You need to create your blogs</i>`
    let template = itech().cms().blogTemplate(title,blogtypeicon,data)
    preview.value = template
    alertBox.value.show = true
}
console.log(json)
inputData.value.title = json.title
selectedType.value = type[itechObject(type).find(json.type, "id")]
cmsModuleData.value = json.body

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
