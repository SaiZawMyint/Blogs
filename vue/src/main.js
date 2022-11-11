import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import './scss/animation.scss'
import './itech.css'

import router from './router'
import itech from './js/itech'

createApp(App)
.use(router)
.use(store)
.mount('#app')

window.itech = itech();