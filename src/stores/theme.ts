import { create } from 'zustand';
import { combine } from 'zustand/middleware';

// interface Store {
//   theme: string;
//   card: string;
//   updateTheme: (theme: string) => void;
//   updateCard: (card: string) => void;
// }

export const useStore = create(
  combine(
    {
      theme: '',
      card: '',
    },
    (set) => ({
      updateTheme: (theme: string) => set({ theme }),
      updateCard: (card: string) => set({ card }),
    })
  )
);
