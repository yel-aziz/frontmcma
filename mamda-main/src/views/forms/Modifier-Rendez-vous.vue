<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { toRaw } from 'vue';
import { reactive, ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

const router = useRouter();

const formModel = ref({
  nomPsp: '',
  cr: '',
  heure: '',
  adresse: '',
  idRDV: '',
  rendevousid: '',
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

const idRDV = ref<string | null>(null); 

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
    if (routeParams && routeParams.idRDV) {
      idRDV.value = typeof routeParams.idRDV === 'string' ? routeParams.idRDV : null;
      const response = await apiClient.get(`/getRendeVoubyid?id=${idRDV.value}`);
      const prospectData = response.data;
      formModel.value = { ...prospectData };
    } else {
      console.warn('Prospect ID is missing or invalid');
    }
  } catch (error) {
    console.error('Error fetching prospect data:', error);
  }
};



onMounted(fetchData);

const saveData = async () => {
  console.log(idRDV.value);
  try {
    if(idRDV.value){
      formModel.value.rendevousid = idRDV.value
      const response = await apiClient.put(`/UpdateRendevous`, formModel.value);
      console.log('Form submitted successfully', response);
      showAlert2();
    }
    else{
      console.log("adfvad");
    }
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
          <VCardItem> <VCardTitle>Informations Du Rendez-Vous</VCardTitle> </VCardItem>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="nomPsp">Sujet</label>
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
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="typeRdv">Commerciale</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.cr"
                      placeholder="Type Rendez-vous"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="adress">Type</label>
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
                    <label for="adress">Date Planifiee</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.heure"
                      placeholder="Adresse"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12">
                <VRow no-gutters>
                  <VCol cols="12" md="3">
                    <label for="adress">Heure</label>
                  </VCol>
                  <VCol cols="12" md="9">
                    <VTextField
                      v-model="formModel.heure"
                      placeholder="Adresse"
                      persistent-placeholder
                    />
                  </VCol>
                </VRow>
              </VCol>
              <!-- <VCol cols="12">
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
              </VCol> -->
              <!-- <VCol cols="12">
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
