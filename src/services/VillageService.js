// src/services/VillageService.js
import DataService from './DataService';

const VillageService = {

  get(id) {
    return DataService.get(`/api/villages/${id}`);
  },
  create(data) {
    return DataService.post('/api/villages', data);
  },
  update(id, data) {
    return DataService.put(`/api/villages/${id}`, data);
  },
  delete(id) {
    return DataService.delete(`/api/villages/${id}`);
  },

  getAll() {
    return DataService.get('/api/villages');
  },
  getFamillesByVillage(villageId) {
    return DataService.get(`/api/villages/${villageId}/familles`);
  }
};

export default VillageService;
