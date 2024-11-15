import DataService from './DataService';

const DomaineCompetenceService = {
  getAll() {
    return DataService.get('/api/domaines-competence');
  },

  get(id) {
    return DataService.get(`/api/domaines-competence/${id}`);
  },

  create(data) {
    return DataService.post('/api/domaines-competence', data);
  },

  update(id, data) {
    return DataService.put(`/api/domaines-competence/${id}`, data);
  },

  delete(id) {
    return DataService.delete(`/api/domaines-competence/${id}`);
  }
};

export default DomaineCompetenceService;