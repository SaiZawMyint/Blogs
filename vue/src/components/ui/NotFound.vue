<template>
    <div class="w-full pt-[100px] justify-center">
        <div class="mx-auto max-w-[500px] w-[60%] text-center">
            <div class="w-full max-w-[200px] flex items-center justify-center mx-auto">
                <img src="../../assets/img/logo.svg" alt="Blogs">
            </div>
            <h2 class="page-not-found-label my-3">Page Not Found!</h2>
            <div class="flex items-center justify-center">
                <router-link :to="{name: 'top'}" class="px-3 py-2 bg-[#0a6373] text-gray-200 rounded-lg hover:bg-[#0a637398]">Blogs</router-link>
            </div>
        </div>
    </div>
</template>
