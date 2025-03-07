<!-- src/views/Report.vue -->
<template>
    <div class="container">
      <h2 class="mt-3">Reports</h2>
      <div class="form-group mt-3">
        <label for="reportType">Select Report Type:</label>
        <select v-model="reportType" id="reportType" class="form-control">
          <option value="AllEmployee">All Employee</option>
          <option value="OrderProducts">Order Products</option>
        </select>
      </div>
      <div class="mt-3">
        <button class="btn btn-primary mr-2" @click="downloadPDF">Download PDF</button>
        <button class="btn btn-secondary mr-2" @click="onlinePDF">View Online PDF</button>
        <button class="btn btn-success" @click="downloadExcel">Download Excel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReportPage',
    data() {
      return {
        reportType: 'AllEmployee'
      }
    },
    methods: {
      downloadPDF() {
        window.open(`/report/${this.reportType}/downloadReportPDF`, '_blank')
      },
      onlinePDF() {
        window.open(`/report/${this.reportType}/onlineReportPDF`, '_blank')
      },
      downloadExcel() {
        window.open(`/report/${this.reportType}/downloadReportExcel`, '_blank')
      }
    }
  }
  </script>