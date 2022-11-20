<template>
    <div class="flex flex-col m-2 rounded itech-cms-text-editor border-2" tabindex="-1">
        <div contenteditable="true" class="p-2 focus:outline-none relative te placeholder:text-slate-400" :class="font"
            @contextmenu.prevent="contextMenuHaldler"
            ref="contexts"
            v-html="context"
            @focusout="updateText"
            id="te"
            data-placeholder="Enter text here">
        </div>
        <div v-if="editorData.show" @mousedown.prevent="" class="bg-gray-100 itech-cms-te-pop rounded-bl rounded flex items-center justify-end">
            <div class="flex items-center justify-end">
                <button 
                @click="showOutlines"
                class="relative ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40 hover:shadow">
                    <i class="fa-solid fa-hashtag text-[.7em]"></i>
                </button>
                <button class="relative ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40 hover:shadow">
                    <i class="fas fa-palette"></i>
                </button>
                
                <!-- <button class="relative ml-1 w-6 h-6 flex rotate-x-180 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40">
                    <i class="fa-solid fa-border-none"></i>
                </button> -->
                <!-- <button class="ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40" @click.stop="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                </button> -->
                <button class="m-1 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-100/40 hover:shadow" @click.stop="deleteHandler" @mousedown.prevent="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { onMounted, ref, toRef } from 'vue';
import itech from '../../../../js/itech';

const props = defineProps({
    font: {
        type: String,
        default: 'font-sans'
    },
    context: {
        type: String
    },
    tag: {
        type: String,
        default: null
    },
    outlines: {
        type: Array,
        default: []
    }
})
const contexts = ref()
const editorData = ref({
    show: false,
    currentColor: '#3333333',
    etHelper: {
        show: false
    },
    etoptions: {
        font:{
            size: 1
        },
        allText: ''
    },
    tag: props.tag,
    outlines: props.outlines
})

const emits = defineEmits(['contextMenu','delete','changes'])
const contextMenuHaldler = function(){
    editorData.value.show = !editorData.value.show
    emits('contextMenu')
}
const deleteHandler = function(){
    emits('delete')
}

const updateText = function(){
    let data = { 
        classes: `p-2 te`,
        styles: "",
        id: editorData.value.tag
    }
    let html = ``
    let org = ``
    if(contexts.value instanceof HTMLElement){
        html = itech().cms().generated(contexts.value, data.classes,data.styles,data.id)
        org = contexts.value.innerHTML
    }
    emits('changes',{editor: 'text',context:html, org: org, id: data.id})
    editorData.value.show = false
}


onMounted(()=>{
    updateText()
})
</script>
<style>

</style>