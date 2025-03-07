<template>
    <div class="container mt-3">
      <h2>Edit Order</h2>
      <div v-if="order">
        <form @submit.prevent="updateOrder">
          <div class="mb-3">
            <label class="form-label">Order Date</label>
            <input v-model="order.orderDate" type="date" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Total Amount</label>
            <input v-model="order.totalAmount" type="number" class="form-control" readonly />
          </div>
          <!-- 若需要處理產品部分，可在此擴充 -->
          <button type="submit" class="btn btn-primary">Update Order</button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">Cancel</button>
        </form>
      </div>
      <div v-else>
        Loading order data...
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-2">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: "EditOrder",
    data() {
      return {
        order: null,
        errorMessage: ''
      }
    },
    mounted() {
      const id = this.$route.params.id;
      this.fetchOrder(id);
    },
    methods: {
      fetchOrder(id) {
        axios.get(`/order/findOrder/orderId=${id}`)
          .then(response => {
            this.order = response.data;
          })
          .catch(error => {
            console.error('Error fetching order:', error);
            this.errorMessage = error.response?.data?.message || error.message;
          });
      },
      updateOrder() {
        axios.put(`/order/updateOrder/orderId=${this.order.id}`, this.order)
          .then(() => {
            this.$router.push({ name: 'OrderList' });
          })
          .catch(error => {
            console.error('Error updating order:', error);
            this.errorMessage = error.response?.data?.message || error.message;
          });
      },
      cancel() {
        this.$router.push({ name: 'OrderList' });
      }
    }
  }
  </script>
  
  <style scoped>
  /* 加入你需要的樣式 */
  </style>