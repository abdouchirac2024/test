import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth'; // Assurez-vous que ce store gère l'authentification
import Home from '../views/frontend/Home.vue';
import Adhere from '../views/frontend/Adhere.vue';
import MemberAccess from '../views/frontend/MemberAccess.vue';
import ClientLayout from '../layouts/ClientLayout.vue';
import Dashboard from '../views/client/dashboard.vue';
import Profile from '../views/client/Profile.vue';
import Messages from '../views/client/Messages.vue';
import Settings from '../views/client/Settings.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Accueil'
    }
  },
  {
    path: '/adhere',
    name: 'Adhere',
    component: Adhere,
    meta: {
      title: 'Adhésion',
     
    }
  },
  {
    path: '/member-access',
    name: 'MemberAccess',
    component: MemberAccess,
    meta: {
      title: 'Accès membre'
    }
  },
  {
    path: '/client',
    component: ClientLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { 
          title: 'Tableau de bord'
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: { 
          title: 'Mon profil'
        }
      },
      {
        path: 'messages',
        name: 'Messages',
        component: Messages,
        meta: { 
          title: 'Messages'
        }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
        meta: { 
          title: 'Paramètres'
        }
      }
    ]
  },
  {
    // Route 404 - Page non trouvée
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/errors/NotFound.vue'),
    meta: {
      title: 'Page non trouvée'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Garde de navigation
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Utilisation du store d'authentification

  // Mise à jour du titre de la page
  document.title = `${to.meta.title || 'ADNA'} - Association NDOGBATJECK`;

  // Vérifiez si la route nécessite une authentification
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Si l'utilisateur n'est pas authentifié, redirigez vers la page d'adhésion
    next({ 
      name: 'Adhere',
      query: { redirect: to.fullPath }
    });
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    // Si l'utilisateur est déjà authentifié et essaie d'accéder à la page d'adhésion, redirigez vers le tableau de bord
    next({ name: 'Dashboard' });
  } else {
    // Autoriser l'accès à la route
    next();
  }
});

// Hook après chaque navigation
router.afterEach((to, from) => {
  // Vous pouvez ajouter ici du code à exécuter après chaque navigation
  // Par exemple : analytics, logs, etc.
});

export default router;
