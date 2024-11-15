<template>
  <section class="relative h-screen text-white overflow-hidden">
    <div class="absolute inset-0">
      <transition-group name="fade" tag="div">
        <div v-for="(image, index) in images" :key="image" v-show="currentIndex === index" class="absolute inset-0">
          <img :src="image" :alt="`ADNA NDOG BATJECK ${index + 1}`" class="w-full h-full object-cover object-center">
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      </transition-group>
    </div>
    <div class="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10">
      <h2 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
        Bienvenue chez
        <span class="text-green-500">{{ currentText }}</span>
        <span class="animate-blink">|</span>
      </h2>
      <button class="bg-yellow-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300 mt-6">
        Rejoignez-nous
      </button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Hero',
  setup() {
    const images = ref([
      '/images/hero/home.jpg',
      '/images/hero/homea.jpg',
      '/images/hero/homeb.jpg',
      '/images/hero/homec.jpg'
    ])
    const currentIndex = ref(0)
    const texts = ref([' ADNA NDOG BATJECK', ' Famille', ' ADNA NDOG BATJECK'])
    const currentText = ref('')
    const currentTextIndex = ref(0)
    const isDeleting = ref(false)
    let imageTimer = null
    let textTimer = null

    const startSlideshow = () => {
      imageTimer = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % images.value.length
      }, 5000)
    }

    const typeText = () => {
      const currentWord = texts.value[currentTextIndex.value]
      const typingSpeed = 100
      const deletingSpeed = 50
      const pauseBeforeDelete = 2000

      if (!isDeleting.value && currentText.value === currentWord) {
        textTimer = setTimeout(() => {
          isDeleting.value = true
          typeText()
        }, pauseBeforeDelete)
      } else if (isDeleting.value && currentText.value === '') {
        isDeleting.value = false
        currentTextIndex.value = (currentTextIndex.value + 1) % texts.value.length
        typeText()
      } else {
        currentText.value = currentWord.substring(0, isDeleting.value ? currentText.value.length - 1 : currentText.value.length + 1)
        textTimer = setTimeout(typeText, isDeleting.value ? deletingSpeed : typingSpeed)
      }
    }

    onMounted(() => {
      startSlideshow()
      typeText()
    })

    onUnmounted(() => {
      clearInterval(imageTimer)
      clearTimeout(textTimer)
    })

    return {
      images,
      currentIndex,
      currentText
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 0.7s infinite;
}
</style>