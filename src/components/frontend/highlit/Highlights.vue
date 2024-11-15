<template>
  <section class="py-8 md:py-16 bg-white dark:bg-gray-800">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-col mb-6 md:mb-8">
        <div class="w-16 h-1 bg-green-600 mb-4"></div>
        <h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-left dark:text-white reveal-text">
          Nos temps forts
        </h2>
      </div>
      
      <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <div class="image-container w-full md:w-2/3 h-64 md:h-96 overflow-hidden relative">
            <img src="/images/highlit/medium.jpg" alt="Un diner après un meeting" class="image w-full h-full object-cover transition-transform duration-500">
          </div>
          <div class="p-4 md:p-6 md:w-1/2 flex flex-col justify-center">
            <h3 class="text-lg md:text-xl font-semibold mb-2 dark:text-white reveal-text">UN DINER APRÈS UN MEETING</h3>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 reveal-text">
              Découvrez les moments qui ont résonné dans notre association, des jalons qui ont forgé notre avenir.
            </p>
            <div class="flex justify-center mt-4">
              <button class="bg-yellow-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-full text-sm hover:bg-yellow-600 transition-colors duration-300 transform hover:scale-105 w-[120px]">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'

export default {
  name: 'Highlights',
  setup() {
    const revealOnScroll = () => {
      const revealTextElements = document.querySelectorAll('.reveal-text');
      revealTextElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const viewHeight = window.innerHeight;
        if (elementPosition < viewHeight - 50) {
          element.classList.add('visible');
        }
      });
    };

    onMounted(() => {
      window.addEventListener('scroll', revealOnScroll);
      revealOnScroll();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', revealOnScroll);
    });

    return {}
  }
}
</script>

<style scoped>
.reveal-text {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s, transform 0.5s;
}

.reveal-text.visible {
  opacity: 1;
  transform: translateY(0);
}

.image-container:hover .image {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .image-container:hover .image {
    transform: scale(1.05);
  }
}
</style>