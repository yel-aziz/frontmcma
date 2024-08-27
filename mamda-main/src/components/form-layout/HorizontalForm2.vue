<script lang="ts" setup>
import { reactive } from 'vue';


const formModel = reactive({
  Activité: '',
  Dirigeant: '',
  chiffredaffaires: '',
  Effectif: '',
  Assuranceactuel: '',
  Cotisation: '',
  Intermédiaire: '',
  Risqueassuré: '',
  Dateassuré: '',
  AssuranceactuelOptions: ['Mamda', 'Axa', 'Atlanta', 'Sanad'],

});
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <VCol cols="12" md="3">
            <label for="Activité">Activité</label>
          </VCol>
          <VCol cols="12" md="9">
            <VTextField
              v-model="formModel.Activité"
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
              v-model="formModel.Dirigeant"
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
              v-model="formModel.chiffredaffaires"
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
              v-model="formModel.Effectif"
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
              v-model="formModel.Cotisation"
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
              v-model="formModel.Intermédiaire"
              placeholder="Intermédiaire"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12">
        <VRow no-gutters>
          <VCol cols="12" md="3">
            <label for="Risqueassuré">Risque assuré</label>
          </VCol>
          <VCol cols="12" md="9">
            <VTextField
              v-model="formModel.Risqueassuré"
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
</template>
