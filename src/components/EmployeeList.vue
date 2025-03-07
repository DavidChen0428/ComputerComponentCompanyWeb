<template>
  <div class="container mt-3">
    <h2>Employee List</h2>
    <!-- 當登入者不是 chairman 時，可以隱藏新增員工按鈕 -->
    <button 
      v-if="isChairman" 
      class="btn btn-primary mb-3" 
      @click="goToAdd">
      Add New Employee
    </button>
    <table class="table table-striped" v-if="employees && employees.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Position</th>
          <th>Department</th>
          <!-- 非 chairman 不必顯示 Actions 欄 -->
          <th v-if="isChairman">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.id }}</td>
          <td>{{ emp.name }}</td>
          <td>{{ emp.username }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.department }}</td>
          <!-- 僅 chairman 可用編輯與刪除 -->
          <td v-if="isChairman">
            <button class="btn btn-warning btn-sm me-2" @click="goToEdit(emp.id)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="goToDelete(emp.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-info">
      No employee information available.
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-2">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "EmployeeList",
  data() {
    return {
      employees: [],
      errorMessage: ""
    };
  },
  computed: {
    ...mapState({
      currentEmployee: state => state.auth.employee
    }),
    // 判斷目前登入者是否為 chairman (不區分大小寫)
    isChairman() {
      return (
        this.currentEmployee &&
        this.currentEmployee.position &&
        this.currentEmployee.position.toLowerCase() === "chairman"
      );
    }
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      // 若為 chairman，從後端抓取全部員工資料
      if (this.isChairman) {
        axios.get("/employee/allEmployee")
          .then(response => {
            this.employees = response.data;
          })
          .catch(error => {
            console.error("Error fetching employees:", error);
            this.errorMessage = error.response?.data?.message || error.message;
          });
      } else if (this.currentEmployee) {
        // 若非 chairman，僅顯示當前登入者自己的資料
        this.employees = [this.currentEmployee];
      } else {
        this.employees = [];
      }
    },
    goToAdd() {
      this.$router.push({ name: 'AddEmployee' });
    },
    goToEdit(id) {
      this.$router.push({ name: 'EditEmployee', params: { id } });
    },
    goToDelete(id) {
      this.$router.push({ name: 'DeleteEmployee', params: { id } });
    }
  }
};
</script>

<style scoped>
/* 根據需要加入樣式 */
</style>