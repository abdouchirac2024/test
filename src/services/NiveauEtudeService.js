// src/services/NiveauEtudeService.js
import DataService from './DataService';

const NiveauEtudeService = {
  
  // Récupérer la liste de tous les niveaux d'étude
  getAll() {
    return DataService.get('/api/niveaux-etude');
  },


  
  // Récupérer un niveau d'étude par son ID
  getById(id) {
    return DataService.get(`/api/niveaux-etude/${id}`);
  },

  // Créer un nouveau niveau d'étude
  create(niveauEtudeData) {
    return DataService.post('/api/niveaux-etude', niveauEtudeData);
  },

  // Mettre à jour un niveau d'étude existant
  update(id, niveauEtudeData) {
    return DataService.put(`/api/niveaux-etude/${id}`, niveauEtudeData);
  },

  // Supprimer un niveau d'étude par son ID
  delete(id) {
    return DataService.delete(`/api/niveaux-etude/${id}`);
  }
};

export default NiveauEtudeService;


