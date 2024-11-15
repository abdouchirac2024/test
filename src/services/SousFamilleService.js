// src/services/SousFamilleService.js
import DataService from './DataService';

const SousFamilleService = {
  getAll() {
    return DataService.get('/api/sous-familles');
  },
  get(id) {
    return DataService.get(`/api/sous-familles/${id}`);
  },
  create(data) {
    return DataService.post('/api/sous-familles', data);
  },
  update(id, data) {
    return DataService.put(`/api/sous-familles/${id}`, data);
  },
  delete(id) {
    return DataService.delete(`/api/sous-familles/${id}`);
  }
  
};

export default SousFamilleService;
