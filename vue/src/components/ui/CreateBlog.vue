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
                                    class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption v-slot="{ active }" v-for="t in type"
                                        class="overflow-x-hidden w-auto" :key="t.id" :value="t" as="template">
                                        <li :class="[
                                            active ? 'bg-green-100 text-amber-900' : 'text-gray-900',
                                            'relative cursor-pointer select-none flex items-center justify-center text-green-dark',
                                            ]">
                                            <div class="py-1">
                                                <div class="w-6 h-6 flex items-center justify-center rounded-full"
                                                    v-html="t.icon">
                                                </div>
                                            </div>
                                        </li>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>
                </div>
            </div>
            <div class="w-full px-3 my-2 md:mb-0 flex justify-between">
                <div class="w-[48%] border-2 rounded">
                    <Transition name="fade" v-if="!cvchoose.is">
                        <AnimateForm title="Choose Photo" :btn-show="false" width="w-[100%]" height="h-[300px]"
                            top="top-view mx-auto text-center w-full" left="left-view" right="right-view"
                            bottom="bottom-view" :logo="{
                            show: false
                        }">
                            <template v-slot:right>
                                <div class="w-full mx-auto">
                                    <img src="@img/blog-gallery.svg" alt="">
                                </div>
                            </template>
                            <template v-slot:form>
                                <button class="btn rounded-lg shadow px-3 py-2 mx-auto"
                                    @click="coverPhoto.click()">Choose Photo</button>
                            </template>
                        </AnimateForm>
                    </Transition>
                    <Transition name="fade" v-else>
                        <AnimateForm :btn-show="false" width="w-[100%]" height="h-[300px]"
                            top="top-view mx-auto text-center w-full" left="left-view" right="right-view"
                            bottom="bottom-view" :center="cvchoose.class" :logo="{
                            show: false
                        }" v-if="cvchoose.second">
                            <template v-slot:center>
                                <div class="h-full mx-auto">
                                    <img ref="cv" src="@img/blog-gallery.svg" alt="" class="h-full">
                                </div>
                            </template>
                            <template v-slot:form>
                                <button class="btn rounded-lg shadow px-3 py-2 mx-auto flex items-center justify-center" @click="coverPhoto.click()">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                    <span class="ml-2">Change Photo</span>
                                </button>
                            </template>
                        </AnimateForm>
                    </Transition>
                    <input ref="coverPhoto" @change="selectedCP" type="file" hidden>
                </div>
                <div class="p-2 w-[50%] border-2 rounded overflow-hidden">
                    <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
                        for="grid-first-name">
                        Description
                    </label>
                    <textarea v-model="inputData.description"
                        class="w-full text-gray-800 outline-none h-full rounded p-2" cols="30" rows="5"
                        placeholder="Write your description"></textarea>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/1 px-3">
                <Template title="Create Your Blog" :autosave="true" @module="cmsModule"
                    :cms-data="inputData.data"></Template>
            </div>
        </div>

        <div class="flex flex-wrap mb-6">
            <div class="w-full md:w-1/1 px-3 flex items-center justify-end">
                <button v-if="options == 'Update'" class="px-3 py-2 btn delete text-gray-200 rounded-lg mx-2"
                    @click="alertDelete">Delete</button>
                <button class="px-3 py-2 btn rounded-lg" @click="renderPreview">{{options}}</button>
            </div>
        </div>
    </div>
    <Transition name="alert">
        <AlertBox title="Preview" width="50%" v-if="alertBox.show" :show="alertBox.show"
            @on-close="alertBox.show = false">
            <template v-slot:content>
                <div class="flex flex-wrap mb-6 mx-auto overflow-auto">
                    <div class="w-full md:w-1/1 px-3" v-html="preview"></div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex items-center justify-center my-2 text-sm pt-3">
                    <button class="px-3 py-2 rounded mx-2 hover:bg-[#0000004c]"
                        @click="alertBox.show = false">Cancel</button>
                    <button class="px-3 py-2 rounded mx-2 btn text-white" v-if="!rule.disabled"
                        @click="startUpload">Upload</button>
                    <button class="px-3 py-2 rounded mx-2 btn text-white disabled cursor-not-allowed"
                        v-else>Upload</button>
                </div>
            </template>
        </AlertBox>
    </Transition>
    <Transition name="alert">
        <AlertBoxVue title="Delete Blog" v-if="deleteBlog.show" :show="deleteBlog.show"
            @on-close="deleteBlog.show = false">
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
                        @click="deleteBlog.show = false">Cancel</button>
                    <button class="px-3 py-2 rounded mx-2 bg-red-500 hover:bg-red-300 text-white"
                        @click="confirmDelete">Delete</button>
                </div>
            </template>
        </AlertBoxVue>
    </Transition>
</template>
<script setup>
import { ref, toRef } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AlertBox from '../lightui/AlertBox.vue';
import itech from '../../js/itech';
import defaultProps from '../../js/app.properties'
import AlertBoxVue from '../lightui/AlertBox.vue'; 
import itechObject from '../../js/itech-objects'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import Template from '../Itech/CMS/Template.vue';
import AnimateForm from '../Itech/AnimateForm.vue';
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
const selectedType = ref(type[props.data.type])
const router = useRouter()
const store = useStore()
const inputData = toRef(props, 'data') //props.jsonData
const preview = ref()
const cmsData = ref();

const coverPhoto = ref();

const deleteBlog = ref({
    show: false
})
const rule = ref({
    disabled: false,
    required: false
})

const cmsModule = function(data){
    inputData.value.data = Object.assign([],data.data)
    cmsData.value = data.template
}

const renderPreview = function(){
    let blogtypeicon = selectedType.value.icon
    let title = inputData.value.title.trim().length == 0 ? `<span class='text-red-400'>Please insert title</span>`: inputData.value.title
    inputData.value.type = selectedType.value.id
    let data = cmsData.value ? cmsData.value:`<i class='text-center p-3 text-red-400'>You need to create your blogs</i>`
    rule.value.disabled = inputData.value.title.trim().length == 0 || !cmsData.value 
    let template = itech().cms().blogTemplate(title,blogtypeicon,data)
    preview.value = template
    alertBox.value.show = true
}

const cv = ref()
const cvchoose = ref({
    is: false,
    class: ['w-[100%]','min-w-[400px]'],
    second: true
})

const selectedCP = function(e){
    const [file] = e.target.files
    if (file) {
        
        itech().wait(10,()=>{
            cvchoose.value.second = false
        },()=>{
            cvchoose.value.second = true
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                cv.value.src = (reader.result)
            };
            cvchoose.value.is = true
            
        })
    }
}

const loading = ref(false)

const startUpload = function(){
    if (loading.value) return false
    loading.value = true
    let filename = props.data.body == '' ? itech().createRandomName(store.state.user.data.name):props.data.body;
    inputData.value.type = selectedType.value.id
    inputData.value.body = filename
    alertBox.value.show = false
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
            // if(props.options == 'Create'){
            //     router.push({ name: 'home' })
            // }
            router.push(store.state.page.history.route)
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
const alertDelete = ()=>{
    deleteBlog.value.show = true;
}
const confirmDelete = ()=>{
    store.state.notification.data = {
        show: true,
        message: 'Deleting Blog...',
        done: false
    }
    deleteBlog.value.show = false
    store.dispatch('deleteBlog',props.id).then((res)=>{
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
</script>
<style>
.top-view{
    top: 1rem;
}
.left-view{
    
    left: 0;
}
.right-view{
    top: 50%;
    right: 50%;
    transform: translate(50%,-50%);
}
.bottom-view{
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
