<template>
  <div class="container mt-3">
    <h2>Add New Order</h2>
    <form @submit.prevent="addOrder">
      <div class="mb-3">
        <label class="form-label">Order Date</label>
        <!-- 如果使用者未輸入日期，則後端可預設為今天，或在前端預設 -->
        <input v-model="newOrder.orderDate" type="date" class="form-control" />
      </div>
      <!-- 產品資料可另行管理，這裡先初始化為空 -->
      <button type="submit" class="btn btn-primary">Add Order</button>
      <button type="button" class="btn btn-secondary ms-2" @click="cancel">Cancel</button>
    </form>
    <div v-if="errorMessage" class="alert alert-danger mt-2">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AddOrder",
  data() {
    return {
      newOrder: {
        orderDate: '', // 如果未輸入，稍後用今天的日期補上
        products: []   // 剛新增訂單時，產品陣列預設為空
      },
      errorMessage: ''
    }
  },
  methods: {
    addOrder() {
      // 如果訂單日期未填寫，預設設定為今日
      if (!this.newOrder.orderDate) {
        let today = new Date().toISOString().substring(0, 10);
        this.newOrder.orderDate = today;
      }
      axios.post('/order/addOrder', this.newOrder)
        .then(response => {
          console.log('Response data:', response.data);
          // 從後端回傳資料中取得 orderid（注意要與後端鍵名完全一致）
          const newOrderId = response.data.orderid;
          if (!newOrderId) {
            throw new Error('No order id returned from server');
          }
          // 自動跳轉到新增產品頁面，並把 orderid 傳入作為動態參數
          this.$router.push({ name: 'AddProduct', params: { orderId: newOrderId } });
        })
        .catch(error => {
          console.error('Error adding order:', error);
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
/* 根據需要添加樣式 */
</style>