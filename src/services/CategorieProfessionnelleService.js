import DataService from './DataService';

const CategorieProfessionnelleService = {
  
  // Récupérer toutes les catégories professionnelles
  getAll() {
    return DataService.get('/api/categories-professionnelles');
  },

  // Récupérer une catégorie professionnelle spécifique par son ID
  get(id) {
    return DataService.get(`/api/categories-professionnelles/${id}`);
  },

  // Créer une nouvelle catégorie professionnelle (authentification requise)
  create(data) {
    return DataService.post('/api/categories-professionnelles', data);
  },

  // Mettre à jour une catégorie professionnelle existante par son ID (authentification requise)
  update(id, data) {
    return DataService.put(`/api/categories-professionnelles/${id}`, data);
  },

  // Supprimer une catégorie professionnelle par son ID (authentification requise)
  delete(id) {
    return DataService.delete(`/api/categories-professionnelles/${id}`);
  }
};

export default CategorieProfessionnelleService;
