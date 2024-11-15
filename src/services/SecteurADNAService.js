 //src/services/SecteurADNAService.js
import DataService from './DataService';

const SecteurADNAService = {
  getAll() {
    return DataService.get('/api/secteur-adnas');
  },
  get(id) {
    return DataService.get(`/api/secteur-adnas/${id}`);
  },
  create(data) {
    return DataService.post('/api/secteur-adnas', data);
  },
  update(id, data) {
    return DataService.put(`/api/secteur-adnas/${id}`, data);
  },
  delete(id) {
    return DataService.delete(`/api/secteur-adnas/${id}`);
  }
};

export default SecteurADNAService;
