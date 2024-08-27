<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useLocale } from 'vuetify';

const { t } = useLocale();
const items = [
  {
    title: t('Tableau de bord'),
    props: {
      prependIcon: 'mdi-view-dashboard-outline',
      link: true,
      to: '/',
      exact: true
    },
    value: '/'
  },

  {
    title: t('Calendrier'),
    props: {
      prependIcon: 'mdi-calendar-blank-outline',
      link: true,
      to: '/calendar',
      exact: true
    },
    value: '/calendar'
  },


  {
    title: t('Login In'),
    props: {
      prependIcon: 'mdi-login-variant',
      link: true,
      to: '/auth/login',
      exact: true
    },
    value: '/auth/login'
  },

  {
    title: t('Nouveau Prospect'),
    props: {
      prependIcon: 'mdi-form-textbox',
      link: true,
      to: '/form',
      exact: true,
    },
    value: '/form'
  },
  {
    title: t('Rendez-vous'),
    props: {
      prependIcon: 'mdi-form-textbox',
      link: true,
      to: '/Rendez-vous',
      exact: true,
    },
    value: '/Rendez-vous'
  },
  {
    title: t('Mes Prospect'),
    props: {
      prependIcon: 'mdi-form-textbox',
      link: true,
      to: '/Mes-Prospect',
      exact: true,
    },
    value: '/Mes-Prospect'
  },
  {
    title: t('Liste prospect'),
    props: {
      prependIcon: 'mdi-table',
      link: true,
      to: '/Liste-prospect',
      exact: true
    },
    value: '/Liste-prospect'
  },
  {
    title: t('administration'),
    props: {
      prependIcon: 'mdi-table',
      link: true,
      to: '/Administration',
      exact: true
    },
    value: '/Administration'
  },

  // {
  //   title: t('chart'),
  //   props: {
  //     prependIcon: 'mdi-chart-box-outline',
  //     link: true,
  //     to: '/chart',
  //     exact: true
  //   },
  //   value: '/chart'
  // },
  {
    title: t('Reclamation'),
    props: {
      prependIcon: 'mdi-chart-box-outline',
      link: true,
      to: '/Reclamation',
      exact: true
    },
    value: '/Reclamation'
  }
];

const drawerProps = reactive({
  rail: false,
  railWidth: 256,
  icon: 'mdi-arrow-left'
});

const handleDrawerWidth = () => {
  const rail = drawerProps.rail;
  const railWidth = drawerProps.railWidth;
  drawerProps.rail = !rail;
  drawerProps.railWidth = railWidth == 64 ? 256 : 64;
  drawerProps.icon = drawerProps.railWidth === 256 ? 'mdi-arrow-expand-left  ' : 'mdi-arrow-expand-right';
};

const menus = computed(() => {
  if (drawerProps.railWidth === 256) {
    return items;
  } else {
    return items.filter((item) => {

    });
  }
});
</script>

<template>
  <VNavigationDrawer :rail-width="drawerProps.railWidth" :rail="drawerProps.rail" :border="true" :elevation="1">
    <VToolbar class="px-3" color="transparent">
      <div class="d-flex flex-column align-center justify-center py-4">
            <img src="/src/views/auth/LOGO.PNG" alt="Logo" height="30" />
          </div>
      <VToolbarTitle>Prospect Manager</VToolbarTitle>
    </VToolbar>
    <div class="app-drawer__inner">
      <VList :items="menus" color="primary" class="menu-list" nav :slim="true" />
    </div>
    <VBtn
      class="btn-collapse"
      rounded="lg"
      color="violet"
      size="x-small"
      :icon="drawerProps.icon"
      @click="handleDrawerWidth"
      :style="{ left: drawerProps.railWidth - 12 + 'px' }"
    />
  </VNavigationDrawer>
</template>

<style lang="scss">
.btn-collapse {
  position: absolute;
  inset-block-start: 50%;
  transform: translateY(-50%);
}
.menu-list {
  .v-list-subheader__text {
    text-transform: uppercase;
  }
  .v-list-item__prepend > .v-icon {
    margin-inline-end: 16px;
  }
  .v-list-item-title {
    text-transform: capitalize;
  }
}
</style>
