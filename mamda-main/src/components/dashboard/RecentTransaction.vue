<template>
  <VCard>
    <VCardItem>
      <VCardTitle>{{ $t('Liste Bureau') }}</VCardTitle>
      <VDataTable :headers="headers" :items="items" hover>
        <template #item.action="{ item }">
          <VBtn variant="plain" density="compact" icon="mdi-pencil-outline" @click="redirectaddBureau"> </VBtn>
          <VBtn variant="plain" density="compact" icon="mdi-trash-can-outline"> </VBtn>
          <VMenu :close-on-content-click="false">
            <VSheet rounded="md" width="200" elevation="10" class="mt-2">
              <VList lines="one" density="compact" class="pa-0" color="primary">
                <VListItem @click="redirectaddBureau">{{ t('edit') }}</VListItem>
                <VListItem @click="redirectaddBureau">{{ t('delete') }}</VListItem>
              </VList>
            </VSheet>
          </VMenu>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

const { t } = useLocale();
const router = useRouter();

const headers = reactive([
  { title: t('Nom'), key: 'name' },
  { title: t('Ville'), key: 'city' },
  { title: t('status'), key: 'status' }
]);

const items = ref([]); // Changed to ref to allow reactivity when data is fetched

const fetchSites = async () => {
  try {
    const jwt = localStorage.getItem('jwt_token');
    if (!jwt) {
      console.error('JWT token not found.');
      return;
    }
    const response = await axios.get('http://localhost:8082/getAllsitesByRegion', {
      headers: {
        Authorization: `${jwt}`,
      },
    });
    items.value = response.data.map((site: any) => ({
      name: site.libelle,
      city: site.region,
      status: site.actif    }));
  } catch (error) {
    console.error('Error fetching sites:', error);
  }
};

const redirectaddBureau = () => {
  router.push('/Ajouter-bureau');
};

onMounted(() => {
  fetchSites(); // Fetch data when the component is mounted
});
</script>

<style lang="scss">
.recent-transaction {
  .line {
    width: 2px;
    height: 35px;
  }
}
</style>
