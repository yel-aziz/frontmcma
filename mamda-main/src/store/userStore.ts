import { defineStore } from 'pinia';
import { fetchMe } from '@/api/user';

export interface IUserState {
  token: string;
  expire_in: number;
  username: string;
  avatar: string;
  permissions: [];
}
/** User Store */
export const useUserStore = defineStore('user', {
  // Default Config State
  state: () => ({
    token: '',
    expire_in: 0,
    username: '',
    avatar: '',
    permissions: [],
    Ville: [
      { title: 'rabat', value: 'rabat' },
      { title: 'casa', value: 'casa' },
      { title: 'tanger', value: 'tanger' },
    ],
    statusOptions: [
      { title: 'Pending', value: 'pending' },
      { title: 'Active', value: 'active' },
      { title: 'Inactive', value: 'inactive' }
    ]
  }),
  // Getters
  getters: {
    getRoles(state) {
      return state.Ville;
    },
    getUsername(state) {
      return state.username;
    },
    getStatusOptions(state) {
      return state.statusOptions;
    },
    getAccessToken(state) {
      return state.token;
    }
  },
  // Actions
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUsername(username: string) {
      this.username = username;
    },
    setProfile(profile) {
      this.username = profile.username;
      this.avatar = profile.avatar;
    },
    async getProfile(): Promise<boolean> {
      try {
        const { data } = await fetchMe();
        // set user profile
        this.setProfile(data);
        return Promise.resolve(true);
      } catch (e) {
        return Promise.reject(false);
      }
    }
  },
  // Data persistence destination
  persist: {
    key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE ?? 'vuetify',
    storage: window.sessionStorage
  }
});
