<template>
    <Header></Header>
    <div class="content-view pt-[60px]  mx-auto"
    >
        <router-view></router-view>
    </div>
    <Transition name="fade">
        <LoadingScreen v-if="store.state.loadingScreen.data.show"></LoadingScreen>
    </Transition>
    <Transition>
        <Notification v-if="store.state.notification.data.show"></Notification>
    </Transition>
    <Transition name="fade">
        <LoadingBar v-if="store.state.loadingBar.data.show"></LoadingBar>
    </Transition>
</template>
<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import LoadingScreen from '../lightui/LoadingScreen.vue';
import Notification from '../lightui/Notification.vue';
import LoadingBar from '../lightui/LoadingBar.vue';
import Header from '../common/Header.vue';
import AOS from 'aos'

const store = useStore()

const defaultdata = {
    title: 'Create Blog',
    width: 'w-[50%]',
    height: 'h-[fit-content]',
    show: false,
    okBtn: 'Create Blog',
    closable: true,
    animation: 'slideDown',
    create: true,
    update: false
}
store.state.modalBox.data = Object.assign({},defaultdata)
store.state.modalBox.createfn = function(){
    store.state.modalBox.data = Object.assign({},defaultdata)
    store.state.modalBox.data.show = true
    store.state.modalBox.input = {}
}
onMounted(() => {
    AOS.init()
});
</script>
<style>

</style>
