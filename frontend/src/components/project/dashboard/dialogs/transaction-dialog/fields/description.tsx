import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFieldProps } from "../types"
import { Skeleton } from '@/components/ui/skeleton'

export function DescriptionField({ form, isReadOnly, isLoading }: FormFieldProps) {
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
      name="description"
      rules={{
        minLength: { value: 2, message: 'A descrição deve ter pelo menos 2 caracteres' },
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Descrição
          </FormLabel>
          <FormControl>
            <Input
              className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ex: Transferência entre contas"
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