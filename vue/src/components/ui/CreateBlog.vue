<template>
    <DashboardLayout>
        <template v-slot:leftPanel>
            <div class="flex flex-col flex-wrap mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
                        for="grid-first-name">
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
                <DropMenu title="Cover Photo" :max="{height:'300px'}">
                    <div class="p-2">
                        <div class="flex justify-start">
                            <button class="btn rounded-lg shadow px-3 py-2 flex items-center justify-center"
                                @click="coverPhoto.click()">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span class="ml-2 truncate">Choose Photo</span>
                            </button>
                        </div>
                        <div class="w-full rounded">
                            <Transition name="fade">
                                <AnimateForm :btn-show="false" width="w-[100%]" height="h-[220px]"
                                    top="top-view mx-auto text-center w-full" left="left-view" right="right-view"
                                    bottom="bottom-view" :center="cvchoose.class" :logo="{
                                        show: false
                                    }" v-if="cvchoose.second">
                                    <template v-slot:center>
                                        <div class="w-full mx-auto">
                                            <img ref="cv" :src="data.cover.data" alt="" class="mx-auto"
                                                :class="cvchoose.is || options == 'Update' ? 'w-full':'w-[90%]'">
                                        </div>
                                    </template>
                                </AnimateForm>
                            </Transition>
                            <input ref="coverPhoto" @change="selectedCP" type="file" accept="image/*" hidden>
                        </div>
                    </div>
                </DropMenu>
                <div class="w-full px-3 my-2 md:mb-0 flex flex-col justify-between">
                    <div class="p-2 w-full border-2 rounded overflow-hidden">
                        <label class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
                            for="grid-first-name">
                            Description
                        </label>
                        <textarea v-model="inputData.description"
                            class="w-full text-gray-800 outline-none h-full rounded p-2" cols="30" rows="5"
                            placeholder="Write your description"></textarea>
                    </div>
                </div>
                <DropMenu title="Outlines">
                    <div class="w-full md:mb-0 flex flex-col">
                        <div class="rounded-lg relative">
                            <form @submit.prevent="addOutline"
                                class="w-full bg-gray-200/30 p-2 backdrop-blur flex items-center sticky top-0">
                                <input v-model="outline" type="text" class="px-2 py-2 text-sm rounded-lg border-2 w-[60%]"
                                    placeholder="Add Outline">
                                <button 
                                type="submit"
                                class="btn px-1 py-1 rounded-lg shadow ml-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="pr-2">Add</span>
                                </button>
                                <button type="button"
                                    class="w-8 h-8 flex items-center justify-center text-purple-800 rounded-full bg-gray-200/50 ml-2 hover:bg-gray-200/40 hover:shadow hover:border-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                        class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                                    </svg>
                                </button>
                            </form>
                            <div class="rounded-lg my-2 px-2">
                                <button
                                    class="rounded-lg mb-1 border-2 px-1 py-1 w-full flex items-center justify-between hover:bg-gray-100/20 hover:shadow hover:border-2"
                                    v-for="(outline, index) of outlines">
                                    <div class="flex items-center w-[70%]">
                                        <i
                                            class="fa-solid fa-hashtag text-gray-500 w-8 h-8 bg-gray-200/30 rounded-full flex items-center justify-center"></i>
                                        <span class="px-2 truncate text-left">{{outline.name}}</span>
                                    </div>
                                    <button 
                                    @click="removeOutline(index)"
                                    class="min-w-[30px] min-h-[30px]  text-md text-red-600 bg-gray-200/30 rounded-full flex items-center justify-center hover:bg-gray-100/20 hover:shadow hover:border-2 transition-all delay-100 hover:rotate-180">
                                        <i class="fa-solid fa-xmark "></i>
                                    </button>
                                </button>
                                <div class="w-full text-center text-sm text-gray-300 py-2" v-if="outlines.length == 0">
                                    No outlines
                                </div>
                            </div>
                        </div>
                    </div>
                </DropMenu>
            </div>
        </template>
        <template v-slot:base>
            <div class="flex flex-col w-full h-full p-2">

                <div class="flex flex-wrap mb-6">
                    <div class="w-full md:w-1/1 px-3">
                        <Template title="Create Your Blog" :autosave="true" @module="cmsModule"
                            :cms-data="inputData.data" height="h-[550px]" />
                    </div>
                </div>

                <div class="flex flex-wrap sticky bottom-0 py-2 bg-gray-100/30 backdrop-blur-sm rounded">
                    <div class="w-full md:w-1/1 px-3 flex items-center justify-end">
                        <button v-if="options == 'Update'" class="px-3 py-2 btn delete text-gray-200 rounded-lg mx-2"
                            @click="alertDelete">Delete</button>
                        <button class="px-3 py-2 btn rounded-lg" @click="renderPreview" v-if="!loading">{{options}}</button>
                        <button class="px-3 py-2 rounded mx-2 btn text-white disabled cursor-not-allowed" v-else>
                            {{options}}
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </DashboardLayout>
    <Transition name="alert">
        <AlertBox title="Preview" width="50%" v-if="alertBox.show" :show="alertBox.show"
            @on-close="alertBox.show = false">
            <template v-slot:content>
                <div class="flex flex-wrap mb-6 mx-auto overflow-auto max-h-[500px] py-2">
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
import {defaultProps, galleryData} from '../../js/app.properties'
import AlertBoxVue from '../lightui/AlertBox.vue'; 
import DashboardLayout from '../Layouts/DashboardLayout.vue';
import DropMenu from '../Itech/DropDown/DropMenu.vue';
import itechObject from '../../js/itech-objects';
import {showNotification} from '../../js/blogs'

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
            data: [],
            cover: {
                name: '',
                data: galleryData
            },
            outlines: [
                
            ]
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
const validationMessage = ref([])
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

