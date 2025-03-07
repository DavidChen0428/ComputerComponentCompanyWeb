<template>
    <div class="container mt-3">
      <h2>Add New Employee</h2>
      <form @submit.prevent="addEmployee">
        <div class="mb-2">
          <label class="form-label">Name</label>
          <input v-model="newEmployee.name" type="text" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Username</label>
          <input v-model="newEmployee.username" type="text" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Password</label>
          <input v-model="newEmployee.password" type="password" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Position</label>
          <input v-model="newEmployee.position" type="text" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Department</label>
          <input v-model="newEmployee.department" type="text" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Add Employee</button>
        <button type="button" class="btn btn-secondary ms-2" @click="cancel">Cancel</button>
      </form>
      <div v-if="errorMessage" class="alert alert-danger mt-2">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: "AddEmployee",
    data() {
      return {
        newEmployee: {
          name: '',
          username: '',
          password: '',
          position: '',
          department: ''
        },
        errorMessage: ''
      }
    },
    methods: {
      addEmployee() {
        axios.post('/employee/addEmployee', this.newEmployee)
          .then(() => {
            // 成功後跳回列表頁
            this.$router.push({ name: 'EmployeeList' })
          })
          .catch(error => {
            console.error('Error adding employee:', error)
            this.errorMessage = error.response?.data?.message || error.message
          })
      },
      cancel() {
        this.$router.push({ name: 'EmployeeList' })
      }
    }
  }
  </script>
  
  <style scoped>
  /* 可加入適當樣式 */
  </style>