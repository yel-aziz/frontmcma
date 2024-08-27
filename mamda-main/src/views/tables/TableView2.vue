<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardItem class="py-0">
            <VToolbar tag="div" color="transparent" flat>
              <VTextField
                v-model="filters.generalSearch"
                :prepend-icon="!showFilter ? 'mdi-filter-variant-plus' : 'mdi-filter-variant'"
                placeholder="Type something"
                hide-details
                clearable
                variant="plain"
                class="search"
                @keyup.enter="handleApplyFilter"
                @click:prepend="showFilter = !showFilter"
                @click:clear="handleClear"
              />
              <VBtn icon @click="handleApplyFilter" density="comfortable">
                <VIcon>mdi-magnify</VIcon>
              </VBtn>
              <VBtn icon @click="handleRefreshItem" density="comfortable">
                <VIcon>mdi-refresh</VIcon>
              </VBtn>
              <VBtn icon @click="showAlert" density="comfortable">
                <VIcon>mdi-calendar-plus</VIcon>
              </VBtn>
            </VToolbar>
          </VCardItem>
          <VSheet color="#FBFBFB" v-show="showFilter">
            <VCardText>
              <VRow>
                <VCol :cols="4">
                  <VAutocomplete v-model="filters.Ville" :items="roles" :label="t('Commercial')" />
                </VCol>
                <VCol :cols="4">
                  <VAutocomplete v-model="filters.status" :items="status" :label="t('Status')" />
                </VCol>
              </VRow>
            </VCardText>
            <VCardActions>
              <VSpacer />
              <VBtn @click="handleResetFilter">{{ t('reset') }}</VBtn>
              <VBtn color="primary" variant="outlined" @click="handleApplyFilter">{{ t('apply') }}</VBtn>
            </VCardActions>
          </VSheet>
          <VCardText class="pa-0 pb-5">
            <VDivider />
            <VDataTable
              :headers="headers"
              :items="users"
              v-model:items-per-page="itemsPerPage"
              :loading="loading"
              @update:options="loadData"
              hover
            >
              <template #item.action="{ item }">
                <VBtn variant="plain" density="compact" icon="mdi-pencil-outline" @click="handleEditItem(item)"> </VBtn>
                <VBtn variant="plain" density="compact" icon="mdi-trash-can-outline"> </VBtn>
                <VMenu :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <VBtn variant="plain" density="compact" icon="mdi-dots-vertical" v-bind="props"> </VBtn>
                  </template>
                  <VSheet rounded="md" width="200" elevation="10" class="mt-2">
                    <VList lines="one" density="compact" class="pa-0" color="primary">
                      <VListItem @click="handleViewItem">{{ t('view') }}</VListItem>
                      <VListItem @click="handleEditItem">{{ t('edit') }}</VListItem>
                      <VListItem @click="handleDeleteItem">{{ t('delete') }}</VListItem>
                    </VList>
                  </VSheet>
                </VMenu>
              </template>
            </VDataTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VDialog v-model="showDialog" width="auto" eager>
      <UserForm :user="selectedUser" @form:cancel="showDialog = false" />
    </VDialog>
  </section>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';
import { createApp, h } from 'vue';
import TimeInput from '/Users/macbookpro/Desktop/Prospect-Manager/src/components/heure.vue'; // Import the custom component
import { ref, reactive } from 'vue';
import { useLocale } from 'vuetify';
import { useUserStore } from '@/store';
import { IUser } from '@/api/type';
import { IUser2 } from '@/api/type';
import { fetchUser } from '@/api/user';
import UserForm from '@/components/forms/UserForm.vue';
import { useRouter } from 'vue-router';

const { t } = useLocale();
const itemsPerPage = ref(10);
const showFilter = ref(true);
const showDialog = ref(false);
const users = ref<IUser[]>([]);
const userStore = useUserStore();
const filters = reactive({
  generalSearch: '',
  Ville: '',
  status: ''
});

const pagination = reactive({
  page: 1,
  pageSize: 10
});

// const selectedUser = reactive<IUser>({
//   Nom: '',
//   Ville: 'rabat',
//   Telephone: '',
//   Email: '',
//   prospectId: '',
//   userId: '',
//   Type: '',
//   Sujet: '',
//   Activité: '',
//   status: 'active',
//   Commercial: 'test',
//   Type2: '',
//   Date: '',
//   heure: ''

// });

const roles = userStore.getRoles;
const status = userStore.getStatusOptions;
const headers = reactive([
  { title: t('Sujet'), key: 'nomPsp' },
  { title: t('Commercial'), key: 'Commercial' },
  { title: t('Type'), key: 'Type' },
  { title: t('Date'), key: 'Date' },
  { title: t('heure'), key: 'heure' },
  { title: t('status'), key: 'status' },
  { title: t('action'), key: 'action' },
  { title: t('userid'), key: 'userId' },

]);

