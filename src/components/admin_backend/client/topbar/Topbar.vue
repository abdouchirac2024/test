<template>
  <header
    class="sticky top-0 z-40 w-full transition-shadow duration-300 bg-emerald-600"
    :class="{ 'shadow-lg': scrolled }"
  >
    <div class="px-4 mx-auto">
      <div class="flex items-center justify-between h-16">
        <!-- Left section -->
        <div class="flex items-center">
          <span class="text-xl font-semibold text-white">{{ pageTitle }}</span>
        </div>

        <!-- Right section -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <div class="relative" ref="notificationRef">
            <button
              @click="toggleNotifications"
              class="p-2 text-white rounded-full hover:bg-emerald-700 transition duration-200"
              aria-label="Notifications"
            >
              <i class="text-xl fas fa-bell"></i>
              <span
                v-if="unreadNotifications"
                class="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white transform translate-x-1 -translate-y-1 bg-red-500 rounded-full"
              >{{ unreadNotificationsCount }}</span>
            </button>

            <!-- Notifications Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="showNotifications"
                class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div class="p-2 bg-gray-50 font-medium text-gray-900">
                  Notifications
                </div>
                <div class="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
                    Aucune notification
                  </div>
                  <div
                    v-for="notification in notifications"
                    :key="notification.id"
                    class="p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <p class="font-medium text-gray-900">{{ notification.title }}</p>
                    <p class="mt-1 text-sm text-gray-500">{{ notification.message }}</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- User Menu -->
          <div class="relative" ref="userMenuRef">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-3 focus:outline-none"
            >
              <div class="hidden text-right md:block">
                <p class="text-sm font-medium text-white">
                  {{ user?.nom }} {{ user?.prenom }}
                </p>
                <p class="text-xs text-emerald-100">{{ userRole }}</p>
              </div>
              <img
                :src="userAvatar"
                alt="Profile"
                class="w-10 h-10 rounded-full ring-2 ring-white object-cover"
              />
            </button>

            <!-- User Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <router-link
                  to="/client/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  <i class="fas fa-user mr-2"></i> Mon Profil
                </router-link>
                <router-link
                  to="/client/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="showUserMenu = false"
                >
                  <i class="fas fa-cog mr-2"></i> Paramètres
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                >
                  <i class="fas fa-sign-out-alt mr-2"></i> Déconnexion
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../../../stores/auth';
import { useToast } from 'vue-toastification';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// Refs
const scrolled = ref(false);
const showNotifications = ref(false);
const showUserMenu = ref(false);
const userMenuRef = ref(null);
const notificationRef = ref(null);
const isLoggingOut = ref(false);

// Computed
const user = computed(() => authStore.currentUser);
const pageTitle = computed(() => {
  const route = router.currentRoute.value;
  return route.meta.title || 'Tableau de bord';
});

const userRole = computed(() => {
  const roles = user.value?.roles || [];
  return roles.length > 0 ? roles[0].nom : 'Membre';
});

const userAvatar = computed(() => {
  return user.value?.avatar || '/images/default-avatar.png';
});

// Notifications mock data - à remplacer par vos vraies données
const notifications = ref([]);
const unreadNotifications = computed(() => notifications.value.some(n => !n.read));
const unreadNotificationsCount = computed(() => 
  notifications.value.filter(n => !n.read).length
);

// Handlers
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showUserMenu.value) showUserMenu.value = false;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  if (showNotifications.value) showNotifications.value = false;
};

const handleLogout = async () => {
  if (isLoggingOut.value) return;
  
  try {
    isLoggingOut.value = true;
    await authStore.logout();
    toast.success('Déconnexion réussie');
    router.push('/member-access');
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
    toast.error('Erreur lors de la déconnexion. Veuillez réessayer.');
  } finally {
    isLoggingOut.value = false;
    showUserMenu.value = false;
  }
};

// Click outside handlers
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false;
  }
  if (notificationRef.value && !notificationRef.value.contains(event.target)) {
    showNotifications.value = false;
  }
};

// Scroll handler
const handleScroll = () => {
  scrolled.value = window.pageYOffset > 0;
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>