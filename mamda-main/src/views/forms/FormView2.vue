<script lang="ts" setup>

import Swal from 'sweetalert2';


const formModel = ref({
  nom: '',
    villeId: 10 ? parseInt(10, 10) : null,
    assureurId: 2 ? parseInt(2, 10) : null,
    userId: 1 ? parseInt(1, 10) : null,
    reference: '',
    prospectId: '',
    adresse: '',
    email: '',
    tel: '',
    activite: '',
    chiffreAffaire: '',
    effectif: '',
    dirigeant: '',
    intermediaire: '',
    cotisation: '',
    risque: '',
    nomInterlocuteur: '',
    fonctionInterlocuteur: '',
    telInterlocuteur: '',
    placerAu: 33 ? parseInt(2, 10) : null,
    suiteProg: '',
    notes: '',
  // Intéresséproduits: [],
  // username: '',
  // Placerleprospectau: '',
  // Suiteprogrammée: '',
  // selectedFile1: null,
  // produitsOptions: ['Automobile', 'Assurance Vol'],
  // prospectOptions: ['Siege', 'YAHYA', 'Siege', 'Siege', 'Siege'],
  // Activité: '',
  // Dirigeant: '',
  // chiffredaffaires: '',
  // Effectif: '',
  // Assuranceactuel: '',
  // Cotisation: '',
  // Intermédiaire: '',
  // Risqueassuré: '',
  // Dateassuré: '',
  // AssuranceactuelOptions: ['Mamda', 'Axa', 'Atlanta', 'Sanad'],

  // TypeProspect: '',
  // Ville: '',
  // Email: '',
  // Interlocuteur: '',
  // Fonction: '',
  // Téléphone: '',
  // selectedFile2: null,
  // VilleOptions: ['Rabat', 'Casa', 'Tanger'],
  // TypeProspectOptions: ['Prospection', 'Recouvrement', 'Comerciale'],
});

const showAlert = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Remplissez les champs Merci !",
  });
}
const showAlert2 = () => {
  Swal.fire({
    icon: "success",
    title: "Done",
    text: "Prospect Enregistrer !",
  });
}
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
const router = useRouter();
const prospectId = ref<string | null>(null); 

import axios from 'axios';

const jwtToken = localStorage.getItem('jwt_token');
const apiClient = axios.create({
  baseURL: 'http://localhost:8082', 
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `${jwtToken}`

  }, 
});


const fetchData = async () => {
  try {
    const routeParams = router.currentRoute.value.params;
    if (routeParams && routeParams.prospectId) {
      prospectId.value = typeof routeParams.prospectId === 'string' ? routeParams.prospectId : null;
      const response = await apiClient.get(`/getprospectbyid?id=${prospectId.value}`);
      const prospectData = response.data;
      formModel.value = { ...prospectData };
    } else {
      console.warn('Prospect ID is missing or invalid');
    }
  } catch (error) {
    console.error('Error fetching prospect data:', error);
    // Handle error, e.g., show an alert
  }
};



onMounted(fetchData);

const handleFileChange1 = (event) => {
  const file = event.target.files[0];
  formModel.selectedFile1 = file;
};

const handleFileChange2 = (event) => {
  const file = event.target.files[0];
  formModel.selectedFile2 = file;
};
const saveData = async () => {
  try {
    if (prospectId.value) {
      const response = await apiClient.put(`/UpdateProspect?id=${prospectId.value}`, formModel.value);
      console.log('Prospect updated successfully:', response.data);
      showAlert2();
    } else {
      console.error('Prospect ID is null or undefined');
      showAlert();
    }
  } catch (error) {
    console.error('Error updating prospect:', error);
    showAlert();
  }
};
</script>

