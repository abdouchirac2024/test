<template>
  <div class="profile">
    <h1>Profil de l'utilisateur</h1>
    <div class="profile-info">
      <h2>Informations personnelles</h2>
      <p><strong>Nom :</strong> John Doe</p>
      <p><strong>Email :</strong> john.doe@example.com</p>
      <p><strong>Téléphone :</strong> 012-345-6789</p>
      <p><strong>Adresse :</strong> 123 Rue Exemple, Ville, Pays</p>
    </div>
    <div class="profile-actions">
      <button>Modifier le profil</button>
      <button>Déconnexion</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile'
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.profile-info {
  margin-bottom: 20px;
}

.profile-actions button {
  margin-right: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.profile-actions button:hover {
  background-color: #0056b3;
}
</style>