<template>
    <CreateBlog :data="data"></CreateBlog>
</template>

<script setup>
import CreateBlog from './CreateBlog.vue';
import json from '../Itech/CMS/template.json'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const data = ref({
    title: 'Edit blog',
    description: 'this is edit blog',
    type: 0,
    body: '',
    data: json.body
})

const route = useRoute()

const store = useStore()

const id = route.params.id

store.dispatch('getBlogById',id).then((res)=>{

    data.value = {
        title: store.state.post.data.title,
        description: store.state.post.data.description,
        type: store.state.post.data.type,
        body: store.state.post.data.body,
        data: store.state.post.data.postData
    }
    console.log(data.value)
})
</script>