<template>
  <div class="container mt-3">
    <h2>Edit Employee</h2>
    <div v-if="employee">
      <form @submit.prevent="updateEmployee">
        <div class="mb-2">
          <label class="form-label">Name</label>
          <input v-model="employee.name" type="text" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Username</label>
          <input v-model="employee.username" type="text" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Position</label>
          <input v-model="employee.position" type="text" class="form-control" required />
        </div>
        <div class="mb-2">
          <label class="form-label">Department</label>
          <input v-model="employee.department" type="text" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Update Employee</button>
        <button type="button" class="btn btn-secondary ms-2" @click="cancel">Cancel</button>
      </form>
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
  name: "EditEmployee",
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
          console.log('Fetched employee:', response.data);
          this.employee = response.data;
        })
        .catch(error => {
          console.error('Error fetching employee:', error)
          this.errorMessage = error.response?.data?.message || error.message
        });
    },
    updateEmployee() {
      console.log('updateEmployee triggered', this.employee);
      axios.put(`/employee/updateEmployee/${this.employee.id}`, this.employee)
        .then(() => {
          this.$router.push({ name: 'EmployeeList' });
        })
        .catch(error => {
          console.error('Error updating employee:', error);
          this.errorMessage = error.response?.data?.message || error.message;
        });
    },
    cancel() {
      this.$router.push({ name: 'EmployeeList' });
    }
  }
}
</script>

<style scoped>
/* 可根據需要添加樣式 */
</style>