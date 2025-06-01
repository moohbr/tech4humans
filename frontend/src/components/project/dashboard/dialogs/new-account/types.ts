import { UseFormReturn } from 'react-hook-form'
import { CreateAccountDTO } from '@/types/account/types'

export interface FormFieldProps {
  form: UseFormReturn<CreateAccountDTO>
  isReadOnly: boolean
  isLoading: boolean
} 