<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useRoute, useRouter } from 'vue-router';
import { useLocale } from 'vuetify';
import { useSnackbarStore } from '@/store';

const { t } = useLocale();
const checkbox = ref(true);
const formRules = reactive({
  login: [
    (value: string) => {
      if (value) return true;
      return t('login required');
    }
  ],
  password: [
    (value: string) => {
      if (value) return true;
      return t('password required');
    }
  ]
});
const formModel = reactive({
  login: '',
  password: '',
  test: ''
});

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const snackbarStore = useSnackbarStore();
const submiting = ref(false);

const formValid = ref(false);
import axios from 'axios';


const apiClient = axios.create({
  baseURL: 'http://localhost:8082', 
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const handleSubmit = async () => {
  if (formValid.value === true) {
    try {
      const responses = await apiClient.post('/login', formModel);
      console.log('Login response:', responses.data);

      if (responses.status === 200)
      {
        router.push('/form');
      }
      else { 
        console.log('Condition not met:', responses.data);
        snackbarStore.showMessage('Auth Failed');
        
      }
    const token = responses.data;
    localStorage.setItem('jwt_token', token);
    } catch (error) {
      submiting.value = false;
      snackbarStore.showMessage('Auth Failed');
      console.error('Login error:', error);
    } finally {
      submiting.value = false;
    }
  }
};
</script>

<template>
        <VCol cols="12" class="pt-0">
          
        </VCol>
  <VForm v-model="formValid" @submit.prevent>
    <VRow class="d-flex mb-3">
      <VCol cols="12">
        <VLabel class="mb-1">{{ $t('Login') }}</VLabel>
        <VTextField
          variant="outlined"
          color="primary"
          name="login"
          :rules="formRules.login"
          v-model="formModel.login"
        />
      </VCol>
      <VCol cols="12">
        <VLabel class="mb-1">{{ $t('Mot De Passe') }}</VLabel>
        <VTextField
          variant="outlined"
          type="password"
          color="primary"
          :rules="formRules.password"
          v-model="formModel.password"
        />
      </VCol>
        <div class="d-flex flex-wrap align-center ml-n2">
          <div class="ml-sm-auto">
            <RouterLink to="/" class="text-primary text-decoration-none">{{ $t('') }} ?</RouterLink>
          </div>
        </div>
      <VCol cols="12" class="pt-0">
        <VBtn :loading="submiting" type="submit" color="primary" block flat @click="handleSubmit">{{
          $t('sign_in')
        }}</VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
