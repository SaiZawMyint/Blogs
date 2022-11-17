<template>
    <div :class="width,height" class="relative mx-auto overflow-hidden">
        <div :class="data,top" class="animate-block itech-a:top-10-full z-10 px-2" v-if="title !=null">
            <h1 class="text-2xl font-bold text-shadow">{{title}}</h1>
        </div>
        <div :class="data,left" class="animate-block itech-a:left-10-full w-[300px] h-[300px]">
            <slot name="left"></slot>
        </div>
        <div class="animate-block itech-center-blog itech-a:center-7" :class="center" >
            <slot name="center"></slot>
        </div>
        <div :class="data,right" class="animate-block itech-a:right-10-full w-[300px]">
            <slot name="right"></slot>
        </div>
        <div :class="data,bottom" class="animate-block itech-a:bottom-10-full w-[fit-content] pt-16">
            <div v-if="logo.show"
                class="absolute p-data-icon w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm bg-gray-200/30 border-2">
                <slot name="logo">
                    <div v-html="logo.icon"></div>
                </slot>
            </div>
            <slot name="form"></slot>
            <div class="w-full flex items-center justify-end" v-if="btnShow">
                <button class="btn px-3 py-1 rounded-lg my-3 relative" @click="backHandler" v-if="back">{{backBtn}}</button>
                <button class="btn px-3 py-1 rounded-lg my-3 relative ml-2" @click="nextHandler" v-if="next">{{nextBtn}}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    title: {
        type: String,
        default: null
    },
    logo:{
        type: Object,
        default:{
            show: true,
            icon: `Logo`
        }
    },
    btnShow:{
        type:Boolean,
        default: true
    },
    next: {
        type: Boolean,
        default: true
    },
    back: {
        type: Boolean,
        default: true
    },
    width: {
        type: String,
        default: 'w-[60%]'
    },
    height: {
        type: String,
        default: 'h-[600px]'
    },
    center: {
        type:Object,
        default: []
    },
    top:{
        type: String,
        default: 'top text-right w-[70%]'
    },
    left: {
        type: String,
        default: 'left'
    },
    right: {
        type: String,
        default: 'right'
    },
    bottom:{
        type: String,
        default: 'bottom max-w-[100%] h-[300px]'
    },
    backBtn: {
        type: String,
        default: 'Back'
    },
    nextBtn: {
        type: String,
        default: 'Next'
    },
    speed: {
        type: Number,
        default: 10
    }
})
const emit = defineEmits(['onNext','onBack']);

const nextHandler = ()=>{
    data.value = 'reverse'
    emit('onNext')
}
const backHandler = ()=>{
    data.value = ''
    emit('onBack')
}
const data = ref('')
</script>

<style>
.animate-block *{
    transition: transform .5s ease-in;
}
</style>