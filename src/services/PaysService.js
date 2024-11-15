
//src/services/PaysService.js


import DataService from './DataService';

const PaysService = {
  // Récupérer tous les pays
  getAll() {
    return DataService.get('/api/pays');
  },

  // Récupérer un pays par son ID
  get(id) {
    return DataService.get(`/api/pays/${id}`);
  },

  // Créer un nouveau pays
  create(data) {
    return DataService.post('/api/pays', data);
  },

  // Mettre à jour un pays par son ID
  update(id, data) {
    return DataService.put(`/api/pays/${id}`, data);
  },

  // Supprimer un pays par son ID
  delete(id) {
    return DataService.delete(`/api/pays/${id}`);
  }
};

export default PaysService;
