<template>
    <CreateBlog :data="data" options="Update" :id="store.state.post.data.id"></CreateBlog>
</template>

<script setup>
import CreateBlog from './CreateBlog.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
const store = useStore()
const router = useRouter()

const data = ref({
        title: store.state.post.data.title,
        description: store.state.post.data.description,
        type: store.state.post.data.type?store.state.post.data.type:0,
        body: store.state.post.data.body,
        data: store.state.post.data.postData,
    })

import { useRouter } from 'vue-router';
</script>