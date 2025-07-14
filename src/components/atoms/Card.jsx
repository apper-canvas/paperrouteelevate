import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  variant = "default",
  hoverable = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-lg border transition-all duration-200";
  
  const variants = {
    default: "border-gray-200 shadow-elegant",
    elevated: "border-gray-200 shadow-premium",
    outlined: "border-gray-300 shadow-none"
  };
  
  const hoverStyles = hoverable ? "hover:shadow-lifted hover:-translate-y-1" : "";
  
  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;