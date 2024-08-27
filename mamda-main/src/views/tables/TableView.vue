<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardItem class="py-0">
            <VToolbar tag="div" color="transparent" flat>
              <VTextField
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
              <VBtn icon @click="handleCreateItem" density="comfortable">
                <VIcon>mdi-plus</VIcon>
              </VBtn>
            </VToolbar>
          </VCardItem>
          <VSheet color="#FBFBFB" v-show="showFilter">
            <VCardText>
              <VRow>
                <VCol :cols="4">
                  <VAutocomplete v-model="filters.Ville" :items="roles" :label="t('Ville')" />
                </VCol>
                <VCol :cols="4">
                  <VAutocomplete v-model="filters.status" :items="status" :label="t('status')" />
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
              <template #item.status="{ item }">
                <VChip :color="computeStatusColor(item.status)">{{ item.status }}</VChip>
              </template>
              <template #item.Ville="{ item }">
                <VChip :color="computeVille(item.Ville)">{{ item.Ville }}</VChip>
              </template>
              <template #item.action="{ item }">
                <VBtn variant="plain" density="compact" icon="mdi-pencil-outline" @click="handleViewItem(item.prospectId)"> </VBtn>
                <VBtn variant="plain" density="compact" icon="mdi-trash-can-outline" @click="() => handleDeleteItem(item.prospectId)"> </VBtn>
                <VMenu :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <VBtn variant="plain" density="compact" icon="mdi-dots-vertical" v-bind="props"> </VBtn>
                  </template>
                  <VSheet rounded="md" width="200" elevation="10" class="mt-2">
                    <VList lines="one" density="compact" class="pa-0" color="primary">
                      <VListItem @click="handleViewItem">{{ t('view') }}</VListItem>
                      <VListItem @click="handleViewItem">{{ t('edit') }}</VListItem>
                      <VListItem @click="handleDeleteItem">{{ t('delete') }}</VListItem>
                      <VListItem @click="handleDeleteItem">{{ t('clôturer') }}</VListItem>
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
import { ref, reactive } from 'vue';
import { useLocale } from 'vuetify';
import { useUserStore } from '@/store';
import { IUser } from '@/api/type';
import { fetchUser } from '@/api/user';
import UserForm from '@/components/forms/UserForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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

// const selectedUser = reactive<>({
//   nom: '',
//   villeId: '',
//   tel: '',
//   email: '',
//   typePsp: '',
//   Sujet: '',
//   activite: '',
//   status: 'active',
//   Commercial: 'test',
//   Type2: '',
//   Date: '',
//   heure: ''

// });

const roles = userStore.getRoles;
const status = userStore.getStatusOptions;
const headers = reactive([
  { title: t('nom'), key: 'nom' },
  { title: t('Ville'), key: 'villeId' },
  { title: t('telephone'), key: 'tel' },
  { title: t('Email'), key: 'email' },
  { title: t('Type'), key: 'typePsp' },
  { title: t('Activité'), key: 'activite' },
  { title: t('status'), key: 'status' },
  { title: t('action'), key: 'action' },
  { title: t('id'), key: 'prospectId' }
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
const computeVille= (roles) => {
  const rolesMap = {
    rabat: 'default',
    casa: 'success',
    tanger: 'warn'
  };
  return rolesMap[roles];
};
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
  const params = {
    generalSearch: filters.generalSearch,
    ...pagination
  };
  const response = await apiClient.get('/alluserprospects');
  users.value = response.data;
  console.log(response);
  console.log("response hahowa", response.data);
  console.log(response.data.prospectId);
  loading.value = false;
};

const handleApplyFilter = () => {
  loadData();
};

const handleRefreshItem = () => {
  loadData();
};


const handleCreateItem = () => {
  router.push('/form');
};

const handleViewItem = async (prospectId) => {
  router.push(`/Modifier-Prospect/${prospectId}`); 

};
const handleEditItem = (row) => {
  Object.assign(selectedUser, row);
  showDialog.value = true;
};

// const handleDeleteItem = () => {
//   showDialog.value = true;
//   console.log('delete');
// };

const handleDeleteItem = async (prospectId) => {
  try {
    alert('vous voulez vraiment supprimer ce prospect');
    console.log("dfb", prospectId);
    await apiClient.delete(`/deleteProspect?id=${prospectId}`);
    users.value = users.value.filter(user => user.prospectId !== prospectId);
    showDialog.value = false;
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const handleClear = () => {
  filters.Ville = '';
  filters.status = '';
};

const handleResetFilter = () => {
  filters.Ville = '';
  filters.status = '';
  // loadData();
};
</script>

<style lang="scss">
.search {
  input {
    padding-top: 10px;
  }
}
</style>
