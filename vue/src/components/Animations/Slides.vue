<template>
    <Transition name="fade">
        <AnimateForm 
        title="Your Account Infromation" 
        :back="false" 
        @on-next="next"
        >
            <template v-slot:left>
                <img src="../../assets/img/progress-illu.svg" alt="">
            </template>
            <template v-slot:right>
                <img src="../../assets/img/dog-illu.svg" alt="">
            </template>
            <template v-slot:logo>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            </template>
            <template v-slot:form>
                <div class="w-full px-4 pt-6 pb-10 flex backdrop-blur-sm bg-gray-200/30 rounded-lg p-data-content">
                    <div class="flex flex-col items-center w-[fit-content] min-w-[300px] mx-auto px-8">
                        <div class="p-2 w-full">
                            <label for="" class="w-full text-left">Birthday</label>
                            <div class="flex">
                                <input id="day" name="day" type="number" min="0" max="31" required
                                    class="relative block w-12 mr-2 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="d">
                                <input id="day" name="day" type="number" min="0" max="31" required
                                    class="relative block w-12 mr-2 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="m">
                                <input id="day" name="day" type="number" min="0" max="9999" required
                                    class="relative block w-16 mr-2 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="y">
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center w-[fit-content]  min-w-[300px] mx-auto px-8">
                        <div class="p-2 w-full">
                            <label for="gender" class="w-full text-left">Gender</label>
                            <div class="flex">
                                <select name="gender"
                                    class="relative w-[200px] block mr-2 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </AnimateForm>
    </Transition>
    <Transition name="fade">
        <AnimateForm 
        title="Confirm Your Email" 
        height="h-[400px]"
        width="w-[60%]"
        top="top-sec"
        left="left-sec"
        right="right-sec"
        bottom="bottom-sec"
        @on-next="next" 
        @on-back="back"
        back-btn="Skip"
        >
            <template v-slot:left>
                <img src="../../assets/img/mail-confirmed.svg" alt="">
            </template>
            <template v-slot:right>
                <div class="flex items-center justify-end">
                    <img src="../../assets/img/mail-sent-illu.svg" width="100" alt="">
                </div>
                
            </template>
            <template v-slot:logo>
                <i class="fa-solid fa-envelope-circle-check text-2xl text-green"></i>
            </template>
            <template v-slot:form>
                <div class="w-full px-4 pt-6 pb-10 flex flex-col backdrop-blur-sm bg-gray-200/30 rounded-lg p-data-content border-2">
                    <div class="flex flex-col items-center justify-start w-[fit-content]  min-w-[300px] mx-auto">
                        <div class="p-2 w-full">
                            <label for="gender" class="w-full text-left">Email</label>
                            <div class="flex">
                                <div name="gender"
                                    class="relative w-[200px] bg-gray-300 block mr-2 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    {{data.mail}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-center w-[fit-content]  min-w-[300px] mx-auto px-8">
                        <div class="p-2 w-full">
                            <label for="gender" class="w-full text-left">Verify Code</label>
                            <div class="flex">
                                <input name="gender" type="number" min="0"
                                    placeholder="00000"
                                    class="relative w-[200px] block mr-2 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <button class="px-3 py-1 rounded bg-gray-200 text-sm hover:bg-gray-200/50">Resend</button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </AnimateForm>
    </Transition>
</template>

<script setup>
import { ref } from 'vue';
import AnimateForm from '../Itech/AnimateForm.vue';
const data = ref({
    mail: 'myemail@gmail.com'
}) 
const next = ()=>{
    console.log('next click')
}
const back = ()=>{

}
</script>
<style>
.top{
    top: 13rem;
    transform: translateX(-50%);
    left: 50%;
}
.left{
    top: 10rem;
    left: 0;
}
.right{
    right: 0;
    bottom: 0;
}
.bottom{
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
}
.top-sec{
    top: 5rem;
    transform: translateX(-50%);
    left: 50%;
}
.left-sec{
    top: 0;
    left: 0;
}
.right-sec{
    right: 0;
    bottom: 0;
}
.bottom-sec{
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
}
</style>