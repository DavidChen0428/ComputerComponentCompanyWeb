<template>
    <div class="container mt-3">
      <h2>Edit Product</h2>
      <div v-if="product">
        <form @submit.prevent="updateProduct">
          <div class="mb-3">
            <label class="form-label">Product Name</label>
            <input v-model="product.name" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Price</label>
            <input v-model.number="product.price" type="number" class="form-control" required step="0.01" />
          </div>
          <div class="mb-3">
            <label class="form-label">Quantity</label>
            <input v-model.number="product.quantity" type="number" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary">Update Product</button>
          <button type="button" class="btn btn-secondary ms-2" @click="cancel">Cancel</button>
        </form>
      </div>
      <div v-else>
        Loading product data...
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-2">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: "EditProduct",
    data() {
      return {
        product: null,
        errorMessage: ''
      };
    },
    mounted() {
      const productId = this.$route.params.productId;
      this.fetchProduct(productId);
    },
    methods: {
      fetchProduct(productId) {
        axios.get(`/product/findProduct/productId=${productId}`)
          .then(response => {
            this.product = response.data;
          })
          .catch(error => {
            console.error('Error fetching product:', error);
            this.errorMessage = error.response?.data?.message || error.message;
          });
      },
      updateProduct() {
        axios.put(`/product/updateProduct/productId=${this.product.id}`, this.product)
          .then(() => {
            this.$router.push({ name: 'ProductList' });
          })
          .catch(error => {
            console.error('Error updating product:', error);
            this.errorMessage = error.response?.data?.message || error.message;
          });
      },
      cancel() {
        this.$router.push({ name: 'ProductList' });
      }
    }
  };
  </script>
  
  <style scoped>
  /* 根據需要添加樣式 */
  </style>