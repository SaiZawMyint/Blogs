<template>
    <div class="w-full rounded-lg h-[6px] bg-gray-200 relative bar">
        <div :style="`width:${status};background:${background == null ? '#33c6bc':background}`" class="progress h-full rounded-lg"></div>
        <div :style="`background:${background == null ? '#33c6bc':background}`" class="label rounded-lg shadow" v-if="label != null">
            <span :style="`color: ${color== null ? '#000':color}`" class=" w-full px-3 flex text-center py-1 rounded-lg text">{{label}}</span>
        </div>
    </div>
</template>
<script setup>
defineProps({
    status: String,
    label: String,
    color: String,
    background: String
})
</script>
<style>
.bar{
    cursor: pointer;
}
.progress{
    transition: all .7s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}
.label{
    position: absolute;
    bottom: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    display: none;
}
.label .text{
    background-color: inherit;
}
.label::before{
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: inherit;
    top: calc(100% - 9px);
    content: '';
    left: 50%;
    transform: translateX(-50%) rotateZ(45deg);
    z-index: 1;
}
.bar:hover > .label{
    display: block;
}
</style>