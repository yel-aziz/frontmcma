<script lang="ts" setup>

import { useRouter } from 'vue-router';

const router = useRouter();

import { reactive } from 'vue';
import Swal from 'sweetalert2';
const formModel = reactive({

  officeName: '',
  Region: '',

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
// const saveData = () => {
//   for (const key in formModel) {
//     if (!formModel[key]) {
//       console.log(`${key} is empty`);
//       showAlert();
//       return;
//     }
//   }
//   showAlert2();
//   console.log('Saving data:', formModel);
//   router.push('/Administration');
// };
import { toRaw } from 'vue';
import axios from 'axios';
// const jwtToken = localStorage.getItem('jwt_token');


const apiClient = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'multipart/form-data',
    // 'Authorization': `${jwtToken}`
  },
});

const saveData = async () => {
  try {
    const rawFormModel = toRaw(formModel);
    console.log(rawFormModel);
    const response = await apiClient.post('/creatOffice', rawFormModel);
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
        <!-- 👉 Horizontal Form -->
        <VCard class="form-card">
          <VCardItem>
            <VCardTitle>Coordonnées du Bureau</VCardTitle>
          </VCardItem>

          <VForm @submit.prevent="() => { }">
            <VRow>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Nom">Nom</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.officeName" placeholder="Nom" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="Ville">Region</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField v-model="formModel.Region" placeholder="Ville" persistent-placeholder />
                  </VCol>
                </VRow>
              </VCol>
              <VCol offset-md="5" cols="12" md="9">
                <VBtn color="primary" @click="saveData">Enregistrer le Bureau</VBtn>
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
  gap: 5px;
  padding: 5px;
}
</style>
