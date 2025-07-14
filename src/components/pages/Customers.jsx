import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import CustomerTable from "@/components/organisms/CustomerTable";
import CustomerForm from "@/components/organisms/CustomerForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { customerService } from "@/services/api/customerService";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (err) {
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await customerService.delete(customerId);
        setCustomers(customers.filter(c => c.Id !== customerId));
      } catch (err) {
        setError("Failed to delete customer");
      }
    }
  };

  const handleSaveCustomer = async (customerData) => {
    try {
      if (editingCustomer) {
        const updatedCustomer = await customerService.update(editingCustomer.Id, customerData);
        setCustomers(customers.map(c => 
          c.Id === editingCustomer.Id ? updatedCustomer : c
        ));
      } else {
        const newCustomer = await customerService.create(customerData);
        setCustomers([...customers, newCustomer]);
      }
      setShowForm(false);
      setEditingCustomer(null);
    } catch (err) {
      throw new Error("Failed to save customer");
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadCustomers} />;

  if (showForm) {
    return (
      <CustomerForm
        customer={editingCustomer}
        onSave={handleSaveCustomer}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your customer database and subscriptions
          </p>
        </div>
        <Button onClick={handleAddCustomer} className="flex items-center mt-4 sm:mt-0">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search customers..."
          className="flex-1 sm:max-w-md"
        />
        
        <div className="flex items-center text-sm text-gray-600">
          <ApperIcon name="Users" size={16} className="mr-2" />
          {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? "s" : ""}
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <Empty
          icon="Users"
          title="No customers found"
          description={searchTerm ? "Try adjusting your search terms" : "Add your first customer to get started"}
          actionText="Add Customer"
          onAction={searchTerm ? undefined : handleAddCustomer}
        />
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />
      )}
    </motion.div>
  );
};

export default Customers;