
'use client'
import { IAccessToken, IErrorResp, IUser } from './type';
import axiosIns from '@/plugins/axios';
import { router } from '@/router';
import { useUserStore } from '@/store';

// export async function login(params: object) {
//   const options = {
//     method: 'POST',
//     url: `/api/auth/login`,
//     data: params,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };
//   return axiosIns.request<IAccessToken>(options);
// }

// import axios from 'axios';


// const apiClient = axios.create({
//   baseURL: 'http://localhost:8083', 
//   headers: {
//     'Content-Type': 'multipart/form-data',
//     // Authorization: `Bearer ${IAccessToken}`,
//   },
// });

// export const setAuthToken = (token: string) => {
//   if (token) {
//     apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
//   } else {
//     delete apiClient.defaults.headers.common['Authorization']; 
//   }
// };

// import { useRouter } from 'vue-router';
// export const login = async (formModel: { login: string; password: string }) => {
//   const router = useRouter();
//   const userStore = useUserStore();
//   try {
//     const response = await apiClient.post('/login', formModel);
//     console.log('Login response:', response.data);

//     // if (response.data === 'logged') {
//     //   console.log("dcbhj");
//     //   const { access_token } = response.data;
//     //   userStore.setToken(access_token); 
//     //   setAuthToken(access_token); 
//     //   return response;
//     // } else {
//     //   throw new Error('Unexpected response format');
//     // }
//   } catch (error) {
//     console.log('Login error:', error);
//     throw error; 
//   }
// };

export const fetchMe = async () => {
  try {
    // const response = await apiClient.get('/login');
    // return response.data;
  } catch (error) {
    console.error('Fetch error', error);
    throw error;
  }
};
// export async function fetchMe() {
//   try {
//     const response = await axiosIns.get<IUser | IErrorResp>('/api/me');
//     return response.data;
//   } catch (error) {

//     console.error('Fetch current user error:', error);
//     throw error;
//   }
// }



export async function fetchUser(params) {
  const options = {
    method: 'GET',
    url: `/api/user`,
    params: params,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return axiosIns.request<Array<IUser>>(options);
}
