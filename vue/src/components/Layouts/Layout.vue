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
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease-out;
}

.slide-left-enter-from,
.slide-left-leave-to{
  opacity: 0;
  margin-left: -50px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}
.alert-enter-active {
    animation: fade 0.3s;
}
.alert-leave-active {
    animation: fade 0.3s reverse;
}
.alert-enter-active .modal-box {
    animation: alert 0.3s;
}
.alert-leave-active .modal-box {
    animation: alert 0.3s reverse;
}
@keyframes fade {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
@keyframes alert {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.15);
    }

    100% {
        transform: scale(1);
    }
}
</style>
