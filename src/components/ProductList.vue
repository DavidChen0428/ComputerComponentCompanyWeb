<template>
  <div class="container mt-3">
    <h2 v-if="orderId">Products in Order {{ orderId }}</h2>
    <h2 v-else>Product List</h2>
    <button class="btn btn-primary mb-3" @click="goToAddProduct">
      Add New Product
    </button>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="goToEditProduct(product.id)">
              Edit
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteProduct(product.id)">
              Delete
            </button>
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
  name: "ProductList",
  data() {
    return {
      products: [],
      errorMessage: ''
    };
  },
  computed: {
    // 若 orderId 作為路由參數傳入，就只列出該訂單的產品
    orderId() {
      return this.$route.params.orderId;
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      // 若有 orderId，則呼叫根據訂單查詢產品的 API，否則查詢所有產品
      if (this.orderId) {
        axios.get(`/product/findProduct/orderId=${this.orderId}`)
          .then(response => {
            this.products = response.data;
          })
          .catch(error => {
            console.error('Error fetching products:', error);
            this.errorMessage = error.response?.data?.message || error.message;
          });
      } else {
        axios.get('/product/findProduct/all')
          .then(response => {
            this.products = response.data;
          })
          .catch(error => {
            console.error('Error fetching products:', error);
            this.errorMessage = error.response?.data?.message || error.message;
          });
      }
    },
    deleteProduct(productId) {
      if (confirm('Are you sure you want to delete this product?')) {
        axios.delete(`/product/deleteProduct/productId=${productId}`)
          .then(() => {
            this.fetchProducts();
          })
          .catch(error => {
            console.error('Error deleting product:', error);
            this.errorMessage = error.response?.data?.message || error.message;
          });
      }
    },
    goToAddProduct() {
      // 如果當前有 orderId，透過它帶入新增產品頁面
      if (this.orderId) {
        this.$router.push({ name: 'AddProduct', params: { orderId: this.orderId } });
      } else {
        // 否則依照你的實作導向一個不帶 orderId 的新增頁面
        this.$router.push({ name: 'AddProduct' });
      }
    },
    goToEditProduct(productId) {
      this.$router.push({ name: 'EditProduct', params: { productId } });
    }
  }
};
</script>

<style scoped>
/* 根據需要添加樣式 */
</style>