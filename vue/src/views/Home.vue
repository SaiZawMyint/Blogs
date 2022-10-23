<template>
    <div>
        <BlogListsVue></BlogListsVue>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import BlogListsVue from '../components/ui/BlogLists.vue';
const store = useStore()
store.dispatch('getBlogs')
</script>
