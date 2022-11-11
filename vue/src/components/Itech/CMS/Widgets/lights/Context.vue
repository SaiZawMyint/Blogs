import { ref } from 'vue';
<template>
    <div class="absolute z-10 rounded-lg shadow" tabindex="-1" @blur="blurHandler" @load="focus">
        I'm contextMenu
    </div>
</template>

<script setup>
    const props = defineProps({
        show: {
            type: Boolean,
            default: true
        }
    })
    const emits = defineEmits(['blurHandler'])
    const blurHandler = function(){
        emits('blurHandler')
    }
    const focus = function(){this.focus()}
</script>
