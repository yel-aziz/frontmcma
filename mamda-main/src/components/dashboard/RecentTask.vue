<template>
  <VCard>
    <VCardItem>
      <VCardTitle>{{ $t('Liste Utilisateur') }}</VCardTitle>
      <VDataTable :headers="headers" :items="items" hover>
        <template #item.action="{ item }">
          <VBtn variant="plain" density="compact" icon="mdi-pencil-outline" @click="redirectaddutilisateur(item.id)"> </VBtn>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLocale } from 'vuetify';
import axios from 'axios';
import { useRouter } from 'vue-router';

const { t } = useLocale();
const router = useRouter();

// State for headers and items
const headers = [
  { title: t('Nom'), key: 'name' },
  { title: t('profile'), key: 'post' },
  { title: t('Numero Telephone'), key: 'status' },
  { title: t('email'), key: 'email' },
  { title: t('action'), key: 'action' },
];

const items = ref([]);

// Fetch the list of users when the component is mounted
const fetchSites = async () => {
  try {
    const jwt = localStorage.getItem('jwt_token');
    if (!jwt) {
      console.error('JWT token not found.');
      return;
    }

    const response = await axios.get('http://localhost:8082/allUsers', {
      headers: {
        Authorization: `${jwt}`,
      },
    });
    console.log(response.data)

    items.value = response.data.map((site: any) => ({
      name: site.fullName,
      post: site.role, // Assuming `profile` is the equivalent field in your API response
      status: site.phoneNumber, // Assuming `phoneNumber` is the equivalent field in your API response
      email: site.email, 
      id: site.userId// Assuming `bureau` is the equivalent field in your API response
    }));
  } catch (error) {
    console.error('Error fetching sites:', error);
  }
};

// Call fetchSites when the component is mounted
onMounted(fetchSites);

// Navigation function

const redirectaddutilisateur = (id: string) => {
  router.push({ name: 'UpdateUser', params: { id } });
};

</script>
