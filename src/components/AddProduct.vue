<template>
  <div class="container mt-3">
    <h2>Add Product for Order #{{ orderId }}</h2>

    <!-- 顯示產品新增表單，當尚未成功新增或正在新增時 -->
    <form @submit.prevent="addProduct" v-if="!success">
      <div class="mb-3">
        <label class="form-label">Product Name</label>
        <input
          v-model="newProduct.name"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Price</label>
        <input
          v-model.number="newProduct.price"
          type="number"
          class="form-control"
          required
          step="0.01"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Quantity</label>
        <input
          v-model.number="newProduct.quantity"
          type="number"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Product</button>
    </form>

    <!-- 當新增成功後顯示提示及兩個按鈕 -->
    <div v-if="success" class="mt-3">
      <p class="alert alert-success">Product added successfully!</p>
      <button class="btn btn-primary me-2" @click="addNextProduct">
        Add Next Product
      </button>
      <button class="btn btn-secondary" @click="finish">
        Finish (Go to Product List)
      </button>
    </div>

    <div v-if="errorMessage" class="alert alert-danger mt-2">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddProduct",
  data() {
    return {
      newProduct: {
        name: "",
        price: null,
        quantity: null,
      },
      errorMessage: "",
      success: false, // 標記產品是否成功新增
    };
  },
  computed: {
    // 從路由中取得 orderId
    orderId() {
      return this.$route.params.orderId;
    },
  },
  methods: {
    addProduct() {
      // 呼叫後端新增產品 API，帶入 orderId
      axios
        .post(`/product/addProduct/orderId=${this.orderId}`, this.newProduct)
        .then(() => {
          // 新增成功之後標記 success 為 true
          this.success = true;
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          this.errorMessage =
            error.response?.data?.message || error.message;
        });
    },
    // 按下「新增下一筆產品」：清空表單，保持在目前頁面，orderId 保持不變
    addNextProduct() {
      this.newProduct = {
        name: "",
        price: null,
        quantity: null,
      };
      this.errorMessage = "";
      this.success = false;
    },
    // 按下「完成」則導向 ProductList 頁面，並帶入 orderId 作為參數
    finish() {
      this.$router.push({
        name: "ProductList",
        params: { orderId: this.orderId },
      });
    },
  },
};
</script>

<style scoped>
/* 可根據需要自行調整樣式 */
</style>