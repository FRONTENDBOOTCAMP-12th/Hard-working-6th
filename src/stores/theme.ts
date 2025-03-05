import { create } from 'zustand';
import {
  combine,
  devtools,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';

export const useStore = create(
  persist(
    devtools((set) => ({
      theme: '',
      update: (theme: string) => set({ theme }),
    })),
    {
      name: 'store/counter',
    }
  )
);
