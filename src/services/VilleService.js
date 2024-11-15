import DataService from './DataService';

const VilleService = {
  
  // Récupérer toutes les villes
  getAll() {
    return DataService.get('/api/villes');
  },

  // Récupérer une ville spécifique par son ID
  get(id) {
    return DataService.get(`/api/villes/${id}`);
  },

  // Récupérer les villes d'un pays spécifique par son ID
  getVillesByPays(paysId) {
    return DataService.get(`/api/pays/${paysId}/villes`);
  },

  // Créer une nouvelle ville (authentification requise)
  create(data) {
    return DataService.post('/api/villes', data);
  },

  // Mettre à jour une ville existante par son ID (authentification requise)
  update(id, data) {
    return DataService.put(`/api/villes/${id}`, data);
  },

  // Supprimer une ville par son ID (authentification requise)
  delete(id) {
    return DataService.delete(`/api/villes/${id}`);
  }
};

export default VilleService;
