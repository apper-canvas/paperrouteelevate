import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ onMobileMenuToggle, title = "PaperRoute Pro" }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-elegant border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="medium"
              onClick={onMobileMenuToggle}
              className="lg:hidden mr-2"
            >
              <ApperIcon name="Menu" size={20} />
            </Button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mr-3">
                <ApperIcon name="Newspaper" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">
                {title}
              </h1>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center text-sm text-gray-600"
            >
              <ApperIcon name="Calendar" size={16} className="mr-2" />
              {new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center"
            >
              <ApperIcon name="User" size={16} className="text-gray-600" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;