const loading = ref(true);

const computeStatusColor = (status) => {
  const statusMap = {
    inactive: 'default',
    active: 'success',
    pending: 'warn'
  };
  return statusMap[status];
};

const computeVille = (roles) => {
  const rolesMap = {
    rabat: 'default',
    casa: 'success',
    tanger: 'warn'
  };
  return rolesMap[roles];
};
import { onMounted } from 'vue';
const currentUser = ref<IUser>({
  userId: '1',
  prospectId: '',
  Nom: '',
  Ville: 'rabat',
  Telephone: '',
  Email: '',
  Type: '',
  Activité: '',
  status: 'pending',
  Sujet: '',
  Commercial: 'test',
  Type2: '',
  Date: '',
  heure: ''
});  

import axios from 'axios';

const jwtToken = localStorage.getItem('jwt_token');
const apiClient = axios.create({
  baseURL: 'http://localhost:8082', 
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `${jwtToken}`

  }, 
});

const loadData = async () => {
  loading.value = true;
  try {
    if (!currentUser.value.userId) {
      console.error('User ID not found in currentUser:', currentUser.value);
      return;
    }
    const response = await apiClient.get(`/userInfo/${currentUser.value.userId}`);
    users.value = response.data;
    console.log('User data:', response.data.rendezvous);
  } catch (error) {
    console.error('Error fetching user data:', error);
  } finally {
    loading.value = false;
  }
};

const handleApplyFilter = () => {
  loadData();
};

const handleRefreshItem = () => {
  loadData();
};

const router = useRouter();

const handleCreateItem = () => {
  router.push('/form');
};

const handleViewItem = () => {
  console.log('view');
};

const handleEditItem = (row) => {
  Object.assign(selectedUser, row);
  showDialog.value = true;
};

const handleDeleteItem = () => {
  showDialog.value = true;
  console.log('delete');
};

const handleClear = () => {
  filters.Ville = '';
  filters.status = '';
};

const handleResetFilter = () => {
  filters.Ville = '';
  filters.status = '';
  loadData();
};


const showAlert = () => {
  const timeInputContainer = document.createElement('div');
  const timeInputApp = createApp(TimeInput, {
    label: 'Heure',
    'onUpdate:time': (newTime) => {
      const heureInput = document.getElementById('heure') as HTMLInputElement | null;
      if (heureInput) {
        heureInput.value = newTime;
      }
    }
  });
  timeInputApp.mount(timeInputContainer);

  Swal.fire({
    title: 'Rendez-Vous',
    html: `
      <div class="swal2-input-wrapper">
        <input id="nom-prospect" class="swal2-input" placeholder="Nom prospect">
        <input id="commercial" class="swal2-input" placeholder="Commercial">
      </div>
      <div class="swal2-input-wrapper">
        <input id="type" class="swal2-input" placeholder="Type">
        <input id="status" class="swal2-input" placeholder="Status">
      </div>
      <div class="swal2-input-wrapper">
        <input type="date" id="date-input" class="swal2-input">
        <div id="time-input-wrapper" class="swal2-input2"></div>
      </div>`,
    showCancelButton: true,
    confirmButtonText: 'Next',
    customClass: {
      popup: 'swal2-custom'
    },
    preConfirm: () => {
      const nomProspect = (document.getElementById('nom-prospect') as HTMLInputElement).value;
      const commercial = (document.getElementById('commercial') as HTMLInputElement).value;
      const type = (document.getElementById('type') as HTMLInputElement).value;
      // const heure = (document.getElementById('heure') as HTMLInputElement).value;
      const status = (document.getElementById('status') as HTMLInputElement).value;

      // if (!nomProspect || !commercial || !type || !heure || !status) {
      //   Swal.showValidationMessage('Please fill out all fields');
      //   return false;
      // }

      return { nomProspect, commercial, type, status };
    },
    allowOutsideClick: () => !Swal.isLoading(),
    didOpen: () => {
      const wrapper = document.getElementById('time-input-wrapper');
      if (wrapper) {
        wrapper.appendChild(timeInputContainer);
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(result);
      // showDateSwal(result.value);
    }
  });
};

// const showDateSwal = (previousData) => {
//   Swal.fire({

//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: 'Confirmation',
//         text: `Selected data: ${JSON.stringify(result.value, null, 2)}`,
//         icon: 'success'
//       });
//     }
//   });
// };
</script>

<style>
.swal2-custom {
  width: 800px !important; /* Adjust width as needed */
  max-width: 90vw; /* Ensure it doesn't exceed viewport width */
}
.swal2-html-container {
  text-align: left;
}
.swal2-input-wrapper {
  display: flex;
  gap: 10px; /* Adjust the gap as needed */
  margin-bottom: 10px; /* Adjust the margin as needed */
}
.swal2-input {
  flex: 1;
}
.swal2-input2 {
  flex: 1.5;
}
</style>