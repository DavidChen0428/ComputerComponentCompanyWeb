<template>
  <div class="container mt-3">
    <h2>Order List</h2>
    <button class="btn btn-primary mb-3" @click="goToAddOrder">Add New Order</button>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Order Date</th>
          <th>Total Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.totalAmount }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="goToEditOrder(order.id)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteOrder(order.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="errorMessage" class="alert alert-danger mt-2">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "OrderList",
  data() {
    return {
      orders: [],
      errorMessage: ''
    }
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      axios.get('/order/allOrder')
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
          this.errorMessage = error.response?.data?.message || error.message;
        });
    },
    deleteOrder(id) {
      if (confirm('Are you sure you want to delete this order?')) {
        axios.delete(`/order/deleteOrder/orderId=${id}`)
          .then(() => {
            this.fetchOrders();
          })
          .catch(error => {
            console.error('Error deleting order:', error);
            this.errorMessage = error.response?.data?.message || error.message;
          });
      }
    },
    goToAddOrder() {
      this.$router.push({ name: 'AddOrder' });
    },
    goToEditOrder(id) {
      this.$router.push({ name: 'EditOrder', params: { id } });
    }
  }
}
</script>

<style scoped>
/* 增加你想要的樣式 */
</style>