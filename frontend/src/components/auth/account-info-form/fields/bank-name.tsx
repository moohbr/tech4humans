import { FormControl, FormField, FormLabel, FormItem, FormMessage } from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { useBanks } from "@/hooks/queries/use-banks";
import { FormFieldProps } from "../types";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";

export function BankNameField({ form, isReadOnly, isLoading }: FormFieldProps) {
    const { banks } = useBanks();
    const bankOptions = useMemo(() =>
        banks?.map((bank) => ({
            value: bank.name,
            label: bank.name,
        })) || [], [banks]
    );
    return (
        <FormField
            control={form.control}
            name="bank.name"
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
                        Nome do Banco
                    </FormLabel>
                    <FormControl>
                        {isReadOnly ? (
                            <Input
                                className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100"
                                value={field.value}
                                disabled
                                readOnly
                            />
                        ) : (
                            <Select
                                value={field.value}
                                onChange={field.onChange}
                                options={bankOptions}
                                placeholder="Selecione o banco"
                                isLoading={isLoading}
                                className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        )}
                    </FormControl>
                    {fieldState.error && (
                        <FormMessage className="text-red-400 text-xs">
                            {fieldState.error.message}
                        </FormMessage>
                    )}
                </FormItem>
            )}
        />
    );
}