import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import { toast } from "react-toastify";

const CustomerForm = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    address: customer?.address || "",
    phone: customer?.phone || "",
    status: customer?.status || "active",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (123) 456-7890";
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

  const handlePhoneChange = (value) => {
    const cleaned = value.replace(/\D/g, "");
    let formatted = cleaned;
    
    if (cleaned.length >= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 3) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    }
    
    handleInputChange("phone", formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave(formData);
      toast.success(`Customer ${customer ? "updated" : "created"} successfully`);
    } catch (error) {
      toast.error("Failed to save customer");
    } finally {
      setIsSubmitting(false);
    }
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
          {customer ? "Edit Customer" : "Add New Customer"}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {customer ? "Update customer information" : "Enter customer details below"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Customer Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          error={errors.name}
          placeholder="Enter customer name"
          required
        />

        <FormField
          label="Address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          error={errors.address}
          placeholder="Enter customer address"
          required
        />

        <FormField
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          error={errors.phone}
          placeholder="(123) 456-7890"
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
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
            {customer ? "Update Customer" : "Add Customer"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CustomerForm;