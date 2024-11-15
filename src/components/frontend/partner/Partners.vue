<template>
  <section class="py-8 md:py-16 bg-gray-100 dark:bg-gray-800 overflow-hidden">
    <div class="container mx-auto px-4 md:px-6">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-800 dark:text-white">
        Nos Partenaires
      </h2>
      <div class="relative partner-scroll-wrapper">
        <div class="scroll-container">
          <div v-for="n in 2" :key="n" class="flex items-center space-x-6 md:space-x-12 animate-scroll">
            <div 
              v-for="(partner, index) in partners" 
              :key="`${n}-${index}`" 
              class="partner-item"
            >
              <div class="partner-circle">
                <div class="partner-image-wrapper">
                  <img 
                    :src="partner.logo" 
                    :alt="partner.name"
                    class="partner-image"
                    loading="lazy"
                  >
                </div>
              </div>
              <p class="partner-name">{{ partner.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PartnersSection',
  data() {
    return {
      partners: [
        { name: 'Orange', logo: '/images/partenaire/orange.png' },
        { name: 'Canal+', logo: '/images/partenaire/canal.jpeg' },
        { name: 'UBA', logo: '/images/partenaire/uba.png' },
        { name: 'Dangote', logo: '/images/partenaire/dangote.png' },
      ]
    }
  }
}
</script>

<style scoped>
.partner-scroll-wrapper {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
}

.scroll-container {
  width: 200%;
  display: flex;
  overflow: hidden;
}

.partner-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
}

.partner-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.partner-image-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.partner-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.partner-name {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.partner-circle:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.partner-circle:hover + .partner-name {
  opacity: 1;
  transform: translateY(0);
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.scroll-container:hover .animate-scroll {
  animation-play-state: paused;
}

@media (min-width: 768px) {
  .partner-circle {
    width: 150px;
    height: 150px;
  }
  
  .partner-name {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .partner-circle {
    width: 100px;
    height: 100px;
  }
  
  .animate-scroll {
    animation-duration: 20s;
  }
  
  .partner-image-wrapper {
    padding: 15px;
  }
}
</style>