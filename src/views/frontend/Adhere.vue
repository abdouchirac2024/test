<template>
  <div class="member-access-container">
    <div class="member-access-content">
      <div class="left-column">
        <img src="/images/login/login.jpg" alt="Login background" class="login-image">
      </div>

      <div class="right-column">
        <div class="form-container">
          <h2 class="form-title">Inscription</h2>

          <div class="progress-container">
            <div class="steps-indicator">
              <div
                v-for="step in totalSteps"
                :key="step"
                :class="['step-number', { active: step <= currentStep }]"
              >
                {{ step }}
              </div>
            </div>
            <div class="progress">
              <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="registration-form">
            <div v-if="currentStep === 1" class="form-step">
              <h3 class="step-title">Informations de base</h3>
              <div class="form-group">
                <label for="nom">Nom *</label>
                <input 
                  v-model="formData.nom" 
                  type="text" 
                  id="nom" 
                  required
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="prenom">Prénom *</label>
                <input 
                  v-model="formData.prenom" 
                  type="text" 
                  id="prenom" 
                  required
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  v-model="formData.email" 
                  type="email" 
                  id="email" 
                  required
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="mot_de_passe">Mot de passe *</label>
                <div class="relative">
                  <input 
                    v-model="formData.mot_de_passe" 
                    :type="showPassword ? 'text' : 'password'" 
                    id="mot_de_passe" 
                    required
                    class="form-control"
                  >
                  <button type="button" @click="togglePasswordVisibility" class="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <span v-if="showPassword">👁️</span>
                    <span v-else>🙈</span>
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label for="confirmer_mot_de_passe">Confirmer le mot de passe *</label>
                <div class="relative">
                  <input 
                    v-model="formData.confirmer_mot_de_passe" 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    id="confirmer_mot_de_passe" 
                    required
                    class="form-control"
                    @input="validatePasswordMatch"
                  >
                  <button type="button" @click="toggleConfirmPasswordVisibility" class="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <span v-if="showConfirmPassword">👁️</span>
                    <span v-else>🙈</span>
                  </button>
                </div>
                <span v-if="passwordMismatch" class="text-red-500 text-sm mt-1">
                  Les mots de passe ne correspondent pas
                </span>
              </div>

              <div class="form-group">
                <label for="telephone">Téléphone * (avec indicatif)</label>
                <div class="telephone-input">
                  <span class="telephone-prefix">+</span>
                  <input 
                    v-model="formData.telephone" 
                    type="tel" 
                    id="telephone" 
                    required
                    class="form-control pl-8"
                    @keypress="onlyNumbers"
                  >
                </div>
              </div>
            </div>

            <div v-if="currentStep === 2" class="form-step">
              <h3 class="step-title">Informations personnelles</h3>
              <div class="form-group">
                <label for="date_naissance">Date de naissance *</label>
                <input 
                  v-model="formData.date_naissance" 
                  type="date" 
                  id="date_naissance" 
                  required
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="lieu_naissance">Lieu de naissance *</label>
                
                <input 
                  v-model="formData.lieu_naissance" 
                  type="text" 
                  id="lieu_naissance" 
                  required
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="sexe">Sexe *</label>
                <select 
                  v-model="formData.sexe" 
                  id="sexe" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez votre sexe</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>

              <div class="form-group">
                <label for="situation_matrimoniale">Situation matrimoniale *</label>
                <select 
                  v-model="formData.situation_matrimoniale" 
                  id="situation_matrimoniale" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez votre situation</option>
                  <option value="Célibataire">Célibataire</option>
                  <option value="Marié(e)">Marié(e)</option>
                  <option value="Divorcé(e)">Divorcé(e)</option>
                  <option value="Veuf(ve)">Veuf(ve)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="nombre_enfants">Nombre d'enfants *</label>
                <input 
                  v-model.number="formData.nombre_enfants" 
                  type="number" 
                  id="nombre_enfants" 
                  min="0" 
                  required
                  class="form-control"
                >
              </div>
            </div>

            <div v-if="currentStep === 3" class="form-step">
              <h3 class="step-title">Informations professionnelles</h3>
              <div class="form-group">
                <label for="niveau_etude_id">Niveau d'étude *</label>
                <select 
                  v-model="formData.niveau_etude_id" 
                  id="niveau_etude_id" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez votre niveau d'étude</option>
                  <option 
                    v-for="niveau in niveauxEtude" 
                    :key="niveau.id" 
                    :value="niveau.id"
                  >
                    {{ niveau.nom_niveau }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="profession">Profession *</label>
                <input 
                  v-model="formData.profession" 
                  type="text" 
                  id="profession" 
                  required
                  class="form-control"
                >
              </div>

              <div class="form-group">
                <label for="domaine_competence_id">Domaine de compétence *</label>
                <select 
                  v-model="formData.domaine_competence_id" 
                  id="domaine_competence_id" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez votre domaine de compétence</option>
                  <option 
                    v-for="domaine in domainesCompetence" 
                    :key="domaine.id" 
                    :value="domaine.id"
                  >
                    {{ domaine.nom_domaine }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="niveau_responsabilite_id">Niveau de responsabilité *</label>
                <select 
                  v-model="formData.niveau_responsabilite_id" 
                  id="niveau_responsabilite_id" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez votre niveau de responsabilité</option>
                  <option 
                    v-for="niveau in niveauxResponsabilite" 
                    :key="niveau.id" 
                    :value="niveau.id"
                  >
                    {{ niveau.nom }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="categorie_professionnelle_id">Catégorie professionnelle *</label>
                <select 
                  v-model="formData.categorie_professionnelle_id" 
                  id="categorie_professionnelle_id" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez votre catégorie professionnelle</option>
                  <option 
                    v-for="categorie in categoriesProfessionnelles" 
                    :key="categorie.id" 
                    :value="categorie.id"
                  >
                    {{ categorie.nom_categorie }}
                  </option>
                </select>
              </div>

              
              <div class="form-group">
                <label for="categorie_sociale_id">Catégorie sociale *</label>
                <select 
                  v-model="formData.categorie_sociale_id" 
                  id="categorie_sociale_id" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez votre catégorie sociale</option>
                  <option 
                    v-for="categorie in categoriesSociales" 
                    :key="categorie.id" 
                    :value="categorie.id"
                  >
                    {{ categorie.nom_categorie }}
                  </option>
                </select>
              </div>
            </div>

            <div v-if="currentStep === 4" class="form-step">
              <h3 class="step-title">Informations géographiques</h3>
              <div class="form-group">
                <label for="pays_origine_id">Pays d'origine *</label>
                <select 
                  v-model="formData.pays_origine_id" 
                  @change="fetchVilles" 
                  id="pays_origine_id" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez un pays</option>
                  <option 
                    v-for="pays in paysList" 
                    :key="pays.id" 
                    :value="pays.id"
                  >
                    {{ pays.nom_pays }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="ville_id">Ville *</label>
                <select 
                  v-model="formData.ville_id" 
                  id="ville_id" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez une ville</option>
                  <option 
                    v-for="ville in villesList" 
                    :key="ville.id" 
                    :value="ville.id"
                  >
                    {{ ville.nom_ville }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="village_id">Village *</label>
                <select 
                  v-model="formData.village_id" 
                  @change="fetchFamilles" 
                  id="village_id" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez un village</option>
                  <option 
                    v-for="village in villages" 
                    :key="village.id" 
                    :value="village.id"
                  >
                    {{ village.nom_village }}
                  </option>
                </select>
              </div>

              <div class="form-group" v-if="formData.village_id">
                <label for="famille_id">Famille *</label>
                <select 
                  v-model="formData.famille_id" 
                  @change="fetchSousFamilles" 
                  id="famille_id" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez une famille</option>
                  <option 
                    v-for="famille in familles" 
                    :key="famille.id" 
                    :value="famille.id"
                  >
                    {{ famille.nom_famille }}
                  </option>
                </select>
              </div>

              <div class="form-group" v-if="formData.famille_id">
                <label for="sous_famille_id">Sous-famille</label>
                <select 
                  v-model="formData.sous_famille_id" 
                  id="sous_famille_id" 
                  class="form-control"
                >
                  <option value="">Sélectionnez une sous-famille</option>
                  <option 
                    v-for="sousFamille in sousFamilles" 
                    :key="sousFamille.id" 
                    :value="sousFamille.id"
                  >
                    {{ sousFamille.nom_sous_famille }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="secteur_id">Secteur ADNA *</label>
                <select 
                  v-model="formData.secteur_id" 
                  id="secteur_id" 
                  required
                  class="form-control"
                >
                  <option value="">Sélectionnez un secteur ADNA</option>
                  <option 
                    v-for="secteur in secteurs" 
                    :key="secteur.id" 
                    :value="secteur.id"
                  >
                    {{ secteur.nom_secteur }}
                  </option>
                </select>
              </div>
            </div>

            <div v-if="currentStep === 5" class="form-step">
              <h3 class=" step-title">Informations sur les parents</h3>
              <div class="form-group">
                <label for="nom_pere">Nom du Père</label>
                <input 
                  v-model="formData.nom_pere" 
                  type="text" 
                  id="nom_pere" 
                  class="form-control"
                >
              </div>

              <div class="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    v-model="formData.pere_disparu"
                  >
                  Père Disparu
                </label>
              </div>

              <div class="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    v-model="formData.parent_ndogbatjeck_pere"
                  >
                  Parent Ndogbatjeck Père
                </label>
              </div>

              <div class="form-group">
                <label for="nom_mere">Nom de la Mère</label>
                <input 
                  v-model="formData.nom_mere" 
                  type="text" 
                  id="nom_mere" 
                  class="form-control"
                >
              </div>

              <div class="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    v-model="formData.mere_disparu"
                  >
                  Mère Disparue
                </label>
              </div>

              <div class="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    v-model="formData.parent_ndogbatjeck_mere"
                  >
                  Parent Ndogbatjeck Mère
                </label>
              </div>
            </div>

            <div class="buttons-container mt-6 flex justify-between">
              <button 
                type="button" 
                @click="prevStep" 
                v-if="currentStep > 1" 
                class="btn btn-secondary"
              >
                ← Précédent
              </button>
              <button 
                type="button" 
                @click="saveForLater" 
                class="btn btn-info"
              >
                💾 Sauvegarder pour plus tard
              </button>
              <button 
                type="button" 
                @click="nextStep" 
                v-if="currentStep < totalSteps" 
                class="btn btn-primary"
              >
                Suivant →
              </button>
              <button 
                type="submit" 
                v-if="currentStep === totalSteps" 
                class="btn btn-success"
              >
                Terminer l'inscription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Partners /> 
  </div>
</template>



<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import SecteurADNAService from '../../services/SecteurADNAService';
import NiveauEtudeService from '../../services/NiveauEtudeService';
import CategorieProfessionnelleService from '../../services/CategorieProfessionnelleService';
import CategorieSocialeService from '../../services/CategorieSocialeService';
import PaysService from '../../services/PaysService';
import VilleService from '../../services/VilleService';
import VillageService from '../../services/VillageService';
import FamilleService from '../../services/FamilleService';
import SousFamilleService from '../../services/SousFamilleService';
import DomaineCompetenceService from '../../services/DomaineCompetenceService';
import NiveauResponsabiliteService from '../../services/NiveauResponsabiliteService';
import Partners from '../../components/frontend/partner/Partners.vue';
import Swal from 'sweetalert2';
import { nanoid } from 'nanoid';

export default {
  name: 'MemberAccess',
  components: {
    Partners, 
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const passwordMismatch = ref(false);

    const formData = ref({
      nom: '',
      prenom: '',
      email: '',
      mot_de_passe: '',
      telephone: '',
      date_naissance: '',
      lieu_naissance: '',
      sexe: '',
      situation_matrimoniale: '',
      nombre_enfants: 0,
      niveau_etude_id: '',
      profession: '',
      domaine_competence_id: '',
      niveau_responsabilite_id: '',
      categorie_professionnelle_id: '',
      categorie_sociale_id: '',
      pays_origine_id: '',
      ville_id: '',
      village_id: '',
      famille_id: '',
      sous_famille_id: '',
      secteur_id: '',
      nom_pere: '',
      pere_disparu: false,
      parent_ndogbatjeck_pere: false,
      nom_mere: '',
      mere_disparu: false,
      parent_ndogbatjeck_mere: false,
      confirmer_mot_de_passe: '',
    });

    // Refs for storing fetched data
    const secteurs = ref([]);
    const niveauxEtude = ref([]);
    const categoriesProfessionnelles = ref([]);
    const categoriesSociales = ref([]);
    const paysList = ref([]);
    const villesList = ref([]);
    const villages = ref([]);
    const familles = ref([]);
    const sousFamilles = ref([]);
    const domainesCompetence = ref([]);
    const niveauxResponsabilite = ref([]);

    // Step management
    const currentStep = ref(1);
    const totalSteps = 5;
    const progressBarWidth = computed(() => `${((currentStep.value - 1) / (totalSteps - 1)) * 100}%`);

    const showError = (message) => {
      Swal.fire({
        title: 'Erreur',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    };

    const fetchAllData = async () => {
      try {
        const [
          secteursResponse,
          niveauxEtudeResponse,
          categoriesProfResponse,
          categoriesSocResponse,
          paysResponse,
          domainesCompResponse,
          niveauxRespResponse
        ] = await Promise.all([
          SecteurADNAService.getAll(),
          NiveauEtudeService.getAll(),
          CategorieProfessionnelleService.getAll(),
          CategorieSocialeService.getAll(),
          PaysService.getAll(),
          DomaineCompetenceService.getAll(),
          NiveauResponsabiliteService.getAll()
        ]);

        secteurs.value = secteursResponse.data;
        niveauxEtude.value = niveauxEtudeResponse.data;
        categoriesProfessionnelles.value = categoriesProfResponse.data;
        categoriesSociales.value = categoriesSocResponse.data;
        paysList.value = paysResponse.data;
        domainesCompetence.value = domainesCompResponse.data;
        niveauxResponsabilite.value = niveauxRespResponse.data;
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        showError('Impossible de charger les données initiales');
      }
    };

    const fetchVilles = async () => {
      if (formData.value.pays_origine_id) {
        try {
          const response = await VilleService.getVillesByPays(formData.value.pays_origine_id);
          villesList.value = response.data;
        } catch (error) {
          console.error('Erreur lors du chargement des villes:', error);
          showError('Impossible de charger les villes');
        }
      } else {
        villesList.value = [];
      }
    };

    
    const fetchVillages = async () => {
      try {
        const response = await VillageService.getAll();
        villages.value = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des villages:', error);
        showError('Impossible de charger les villages');
      }
    };

    const fetchFamilles = async () => {
      if (formData.value.village_id) {
        try {
          const response = await VillageService.getFamillesByVillage(formData.value.village_id);
          familles.value = response.data;
        } catch (error) {
          console.error('Erreur lors du chargement des familles:', error);
          showError('Impossible de charger les familles');
        }
      } else {
        familles.value = [];
      }
    };

    const fetchSousFamilles = async () => {
      if (formData.value.famille_id) {
        try {
          const response = await FamilleService.getSousFamillesByFamille(formData.value.famille_id);
          sousFamilles.value = response.data;
        } catch (error) {
          console.error('Erreur lors du chargement des sous-familles:', error);
          showError('Impossible de charger les sous-familles');
        }
      } else {
        sousFamilles.value = [];
      }
    };

    const onlyNumbers = (event) => {
      if (!/[0-9]/.test(String.fromCharCode(event.which))) {
        event.preventDefault();
      }
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const validatePasswordMatch = () => {
      passwordMismatch.value = 
        formData.value.mot_de_passe !== formData.value.confirmer_mot_de_passe;
    };

    const validateStep1 = () => {
      const { nom, prenom, email, mot_de_passe, confirmer_mot_de_passe, telephone } = formData.value;
      if (!nom || !prenom || !email || !mot_de_passe || !confirmer_mot_de_passe || !telephone) {
        showError('Veuillez remplir tous les champs obligatoires');
        return false;
      }
      if (mot_de_passe !== confirmer_mot_de_passe) {
        showError('Les mots de passe ne correspondent pas');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('Veuillez entrer une adresse email valide');
        return false;
      }
      if (mot_de_passe.length < 6) {
        showError('Le mot de passe doit contenir au moins 6 caractères');
        return false;
      }
      return true;
    };

    const validateStep2 = () => {
      const { date_naissance, lieu_naissance, sexe, situation_matrimoniale } = formData.value;
      if (!date_naissance || !lieu_naissance || !sexe || !situation_matrimoniale) {
        showError('Veuillez remplir tous les champs obligatoires');
        return false;
      }
      return true;
    };

    const validateStep3 = () => {
      const { niveau_etude_id, profession, categorie_professionnelle_id, categorie_sociale_id } = formData.value;
      if (!niveau_etude_id || !profession || !categorie_professionnelle_id || !categorie_sociale_id) {
        showError('Veuillez remplir tous les champs obligatoires');
        return false;
      }
      return true;
    };

    const validateStep4 = () => {
      const { pays_origine_id, ville_id, village_id, famille_id, secteur_id } = formData.value;
      if (!pays_origine_id || !ville_id || !village_id || !famille_id || !secteur_id) {
        showError('Veuillez remplir tous les champs obligatoires');
        return false;
      }
      return true;
    };

    const validateStep5 = () => {
      return true; // Parent information is optional
    };

    const validateCurrentStep = () => {
      switch (currentStep.value) {
        case 1: return validateStep1();
        case 2: return validateStep2();
        case 3: return validateStep3();
        case 4: return validateStep4();
        case 5: return validateStep5();
        default: return true;
      }
    };

    const nextStep = () => {
      if (validateCurrentStep() && currentStep.value < totalSteps) {
        currentStep.value++;
      }
    };

    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

   
    const handleSubmit = async () => {
      if (!validateCurrentStep()) {
        return;
      }

      try {
        formData.value.parent_ndogbatjeck_mere = !!formData.value.parent_ndogbatjeck_mere;
        formData.value.pere_disparu = !!formData.value.pere_disparu;
        formData.value.parent_ndogbatjeck_pere = !!formData.value.parent_ndogbatjeck_pere;
        formData.value.mere_disparu = !!formData.value.mere_disparu;

        await authStore.register(formData.value);
        await Swal.fire({
          title: 'Succès!',
          text: 'Inscription réussie! Vous allez être redirigé vers la page de connexion.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        router.push('/client/dashboard');
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription';
        showError(errorMessage);
      }
    };

    const saveForLater = async () => {
      try {
        const saveId = nanoid(10);
        const saveData = {
          formData: formData.value,
          currentStep: currentStep.value,
          timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(`registration_${saveId}`, JSON.stringify(saveData));
        const resumeLink = `${window.location.origin}/adhere?saveId=${saveId}`;
        
        await Swal.fire({
          title: 'Sauvegarde réussie!',
          html: `
            <p>Voici votre lien pour reprendre l'inscription plus tard:</p>
            <div class="select-all p-2 bg-gray-100 rounded mt-2">
              <code>${resumeLink}</code>
            </div>
            <p class="mt-2 text-sm">Copiez et conservez ce lien précieusement!</p>
          `,
          icon: 'success',
          confirmButtonText: 'Copier le lien',
          showCancelButton: true,
          cancelButtonText: 'Fermer'
        }).then((result) => {
          if (result.isConfirmed) {
            navigator.clipboard.writeText(resumeLink);
            Swal.fire('Copié!', 'Le lien a été copié dans votre presse-papiers', 'success');
          }
        });
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        Swal.fire('Erreur', 'Impossible de sauvegarder votre progression', 'error');
      }
    };

    const loadSavedData = (saveId) => {
      try {
        const savedData = localStorage.getItem(`registration_${saveId}`);
        if (savedData) {
          const { formData: savedFormData, currentStep: savedCurrentStep } = JSON.parse(savedData);
          formData.value = savedFormData;
          currentStep.value = savedCurrentStep;
          return true;
        }
        return false;
      } catch (error) {
        console.error('Erreur lors du chargement de la sauvegarde:', error);
        return false;
      }
    };

    onMounted(() => {
      fetchAllData();
      fetchVillages();
      
      const urlParams = new URLSearchParams(window.location.search);
      const saveId = urlParams.get('saveId');
      
      if (saveId) {
        const loaded = loadSavedData(saveId);
        if (!loaded) {
          Swal.fire('Erreur', 'Impossible de charger la sauvegarde demandée', 'error');
        }
      }
    });

    return {
      formData,
      showPassword,
      showConfirmPassword,
      passwordMismatch,
      currentStep,
      totalSteps,
      progressBarWidth,
      secteurs,
      niveauxEtude,
      categoriesProfessionnelles,
      categoriesSociales,
      paysList,
      villesList,
      villages,
      familles,
      sousFamilles,
      domainesCompetence,
      niveauxResponsabilite,
      nextStep,
      prevStep,
      handleSubmit,
      fetchVilles,
      fetchFamilles,
      fetchSousFamilles,
      onlyNumbers,
      togglePasswordVisibility,
      validateCurrentStep,
      saveForLater,
      loadSavedData,
      validatePasswordMatch,
    };
  }
};
</script>

<style scoped>
.member-access-container {
  min-height: 100vh;
  background-color: #f8fafc;
}

.member-access-content {
  display: flex;
  min-height: 100vh;
}

.left-column {
  flex: 1;
  display: none; /* Caché sur mobile */
}

.right-column {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: white;
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a5d1a;
  margin-bottom: 2rem;
  text-align: center;
}

/* Style des champs de formulaire */
.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: #f8fafc;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #1a5d1a;
  box-shadow: 0 0 0 3px rgba(26, 93, 26, 0.1);
  outline: none;
}

/* Style des boutons */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #1a5d1a;
  color: white;
}

.btn-primary:hover {
  background-color: #164a16;
}

/* Media queries */
@media (min-width: 1024px) {
  .left-column {
    display: block; /* Afficher sur desktop */
  }

  .right-column {
    max-width: 50%;
  }
}

/* Styles pour la barre de progression */
.progress-container {
  position: relative;
  padding: 0 1rem;
}

.steps-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f3f3f3;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #666;
  transition: all 0.3s ease;
}

.step-number.active {
  background: #4caf50;
  border-color: #4caf50;
  color: white;
}

.progress {
  height: 8px;
  background: #f3f3f3;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #45a049);
  transition: width 0.5s ease;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 0.5rem;
  width: auto;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.select-all {
  user-select: all;
}

@media (max-width: 640px) {
  .member-access {
    padding: 10px;
  }

  .form-group input,
  .form-group select,
  .btn {
    font-size: 0.9rem;
  }
}
</style>