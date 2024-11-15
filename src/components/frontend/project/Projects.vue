<template>
  <section class="py-8 md:py-16 bg-white dark:bg-gray-800">
    <div class="container mx-auto px-4 md:px-6">
      <div class="w-16 h-1 bg-green-600 mb-4"></div>
      <h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-left dark:text-white">PROJETS</h2>
      <p class="text-center mb-6 md:mb-12 text-gray-600 dark:text-gray-300">Les différents projets ADNA</p>
      <p class="text-center mb-6 md:mb-12 text-gray-600 dark:text-gray-300">Cette section met en avant nos initiatives et projets significatifs qui contribuent à notre mission et à notre engagement envers la communauté.</p>
      
      <div class="relative">
        <div class="overflow-hidden">
          <div class="flex transition-transform duration-300 ease-in-out" 
               :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }">
            <div v-for="project in projects" :key="project.id" :class="['flex-shrink-0 px-4', itemWidthClass]">
              <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-green-100 dark:hover:bg-green-900">
                <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer">
                
                <div class="p-4 md:p-6 cursor-pointer hover:bg-green-100 dark:hover:bg-green-900 transition-colors duration-500 ease-in-out">
                  <h3 class="text-lg md:text-xl font-semibold mb-2 text-center">{{ project.title }}</h3>
                  <div class="flex justify-center mb-4">
                    <span v-for="i in 5" :key="i" class="text-yellow-400">★</span>
                  </div>
                  <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">{{ project.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button @click="prevSlide" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button @click="nextSlide" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div class="flex justify-center mt-4">
        <span v-for="(_, index) in slideIndices" :key="index" class="h-2 w-2 mx-1 rounded-full cursor-pointer" 
              :class="currentIndex === index ? 'bg-green-500' : 'bg-gray-300'"
              @click="currentIndex = index"></span>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Projects',
  setup() {
    const projects = ref([
      {
        id: 1,
        title: 'SANTÉ',
        image: '/images/projet/sante.jpg',
        description: 'Santé pour tous'
      },
      {
        id: 2,
        title: 'ÉDUCATIVE',
        image: '/images/projet/education.jpg',
        description: 'Transmission du savoir ancestral'
      },
      {
        id: 3,
        title: 'SOCIAL',
        image: '/images/projet/social.jpg',
        description: 'Marche et riforé'
      },
      {
        id: 4,
        title: 'ÉCONOMIE',
        image: '/images/projet/economie.jpg',
        description: 'Développement économique local'
      },
      {
        id: 5,
        title: 'ENVIRONNEMENT',
        image: '/images/projet/environnement.jpg',
        description: 'Protection des écosystèmes'
      }
    ])

    const currentIndex = ref(0)
    const windowWidth = ref(window.innerWidth)

    const itemsPerPage = computed(() => {
      if (windowWidth.value < 640) return 1
      if (windowWidth.value < 1024) return 2
      return 3
    })

    const itemWidthClass = computed(() => {
      switch (itemsPerPage.value) {
        case 1: return 'w-full'
        case 2: return 'w-1/2'
        case 3: return 'w-1/3'
        default: return 'w-full'
      }
    })

    const slideIndices = computed(() => {
      return Array.from({ length: Math.ceil(projects.value.length / itemsPerPage.value) }, (_, i) => i)
    })

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % slideIndices.value.length
    }

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + slideIndices.value.length) % slideIndices.value.length
    }

    const handleResize = () => {
      windowWidth.value = window.innerWidth
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      projects,
      currentIndex,
      nextSlide,
      prevSlide,
      itemsPerPage,
      itemWidthClass,
      slideIndices
    }
  }
}
</script>