<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { toRaw } from 'vue';
import { reactive, ref } from 'vue';
import Swal from 'sweetalert2';

const router = useRouter();

const formModel = reactive({
  nomPsp: '',
  // typeRdv: '',
  // adresse: '',
  // dateRdv: '',
  // heure: ''
});

const menu = ref(false);

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

import axios from 'axios';
const jwtToken = localStorage.getItem('jwt_token');


const apiClient = axios.create({
  baseURL: 'http://localhost:8082', 
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `${jwtToken}`
  },
});


const saveData = async () => {
  try {
    const rawFormModel = toRaw(formModel);
    console.log(rawFormModel);
    const response = await apiClient.post('/createrendezvous' , rawFormModel);
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
          <VCardItem> <VCardTitle>Informations Du Rendez-Vous</VCardTitle> </VCardItem>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="nomPsp">nomPsp</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.nomPsp"
                      placeholder="nomPsp"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <!-- <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="typeRdv">Type Rendez-vous</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.typeRdv"
                      placeholder="Type Rendez-vous"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="adress">Adresse</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.adresse"
                      placeholder="Adresse"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="dateRdv">Date</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VMenu
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                    <template v-slot:activator="{ props }">
                        <VTextField
                          v-model="formModel.dateRdv"
                          label="Date"
                          readonly
                          v-bind="props"
                        />
                      </template>
                      <VDatePicker
                        v-model="formModel.dateRdv"
                        no-title
                        scrollable
                      />
                    </VMenu>
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="timeRdv">Heure</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <input
                      type="time"
                      v-model="formModel.heure"
                      placeholder="Heure"
                      class="v-input__control"
                    />
                  </VCol>
                </VRow>
              </VCol> -->
              <VCol offset-md="5" cols="12" md="9">
                <VBtn color="primary" @click="saveData">Enregistrer le Rendez-vous</VBtn>
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
