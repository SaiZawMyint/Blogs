<template>
    <div class="flex flex-col p-2 max-w-[80%] mx-auto">
        <form @submit.prevent="">
            <CreateBlog></CreateBlog>
        </form>
    </div>
</template>

<script setup>
import CreateBlog from '../CreateBlog.vue';
</script>

<style lang="scss" scoped>

</style>