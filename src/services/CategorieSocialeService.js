// src/services/CategorieSocialeService.js
import DataService from './DataService';

const CategorieSocialeService = {
  
  // Récupérer toutes les catégories sociales
  getAll() {
    return DataService.get('/api/categories-sociales');
  },

  // Récupérer une catégorie sociale spécifique par son ID
  get(id) {
    return DataService.get(`/api/categories-sociales/${id}`);
  },

  // Créer une nouvelle catégorie sociale (authentification requise)
  create(data) {
    return DataService.post('/api/categories-sociales', data);
  },

  // Mettre à jour une catégorie sociale existante par son ID (authentification requise)
  update(id, data) {
    return DataService.put(`/api/categories-sociales/${id}`, data);
  },

  // Supprimer une catégorie sociale par son ID (authentification requise)
  delete(id) {
    return DataService.delete(`/api/categories-sociales/${id}`);
  }
};

export default CategorieSocialeService;
