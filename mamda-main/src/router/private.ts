const PrivateRoutes = {
  path: '/',
  name: 'Home',
  meta: {
    requiresAuth: true
  },
  redirect: '/main',
  component: () => import('@/layouts/DefaultLayout.vue'),
  children: [
    {
      name: 'Tableau de bord',
      path: '/',
      component: () => import('@/views/dashboard/IndexView.vue')
    },
    {
      name: 'Nouveau-Prospect',
      path: '/form',
      component: () => import('@/views/forms/FormView.vue')
    },
    {
      name: 'Liste prospect',
      path: '/Liste-prospect',
      component: () => import('@/views/tables/TableView.vue')
    },
    {
      name: 'Edit Prospect',
      path: '/Modifier-Prospect/:prospectId',
      component: () => import('@/views/forms/FormView2.vue')
    },
    {
      name: 'Ajouter Bureau',
      path: '/Ajouter-Bureau',
      component: () => import('@/views/forms/Addbureau.vue')
    },
    {
      name: 'Ajouter Utilisateur',
      path: '/Ajouter-Utilisateur',
      component: () => import('@/views/forms/AddUtlisateur.vue')
    },
    {
      name: 'Rendez Vous',
      path: '/Rendez-vous',
      component: () => import('@/views/tables/TableView2.vue')
    },
    {
      name: 'Mes Prospect',
      path: '/Mes-Prospect',
      component: () => import('@/views/tables/TableView3.vue')
    },
    {
      name: 'Administration',
      path: '/Administration',
      component: () => import('@/views/tables/administrations.vue')
    },
    {
      name: 'UpdateUser',
      path: '/UpdateUser/:id',
      component: () => import('@/components/dashboard/UpdateUser.vue')
    },

    {
      name: 'Calendar',
      path: '/calendar',
      component: () => import('@/views/apps/CalendarView.vue')
    },
    {
      name: 'CalendarForm',
      path: '/RDV',
      component: () => import('@/views/apps/Formrdv.vue')
    },
    {
      name: 'Mot de Passe',
      path: '/Mot-de-Passe',
      component: () => import('@/views/profile/ProfileView.vue')
    },
    {
      name: 'Reclamation',
      path: '/Reclamation',
      component: () => import('@/views/forms/Reclamation.vue')
    }
  ]
};

export default PrivateRoutes;
