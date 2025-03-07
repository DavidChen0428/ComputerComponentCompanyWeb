import { createApp } from 'vue' 
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 載入 Bootstrap CSS 與 JS (需先用 npm install bootstrap)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

// 可設定 axios 基本 URL 或統一攔截器（也可在 vue.config.js 中 proxy 轉送）
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.withCredentials=true

// 建立 Vue 應用程式並掛載其它插件
const app = createApp(App)

// 將 router 與 store 掛載到應用中
app.use(router)
app.use(store)

// 將 axios 設定為全域屬性，Vue 3 使用 app.config.globalProperties 替代 Vue.prototype
app.config.globalProperties.$axios = axios

// 掛載應用至 #app 元素
app.mount('#app')