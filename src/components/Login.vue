<!-- src/views/Login.vue -->
<template>
  <div class="container">
    <h2 class="mt-3">員工登入</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">員工帳號</label>
        <input id="username" v-model="loginForm.username" type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">員工密碼</label>
        <input id="password" v-model="loginForm.password" type="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary mt-2">登入</button>
      <p class="text-danger mt-2" v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EmployeeLogin',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    handleLogin() {
      // 假設你使用的是 this.$axios
      this.$axios.post('/loginEmployee', this.loginForm)
        .then(response => {
          // 在這之前請先確認 response 存在
          if (response && response.data) {
            // 假設你的 store action 也在這裡被呼叫
            // 例如：commit('login', response.data)
            // 或直接導向首頁
            this.$store.commit('login', response.data)
            this.$router.push({ name: 'Home' })
          } else {
            this.errorMessage = 'Unexpected response format'
          }
        })
        .catch(error => {
          console.error('Login Error: ', error)
          // 根據 error 資訊做額外處理或顯示提示訊息
          this.errorMessage = error.response?.data?.message || 'Login failed.'
        })
    }
  }
}
</script>