<script lang="ts" setup>
import { reactive } from 'vue';
import Swal from 'sweetalert2';
import { toRaw } from 'vue';

const formModel = reactive({
  nom: '',
    villeId: 'yahya' ? parseInt(5, 10) : null,
    assureurId: 2 ? parseInt(2, 10) : null,
    userId: 1 ? parseInt(1, 10) : null,
    reference: '',

    adresse: '',
    email: '',
    tel: '',
    activite: '',
    chiffreAffaire: '',
    effectif: 44 ? parseInt(908, 10) : null,
    dirigeant: '',
    intermediaire: '',
    cotisation: '',
    risque: '',
    nomInterlocuteur: '',
    fonctionInterlocuteur: '',
    telInterlocuteur: '',


    placerAu: 33 ? parseInt(2, 10) : null,
    suiteProg: '',
    notes: ''
    
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

const handleFileChange1 = (event) => {
  const file = event.target.files[0];
  formModel.selectedFile1 = file; 
};

const handleFileChange2 = (event) => {
  const file = event.target.files[0];
  formModel.selectedFile2 = file; 
};

const handleFileChange3 = (event) => {
  const files = event.target.files;
  formModel.selectedFile3 = files; 
  for (let i = 0; i < files.length; i++) {
    console.table(files[i].name);
  }
};

import axios from 'axios';
const jwtToken = localStorage.getItem('jwt_token');

const apiClient = axios.create({
  baseURL: 'http://localhost:8082', 
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `${jwtToken}`
  },
  // withCredentials: true
});

const saveData = async () => {
  try {
    const rawFormModel = toRaw(formModel);
    console.log("rawFormModel",rawFormModel);
    const response = await apiClient.post('/CreateProspect' , rawFormModel);
    console.log('Form submitted successfully', response);
    showAlert2();
  } catch (error) {
    console.error('There was an error submitting the form', error);
  }
};
</script>

<template>
  <div>
    <VRow>
      <VCol>
        <VCard class="form-card">
          <VCardItem> <VCardTitle>Coordonnées du prospect</VCardTitle> </VCardItem>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="username">Prospect</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.nom"
                      placeholder="Prospect Name"
                      persistent-placeholder
                      required
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Type Prospect">Type Prospect</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect
                        v-model="formModel.TypeProspect"
                        label="Type Prospect"
                        placeholder="Select Email"
                        :items="formModel.TypeProspectOptions"
                    >             
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
                    <VSelect
                        v-model="formModel.villeId"
                        label="Ville"
                        placeholder="Select Ville"
                        :items="formModel.VilleOptions"
                    >             
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
                    <VTextField
                      v-model="formModel.adresse"
                      placeholder="adresse"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Email">Email</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.email"
                      placeholder="Email"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Téléphone">Téléphone</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.tel"
                      type="Téléphone"
                      placeholder="Téléphone"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Interlocuteur">Interlocuteur</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.nomInterlocuteur"
                      type="Interlocuteur"
                      placeholder="Interlocuteur"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Fonction">Fonction</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.fonctionInterlocuteur"
                      type="Fonction"
                      placeholder="Fonction"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="fileInput">Carte Visite</label>
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
          <VCardItem> <VCardTitle>Présentation du prospect</VCardTitle> </VCardItem>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Activité">Activité</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.activite"
                      placeholder="Activité"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Dirigeant">Dirigeant</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.dirigeant"
                      placeholder="Dirigeant"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="chiffredaffaires">chiffre d'affaires</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.chiffreAffaire"
                      placeholder="chiffre d'affaires"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Effectif">Effectif</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.effectif"
                      placeholder="Effectif"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Assurance actuel">Assurance actuel</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect
                        v-model="formModel.Assuranceactuel"
                        label="Assurance actuel"
                        placeholder="Select Email"
                        :items="formModel.AssuranceactuelOptions"
                    >             
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
                    <VTextField
                      v-model="formModel.cotisation"
                      placeholder="Cotisation"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Intermédiaire">Intermédiaire</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.intermediaire"
                      placeholder="Intermédiaire"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Risque assuré">Risque assuré</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.risque"
                      placeholder="Risque assuré"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Date assuré">Date assuré</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.Dateassuré"
                      placeholder="Date assuré"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VForm>
        </VCard>
      </VCol>
      <VCol cols="12" md="12">
        <VCard class="form-card">
          <VCardItem> <VCardTitle>Présentation du prospect</VCardTitle> </VCardItem>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Intéressé par les produits">Intéressé par les produits</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VSelect
                      v-model="formModel.Intéresséproduits"
                      multiple
                      label="Intéressé par les produits"
                      placeholder="Intéressé par les produits"
                      :items="formModel.produitsOptions"
                    >             
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
                    <VSelect
                      v-model="formModel.placerAu"
                      label="Placer le prospect au"
                      placeholder="Placer le prospect au"
                      :items="formModel.prospectOptions"
                    >             
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
                    <VTextField
                      v-model="formModel.suiteProg"
                      placeholder="Suite programmée"
                      persistent-placeholder
                    />
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
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="fileInput">GED</label>
                  </VCol>
                  <VCol cols="12" md="6">
                    <input type="file" id="fileInput" multiple @change="handleFileChange3">
                  </VCol>
                </VRow>
              </VCol>
              <VCol offset-md="5" cols="12" md="9">
                <VBtn color="primary" @click="saveData">Enregistrer le prospect</VBtn>
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  border-radius: 8px;
  background-color: white; 
}
</style>
