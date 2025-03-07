<!-- src/views/Home.vue -->
<template>
  <div class="container">
    <h1 class="mt-3">Welcome, {{ employeePosition }} {{ employeeName }}</h1>
    <p>This is your dashboard.</p>
    <div class="btn-group">
      <router-link to="/employees" class="btn btn-outline-primary">Employee Management</router-link>
      <router-link to="/products" class="btn btn-outline-secondary">Product Management</router-link>
      <router-link to="/orders" class="btn btn-outline-success">Order Management</router-link>
      <router-link to="/report" class="btn btn-outline-info">Reports</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'HomePage',
  computed: {
    ...mapState({
      employee: state => state.auth.employee
    }),
    employeeName() {
      return this.employee ? this.employee.name : ''
    },
    employeePosition(){
      return this.employee ? this.employee.position : ''
    },
    employeeId(){
      return this.employee ? this.employee.id:''
    },
    employeeUsername(){
      return this.employee ? this.employee.username:''
    },
    employeeDepartment(){
      return this.employee ? this.employee.department:''
    },
  }
}
</script>