if(props.options == "Create"){
    inputData.value = {}
}

const cmsModule = function(data){
    inputData.value.data = Object.assign([],data.data)
    cmsData.value = data.template
}

const renderPreview = function(){
    let blogtypeicon = selectedType.value.icon
    let title = inputData.value.title.trim().length == 0 ? `<span class='text-red-400'>Please insert title</span>`: inputData.value.title

    inputData.value.type = selectedType.value.id
    let data = cmsData.value ? cmsData.value :`<i class='text-center p-3 text-red-400'>You need to create your blogs</i>`
    
    validate()
    
    let template = itech().cms().blogTemplate(title,blogtypeicon,data)
    preview.value = template
    alertBox.value.show = true
}
function validate(){
    validationMessage.value = []
    rule.value.disabled = (validateContent() || validateCMS())

    if(validationMessage.value.length > 0){
        let message = ""
        validationMessage.value.forEach(a=>{
            message += a.message+"<br>";
        })
        showNotification(
            {
                show: true,
                message: message,
                done: true,
                error: true,
                cls: 'show'
            },
            {
                
            },
            3000
        )
    }
}
function validateContent(){
    if(inputData.value.title.trim().length == 0 || inputData.value.title.trim().length > 100){
        validationMessage.value.push({
            type: 'title',
            message: inputData.value.title.trim().length == 0 ? 'Please insert blog title' : 'Blog title must lest than 100 characters'
        })
        return true;
    }
    return false;
}
function validateCMS(){
    if (!cmsData.value || cmsData.value.length < 30){
        validationMessage.value.push(
            {
                type: "cms",
                message: "Please create your blog contents!"
            }
        )
        return true;
    }
    return false
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
                inputData.value.cover.name = itech().createRandomName('blog-cv',"."+itech().file(file).extension())
                inputData.value.cover.data = reader.result
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
    let outlinedata = store.state.cms.outlines.filter(o => 'isUsed' in o && o['isUsed']);
    let requestBody = {
        title: inputData.value.title,
        description: inputData.value.description,
        type: inputData.value.type,
        body: inputData.value.body,
        data: inputData.value.data,
        cover: inputData.value.cover.data,
        outlines: outlinedata
    }
    let request = (props.id == 0)?requestBody:{id: props.id,data: requestBody}
    let requestURL = (props.id == 0)?'createBlog':'updateBlog'
    store.dispatch(requestURL,request).then(res=>{
        if(res.ok){
            loading.value = false
            inputData.value = {}
            //
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
        }else{
            showNotification(
            {
                show: true,
                message: res.message,
                done: true,
                error: true,
                cls: 'show'
            },
            {
                
            },
            4000
        )
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

//outlines
const outline = ref('')
const outlines = store.state.cms.outlines
const addOutline = ()=>{
    if(outline.value.trim().length > 0){
        let id = outlines.length + 1
        if(itechObject(outlines).find(outline.value,'name',true) > -1){
            showNotification(
                {
                    show: true,
                    message: 'Outline already exist',
                    done: true,
                    error: true,
                    cls: 'show'
                },
                {
                    
                },
                4000
            )
           
            return false
        }
        store.dispatch('addOutline',{
            id: id,
            name: outline.value
        })
        outline.value = ''
    }
}
const removeOutline = (index)=>{
    let id = store.state.cms.outlines[index].name.replace(/[^a-zA-Z0-9]/g, '').concat(`-${store.state.cms.outlines[index].id}`)
    let ele = document.getElementById(id)
    if(ele)
        ele.closest(".itech-cms-text-editor").firstChild.focus()
    store.dispatch('deleteOutline',index).then(()=>{
        if(!ele) return false;
        ele.remove()
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
