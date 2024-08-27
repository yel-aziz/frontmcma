<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
const theme = useTheme();
const primary = theme.current.value.colors.primary;
const secondary = theme.current.value.colors.warning;
const select = ref('2024');
const items = ref(['2024', '2025', '2026', '2027']);
const chartOptions = computed(() => {
  return {
    series: [
      { name: 'Visite Planifiées:', data: [355, 390, 300, 350, 390, 380, 355, 390, 300, 350, 390, 180] },
      { name: 'Visite Realisées:', data: [280, 250, 225, 215, 250, 310, 280, 250, 250, 325, 215, 150] }
    ],
    chartOptions: {
      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '50%', borderRadius: [6] }
      },
      colors: [primary, secondary],
      chart: {
        type: 'bar',
        height: 370,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: '#adb0bb',
        fontFamily: 'inherit',
        sparkline: { enabled: false }
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      legend: { show: false },
      xaxis: {
        type: 'category',
        categories: ['Jan', 'Fev', 'Mar', 'Avr', 'May', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: { cssClass: 'grey--text lighten-2--text fill-color' }
        }
      },
      yaxis: {
        show: true,
        min: 0,
        max: 400,
        tickAmount: 4,
        labels: {
          style: {
            cssClass: 'grey--text lighten-2--text fill-color'
          }
        }
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: 'butt',
        colors: ['transparent']
      },
      // tooltip: { theme: 'light' },

      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3
              }
            }
          }
        }
      ]
    }
  };
});
</script>
<template>
  <VCard>
    <VCardItem>
      <div class="d-sm-flex align-center justify-space-between">
        <div>
          <VCardTitle class="text-h4">{{ $t('Visite Planifiées-Réalisées') }}</VCardTitle>
        </div>
        <div class="my-sm-0 my-2">
          <VSelect v-model="select" :items="items" variant="outlined" density="compact" hide-details></VSelect>
        </div>
      </div>
      <div class="mt-6">
        <apexchart type="bar" height="342px"   :options="chartOptions.chartOptions" :series="chartOptions.series" />
      </div>
    </VCardItem>
  </VCard>
</template>
