import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavItem = ({ to, icon, label, mobile = false }) => {
  const baseStyles = "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200";
  
  const desktopStyles = "text-white hover:bg-white/10 hover:text-white";
  const mobileStyles = "text-gray-700 hover:bg-gray-100 hover:text-gray-900";
  
  const activeDesktopStyles = "bg-white/20 text-white shadow-lg";
  const activeMobileStyles = "bg-primary-50 text-primary-600 border-r-2 border-primary-600";
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          baseStyles,
          mobile ? mobileStyles : desktopStyles,
          isActive ? (mobile ? activeMobileStyles : activeDesktopStyles) : ""
        )
      }
    >
      {({ isActive }) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center w-full"
        >
          <ApperIcon 
            name={icon} 
            size={20} 
            className={cn(
              "mr-3 transition-colors duration-200",
              isActive && !mobile ? "text-white" : "",
              isActive && mobile ? "text-primary-600" : ""
            )}
          />
          <span>{label}</span>
        </motion.div>
      )}
    </NavLink>
  );
};

export default NavItem;