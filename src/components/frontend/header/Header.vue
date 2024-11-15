<!-- src/components/frontend/header/Header.vue -->
<template>
  <header class="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
    <div class="container mx-auto px-4 py-2 sm:py-3">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <div class="flex items-center justify-between w-full sm:w-auto">
          <!-- Logo -->
          <router-link to="/" class="flex items-center" @click="closeMobileMenu">
            <div class="logo-container w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
              <img 
                src="/images/logo/logo-adna.png" 
                alt="ADNA logo" 
                class="w-full h-full object-contain"
              >
            </div>
          </router-link>
          <div class="flex items-center space-x-2 sm:hidden">
            <DarkModeToggle />
            <select v-model="currentLanguage" @change="changeLanguage" class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded text-xs">
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
            <button @click="toggleMobileMenu" class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200">
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"/>
                <path v-if="mobileMenuOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Texte défilant -->
        <div class="w-full sm:w-auto mt-2 sm:mt-0">
          <div class="relative overflow-hidden border border-green-800 rounded-lg w-full h-8 sm:h-10 md:h-12 flex items-center">
            <div class="animate-scrolling-text whitespace-nowrap px-4">
              <p class="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-green-800">Bienvenue sur ADNA NDOG BATJEK</p>
            </div>
          </div>
        </div>
        
        <!-- Boutons desktop -->
        <div class="hidden sm:flex items-center space-x-2 md:space-x-4 mt-2 sm:mt-0">
          <router-link 
            to="/adhere" 
            class="bg-yellow-500 text-white font-bold px-3 sm:px-4 md:px-5 py-2 rounded-full hover:bg-yellow-600 flex items-center justify-center h-10 sm:h-12 w-auto text-sm sm:text-base transition-colors duration-200"
          >
            <span>Adhérer</span>
          </router-link>
          <DarkModeToggle />
          <select 
            v-model="currentLanguage" 
            @change="changeLanguage" 
            class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-2 sm:px-3 py-2 rounded text-sm sm:text-base transition-colors duration-200"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
          <div class="relative hidden md:block">
            <input 
              type="search" 
              placeholder="Search..." 
              class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-3 sm:px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 text-sm sm:text-base transition-all duration-200"
            >
            <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-white hover:text-green-800 transition-colors duration-200">
              <MagnifyingGlassIcon class="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Navigation desktop avec position fixed pour Accès membre -->
    <nav class="hidden sm:block bg-green-800 py-2 relative">
      <div class="container mx-auto flex justify-between items-center px-4">
        <div class="flex justify-center space-x-4 md:space-x-9 mx-auto">
          <div v-for="item in menuItems" :key="item.name" class="relative group">
            <router-link 
              :to="item.href" 
              class="text-white hover:text-yellow-300 cursor-pointer transition-colors duration-200"
            >
              <div class="flex flex-col items-center">
                <div class="rounded-full bg-white p-2 sm:p-3 mb-1 transition-all duration-200 group-hover:bg-yellow-300">
                  <component 
                    :is="item.icon" 
                    class="h-5 w-5 sm:h-6 sm:w-6 text-green-800 group-hover:text-white transition-colors duration-200" 
                  />
                </div>
                <span class="text-sm sm:text-base">{{ item.name }}</span>
              </div>
            </router-link>
          </div>
        </div>
        <!-- Bouton Accès membre fixe -->
        <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
          <button
            @click="showConditions = true"
            class="bg-yellow-500 text-white font-bold px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-200 shadow-lg flex items-center space-x-2"
          >
            <span class="text-sm sm:text-base">Accès membre</span>
          </button>
        </div>
      </div>
    </nav>
    
    <!-- Menu mobile -->
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150 transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="mobileMenuOpen" class="sm:hidden bg-green-800">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <div v-for="item in menuItems" :key="item.name">
            <router-link 
              :to="item.href" 
              @click="closeMobileMenu"
              class="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-white transition-colors duration-200"
            >
              {{ item.name }}
            </router-link>
          </div>
          <router-link 
            to="/adhere" 
            @click="closeMobileMenu"
            class="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-white transition-colors duration-200"
          >
            Adhérer
          </router-link>
          <button
            @click="openMemberAccess"
            class="w-full text-left text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 hover:text-white transition-colors duration-200"
          >
            Accès membre
          </button>
        </div>
      </div>
    </transition>

    <!-- Modal des conditions -->
    <Membre 
      v-if="showConditions" 
      @close="showConditions = false" 
      @accept="handleAccept" 
    />
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Membre from '../condition/Membre.vue';
import DarkModeToggle from '../../DarkModeToggle.vue';
import { MagnifyingGlassIcon, HomeIcon, UserGroupIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const menuItems = [
  { name: 'Accueil', href: '/', icon: HomeIcon },
  { name: 'Organigramme', href: '/organigramme', icon: UserGroupIcon }
];

const mobileMenuOpen = ref(false);
const currentLanguage = ref('fr');
const showConditions = ref(false);

function handleAccept() {
  showConditions.value = false;
  router.push('/member-access');
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMobileMenu() {
  mobileMenuOpen.value = false;
}

function openMemberAccess() {
  closeMobileMenu();
  showConditions.value = true;
}

function changeLanguage() {
  // Implémentation du changement de langue
  console.log('Langue changée pour:', currentLanguage.value);
}

// Fermer le menu mobile lors du changement de route
router.afterEach(() => {
  closeMobileMenu();
});
</script>

<style scoped>
.animate-scrolling-text {
  animation: scroll-text 20s linear infinite;
}

@keyframes scroll-text {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

@media (min-width: 640px) {
  .animate-scrolling-text {
    animation: scroll-text 25s linear infinite;
  }
}

@media (min-width: 768px) {
  .animate-scrolling-text {
    animation: scroll-text 30s linear infinite;
  }
}

/* Accessibilité focus */
a:focus, button:focus, select:focus, input:focus {
  outline: 2px solid #166534;
  outline-offset: 2px;
}

/* Optimisation performance */
@media (prefers-reduced-motion: reduce) {
  .animate-scrolling-text {
    animation: none;
  }
}
</style>