<template v-if="store.state.modalBox.data.show">
    <div class="fixed w-full h-full overflow-hidden backdrop-blur-sm modal flex items-center justify-center" @click="closeModalOut">
        <Transition name="slide-up">
            <div id="itech-modal-box"
                class="border-gray-300 border-2 rounded-lg bg-gray-300 modal-box flex items-stretch overflow-hidden"
                @click.stop=""
                :class="[store.state.modalBox.data.width, store.state.modalBox.data.height, store.state.modalBox.data.animation]">
                <div class="text-white w-full p-2 flex flex-col">
                    <slot name="content">

                    </slot>

                    <div :class="store.state.modalBox.data.cancelBtn ? 'justify-between':'justify-end'"
                        class="flex items-center p-2">
                        <button class="p-2 m-2 rounded-lg text-red-700 flex items-center hover:bg-[#0000004c]"
                            v-if="store.state.modalBox.data.cancelBtn"
                            @click="store.state.modalBox.data.cancel">
                            <LoadingIconVue error="error" class="mr-2" v-if="store.state.modalBox.data.deleting"></LoadingIconVue>
                            {{store.state.modalBox.data.cancelBtn}}</button>
                        <button class="p-2 m-2 rounded-lg bg-[#0000004c] flex items-center text-white hover:bg-[#0000009c]"
                            @click="store.state.modalBox.data.ok">
                            <LoadingIconVue class="mr-2" v-if="store.state.modalBox.data.loading"></LoadingIconVue>
                            {{store.state.modalBox.data.okBtn}}
                            </button>
                    </div>
                </div>
                <slot name="rg-panel"></slot>
                <button v-if="store.state.modalBox.data.closable"
                    class="absolute top-2 right-2 w-8 h-8 rounded-full z-50 hover:bg-[#0000004c] flex items-center justify-center close-modal"
                    @click="closeModal">
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
import LoadingIconVue from './LoadingIcon.vue';
import { useStore } from 'vuex';
const store = useStore()
function closeModalOut(e){
    e.stopPropagation()
    if(!store.state.modalBox.data.closable) return false
    var target = document.querySelector('.close-modal');
    target.click()
}
function closeModal(e){
    store.state.modalBox.data.show = !store.state.modalBox.data.show
}
</script>
<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.close-modal{
    display: none;
    transition: all .4s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.modal-box:hover > .close-modal{
    display: flex;
}
.fade{
    animation: fade .1s 1 ease-in;
}
.slideDown{
    animation: fade .2s 1 ease-in, slideDown .1s 1 ease-out;
}
.slideDown.out{
    animation: fadeOut .2s 1 ease-out, slideUp .1s 1 ease-out;
}
.fade.out{
    animation: fadeOut .2s 1 ease-out;
}
.slideLeft{
    animation: fade .2s 1 ease-in, slideLeft .1s 1 ease-in;
}
.slideLeft.out{
    animation: fade .2s 1 ease-out, slideLeftOut .1s 1 ease-out;
}
.alert{
    animation: alert .2s 1 ease-in-out;
}
@keyframes fade {
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
@keyframes fadeOut {
    from{
        opacity: 1;
    }
    to{
        opacity: 0;
    }
}
@keyframes slideDown {
    from{
        top: 40%;
    }
    to{
        top: 50%;
    }
}
@keyframes slideUp {
    from{
        top: 50%;
    }
    to{
        top: 30%;
    }
}
@keyframes slideLeft{
    from{
        left: 80%;
    }
    to{
        left: 50%;
    }
}
@keyframes slideLeftOut{
    from{
        left: 50%;
    }
    to{
        left: 20%;
    }
}
@keyframes alert{
    0%{
        transform: translate(-50%,-50%) scale(1);
    }
    65%{
        transform: translate(-50%,-50%) scale(1.3);
    }
    100%{
        transform: translate(-50%,-50%) scale(1);
    }
}
</style>