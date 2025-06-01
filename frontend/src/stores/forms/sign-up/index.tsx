import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SignUpFormStore } from './interfaces';
import { AccountType } from '@/types/account/enum';


export const useSignUpFormStore = create<SignUpFormStore>()(
  persist(
    (set) => ({
      data: {
        user: {
          name: "",
          email: "",
          password: "",
        },
        account: {
          name: "",
          type: AccountType.POUPANCA,
          balance: 0,
          bankName: "",
        },
      },
      updateData: (values) =>
        set((state) => ({
          data: {
            ...state.data,
            ...values,
          },
        })),
      clearData: () => set({ data: {
        user: {
          name: "",
          email: "",
          password: "",
        },
        account: {
          name: "",
          type: AccountType.POUPANCA,
          balance: 0,
          bankName: "",
        },
      } }),
    }),
    {
      name: 'sign-up-form-data',
    }
  )
);
