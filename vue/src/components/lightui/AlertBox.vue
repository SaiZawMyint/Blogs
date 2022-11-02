
<template>
    <div class="fixed w-full h-full overflow-hidden backdrop-blur-sm modal" v-if="show" @click="hadlerClose">
        <Transition name="alert">
        <div @click.stop="" :style="[`width: ${width ? width:'300px'}`,`height: ${height ? height:'fit-content'}`]" class="border-gray-300 border-2 rounded-lg bg-gray-300 modal-box overflow-hidden" v-if="show">
            <h2 class="text-center border-b-2 py-2">{{title}}</h2>
            <div class="flex items-center justify-center">
                <slot name="icon"></slot>
            </div>
            <div class="p-2">
                <slot name="content"></slot>
            </div>
            <slot name="footer"></slot>
            <button  @click="hadlerClose"
                class="absolute top-1 right-1 w-8 h-8 rounded-full z-50 hover:bg-[#0000004c] flex items-center justify-center close-modal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        </Transition>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
const props = defineProps({
    title: String,
    width: String,
    height: String,
    classes: String,
    show: Boolean
})
const emit = defineEmits(["onClose"])
const hadlerClose = ()=>{
    emit("onClose")
}
const store = useStore()
</script>
<style>

</style>