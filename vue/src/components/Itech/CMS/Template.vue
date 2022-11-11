<template>
    <div class="w-full rounded-lg flex flex-col justify-start overflow-hidden shadow">
        <div class="flex flex-col">
            <div class="px-2 py-1 bg-gray-300 flex items-center justify-between">
            <span class="font-bold text-sm">{{title}}</span>
            <div class="flex m-1">
                <button class="rounded flex items-center justify-start px-2 bg-gray-200 ml-1 hover:bg-gray-200/30"
                @click="addText">
                    T
                </button>
                <button class="rounded flex items-center justify-center w-6  bg-gray-200 ml-1 hover:bg-gray-200/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </button>
                <label for="chooseImageInp" class="cursor-pointer rounded flex items-center justify-center w-6  bg-gray-200 ml-1 hover:bg-gray-200/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <input type="file" hidden id="chooseImageInp" @change="addImage" accept="image/*">
                </label>
                <button class="rounded flex items-center justify-center w-6  bg-gray-200 ml-1 hover:bg-gray-200/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                </button>
            </div>
        </div>
            <div class="bg-gray-100 itech-cms-te-pop rounded-bl rounded-br flex items-center justify-between">
                <div class="flex items-center justify-start">
                    <button class="relative ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40"
                        @click="chooseColor(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                        </svg>
                        <input type="color" class="itech-cms-color-inp" ref="color" v-model="editorData.currentColor" @input="executeDoc('foreColor',editorData.currentColor)">
                    </button>
                    <button class="font-bold ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40"
                        @click.stop="executeDoc('bold')">
                        B
                    </button>
                    <button
                        class="italic font-mono ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40"
                        @click.stop="executeDoc('italic')">
                        I
                    </button>
                    <button class="relative z-10 ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40" @click.stop="sizeShow">
                        A
                        <Transition name="fade">
                            <div class="add-text-et-helper" v-if="editorData.etHelper.show">
                                <div class="relative bg-gray-200 p-1 flex rounded" tabindex="-1" @blur="editorData.etHelper.show=false" id="foc">
                                    <button @click="increaseFont" @blur.prevent=""
                                        class=" w-5 h-5 rounded-full flex items-center justify-center text-[10px] hover:bg-gray-100/30 bg-white font-bold flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                            class="w-3 h-3">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                    <button @click="decreaseFont" @blur.prevent=""
                                        class="ml-1  w-5 h-5 rounded-full flex items-center justify-center text-[10px] hover:bg-gray-100/30 bg-white font-bold flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                            class="w-3 h-3">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    </button>
                    <button @click="executeDoc('justifyLeft')" class="relative ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40">
                        <i class="fa-solid fa-align-left text-[.7em]"></i>                                  
                    </button>
                    <button @click="executeDoc('justifyCenter')" class="relative ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40">
                        <i class="fa-solid fa-align-center text-[.7em]"></i>                                  
                    </button>
                    <button @click="executeDoc('justifyRight')" class="relative ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40">
                        <i class="fa-solid fa-align-right text-[.7em]"></i>                                  
                    </button>
                    <button @click="executeDoc('justifyFull')" class="relative ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40">
                        <i class="fa-solid fa-align-justify text-[.7em]"></i>                           
                    </button>
                    <button @click="addLink" class="relative ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40">
                        <i class="fa-solid fa-paperclip text-[.7em]"></i>                         
                    </button>
                </div>
                <div class="flex items-center justify-end">
                    <button @click="executeDoc('undo')" class="relative ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40">
                        <i class="fa-solid fa-rotate-left text-sm"></i>
                    </button>
                    <button @click="executeDoc('redo')" class="relative ml-1 w-6 h-6 flex rotate-x-180 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40">
                        <i class="fa-solid fa-rotate-right text-sm"></i>
                    </button>
                    <button class="ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40" @click.stop="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                    </button>
                    <button class="m-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40" @click.stop="deleteHandler">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="w-full h-[400px] overflow-auto" id="itech-cms-target">
            <component v-for="(component, index) in components" :key="index" :is="component" @delete="deleteCurrent(index)"
            v-bind="imgProps[index]"/>
        </div>
    </div>
</template>

<script setup>
import {  ref } from 'vue';
import { defineAsyncComponent, markRaw } from 'vue';
import itech from '../../../js/itech.js'

const editorData = ref({
    show: false,
    currentColor: '#333333',
    etHelper: {
        show: false
    },
    etoptions: {
        font:{
            size: 1
        }
    }
})

const props = defineProps({
    title: {
        type: String,
        default: 'iTech CMS Template'
    },
})
const components = ref([]);
const addText = function(){
   components.value.push(
    markRaw(defineAsyncComponent(()=> import('./Widgets/TextWidget.vue')))
   )
   imgProps.value.push({});
}
const imgProps = ref([])
const addImageVue = function(){
    components.value.push(
        markRaw(defineAsyncComponent(() => import('./Widgets/ImageWidget.vue')))
    )
}

const deleteCurrent = function(index){
    components.value.splice(index,1)
    imgProps.value.splice(index,1)
}

const chooseColor = function(ele){
    ele.$refs.color.click()
}
const executeDoc = function(cmd,value){
    itech().textEditor(cmd,value)
}
const increaseFont = function(){
    editorData.value.etoptions.font.size ++
    itech().textEditor('fontSize',editorData.value.etoptions.font.size)
}
const decreaseFont = function(){
    editorData.value.etoptions.font.size --
    itech().textEditor('fontSize',editorData.value.etoptions.font.size)
}
const sizeShow = function(){
    editorData.value.etHelper.show = !editorData.value.etHelper.show
    itech().wait(100,()=>{},()=>{
        document.getElementById('foc').focus()
    })
}
const addLink = function(){
    let link = window.prompt('Enter your links:','https://')
    if(link){
        executeDoc('createLink',link)
    }
}
const addImage = function (e){
    const [file] = e.target.files
    if (file) {
        imgProps.value.push({
            src : (URL.createObjectURL(file))
        })
    }
    addImageVue()
}
</script>