<template>
    <div contenteditable="true" class="p-2 focus:shadow focus:outline-none" :class="font"
    @contextmenu.prevent="contextMenuHaldler(this)">
        I'm Text Widgets
    </div>
    <Context v-if="show" @blur-handler="blur" ref="context"></Context>
    <!-- <input type="text" ref="context"> -->
</template>

<script setup>
import { ref } from 'vue';
import Context from './lights/Context.vue'
const props = defineProps({
    font: {
        type: String,
        default: 'font-sans'
    }
})
const show = ref(false)
const context = ref('context')
const emits = defineEmits(['contextMenu'])
const contextMenuHaldler = function(ele){
    
    ele.blur()
    show.value = true
    // context.value.focus()
    emits('contextMenu')
}
const blur = function(){
    show.value = false
}
</script>
