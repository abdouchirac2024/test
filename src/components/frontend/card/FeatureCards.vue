<template>
  <section class="py-8 md:py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-4 md:px-6">
      <!-- Ligne verte en haut -->
      <div class="w-16 h-1 bg-green-800 mb-4"></div>

      <!-- Titre de la section -->
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        PRÉSENTATION DE L'ASSOCIATION
      </h2>

      <!-- Carrousel pour mobile -->
      <div v-if="isMobile" class="relative">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-300 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="w-full flex-shrink-0 px-2"
            >
              <div class="bg-green-700 border-2 border-green-600 rounded-xl p-4 md:p-6 flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="flex-grow flex flex-col items-center">
                  <img
                    :src="feature.icon"
                    :alt="feature.title"
                    class="w-12 h-12 md:w-16 md:h-16 mb-4 transition-transform duration-500"
                  />
                  <h3 class="text-base md:text-lg font-semibold text-center text-white mb-2">
                    {{ feature.title }}
                  </h3>
                  <p class="text-sm text-gray-100 text-center leading-relaxed">
                    {{ feature.description }}
                  </p>
                </div>
                <div class="mt-4 text-center">
                  <button
                    class="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-medium border-2 border-transparent hover:border-white hover:bg-green-700 hover:text-white transition-all duration-300"
                    aria-label="En savoir plus sur {{ feature.title }}"
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Boutons de navigation améliorés -->
        <button
          @click="prevSlide"
          class="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-green-700 border-2 border-green-700 hover:bg-green-700 hover:text-white transition-colors duration-300"
          aria-label="Slide précédent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          @click="nextSlide"
          class="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-green-700 border-2 border-green-700 hover:bg-green-700 hover:text-white transition-colors duration-300"
          aria-label="Slide suivant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Points de pagination mobile améliorés -->
        <div class="flex justify-center mt-6 gap-2">
          <button
            v-for="(feature, index) in features"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
            :class="[
              index === currentIndex ? 'bg-green-700' : 'bg-green-200 hover:bg-green-300',
            ]"
            :aria-label="`Aller au slide ${index + 1}`"
          ></button>
        </div>
      </div>

      <!-- Grille pour desktop avec pagination -->
      <div v-else class="flex flex-col items-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div
            v-for="(feature, index) in visibleFeatures"
            :key="index"
            class="bg-green-800 border-2 border-green-600 rounded-xl p-4 md:p-6 flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="flex-grow flex flex-col items-center">
              <img
                :src="feature.icon"
                :alt="feature.title"
                class="w-12 h-12 md:w-16 md:h-16 mb-4 transition-transform duration-500 feature-icon"
              />
              <h3 class="text-base md:text-lg font-semibold text-center text-white mb-2">
                {{ feature.title }}
              </h3>
              <p class="text-sm text-gray-100 text-center leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
            <div class="mt-4 text-center">
              <button
                class="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-medium border-2 border-transparent hover:border-white hover:bg-green-700 hover:text-white transition-all duration-300"
                aria-label="En savoir plus sur {{ feature.title }}"
              >
                En savoir plus
              </button>
            </div>
          </div>
        </div>

        <!-- Points de pagination desktop améliorés -->
        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="(group, index) in Math.ceil(features.length / itemsPerPage)"
            :key="index"
            @click="goToPage(index)"
            class="w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
            :class="[
              index === currentPage ? 'bg-green-700' : 'bg-green-200 hover:bg-green-300',
            ]"
            :aria-label="`Aller à la page ${index + 1}`"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'FeatureCards',
  setup() {
    const features = [
      { 
        title: "Vision", 
        icon: "/images/card/vision-icon.svg",
        description: "Notre vision pour l'avenir de la communauté"
      },
      { 
        title: "Objectifs", 
        icon: "/images/card/objectives-icon.svg",
        description: "Les buts que nous nous efforçons d'atteindre"
      },
      { 
        title: "Organigramme", 
        icon: "/images/card/organigram-icon.svg",
        description: "La structure de notre organisation"
      },
      { 
        title: "Secteurs", 
        icon: "/images/card/sectors-icon.svg",
        description: "Les domaines dans lesquels nous opérons"
      },
    ];

    // État réactif
    const isMobile = ref(false);
    const currentIndex = ref(0);
    const currentPage = ref(0);
    const itemsPerPage = 4;

    // Computed properties
    const visibleFeatures = computed(() => {
      const start = currentPage.value * itemsPerPage;
      return features.slice(start, start + itemsPerPage);
    });

    // Méthodes de navigation
    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % features.length;
    };

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + features.length) % features.length;
    };

    const goToSlide = (index) => {
      currentIndex.value = index;
    };

    const goToPage = (page) => {
      currentPage.value = page;
    };

    // Gestion du responsive
    const handleResize = () => {
      isMobile.value = window.innerWidth < 640;
    };

    onMounted(() => {
      handleResize(); // Initial check
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      features,
      visibleFeatures,
      isMobile,
      currentIndex,
      currentPage,
      itemsPerPage,
      nextSlide,
      prevSlide,
      goToSlide,
      goToPage,
    };
  },
};
</script>

<style scoped>
.feature-icon {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

/* Animation de rebond améliorée */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.05);
  }
}

.feature-icon:hover {
  animation: bounce 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
</style>