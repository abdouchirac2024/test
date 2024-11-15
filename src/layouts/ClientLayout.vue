<template>
  <div class="min-h-screen bg-gray-50">
    <Sidebar />
    <div class="md:ml-64 xl:ml-72 min-h-screen">
      <Topbar />
      <main class="p-4 md:p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/admin_backend/client/sidebar/Sidebar.vue';
import Topbar from '../components/admin_backend/client/topbar/Topbar.vue';
</script>