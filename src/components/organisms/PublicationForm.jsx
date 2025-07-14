import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import { toast } from "react-toastify";

const PublicationForm = ({ publication, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: publication?.name || "",
    price: publication?.price || "",
    type: publication?.type || "newspaper",
    frequency: publication?.frequency || "daily",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Publication name is required";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handlePriceChange = (value) => {
    const numericValue = parseFloat(value) || "";
    handleInputChange("price", numericValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave({
        ...formData,
        price: parseFloat(formData.price),
      });
      toast.success(`Publication ${publication ? "updated" : "created"} successfully`);
    } catch (error) {
      toast.error("Failed to save publication");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-elegant border border-gray-200 p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {publication ? "Edit Publication" : "Add New Publication"}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {publication ? "Update publication information" : "Enter publication details below"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Publication Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          error={errors.name}
          placeholder="Enter publication name"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type <span className="text-error-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="newspaper">Newspaper</option>
              <option value="magazine">Magazine</option>
              <option value="journal">Journal</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Frequency <span className="text-error-500">*</span>
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => handleInputChange("frequency", e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Price <span className="text-error-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">$</span>
            </div>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => handlePriceChange(e.target.value)}
              placeholder="0.00"
              className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
          {errors.price && (
            <p className="text-sm text-error-600 flex items-center">
              <span className="mr-1">⚠</span>
              {errors.price}
            </p>
          )}
          {formData.price && (
            <p className="text-sm text-gray-600">
              Preview: {formatPrice(formData.price)}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {publication ? "Update Publication" : "Add Publication"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default PublicationForm;