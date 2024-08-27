<template>
  <div class="distance">
    <VRow>
      <VCol>
        <VCard class="form-card">
          <VCardItem>
            <VCardTitle>Info de la Reclamation</VCardTitle>
          </VCardItem>
          <VForm @submit.prevent="saveData">
            <VRow>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Reclamation">Type de la Reclamation</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect v-model="formModel.type" :items="reclamationOptions" item-text="text" item-value="value"
                      label="Type Reclamation" placeholder="Select Reclamation" />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="prospect">Prospect</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect v-model="formModel.prospect" :items="rawData" item-text="libelle" item-value="prospectId" @click="fetchData"
                      label="Select Prospect" placeholder="Select a Prospect" />
                  </VCol>
                </VRow>
              </VCol>

              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Motif">Motif</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.motif" label="Motif" placeholder="Enter Motif" />
                  </VCol>
                </VRow>
              </VCol>
              <VCol offset-md="5" cols="12" md="9">
                <VBtn color="primary" @click="saveData">Enregistrer la Reclamation</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCard>
      </VCol>
    </VRow>
  </div>
  <VCard>
    <VCardItem>
      <VCardTitle>{{ $t('Liste Reclamation') }}</VCardTitle>
      <VDataTable :headers="headers" :items="tickets" hover>
        <template #item.action="{ item }">
          <VBtn variant="plain" density="compact" icon="mdi-pencil-outline" />
          <VBtn variant="plain" density="compact" icon="mdi-trash-can-outline" />
          <VMenu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <VBtn variant="plain" density="compact" icon="mdi-dots-vertical" v-bind="props" />
            </template>
            <VSheet rounded="md" width="200" elevation="10" class="mt-2">
              <VList lines="one" density="compact" class="pa-0" color="primary">
                <VListItem>{{ t('view') }}</VListItem>
                <VListItem>{{ t('edit') }}</VListItem>
                <VListItem>{{ t('delete') }}</VListItem>
              </VList>
            </VSheet>
          </VMenu>
        </template>
      </VDataTable>
    </VCardItem>
  </VCard>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, toRaw } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

const { t } = useLocale();
const router = useRouter();

// Reactive form model
const formModel = reactive({
  type: '',
  motif: '',
  prospect: ''
});

// Options for the reclamation type
const reclamationOptions = ['recouvrement', 'courtage'];

// Reactive variable to store prospects data
const prospectdata = ref<any[]>([]);

// Reactive variable to store ticket data
const tickets = ref<any[]>([]);

// Variable to store raw prospect data
let rawData: any[] = [];

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8082/alluserprospects', {
      headers: {
        Authorization: localStorage.getItem('jwt_token') || '',
        'Content-Type': 'application/json'
      }
    });

    const sites = response.data;
    const prospects: any[] = [];

    for (const site of sites) {
      for (const user of site.users || []) {
        if (user.prospects) {
          prospects.push(...user.prospects);
        }
      }
    }

    prospectdata.value = prospects.map((prospect) => ({
      prospectId: prospect.prospectId,
      libelle: prospect.nom || 'Unknown Prospect'
    }));


    rawData = toRaw(prospectdata.value);
    // Make sure rawData is updated correctly
    console.log(rawData)
  } catch (error) {
    handleError(error);
  }
};

// Fetch data when the component is mounted
onMounted(() => {
  fetchData();
});

// Error handling function
const handleError = (error: any) => {
  console.error('Error fetching data:', error);

  let errorMessage = 'An error occurred while fetching data.';

  if (axios.isAxiosError(error)) {
    if (error.response) {
      errorMessage = `Server responded with status ${error.response.status}: ${error.response.data.message || error.response.data}`;
    } else if (error.request) {
      errorMessage = 'No response received from the server.';
    } else {
      errorMessage = `Error in setting up request: ${error.message}`;
    }
  } else {
    errorMessage = `Unexpected error: ${error.message}`;
  }

  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: errorMessage
  });
};

// Show an alert if fields are missing
const showAlert = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Remplissez les champs Merci !'
  });
};

// Show a success alert after saving data
const showAlert2 = () => {
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Reclamation Enregistrée !'
  });
};

// Function to save form data
const saveData = async () => {
  if (!formModel.type || !formModel.motif || !formModel.prospect) {
    showAlert();
    return;
  }

  try {
    const response = await axios.post('http://localhost:8082/creatTicket', formModel, {
      headers: {
        Authorization: localStorage.getItem('jwt_token') || '',
        'Content-Type': 'application/json'
      }
    });

    console.log('Form submitted successfully', response);
    showAlert2();
  } catch (error) {
    handleError(error);
  }
};

// Table headers for reclamation list
const headers = [
  { title: t('ID Ticket'), key: 'idticket' },
  { title: t('Motif'), key: 'motif' },
  { title: t('Type'), key: 'type' }
];

</script>

<style lang="scss">
.form-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.distance {
  padding-bottom: 2%;
}
</style>
