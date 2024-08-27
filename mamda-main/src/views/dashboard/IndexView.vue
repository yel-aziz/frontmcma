<!-- <script setup lang="ts">

import SalesOverview from '@/components/charts/SalesOverview.vue';
import ApexChartExpenseRatio from '@/components/charts/apex-chart/ApexChartExpenseRatio.vue';

import YearlyBreakup from '@/components/charts/YearlyBreakup.vue';
import MonthlyEarning from '@/components/charts/MonthlyEarnings.vue';
import RecentTransaction from '@/components/dashboard/RecentTransaction.vue';
import RecentTask from '@/components/dashboard/RecentTask.vue';
</script>
<template>
  <VRow>
    <VCol cols="12">
      <VRow>

        <VCol cols="12" lg="7">
          <SalesOverview />
        </VCol>
        <VCol cols="12" md="5">
          
          <VCard >
            <VCardTitle class="text-h4">{{ $t('Visite Réalisées Par Type') }}</VCardTitle>
            <VCardText>
          <ApexChartExpenseRatio />
        </VCardText>
      </VCard>
    </VCol>
      </VRow>
    </VCol>      
  </VRow>
</template> -->

<template>
  <VCard class="form-card">
      <v-row class="test">
        <v-col cols="12">
          <v-text-field
          v-model="searchQuery"
          label="Search"
          prepend-icon="mdi-magnify"
          outlined
          ></v-text-field>
        </v-col>
      </v-row>
      
      <v-row class="yahya">
        <v-col cols="12" md="4">
          <v-card class="info-card">
            <v-card-title>Visite Planifiées</v-card-title>
            <v-card-subtitle>25 VISITE PLANIFIEES</v-card-subtitle>
            <v-card-subtitle>25 PORTEFUUILLE</v-card-subtitle>
            <v-card-text>
              <v-icon>mdi-calendar</v-icon>
            </v-card-text>
          </v-card>
          <v-card class="info-card mt-4">
            <v-card-title>Visite Réalisées</v-card-title>
            <v-card-subtitle>25 VISITE REALISEES</v-card-subtitle>
            <v-card-subtitle>11 TEAUX DE REALISATION</v-card-subtitle>
            <v-card-text>
              <v-icon>mdi-check</v-icon>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>Visite Planifiées-Réalisées</v-card-title>
            <v-card-text>
              <canvas id="doughnutChart"></canvas>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="purple-card">
            <v-card-title class="white--text">
              <v-icon>mdi-calendar</v-icon>
              <span class="ml-2">240 Prospection</span>
            </v-card-title>
            <v-card-subtitle class="white--text">15 Visite</v-card-subtitle>
            <v-card-subtitle class="white--text">36 Recouvrement</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="blue-card">
            <v-card-title class="white--text">
              <v-icon>mdi-account-group</v-icon>
              <span class="ml-2">777 Prospect</span>
            </v-card-title>
            <v-card-subtitle class="white--text">27 Client</v-card-subtitle>
            <v-card-subtitle class="white--text">13.2% Transformation</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      
      <v-row class="chart">
        <v-col cols="12">
          <v-card class="elevation-2">
            <v-card-title>Visite Réalisées Par Type</v-card-title>
            <v-card-text class="chart-container">
              <canvas id="barChart"></canvas>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </VCard>


</template>

<script>
import { Bar, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, ArcElement, CategoryScale, LinearScale);

export default {
  components: {
    Bar,
    Doughnut,
  },
  data() {
    return {
      searchQuery: '',
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        borderRadius: [10]
      },
      barChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Planifiées',
            backgroundColor: '#42A5F5',
            data: [300, 250, 270, 290, 350, 320, 310, 330, 340, 380, 360, 310],
          },
          {
            label: 'Réalisées',
            backgroundColor: '#FFA726',
            data: [280, 230, 260, 270, 330, 300, 290, 310, 320, 360, 340, 290],
          },
        ]
      },
      doughnutChartData: {
        labels: ['Commercial', 'Recouvrement', 'Prospection'],
        datasets: [
          {
            backgroundColor: ['#FFCA28', '#EF5350', '#AB47BC'],
            data: [56, 10, 33],
          },
        ]
      }
    };
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      new ChartJS(document.getElementById('barChart').getContext('2d'), {
        type: 'bar',
        data: this.barChartData,
        options: this.chartOptions
      });

      new ChartJS(document.getElementById('doughnutChart').getContext('2d'), {
        type: 'doughnut',
        data: this.doughnutChartData,
        options: this.chartOptions
      });
    },
  }
};
</script>

<style>
.yahya{
  margin-left: 0.5%;
  align-items: center;
}
.test{
  gap: 10px;
  display: flex;
  margin-top: 1%;
  margin-left: 2%;
  margin-right: 2%;
}
.form-card {
  display: flex;
  flex-direction: column;
}
.info-card {
  border-left: 5px solid #42A5F5;
}
.purple-card {
  margin-left: 2%;
  background-color: #9c27b0;
  color: white;
}
.blue-card {
  margin-right: 2%;
  background-color: #2196f3;
  color: white;
}
.chart-container {
  height: 500px; 

}
.chart{
  /* margin-top: 1%; */
  margin-bottom: 2%;
  margin-left: 2%;
  margin-right: 2%;
}
.mt-4 {
  margin-top: 16px;
}
</style>
