<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">韋恩電腦零件</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">首頁</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/employees">員工管理</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/orders">訂單管理</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/products">產品管理</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/report">報表區</router-link>
                    </li>
                </ul>
                <button class="btn btn-outline-danger" @click="logout">登出</button>
            </div>
        </nav>
        <div class="container mt-3">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'App',
    methods: {
        ...mapActions(['logout']),
        logout() {
            // 清除Vuex中的使用者資料
            this.$store.commit('logout');
            // 導向Login頁面
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>
<style></style>
