<template>
  <div>
    <VRow>
      <VCol>
        <!-- Horizontal Form -->
        <VCard class="form-card">
          <VCardItem>
            <VCardTitle>Coordonnées de l'Utilisateur</VCardTitle>
          </VCardItem>
          <VForm @submit.prevent="saveData">
            <VRow>
              <!-- Full Name Field -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Nom Complet">Nom Complet</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.fullName" placeholder="Nom Complet" persistent-placeholder
                      required />
                  </VCol>
                </VRow>
              </VCol>

              <!-- Login Field -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Login">Login</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.login" placeholder="Login" persistent-placeholder required />
                  </VCol>
                </VRow>
              </VCol>

              <!-- Email Field -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Email">Email</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.email" placeholder="Email" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>

              <!-- Phone Number Field -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Numero de Telephone">Numero de Telephone</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.phoneNumber" placeholder="Numero de Telephone"
                      persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>

              <!-- Role Field -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Role">Role</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect v-model="formModel.role" :items="roles" label="Select Role" placeholder="Select a Role" />
                  </VCol>
                </VRow>
              </VCol>

              <!-- Password Field -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Password">Password</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.password" placeholder="Password" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>

              <!-- Site Field -->
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Site">Site</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect v-model="formModel.site" @click="fetchSites" :items="sites" item-title="text"    
                      item-value="value" label="Select Site" placeholder="Select a Site" />
                  </VCol>
                </VRow>
              </VCol>

              <!-- Save Button -->
              <VCol offset-md="5" cols="12" md="9">
                <VBtn color="primary" @click="saveData"> Enregistrer l'Utilisateur </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { VSelect, VCard, VCardItem, VCardTitle, VTextField, VBtn, VRow, VCol, VForm } from 'vuetify/components';

const router = useRouter();

const formModel = reactive({
  fullName: '',
  email: '',
  phoneNumber: '',
  site: '', // siteId will be set here
  role: '',
  password: '',
  login: ''
});

const sites = reactive<{ text: string; value: number }[]>([]);
const roles = ['PDEV', 'REGIONAL', 'CC', 'CCS'];

const fetchSites = async () => {
  // Check if sites are already fetched to avoid redundant API calls
  if (sites.length > 0) {
    return;
  }

  const jwt = localStorage.getItem('jwt_token');
  if (!jwt) {
    console.error('JWT token not found.');
    return;
  }

  try {
    const response = await axios.get('http://localhost:8082/getAllsitesByRegion', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${jwt}`
      }
    });

    if (Array.isArray(response.data)) {
      const formattedSites = response.data.map((site) => ({
        text: site.libelle,
        value: site.siteId // This is the siteId
      }));
      sites.splice(0, sites.length, ...formattedSites);
    } else {
      console.error('Unexpected response format:', response.data);
    }
  } catch (error) {
    console.error('Error fetching sites:', error);
  }
};

const showAlert = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Remplissez les champs Merci !'
  });
};

const showAlert2 = () => {
  Swal.fire({
    icon: 'success',
    title: 'Done',
    text: 'Prospect Enregistrer !'
  });
};

const saveData = async () => {
  for (const key in formModel) {
    if (!formModel[key]) {
      showAlert();
      return;
    }
  }

  try {
    const response = await axios.post('http://localhost:8082/creat', formModel, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    showAlert2();
    
    console.log('Saving data:', response);
  } catch (error) {
    console.error('Error submitting form:', error);
    showAlert();
  }
};
</script>

<style lang="scss" scoped>
.form-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}
</style>
