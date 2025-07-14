import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search...", 
  className,
  value = "",
  onChange 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange?.(newValue);
    onSearch?.(newValue);
  };
  
  return (
    <motion.div
      className={cn("relative", className)}
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon 
          name="Search" 
          size={20} 
          className={cn(
            "transition-colors duration-200",
            isFocused ? "text-primary-600" : "text-gray-400"
          )}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
      />
    </motion.div>
  );
};

export default SearchBar;