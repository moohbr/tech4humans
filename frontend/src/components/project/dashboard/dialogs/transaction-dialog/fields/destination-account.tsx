import { FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form"
import { Select } from "@/components/ui/select"
import { FormFieldProps } from "../types"
import { Skeleton } from '@/components/ui/skeleton'

export function DestinationAccountField({ form, isReadOnly, isLoading, accountOptions }: FormFieldProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  const filteredOptions = accountOptions.filter(
    opt => opt.value !== form.watch('sourceAccountId')?.toString()
  )

  return (
    <FormField
      control={form.control}
      name="destinationAccountId"
      rules={{
        required: 'A conta de destino é obrigatória',
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
            Conta de destino
          </FormLabel>
          <FormControl>
            <Select
              value={field.value?.toString()}
              onChange={(value) => form.setValue('destinationAccountId', Number(value))}
              options={filteredOptions}
              placeholder="Selecione a conta de destino"
              isLoading={isReadOnly || isLoading}
              className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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