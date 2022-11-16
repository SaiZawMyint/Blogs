<template>
    <LeftMenuWidget></LeftMenuWidget>
    <div class="w-full">
        <BlogListsVue></BlogListsVue>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import BlogListsVue from '../components/ui/BlogLists.vue';
import LeftMenuWidget from '../components/ui/Widgets/LeftMenuWidget.vue';
const store = useStore()
const route = useRoute()
if(route.name == 'home')
    store.dispatch('getBlogs')
</script>
