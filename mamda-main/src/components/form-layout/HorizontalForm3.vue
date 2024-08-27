<script lang="ts" setup>
import { ref } from 'vue';

import { reactive } from 'vue';
const formModel = reactive({

  Intéresséproduits: [],
  Suiteprogrammée: '',
  Placerleprospectau: '',
  selectedFile: null,
  produitsOptions: ['Automobile', 'Assurance Vol'],
  prospectOptions: ['Siege', 'YAHYA', 'Siege', 'Siege', 'Siege']
});

// const fileInputRef = ref<HTMLInputElement | null>(null);



const handleFileChange = (event) => {
  const file = event.target.files[0];
  formModel.selectedFile = file; 
};

const saveData = () => {
  console.log('Saving data:', formModel);
  // console.log(Suite)
};


// const triggerFileInput = () => {
//   const fileInput = fileInputRef.value;  
//   if (fileInput) {
//     fileInput.click();
//   }
// };


</script>

<template>

  <VForm @submit.prevent="() => {}">
    <VRow>
      
      <!-- Intéressé par les produits -->
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

      <!-- Placer le prospect au -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol cols="12" md="3">
            <label for="Placer le prospect au">Placer le prospect au</label>
          </VCol>
          <VCol cols="12" md="9">
            <VSelect
              v-model="formModel.Placerleprospectau"
              label="Placer le prospect au"
              placeholder="Placer le prospect au"
              :items="formModel.prospectOptions"
            >             
            </VSelect>
          </VCol>
        </VRow>
      </VCol>

      <!-- Suite programmée -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol cols="12" md="3">
            <label for="Suiteprogrammée">Suite programmée</label>
          </VCol>
          <VCol cols="12" md="9">
            <VTextField
              v-model="formModel.Suiteprogrammée"
              placeholder="Suite programmée"
              persistent-placeholder
            />
          </VCol>
        </VRow>
      </VCol>

      <!-- File Input -->
      <VCol cols="12">
        <VRow no-gutters>
          <VCol cols="12" md="3">
            <label for="fileInput">Proposition</label>
          </VCol>
          <VCol cols="12" md="6">
            <input type="file" id="fileInput" @change="handleFileChange">
          </VCol>
          <VCol cols="12" md="3">
            <!-- choose File -->
          </VCol>
        </VRow>
      </VCol>

      <VCol offset-md="5" cols="12" md="9">
        <VBtn color="primary" @click="saveData">Enregistrer le prospect</VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
