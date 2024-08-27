<script setup lang="ts">
/*Call Components*/
import SalesOverview from '@/components/charts/SalesOverview.vue';
import YearlyBreakup from '@/components/charts/YearlyBreakup.vue';
import MonthlyEarning from '@/components/charts/MonthlyEarnings.vue';
import RecentTransaction from '@/components/dashboard/RecentTransaction.vue';
import RecentTask from '@/components/dashboard/RecentTask.vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const redirectaddBureau = () => {
  router.push('/Ajouter-bureau');
};
const redirectaddutilisateur = () => {
  router.push('/Ajouter-Utilisateur');
};

</script>
<template>
  <VRow>
    <VCol cols="12">
      <VBtn  class="spacing" @click="redirectaddBureau">+Bureau</VBtn>
      <VBtn class="spacing2" @click="redirectaddutilisateur">+Utilisateur</VBtn>
      <VRow>
        <VCol cols="12" lg="4">
          <RecentTransaction />
        </VCol>
        <VCol cols="12" lg="8">
          <RecentTask />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>


<style>
.spacing {
  margin-right: 16px; 
  margin-bottom: 16px; 
}
.spacing2 {
  margin-bottom: 16px; 
}
</style>