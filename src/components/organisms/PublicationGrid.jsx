import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const PublicationGrid = ({ publications, onEdit, onDelete }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "newspaper":
        return "Newspaper";
      case "magazine":
        return "BookOpen";
      case "journal":
        return "Book";
      default:
        return "FileText";
    }
  };

  const getTypeVariant = (type) => {
    switch (type) {
      case "newspaper":
        return "primary";
      case "magazine":
        return "success";
      case "journal":
        return "info";
      default:
        return "default";
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {publications.map((publication, index) => (
        <motion.div
          key={publication.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card hoverable className="h-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mr-3">
                    <ApperIcon 
                      name={getTypeIcon(publication.type)} 
                      size={24} 
                      className="text-primary-600" 
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {publication.name}
                    </h3>
                    <Badge variant={getTypeVariant(publication.type)} size="small">
                      {publication.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => onEdit(publication)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <ApperIcon name="Edit" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => onDelete(publication.Id)}
                    className="text-error-600 hover:text-error-700"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Price</span>
                  <span className="text-lg font-bold gradient-text">
                    {formatPrice(publication.price)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Frequency</span>
                  <div className="flex items-center text-sm text-gray-900">
                    <ApperIcon name="Calendar" size={14} className="mr-1" />
                    {publication.frequency}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PublicationGrid;