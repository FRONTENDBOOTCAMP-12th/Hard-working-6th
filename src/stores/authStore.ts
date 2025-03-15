import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';
import supabaseClient from '@/utils/SupabaseClient';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      signOut: async () => {
        await supabaseClient.auth.signOut();
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 key
    }
  )
);

// Supabase Auth 상태 변화 감지 후 Zustand 업데이트
supabaseClient.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    useAuthStore.getState().setUser(session.user);
  } else {
    useAuthStore.getState().setUser(null);
  }
});
