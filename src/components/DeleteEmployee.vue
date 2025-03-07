<template>
    <div class="container mt-3">
      <h2>Delete Employee</h2>
      <div v-if="employee">
        <p>Are you sure you want to delete employee <strong>{{ employee.name }}</strong>?</p>
        <button class="btn btn-danger" @click="deleteEmployee">Yes, Delete</button>
        <button class="btn btn-secondary ms-2" @click="cancel">Cancel</button>
      </div>
      <div v-else>
        Loading employee data...
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-2">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: "DeleteEmployee",
    data() {
      return {
        employee: null,
        errorMessage: ''
      }
    },
    mounted() {
      const id = this.$route.params.id;
      this.fetchEmployee(id);
    },
    methods: {
      fetchEmployee(id) {
        axios.get(`/employee/findEmployee/id=${id}`)
          .then(response => {
            this.employee = response.data;
          })
          .catch(error => {
            console.error('Error fetching employee:', error)
            this.errorMessage = error.response?.data?.message || error.message
          });
      },
      deleteEmployee() {
        axios.delete(`/employee/deleteEmployee/${this.employee.id}`)
          .then(() => {
            this.$router.push({ name: 'EmployeeList' })
          })
          .catch(error => {
            console.error('Error deleting employee:', error)
            this.errorMessage = error.response?.data?.message || error.message
          });
      },
      cancel() {
        this.$router.push({ name: 'EmployeeList' })
      }
    }
  }
  </script>
  
  <style scoped>
  /* 添加需要的樣式 */
  </style>