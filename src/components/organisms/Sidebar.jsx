import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import NavItem from "@/components/molecules/NavItem";
import Button from "@/components/atoms/Button";

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: "Customers", to: "/customers", icon: "Users" },
    { name: "Publications", to: "/publications", icon: "BookOpen" },
    { name: "Billing", to: "/billing", icon: "CreditCard" },
  ];

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-primary-800 to-primary-900 shadow-premium">
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 py-4 border-b border-primary-700">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
            <ApperIcon name="Newspaper" size={20} className="text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-white">PaperRoute Pro</h2>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              to={item.to}
              icon={item.icon}
              label={item.name}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-primary-700">
          <div className="flex items-center text-sm text-primary-200">
            <ApperIcon name="TrendingUp" size={16} className="mr-2" />
            <span>Vendor Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-lifted z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mr-3">
                    <ApperIcon name="Newspaper" size={20} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">PaperRoute Pro</h2>
                </div>
                
                <Button
                  variant="ghost"
                  size="medium"
                  onClick={onClose}
                >
                  <ApperIcon name="X" size={20} />
                </Button>
              </div>
              
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <NavItem
                    key={item.name}
                    to={item.to}
                    icon={item.icon}
                    label={item.name}
                    mobile={true}
                  />
                ))}
              </nav>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <ApperIcon name="TrendingUp" size={16} className="mr-2" />
                  <span>Vendor Dashboard</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;