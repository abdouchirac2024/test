// src/services/AuthService.js
import DataService from './DataService';

const AuthService = {
    register(data) {
        return DataService.post('/api/register', data);
    },

    login(credentials) {
        return DataService.post('/api/login', {
            email: credentials.email,
            mot_de_passe: credentials.mot_de_passe
        });
    },

    logout() {
        return DataService.post('/api/logout')
            .then(response => {
                localStorage.removeItem('token');
                return response.data;
            });
    },

    getCurrentUser() {
        return DataService.get('/api/user');
    }
};

export default AuthService;