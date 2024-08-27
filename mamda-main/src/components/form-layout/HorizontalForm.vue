<script lang="ts" setup>
import { reactive } from 'vue';
import { emailValidator, passwordValidator } from '@/utils/validators';
import { VSelect } from 'vuetify/lib/components/index.mjs';


const formModel = reactive({
  username: '',
  adresse: '',
  TypeProspect: '',
  Ville: '',
  Email: '',
  password: '',
  Interlocuteur: '',
  Fonction: '',
  Téléphone: '',
  selectedFile: null,
  VilleOptions: ['Rabat', 'Casa', 'Tanger'],
  TypeProspectOptions: ['Prospection', 'Recouvrement', 'Comerciale'],
});
const handleFileChange = (event) => {
  const file = event.target.files[0];
  formModel.selectedFile = file; 
};

</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <VCol cols="12" md="3">
            <label for="username">Prospect</label>
          </VCol>
          <VCol cols="12" md="9">
            <VTextField
              v-model="formModel.username"
              placeholder="Prospect Name"
              persistent-placeholder
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
                v-model="formModel.Ville"
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
              v-model="formModel.Email"
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
              v-model="formModel.Téléphone"
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
              v-model="formModel.Interlocuteur"
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
              v-model="formModel.Fonction"
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
          <input type="file" id="fileInput" @change="handleFileChange">
      </VCol>
    </VRow>
</VCol>

    </VRow>
  </VForm>
</template>
