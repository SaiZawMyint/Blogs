<template>
    <CreateBlog :data="data" options="Update" :id="store.state.post.data.id"></CreateBlog>
</template>

<script setup>
import CreateBlog from './CreateBlog.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
const store = useStore()
const data = ref({
        title: store.state.post.data.title,
        description: store.state.post.data.description,
        type: store.state.post.data.type?store.state.post.data.type:0,
        body: store.state.post.data.body,
        data: store.state.post.data.postData,
    })

// const route = useRoute()


// const id = route.params.id

// store.dispatch('getBlogById',id).then((res)=>{
//     data.value = {
//         title: store.state.post.data.title,
//         description: store.state.post.data.description,
//         type: store.state.post.data.type,
//         body: store.state.post.data.body,
//         data: store.state.post.data.postData
//     }
//     console.log(data.value)
// })
</script>