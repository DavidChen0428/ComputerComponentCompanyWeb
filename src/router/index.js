import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// 載入各個頁面元件
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import EmployeeList from '../components/EmployeeList.vue'
import ProductList from '../components/ProductList.vue'
import OrderList from '../components/OrderList.vue'
import Report from '../components/Report.vue'
import AddEmployee from '@/components/AddEmployee.vue'
import EditEmployee from '@/components/EditEmployee.vue'
import DeleteEmployee from '@/components/DeleteEmployee.vue'
import AddOrder from '@/components/AddOrder.vue'
import EditOrder from '@/components/EditOrder.vue'
import AddProduct from '@/components/AddProduct.vue'
import EditProduct from '@/components/EditProduct.vue'


// 定義路由配置
const routes = [
  { path: '/', name: 'Home', component: Home, meta: { auth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/employees', name: 'EmployeeList', component: EmployeeList, meta: { auth: true } },
  { path: '/products/:orderId?', name: 'ProductList', component: ProductList, meta: { auth: true } },
  { path: '/orders', name: 'OrderList', component: OrderList, meta: { auth: true } },
  { path: '/report', name: 'Report', component: Report, meta: { auth: true } },
  { path: '/employees/add', name: 'AddEmployee', component: AddEmployee, meta: { auth: true } },
  { path: '/employees/edit/:id', name: 'EditEmployee', component: EditEmployee, meta: { auth: true } },
  { path: '/employees/delete/:id', name: 'DeleteEmployee', component: DeleteEmployee, meta: { auth: true } },
  { path: '/orders/add', name: 'AddOrder', component: AddOrder, meta: { auth: true } },
  { path: '/orders/edit/:id', name: 'EditOrder', component: EditOrder, meta: { auth: true } },
  { path: '/products/edit/:id', name: 'EditProduct', component: EditProduct, meta: { auth: true } },
  { path: '/products/add/:orderId', name: 'AddProduct', component: AddProduct, meta: { auth: true } },
]

// 使用 createRouter 與 createWebHistory 建立 router 實例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes
})

// 全局路由導航守衛，檢查需要認證的頁面
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.state.auth.loggedIn) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router