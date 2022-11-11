<template>
    <div class="w-full rounded-lg flex flex-col justify-start overflow-hidden shadow">
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
                <button class="rounded flex items-center justify-center w-6  bg-gray-200 ml-1 hover:bg-gray-200/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </button>
                <button class="rounded flex items-center justify-center w-6  bg-gray-200 ml-1 hover:bg-gray-200/30">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="w-full h-[400px] overflow-auto" id="itech-cms-target">
            <component v-for="(component, index) in components" :key="index" :is="component"/>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, shallowRef } from 'vue';
import { defineAsyncComponent, markRaw } from 'vue';
const props = defineProps({
    title: {
        type: String,
        default: 'iTech CMS Template'
    },
})
const view = document.getElementById('itech-cms-target')
const components = ref([]);
const addText = function(){
   components.value.push(
    markRaw(defineAsyncComponent(()=> import('./Widgets/TextWidget.vue')))
   )
   
}

</script>