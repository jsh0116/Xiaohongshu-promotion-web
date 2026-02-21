import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@shared/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, id, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "h-11 rounded-xl border px-4 text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors",
            error
              ? "border-red-500"
              : "border-zinc-300 dark:border-zinc-600",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
