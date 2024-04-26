import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const initialState = {
   isAuthenticated: false,
   email: null,
   role: null,
   token: null,
   firstName: null,
   lastName: null,
   gender: null,
   mobileNumber: null,
   dateOfRegistration: null,
   dateOfUpdated: null
};

const store = set => ({
   ...initialState,
   login: (
      email,
      role,
      token,
      firstName,
      lastName,
      gender,
      mobileNumber,
      dateOfRegistration,
      dateOfUpdated
   ) => {
      set({
         isAuthenticated: true,
         email,
         role,
         token,
         firstName,
         lastName,
         gender,
         mobileNumber,
         dateOfRegistration,
         dateOfUpdated
      });
   },
   logout: () => {
      set({
         isAuthenticated: false,
         email: null,
         role: null,
         token: null,
         firstName: null,
         lastName: null,
         gender: null,
         mobileNumber: null,
         dateOfRegistration: null,
         dateOfUpdated: null
      });
   },
   updateUser: data => {
      set(state => ({
         email: {
            ...state.email,
            ...data
         }
      }));
   }
});

export const useAuthStore = create(
   devtools(persist(store, { name: 'authStore' }), 'authStore')
);
