import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import router from './router'

createApp(App)
.use(router)
.use(store)
.mount('#app')

window.itech = function(select){
    select = select instanceof Element ? select: document.querySelector(select)
    return {
        wait: function(time,action,callback){
            let id = null
            let p = 0
            clearInterval(id)
            action()
            id = setInterval(function(){
                if(p > 0){
                    clearInterval(id)
                    callback()
                }
                p++
            },time)
        },
        find: function (el, cls) {
            while ((el = el.parentElement) && !el.classList.contains(cls));
            return el;
        }
    }
}
