<template>
  <section class="py-8 md:py-16 bg-green-600 text-white">
    <div class="container mx-auto px-4 md:px-6">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center"> Commentaires ADNA</h2>
      <form @submit.prevent="submitComment" class="max-w-lg mx-auto">
        <div class="mb-4">
          <input v-model="name" type="text" placeholder="Votre nom" class="w-full px-4 py-2 rounded-md text-gray-800" required>
        </div>
        <div class="mb-4">
          <textarea v-model="comment" placeholder="Écrivez un commentaire" class="w-full px-4 py-2 rounded-md text-gray-800" rows="4" required></textarea>
        </div>
        <button type="submit" class="bg-yellow-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-full text-sm md:text-base hover:bg-yellow-600 transition duration-300">
          Envoyer
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CommentSection',
  data() {
    return {
      name: '',
      comment: ''
    }
  },
  methods: {
    submitComment() {
      // Ici, vous pouvez ajouter la logique pour envoyer le commentaire à votre backend
      console.log('Commentaire soumis:', { name: this.name, comment: this.comment })
      // Réinitialiser les champs après soumission
      this.name = ''
      this.comment = ''
    }
  }
}
</script>