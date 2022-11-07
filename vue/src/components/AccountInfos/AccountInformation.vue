<template>
    <Slides></Slides>
</template>

<script setup>
    import Slides from '../Animations/Slides.vue';
</script>
<style>
.account-info-box::before{
    content: '';
    position: absolute;
    width: 250px;
    height: 250px;
    top: 0;
    left: 0;
    background: url('../../assets/img/account-info-bg.svg') no-repeat;
    background-position: right center;
    background-size: 100%;
}
</style>