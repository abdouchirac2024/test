// src/services/FamilleService.js
import DataService from './DataService';

const FamilleService = {
  getAll() {
    return DataService.get('/api/familles');
  },
  get(id) {
    return DataService.get(`/api/familles/${id}`);
  },
  create(data) {
    return DataService.post('/api/familles', data);
  },
  update(id, data) {
    return DataService.put(`/api/familles/${id}`, data);
  },
  delete(id) {
    return DataService.delete(`/api/familles/${id}`);
  },
  getSousFamillesByFamille(familleId) {
    return DataService.get(`/api/familles/${familleId}/sous-familles`);
  }
 
};

export default FamilleService;
