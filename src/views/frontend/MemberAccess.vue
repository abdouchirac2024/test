<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8">
        <!-- Left Section -->
        <div class="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center text-center">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Je Suis NDOGBATJECK,
          </h2>
          <p class="text-lg text-gray-600 mb-6">
            Je souhaite adhérer à l'ASSOCATION ADNA NDOGBATJECK
          </p>
          <router-link 
            to="/adhere"
            class="bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition-colors duration-200 shadow-lg"
          >
            J'adhère
          </router-link>
        </div>

        <!-- Middle Section - Slideshow Images -->
        <div class="bg-white rounded-lg shadow-md p-6 flex items-center justify-center relative overflow-hidden">
          <transition-group
            name="fade"
            tag="div"
            class="relative w-full h-full"
          >
            <img
              v-for="(image, index) in images"
              :key="image"
              v-show="currentImageIndex === index"
              :src="image"
              :alt="`Image ${index + 1}`"
              class="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            />
          </transition-group>
        </div>

        <!-- Right Section - Login Form -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-800 text-center mb-2">
              Je Suis membre de
            </h2>
            <h3 class="text-lg font-semibold text-gray-700 text-center">
              l'ASSOCATION ADNA NDOGBATJECK
            </h3>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-4">
              <div>
                <input 
                  v-model="formData.email" 
                  type="email" 
                  placeholder="Email:"
                  class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div class="relative">
                <input 
                  v-model="formData.mot_de_passe" 
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="Password:"
                  class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent pr-10"
                  required
                />
                <button 
                  type="button"
                  @click="togglePassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg 
                    v-if="showPassword"
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 text-gray-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <svg 
                    v-else
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 text-gray-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input 
                    v-model="rememberMe"
                    type="checkbox" 
                    id="remember" 
                    class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label for="remember" class="ml-2 text-sm text-gray-600">
                    Se souvenir de moi
                  </label>
                </div>
                <a href="#" class="text-blue-600 text-sm hover:underline">
                  Mot de passe oublié?
                </a>
              </div>

              <button 
                type="submit"
                class="w-full bg-green-700 text-white py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition-colors duration-200 shadow-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Partners />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useToast } from 'vue-toastification';
import Partners from '../../components/frontend/partner/Partners.vue';

export default {
  name: 'MemberAccess',

  components: {
    Partners,
  },
  
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const toast = useToast();
    const showPassword = ref(false);
    const rememberMe = ref(false);
    const currentImageIndex = ref(0);
    const slideshowInterval = ref(null);
    
    const images = [
      '/images/login/adhere.jpg',
      '/images/login/adhere1.jpg',
      '/images/login/adhere2.jpg',
      '/images/login/adhere3.jpg',
      '/images/login/adhere4.jpg',
      '/images/login/adhere5.jpg',
      '/images/login/adhere6.jpg'
    ];

    const startSlideshow = () => {
      slideshowInterval.value = setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
      }, 5000);
    };

    onMounted(() => {
      startSlideshow();
    });

    onBeforeUnmount(() => {
      if (slideshowInterval.value) {
        clearInterval(slideshowInterval.value);
      }
    });

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleLogin = async () => {
      try {
        await authStore.login({
          ...formData.value,
          remember: rememberMe.value
        });
        toast.success('Connexion réussie !');
        router.push('/client/dashboard');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Erreur lors de la connexion');
      }
    };

    const formData = ref({
      email: '',
      mot_de_passe: ''
    });

    return {
      formData,
      handleLogin,
      showPassword,
      togglePassword,
      rememberMe,
      images,
      currentImageIndex
    };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Focus styles for better accessibility */
button:focus, 
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.5);
}

/* Responsive styles */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Ensure images maintain aspect ratio */
img {
  aspect-ratio: 16/9;
}
</style>