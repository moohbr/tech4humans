import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";


type SelectOption = {
    value: string;
    label: string;
    avatar?: string;
    icon?: React.ReactNode;
}

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> & {
    options: SelectOption[];
    isLoading?: boolean;
    placeholder?: string;
    name?: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, options, isLoading, disabled, placeholder, name, value, onChange, required, ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);
        const hiddenSelectRef = useRef<HTMLSelectElement>(null);

        const selectedOption = options.find((option) => option.value === value);

        const handleChange = (newValue: string) => {
            onChange?.(newValue);
            setIsOpen(false);

            if (hiddenSelectRef.current) {
                hiddenSelectRef.current.value = newValue;
                const event = new Event('change', { bubbles: true });
                hiddenSelectRef.current.dispatchEvent(event);
            }
        };

        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node)
                ) {
                    setIsOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (disabled || isLoading) return;

            switch (event.key) {
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    setIsOpen((prev) => !prev);
                    break;
                case 'Escape':
                    setIsOpen(false);
                    break;
                case 'ArrowDown':
                    if (!isOpen) {
                        event.preventDefault();
                        setIsOpen(true);
                    }
                    break;
            }
        };

        return (
            <div className="relative" ref={containerRef}>
                <select
                    ref={ref}
                    name={name}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    required={required}
                    className="sr-only"
                    aria-hidden="true"
                    tabIndex={-1}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {isLoading ? "Carregando..." : placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Custom select button */}
                <button
                    type="button"
                    onClick={() => !disabled && !isLoading && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "w-full flex items-center justify-between rounded-md border px-3 py-2 text-sm",
                        "focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400",
                        "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50",
                        "text-zinc-900 dark:text-zinc-100",
                        (disabled || isLoading) && "opacity-50 cursor-not-allowed",
                        className,
                    )}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby={name}
                    disabled={disabled || isLoading}
                >
                    <div className="flex items-center gap-2 min-w-0">
                        {selectedOption ? (
                            <>
                                {selectedOption.icon}
                                <span className="truncate">{selectedOption.label}</span>
                            </>
                        ) : (
                            <span className="text-zinc-500 dark:text-zinc-400">
                                {isLoading ? "Carregando..." : placeholder}
                            </span>
                        )}
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                </button>

                {isOpen && (
                    <div
                        className="absolute z-50 w-full mt-1 py-1 rounded-md shadow-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50"
                        role="listbox"
                        aria-labelledby={name}
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleChange(option.value)}
                                className={cn(
                                    "w-full flex items-center gap-2 px-3 py-2 text-sm",
                                    "hover:bg-zinc-100 dark:hover:bg-zinc-700/50",
                                    value === option.value &&
                                    "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
                                )}
                                role="option"
                                aria-selected={value === option.value}
                            >
                                {option.avatar && (
                                    <img
                                        src={option.avatar}
                                        alt={option.label}
                                        className="w-5 h-5 rounded-full object-cover"
                                    />
                                )}
                                {option.icon}
                                <span className="flex-1 text-left truncate">{option.label}</span>
                                {value === option.value && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";

export { Select };