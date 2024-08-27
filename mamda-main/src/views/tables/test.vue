<template>
  <section>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardItem class="py-0">
            <VToolbar tag="div" color="transparent" flat>
              <!-- Search Bar -->
              <VTextField
                :prepend-icon="!showFilter ? 'mdi-filter-variant-plus' : 'mdi-filter-variant'"
                placeholder="Type something"
                hide-details
                clearable
                variant="plain"
                class="search"
                v-model="searchQuery"
                @keyup.enter="handleApplyFilter"
                @click:prepend="showFilter = !showFilter"
                @click:clear="handleClear"
              />
              <!-- Apply Filter Button -->
              <VBtn icon @click="handleApplyFilter" density="comfortable">
                <VIcon>mdi-magnify</VIcon>
              </VBtn>
              <!-- Other Buttons -->
              <VBtn icon @click="handleRefreshItem" density="comfortable">
                <VIcon>mdi-refresh</VIcon>
              </VBtn>
              <VBtn icon @click="handleCreateItem" density="comfortable">
                <VIcon>mdi-plus</VIcon>
              </VBtn>
            </VToolbar>
          </VCardItem>
          <!-- Filter Options -->
          <VSheet color="#FBFBFB" v-show="showFilter">
            <VCardText>
              <VRow>
                <VCol :cols="4">
                  <VAutocomplete v-model="filters.role" :items="roles" label="Role" />
                </VCol>
                <VCol :cols="4">
                  <VAutocomplete v-model="filters.status" :items="status" label="Status" />
                </VCol>
              </VRow>
            </VCardText>
            <VCardActions>
              <VSpacer />
              <VBtn @click="handleResetFilter">{{ t('reset') }}</VBtn>
              <VBtn color="primary" variant="outlined" @click="handleApplyFilter">{{ t('apply') }}</VBtn>
            </VCardActions>
          </VSheet>
          <!-- Data Table -->
          <VCardText class="pa-0 pb-5">
            <VDivider />
            <VDataTable
              :headers="headers"
              :items="filteredUsers"
              v-model:items-per-page="itemsPerPage"
              :loading="loading"
              @update:options="loadData"
              hover
            >
              <!-- Custom Slot for Status -->
              <template #item.status="{ item }">
                <VChip :color="computeStatusColor(item.status)">{{ item.status }}</VChip>
              </template>
              <!-- Custom Slot for Actions -->
              <template #item.action="{ item }">
                <VBtn variant="text" icon @click="editItem(item)">
                  <VIcon>mdi-pencil-outline</VIcon>
                </VBtn>
                <VBtn variant="text" icon @click="deleteItem(item)">
                  <VIcon>mdi-trash-can-outline</VIcon>
                </VBtn>
                <VMenu :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <VBtn variant="text" icon v-bind="props">
                      <VIcon>mdi-dots-vertical</VIcon>
                    </VBtn>
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
    <!-- Dialog for Editing -->
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

const { t } = useLocale();
const itemsPerPage = ref(10);
const showFilter = ref(true);
const showDialog = ref(false);
const users = ref<IUser[]>([]);
const userStore = useUserStore();
const filters = reactive({
  role: '',
  status: '',
  search: ''
});
const pagination = reactive({
  page: 1,
  pageSize: 10
});

const selectedUser = reactive<IUser>({
  Nom: '',
  Ville: '',
  Telephone: '',
  Email: '',
  Type: '',
  Activité: '',
  status: 'active'
});

// 👉 Search filters
const roles = userStore.getRoles;
const status = userStore.getStatusOptions;
const headers = reactive([
  { text: t('Nom'), value: 'Nom' },
  { text: t('Ville'), value: 'Ville' },
  { text: t('Telephone'), value: 'Telephone' },
  { text: t('Email'), value: 'Email' },
  { text: t('Type'), value: 'Type' },
  { text: t('Activité'), value: 'Activité' },
  { text: t('status'), value: 'status' },
  { text: t('action'), value: 'action' }
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

const loadData = async () => {
  loading.value = true;
  const params = { filter: filters, ...pagination };
  const { data } = await fetchUser(params);
  users.value = data;
  loading.value = false;
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
  filters.role = '';
  filters.status = '';
  filters.search = '';
};

const handleResetFilter = () => {
  filters.role = '';
  filters.status = '';
  filters.search = '';
  loadData();
};
</script>

<style lang="scss">
.search {
  input {
    padding-top: 10px;
  }
}
</style>
