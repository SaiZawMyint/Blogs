<template>
    <div class="flex flex-col w-full h-full p-2">
        <div class="flex flex-col flex-wrap mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-first-name">
                    Title
                </label>
                <div class="flex items-center justify-center w-full">
                    <input v-model="inputData.title"
                        class="appearance-none block w-full bg-white-100 text-gray-800 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-tile" type="text" placeholder="Title">
                    <Listbox v-model="inputData.type">
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
            <div class="w-full px-3 my-2 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2" for="grid-first-name">
                    Description
                </label>
                <textarea v-model="inputData.description" class="w-full text-gray-800 border-2 outline-none rounded p-2" cols="30" rows="5" placeholder="Write your description"></textarea>
            </div>
        </div>
        <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/1 px-3">
                <Template title="Create Your Blog" :autosave="true" @module="cmsModule" :cms-data="inputData.data"></Template>
            </div>
        </div>

        <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/1 px-3 flex items-center justify-end">
                <button class="px-2 py-1 btn rounded-lg" @click="renderPreview">{{options}}</button>
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
                    <button class="px-3 py-2 rounded mx-2 btn text-white" @click="startUpload">Upload</button>
                </div>
            </template>
        </AlertBox>
    </Transition>
</template>
<script setup>
import { ref, toRef } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AlertBox from '../lightui/AlertBox.vue';
import itech from '../../js/itech';
import defaultProps from '../../js/app.properties'

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
const props = defineProps({
    id: {
        type: Number,
        default: 0
    },
    data: {
        type: Object,
        default: {
            title: '',
            description: '',
            type: 0,
            body: '',
            data: []
        }
    },
    options: {
        type: String,
        default: 'Create'
    }
})
const type = defaultProps
const selectedType = ref(type[0])
const router = useRouter()
const store = useStore()
const error = ref()
const inputData = toRef(props, 'data') //props.jsonData
const preview = ref()
const cmsData = ref();

const cmsModule = function(data){
    inputData.value.data = Object.assign([],data.data)
    cmsData.value = data.template
}

const renderPreview = function(){
    let blogtypeicon = selectedType.value.icon
    let title = inputData.value.title.trim().length == 0 ? `<span class='text-red-400'>Please insert title</span>`: inputData.value.title
    let data = cmsData.value ? cmsData.value:`<i class='text-center p-3 text-red-400'>You need to create your blogs</i>`
    let template = itech().cms().blogTemplate(title,blogtypeicon,data)
    preview.value = template
    alertBox.value.show = true
}

const loading = ref(false)
const startUpload = function(){
    if (loading.value) return false
    loading.value = true

    let filename = props.data.body == '' ? itech().createRandomName(store.state.user.data.name):props.data.body;
    inputData.value.type = selectedType.value.id
    inputData.value.body = filename
    
    const message = props.options == "Create" ? "Creating blog...":
                    props.options == "Update" ? "Updating blog...":
                    "Processing..."

    store.state.notification.data = {
        show: true,
        message: message,
        done: false
    }
    let request = (props.id == 0)?inputData.value:{id: props.id,data: inputData.value}
    let requetURL = (props.id == 0)?'createBlog':'updateBlog'
    store.dispatch(requetURL,request).then(res=>{
        if(res.ok){
            loading.value = false
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
        }
    }).catch((err)=>{
        console.log(err)
    })
}

</script>
