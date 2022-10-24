<template>
    <div class="fixed w-full h-full overflow-hidden backdrop-blur-sm modal">
        <Transition name="alert">
            <div class="border-gray-300 border-2 rounded-lg bg-gray-300 modal-box overflow-hidden w-[35%]">
                <h2 class="text-center border-b-2 py-2">{{title}}</h2>
                <div class="flex items-center justify-center py-3">
                    <slot name="icon"></slot>
                </div>
                <div class="p-2">
                    <slot name="content"></slot>
                </div>
                <div class="flex items-center justify-center py-2">
                    <button class="px-3 py-2 mx-2 bg-[#0f857d] hover:bg-[#33c6bc] rounded-lg text-gray-200">Git</button>
                    <button class="px-3 py-2 mx-2 bg-[#0f857d] hover:bg-[#33c6bc] rounded-lg text-gray-200">Blogs</button>
                </div>
                <button 
                class="absolute top-2 right-2 w-8 h-8 rounded-full z-50 hover:bg-[#0000004c] flex items-center justify-center close-modal">
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
defineProps({
    title: String
})
</script>