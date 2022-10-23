<template>
    <button class="w-7 h-7 rounded-full flex items-center justify-center">
        <span class="loading-i w-full h-full">
            <span :class="error" class="load one"></span>
            <span :class="error" class="load two"></span>
        </span>
    </button>
</template>
<script setup>
defineProps({
    error: String
})
</script>
<style>
.loading-i{
    position: relative;
    transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.load{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.load.one{
    background-color: #1ba39aa3;
    left: 0;
    animation: loadone .7s infinite cubic-bezier(0.075, 0.82, 0.165, 1);
}
.load.one.error{
    background-color: rgba(238, 55, 55, 0.745);
}
.load.two{
    background-color: #0a637397;
    right: 0;
    animation: loadtwo .7s infinite cubic-bezier(0.075, 0.82, 0.165, 1);
}
.load.two.error{
    background-color: rgba(144, 9, 9, 0.745);
}
@keyframes loadone{
    from{
        left: 0;
    }
    to{
        left: calc(100% - 15px);
    }
}
@keyframes loadtwo {
    from{right: 0;}
    to{right: calc(100% - 15px);}
}
</style>