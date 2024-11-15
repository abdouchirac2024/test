<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-2xl font-bold text-blue-600">Admin</span>
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex items-center gap-4">
              <span class="text-gray-700">{{ user?.utilisateur?.nom }} {{ user?.utilisateur?.prenom }}</span>
              <button 
                @click="handleLogout"
                class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Profile Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Profil
              </h3>
              <div class="mt-5">
                <dl class="grid grid-cols-1 gap-5">
                  <div class="px-4 py-2">
                    <dt class="text-sm font-medium text-gray-500">Email</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user?.utilisateur?.email }}</dd>
                  </div>
                  <div class="px-4 py-2">
                    <dt class="text-sm font-medium text-gray-500">Téléphone</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user?.utilisateur?.telephone }}</dd>
                  </div>
                  <div class="px-4 py-2">
                    <dt class="text-sm font-medium text-gray-500">Profession</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user?.profession }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <!-- Additional Information Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Informations additionnelles
              </h3>
              <div class="mt-5">
                <dl class="grid grid-cols-1 gap-5">
                  <div class="px-4 py-2">
                    <dt class="text-sm font-medium text-gray-500">Village</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user?.village }}</dd>
                  </div>
                  <div class="px-4 py-2">
                    <dt class="text-sm font-medium text-gray-500">Famille</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user?.famille }}</dd>
                  </div>
                  <div class="px-4 py-2">
                    <dt class="text-sm font-medium text-gray-500">Sous-famille</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user?.sous_famille }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <!-- Stats Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Statistiques
              </h3>
              <div class="mt-5">
                <dl class="grid grid-cols-1 gap-5">
                  <div class="px-4 py-2">
                    <dt class="text-sm font-medium text-gray-500">Niveau d'étude</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user?.niveau_etude }}</dd>
                  </div>
                  <div class="px-4 py-2">
                    <dt class="text-sm font-medium text-gray-500">Domaine de compétence</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user?.domaine_competence }}</dd>
                  </div>
                  <div class="px-4 py-2">
                    <dt class="text-sm font-medium text-gray-500">Niveau de responsabilité</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ user?.niveau_responsabilite }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useToast } from 'vue-toastification';

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const toast = useToast();

    const user = computed(() => authStore.currentUser);

    const handleLogout = async () => {
      try {
        await authStore.logout();
        toast.success('Déconnexion réussie !');
        router.push('/adhere');
      } catch (error) {
        toast.error('Erreur lors de la déconnexion');
      }
    };

    return {
      user,
      handleLogout
    };
  }
};
</script>