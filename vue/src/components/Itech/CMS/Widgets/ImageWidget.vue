<template>
    <div class="p-2 relative border-2 m-2 flex overflow-hidden" :class="editorData.view"
        @contextmenu.prevent="editorData.helper.show = !editorData.helper.show"
        @mousedown="editorData.helper.show = false">
        <div class="image-wrap overflow-hidden min-w-[100px] min-h-[250px]" :class="editorData.imgFill" ref="contexts">
            <img alt="" class="w-full" ref="img">
        </div>
        <Transition name="itech-helper-slide-right">
            <div v-if="editorData.helper.show"
                class="itech-cms-img-helper backdrop-blur-sm bg-gray-400/50 shadow rounded-lg p-1" @mousedown.stop="">
                <button @click="changeView('justify-start')"
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 mb-1 hover:bg-gray-200/70 hover:shadow ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                </button>
                <button @click="centerFit"
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 mb-1 hover:bg-gray-200/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                </button>
                <button @click="changeView('justify-end')"
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 mb-1 hover:bg-gray-200/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                </button>
                <button @click="changeFill('w-[100%]')"
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 mb-1 hover:bg-gray-200/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                </button>
                <button @click="triggerReplace"
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 mb-1 hover:bg-gray-200/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <input type="file" hidden name="" id="" ref="replaceImgInput" @change="replaceImg">
                </button>
                <button @click="deleteHandler"
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 mb-1 hover:bg-gray-200/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </Transition>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import itech from '../../../../js/itech';
const contexts = ref()
const replaceImgInput =ref()

const props = defineProps({
    src: {
        type:String,
        default: '',
    },
    alt: {
        type:String,
        default: 'iTech'
    },
    editor: {
        type: Object,
        default: {
            view: 'justify-start',
            imgFill: 'w-auto'
        }
    }
})
const editorData = ref({
    view: props.editor.view,
    imgFill: props.editor.imgFill,
    helper: {
        show: false
    }
})
const img = ref()
const emits = defineEmits(['delete','changes'])
const deleteHandler = function(){
    emits('delete')
}
const changeView = function(change){
    editorData.value.view = change
    changes()
}
const changeFill = function(change){
    editorData.value.imgFill = change
    changes()
}
const centerFit = function(){
    editorData.value.view = 'justify-center'
    editorData.value.imgFill = 'w-auto'
    changes()
}
const changes = function(ele = contexts.value){
    let data = {
        classes: `image-wrap ie ${editorData.value.imgFill}`,
        styles: ""
    }
    img.value.classList.add(editorData.value.imgFill)
    let html = itech().cms().generated(ele, data.classes,data.styles)
    emits('changes', {
        editor: 'image',
        context: `<div class='p-2 flex w-full ${editorData.value.view}'>${html}</div>`,
        src: img.value.src,
        view: editorData.value.view,
        imgFill: editorData.value.imgFill
    })
}
const triggerReplace = function(){
    replaceImgInput.value.click()
}
const replaceImg = function(e){
    const [file] = e.target.files
    
    if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            img.value.src = reader.result
            changes()
        };
    }
}

onMounted(()=>{
    img.value.src = props.src
    changes(contexts.value)
})
</script>
