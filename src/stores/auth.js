// src/stores/auth.js
import { defineStore } from 'pinia';
import AuthService from '../services/AuthService';

import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async register(userData) {
      try {
        const response = await AuthService.register(userData);
        this.user = response.data.utilisateur;
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        return response.data;
      } catch (error) {
        console.error('Erreur d\'inscription:', error);
        throw error;
      }
    },

    async login(credentials) {
      try {
        const response = await AuthService.login(credentials);
        this.user = response.data.utilisateur;
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        return response.data;
      } catch (error) {
        console.error('Erreur de connexion:', error);
        throw error;
      }
    },

    async logout() {
      try {
        await AuthService.logout();
        this.user = null;
        this.token = null;
        localStorage.removeItem('token');
        // Redirection vers la page de connexion
        router.push('/member-access');
      } catch (error) {
        console.error('Erreur de déconnexion:', error);
        throw error;
      }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  }
});