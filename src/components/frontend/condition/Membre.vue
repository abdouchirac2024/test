<!-- src/components/frontend/condition/Membre.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <h2 class="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Conditions d'adhésion à ADNA NDOG BATJEK</h2>
      
      <div class="prose prose-sm sm:prose max-w-none mb-4 sm:mb-6">
        <h3 class="font-bold text-lg sm:text-xl mb-3 sm:mb-4">Article 2 : Qualité de membre et adhésion</h3>
        
        <p class="mb-3 sm:mb-4 text-sm sm:text-base">
          (1) Toutes les personnes de père et/ou de mère Ndog Batjeck, y compris leur descendance, sont de droit membres de l'association ADNA NDOG BATJEK. Toutefois, pour une adhésion formelle les membres d'une même localité doivent être regroupés en un seul démembrement sous la dénomination de Secteur.
        </p>

        <p class="mb-3 sm:mb-4 text-sm sm:text-base">
          (2) Les Secteurs rassemblent, en fonction de leur nombre, les membres de ADNA NDOG BATJEK d'une même localité ou d'une même région qui acceptent :
        </p>

        <ul class="list-disc pl-6 sm:pl-8 mb-3 sm:mb-4 text-sm sm:text-base">
          <li>de se conformer aux dispositions des Statuts et du présent Règlement Intérieur</li>
          <li>de s'acquitter de leurs droits d'adhésion et de diverses obligations</li>
        </ul>

        <p class="mb-3 sm:mb-4 text-sm sm:text-base">
          (3) L'inscription est annuelle et volontaire. Les membres sont tenus, chacun en ce qui le concerne, de participer à toutes les assises de l'Association, de verser les cotisations exigées et de contribuer à la réalisation des objectifs fixés.
        </p>

        <p class="mb-3 sm:mb-4 text-sm sm:text-base">
          (4) Les frais d'inscription annuelle sont fixés à 5000 Fcfa (cinq mille francs cfa) par membre.
        </p>
      </div>

      <div class="flex items-center mb-3 sm:mb-4">
        <input 
          type="checkbox" 
          id="acceptConditions" 
          v-model="acceptConditions"
          @change="onCheckboxChange('accept')"
          :disabled="rejectConditions"
          class="mr-2 h-4 w-4"
        >
        <label for="acceptConditions" class="text-sm sm:text-base">J'accepte les conditions d'adhésion</label>
      </div>

      <div class="flex items-center mb-4 sm:mb-6">
        <input 
          type="checkbox" 
          id="rejectConditions" 
          v-model="rejectConditions"
          @change="onCheckboxChange('reject')"
          :disabled="acceptConditions"
          class="mr-2 h-4 w-4"
        >
        <label for="rejectConditions" class="text-sm sm:text-base">Je n'accepte pas</label>
      </div>

      <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
        <button 
          v-if="rejectConditions"
          @click="reject" 
          class="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 ease-in-out text-sm sm:text-base"
        >
          Je n'accepte pas
        </button>
        <button 
          v-if="acceptConditions && !rejectConditions"
          @click="accept" 
          class="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 ease-in-out text-sm sm:text-base"
        >
          J'accepte les conditions
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const acceptConditions = ref(false);
const rejectConditions = ref(false);

const emit = defineEmits(['close', 'accept']);

function onCheckboxChange(type) {
  if (type === 'accept') {
    rejectConditions.value = false;
  } else if (type === 'reject') {
    acceptConditions.value = false;
  }
}

function accept() {
  emit('accept');
  router.push('/member-access');
}

function reject() {
  router.push('/');
  emit('close');
}
</script>

<style scoped>
.prose {
  color: #374151;
  line-height: 1.6;
}
.prose h2 {
  color: #111827;
  margin-top: 2em;
  margin-bottom: 1em;
}
.prose h3 {
  color: #1f2937;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
}
.prose p, .prose ul, .prose li {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
button {
  transition: all 0.2s ease-in-out;
}
button:hover {
  transform: translateY(-1px);
}
.max-h-[90vh] {
  max-height: 90vh;
}
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #F3F4F6;
}
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: #F3F4F6;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 4px;
}
</style>