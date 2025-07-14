import { forwardRef } from "react";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const FormField = forwardRef(({ 
  label, 
  error, 
  helperText,
  required = false,
  className,
  ...props 
}, ref) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <Input
        ref={ref}
        error={!!error}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600 flex items-center">
          <span className="mr-1">⚠</span>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

FormField.displayName = "FormField";

export default FormField;