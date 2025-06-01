import { UseFormReturn } from 'react-hook-form'
import { CreateTransactionDTO } from '@/types/transaction/types'

export interface FormFieldProps {
  form: UseFormReturn<CreateTransactionDTO>
  isReadOnly: boolean
  isLoading: boolean
  accountOptions: Array<{ label: string; value: string }>
} 