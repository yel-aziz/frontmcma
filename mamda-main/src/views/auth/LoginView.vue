<template>
  <div class="auth">
    <div class="auth-wrapper">
      <VCard rounded="md" elevation="100" class="login-card" max-width="500">
        <VCardItem class="pa-sm-9">
          <div class="d-flex flex-column align-center justify-center py-4">
            <img src="/src/views/auth/LOGO.PNG" alt="Logo" height="60" />
          </div>
          <div class="text-center mb-3" style="font-size: 24px;">Prospect Manager</div>
          <LoginForm />
        </VCardItem>
      </VCard>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '@/components/forms/LoginForm.vue';
</script>

<style lang="scss">
.auth {
  background-image: url('/Users/macbookpro/Desktop/MAMDA/siege.jpg');
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  overflow: visible;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    width: 9rem;
    height: 9rem;
    position: absolute;
    bottom: -2rem;
    left: -2rem;
    z-index: 0;
  }
}
</style>
