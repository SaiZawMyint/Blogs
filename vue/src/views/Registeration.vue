<template>
    <div>
      <img class="mx-auto h-[150px] w-auto" src="../assets/img/logo.svg"
      alt="Sushi">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Registeration</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
      </p>
    </div>
    <form class="mt-8 space-y-6" @submit.prevent="register">
      <div v-if="error" class="flex items-center justify-between px-2 py-3 bg-red-100 text-red-500 rounded">
      {{error.error}}
      <span @click="error = null" class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </div>
      <input type="hidden" name="remember" value="true">
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="username" class="sr-only">Username</label>
          <input id="username" v-model="user.name" name="username" type="text" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username">
        </div>
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" v-model="user.email" name="email" type="email" autocomplete="email" class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" v-model="user.password" name="password" type="password" autocomplete="current-password" class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password">
        </div>
        <div>
          <label for="password_confirmation" class="sr-only">Password</label>
          <input id="password_confirmation" v-model="user.password_confirmation" name="password_confirmation" type="password" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Confirm Password">
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-[#1ba39a] py-2 px-4 text-sm font-medium text-white hover:bg-[#1ba39aab] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <!-- Heroicon name: mini/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          Registeration
        </button>
        Or <br>
        Already have account?
        <router-link :to="{name: 'login'}" class="font-medium text-indigo-600 hover:text-indigo-500">Login</router-link>
      
      </div>
    </form>
  
</template>
<script setup>
import store from '../store'
import { useRouter } from 'vue-router';
import {ref} from 'vue'
let error = ref()
  const user={
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
  const router = useRouter()
  function register(){
    store.dispatch('register',user)
    .then((res)=>{
      if(!res.ok){
        errorData(res)
      }
      if('errors' in res){
        errorData(res)
      }else{
        router.push({name:'home'})
      }
      
    }).catch(err=>{
      errorData({ok:false,error: 'Registration failed!'})
    })
  }
  function errorData(data){
  error.value = data
}
</script>