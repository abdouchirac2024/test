<!-- src/App.vue -->
<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<script>
import Layout from './components/frontend/layout/Layout.vue'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>