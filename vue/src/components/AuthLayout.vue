<template>
<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 wrapper-auth backdrop-blur-sm">
  <div class="mask df-theme-bg backdrop-blur-sm bg-[#0f172acc]"></div>
  <div class="w-full max-w-md space-y-8">
    <router-view></router-view>
  </div>
</div>
<LoadingScreen v-if="store.state.loadingScreen.data.show"></LoadingScreen>
</template>
<script setup>
import { useStore } from 'vuex';
import LoadingScreen from './lightui/LoadingScreen.vue';
const store = useStore()
</script>