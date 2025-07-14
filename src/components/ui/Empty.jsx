import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  icon = "Package",
  title = "No items found",
  description = "Get started by adding your first item.",
  actionText = "Add Item",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} size={40} className="text-primary-600" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-xl font-semibold text-gray-900 mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-gray-600 text-center max-w-md mb-6"
      >
        {description}
      </motion.p>
      
      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Button onClick={onAction} className="flex items-center">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {actionText}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Empty;