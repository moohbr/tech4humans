import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFieldProps } from "../types"
import { Skeleton } from '@/components/ui/skeleton'

export function AmountField({ form, isReadOnly, isLoading }: FormFieldProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  return (
    <FormField
      control={form.control}
      name="amount"
      rules={{
        required: 'O valor é obrigatório',
        min: { value: 0.01, message: 'O valor deve ser maior que zero' },
        validate: (value: number | undefined) => {
          if (!value) {
            return 'O valor é obrigatório'
          }
          if (value < 0.01) {
            return 'O valor deve ser maior que zero'
          }
          return true
        } 
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Valor
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              step="0.01"
              className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0.00"
              disabled={isReadOnly || isLoading}
              {...field}
            />
          </FormControl>
          {fieldState.error && (
            <FormMessage className="text-red-400 text-xs">
              {fieldState.error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  )
} 