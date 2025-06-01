import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  avatar?: string;
  icon?: React.ReactNode;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  isLoading?: boolean;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  required?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, isLoading, disabled, placeholder, name, defaultValue, required, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const containerRef = useRef<HTMLDivElement>(null);
    
    const currentValue = defaultValue !== undefined ? defaultValue : internalValue;
    const selectedOption = options.find((option) => option.value === currentValue);

    const handleChange = (newValue: string) => {
      if (defaultValue === undefined) {
        setInternalValue(newValue);
      }
      setIsOpen(false);
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

    return (
      <>
        <select
          ref={ref}
          name={name}
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          required={required}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          disabled={disabled || isLoading}
          {...props}
        >
          {placeholder && (
            <option value="" disabled selected>
              {isLoading ? "Carregando..." : placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="relative" ref={containerRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-full flex items-center justify-between rounded-md border px-3 py-2 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400",
              "bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50",
              "text-zinc-900 dark:text-zinc-100",
              className,
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              {selectedOption ? (
                <>
                  {selectedOption.icon}
                  <span className="truncate">{selectedOption.label}</span>
                </>
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400">
                  {placeholder}
                </span>
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          </button>
          
          {isOpen && (
            <div className="absolute z-50 w-full mt-1 py-1 rounded-md shadow-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChange(option.value)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-700/50",
                    currentValue === option.value &&
                      "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
                  )}
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
                  {currentValue === option.value && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
);

Select.displayName = "Select";

export { Select };