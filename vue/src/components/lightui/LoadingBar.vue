<template v-if="store.state.loadingScreen.data.show">
    <div class="loading-bar bg-gray-300" v-if="!store.state.loadingScreen.data.noloading"></div>
</template>
<script setup>
import { useStore } from 'vuex';

const store = useStore()
</script>
<style>
.loading-bar{
    z-index: 999;
    top: 0;
    left: 0;
}
</style>