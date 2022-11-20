<template>
    <CreateBlog :data="data" options="Update" :id="store.state.post.data.id"></CreateBlog>
</template>

<script setup>
import CreateBlog from './CreateBlog.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
const store = useStore()
const router = useRouter()
console.log(store.state.post.data.postData)
const data = ref({
        title: store.state.post.data.title,
        description: store.state.post.data.description,
        type: store.state.post.data.type?store.state.post.data.type:0,
        body: store.state.post.data.body,
        data: store.state.post.data.postData.post,
        cover:{
            name: store.state.post.data.cover,
            data: store.state.post.data.postData.cover
        }
    })
store.state.cms.outlines = store.state.post.data.outlines

import { useRouter } from 'vue-router';
</script>