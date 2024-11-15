<template>
  <div class="min-h-screen flex flex-col">
    <Header v-if="!isAdminRoute" />
    <main class="flex-grow">
      <slot></slot>
    </main>
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../header/Header.vue'
import Footer from '../footer/Footer.vue'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer
  },
  setup() {
    const route = useRoute()
    
    const isAdminRoute = computed(() => {
      return route.path.startsWith('/client')
    })

    return {
      isAdminRoute
    }
  }
}
</script>