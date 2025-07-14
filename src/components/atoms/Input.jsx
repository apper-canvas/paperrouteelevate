import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text", 
  error = false,
  label,
  ...props 
}, ref) => {
  const baseStyles = "block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200";
  
  const variants = {
    default: "border-gray-300 focus:border-primary-500",
    error: "border-error-300 focus:border-error-500 focus:ring-error-500"
  };
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          error ? variants.error : variants.default,
          className
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;