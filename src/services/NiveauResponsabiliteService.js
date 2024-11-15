import DataService from './DataService';

const NiveauResponsabiliteService = {
  getAll() {
    return DataService.get('/api/niveaux-responsabilite');
  },

  get(id) {
    return DataService.get(`/api/niveaux-responsabilite/${id}`);
  },

  create(data) {
    return DataService.post('/api/niveaux-responsabilite', data);
  },

  update(id, data) {
    return DataService.put(`/api/niveaux-responsabilite/${id}`, data);
  },

  delete(id) {
    return DataService.delete(`/api/niveaux-responsabilite/${id}`);
  }
};

export default NiveauResponsabiliteService;