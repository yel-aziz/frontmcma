<script  lang="ts" setup>
 
import { reactive } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';
const { t } = useLocale();

const router = useRouter();
const formModel = reactive({
  MotDEPasse: '',
  NewMotdepasse: '',

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
const saveData = () => {
  for (const key in formModel) {
    if (!formModel[key]) {
      console.log(`${key} is empty`);
      showAlert();
      return;
    }
  }
  showAlert2();
  console.log('Saving data:', formModel);
  console.table(formModel);


};

</script>

<template>
  <div class="distance">
    <VRow>
      <VCol>
        <VCard class="form-card">
          <VCardItem> <VCardTitle>Changer Mot De Passe</VCardTitle> </VCardItem>
          <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <VCol cols="12" md="3">
            <label for="Mot De Passe actuel">Mot De Passe actuel</label>
          </VCol>
          <VCol cols="12" md="9">
            <VTextField
                v-model="formModel.MotDEPasse"
                label="Mot De Passe actuel"
            >             
          </VTextField>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12">
        <VRow no-gutters>
          <VCol cols="12" md="3">
            <label for="Nouveau Mot De Passe">Nouveau Mot De Passe</label>
          </VCol>
          <VCol cols="12" md="9">
            <VTextField
                v-model="formModel.NewMotdepasse"
                label="Nouveau Mot De Passe"
            >             
          </VTextField>
          </VCol>
        </VRow>
      </VCol>

      <VCol offset-md="5" cols="12" md="9">
        <VBtn color="primary" @click="saveData">Enregistrer le Mot De Passe</VBtn>
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
.distance {
  padding-bottom: 2%;
}
</style>




