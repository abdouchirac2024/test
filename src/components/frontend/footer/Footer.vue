<template>
  <footer class="bg-gradient-to-b from-green-50 to-green-100 py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row md:justify-between items-center mb-6">
        <!-- Logo & Description -->
        <div class="mb-6 md:mb-0 text-center md:text-left">
          <img 
            :src="logo.src" 
            :alt="logo.alt"
            class="w-20 h-20 mx-auto md:mx-0 object-contain mb-2"
            @error="handleLogoError"
          >
          <p class="text-gray-600 text-sm max-w-xs">{{ description }}</p>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:grid md:grid-cols-3 gap-8">
          <div v-for="(section, index) in sections.slice(0, 3)" :key="index">
            <h3 class="font-semibold text-gray-800 text-sm mb-2">{{ section.title }}</h3>
            <ul class="space-y-1">
              <li v-for="(item, itemIndex) in section.items" :key="itemIndex">
                <a 
                  :href="item.link" 
                  class="text-gray-600 hover:text-green-600 text-sm transition-colors duration-200 flex items-center"
                >
                  <component 
                    v-if="item.icon" 
                    :is="item.icon" 
                    class="w-4 h-4 mr-2"
                  />
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden space-y-3 mb-6">
        <div v-for="(section, index) in sections" :key="index">
          <select 
            class="w-full bg-white bg-opacity-50 border border-green-200 rounded px-3 py-1.5 text-sm"
            @change="handleMobileNavigation"
          >
            <option disabled selected>{{ section.title }}</option>
            <option 
              v-for="(item, itemIndex) in section.items" 
              :key="itemIndex" 
              :value="item.link"
            >
              {{ item.text }}
            </option>
          </select>
        </div>
      </div>

      <!-- Social Icons -->
      <div class="flex justify-center space-x-4 mb-6">
        <a 
          v-for="item in socialLinks" 
          :key="item.text"
          :href="item.link"
          class="text-gray-600 hover:text-green-600 transition-colors duration-200"
        >
          <component :is="item.icon" class="w-5 h-5" />
        </a>
      </div>

      <!-- Copyright -->
      <div class="border-t border-green-200 pt-4">
        <p class="text-center text-gray-600 text-xs">
          &copy; {{ currentYear }} {{ organizationName }}. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from 'vue'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin 
} from 'lucide-vue-next'

export default defineComponent({
  name: 'Footer',
  
  components: {
    Facebook,
    Instagram,
    Twitter,
    Linkedin
  },

  data() {
    return {
      currentYear: new Date().getFullYear(),
      organizationName: 'ADNA NDOG BAJTECK',
      description: 'Une communauté engagée pour le développement.',
      logo: {
        src: '/images/logo/logo-adna.png',
        alt: 'ADNA NDOG BAJTECK Logo',
        fallback: '/images/logo/fallback-logo.png'
      },
      sections: [
        {
          title: 'Navigation',
          items: [
            { text: 'Accueil', link: '/' },
            { text: 'À propos', link: '/about' },
            { text: 'Projets', link: '/projects' }
          ]
        },
        {
          title: 'Contact',
          items: [
            { text: 'contact@adnandog.com', link: 'mailto:contact@adnandog.com' },
            { text: '+123 456 7890', link: 'tel:+123456789' }
          ]
        },
        {
          title: 'Légal',
          items: [
            { text: 'Confidentialité', link: '/privacy' },
            { text: 'Mentions légales', link: '/terms' }
          ]
        }
      ],
      socialLinks: [
        { text: 'Facebook', link: '#', icon: 'Facebook' },
        { text: 'Instagram', link: '#', icon: 'Instagram' },
        { text: 'Twitter', link: '#', icon: 'Twitter' },
        { text: 'LinkedIn', link: '#', icon: 'Linkedin' }
      ]
    }
  },

  methods: {
    handleLogoError() {
      this.logo.src = this.logo.fallback
    },

    handleMobileNavigation(event) {
      const link = event.target.value
      if (link) {
        window.location.href = link
      }
    }
  }
})
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234A5568'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

@media (hover: hover) {
  a {
    position: relative;
  }

  a::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -1px;
    left: 0;
    background-color: #047857;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  a:hover::after {
    transform: scaleX(1);
  }
}
</style>