import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import 'aos/dist/aos.css'
import './scss/animation.scss'
import './itech.css'
import VueScrollTo from 'vue-scrollto'

import router from './router'
import itech from './js/itech'

createApp(App)
.use(router)
.use(store)
.use(VueScrollTo)
.mount('#app')

window.itech = itech();