<template>
  <div>
    <VRow>
      <VCol>
        <VCard class="form-card">
          <VCardItem>
            <VCardTitle>Coordonnées du prospect</VCardTitle>
          </VCardItem>

          <VForm @submit.prevent="() => { }">
            <VRow>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="username">Prospect</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.nom" placeholder="Nom" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Type Prospect">Type Prospect</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect v-model="formModel.TypeProspect" label="Type Prospect"
                      :placeholder="formModel.TypeProspect" :items="formModel.TypeProspectOptions" readonly>
                    </VSelect>
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Ville">Ville</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect v-model="formModel.villeId" label="Ville" placeholder="Select Ville"
                      :items="formModel.VilleOptions" readonly>
                    </VSelect>
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="adresse">adresse</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.adresse" placeholder="adresse" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
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
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Téléphone">Téléphone</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.tel" type="Téléphone" placeholder="Téléphone"
                      persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Interlocuteur">Interlocuteur</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.nomInterlocuteur" type="Interlocuteur" placeholder="Interlocuteur"
                      persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Fonction">Fonction</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.fonctionInterlocuteur" type="Fonction" placeholder="Fonction"
                      persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="fileInput">site</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <input type="file" id="fileInput" @change="handleFileChange2">
                  </VCol>
                </VRow>
              </VCol>

            </VRow>
          </VForm>
        </VCard>
      </VCol>
      <VCol>
        <VCard class="form-card">
          <VCardItem>
            <VCardTitle>Présentation du prospect</VCardTitle>
          </VCardItem>
          <VForm @submit.prevent="() => { }">
            <VRow>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Activité">Activité</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.activite" placeholder="Activité" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Dirigeant">Dirigeant</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.dirigeant" placeholder="Dirigeant" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="chiffredaffaires">chiffre d'affaires</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.chiffreAffaire" placeholder="chiffre d'affaires"
                      persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Effectif">Effectif</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.effectif" placeholder="Effectif" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Assurance actuel">Assurance actuel</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect v-model="formModel.Assuranceactuel" label="Assurance actuel" placeholder="Select Email"
                      :items="formModel.AssuranceactuelOptions">
                    </VSelect>
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Cotisation">Cotisation</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.cotisation" placeholder="Cotisation" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Intermédiaire">Intermédiaire</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.intermediaire" placeholder="Intermédiaire" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Risqueassuré">Risque assuré</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.risque" placeholder="Risque assuré" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Date assuré">Date assuré</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.Dateassuré" placeholder="Date assuré" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VForm>
        </VCard>
      </VCol>
      <VCol cols="12" md="12">
        <VCard class="form-card">
          <VCardItem>
            <VCardTitle>Présentation du prospect</VCardTitle>
          </VCardItem>
          <VForm @submit.prevent="() => { }">
            <VRow>

              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Intéressé par les produits">Intéressé par les produits</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect v-model="formModel.Intéresséproduits" multiple label="Intéressé par les produits"
                      placeholder="Intéressé par les produits" :items="formModel.produitsOptions">
                    </VSelect>
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Placer le prospect au">Placer le prospect au</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect v-model="formModel.Placerleprospectau" label="Placer le prospect au"
                      placeholder="Placer le prospect au" :items="formModel.prospectOptions">
                    </VSelect>
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Suiteprogrammée" required>Suite programmée</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.suiteProg" placeholder="Suite programmée"
                      persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="fileInput">Proposition</label>
                  </VCol>
                  <VCol cols="12" md="6">
                    <input type="file" id="fileInput" @change="handleFileChange1">
                  </VCol>
                  <VCol cols="12" md="3">
                  </VCol>
                </VRow>
              </VCol>
              <VCol offset-md="5" cols="12" md="9">
                <VBtn color="primary" class="spacing" @click="saveData">Enregistrer le prospect</VBtn>
                <VBtn color="primary" class="spacing2" @click="saveData">cloturer</VBtn>
              </VCol>
              <VCol offset-md="5" cols="12" md="9">
              </VCol>
            </VRow>
          </VForm>
        </VCard>
      </VCol>

    </VRow>
  </div>
</template>
<style lang="scss">
.form-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}
.spacing {
  margin-right: 16px; 
  margin-bottom: 16px; 
}
.spacing2 {
  margin-bottom: 16px; 
}
</style>
