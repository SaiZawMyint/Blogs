<template>
    <div class="flex flex-col w-full h-full p-2">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-first-name">
                    Title
                </label>
                <div class="flex items-center justify-center w-full">
                    <input v-model="store.state.modalBox.input.title"
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
                                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption v-slot="{ active, selected }" v-for="person in type" class="overflow-x-hidden w-auto"
                                        :key="person.id" :value="person" as="template">
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
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/1 px-3">
                <Template></Template>
                <p class="text-red-400 text-sm" v-if="error!=null && error.body">{{error.body}}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import Template from '../Itech/CMS/Template.vue';

const type = [
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                </svg>`,
        id: 0
    },
    { 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>`,
        id: 1
    },
    { 
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>`,
        id: 2
    }
]
const selectedType = ref(type[0])

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
