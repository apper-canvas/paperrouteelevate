import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { customerService } from "@/services/api/customerService";
import { publicationService } from "@/services/api/publicationService";

const Billing = () => {
  const [customers, setCustomers] = useState([]);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [customersData, publicationsData] = await Promise.all([
        customerService.getAll(),
        publicationService.getAll()
      ]);
      setCustomers(customersData);
      setPublications(publicationsData);
    } catch (err) {
      setError("Failed to load billing data");
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const activeCustomers = customers.filter(c => c.status === "active").length;
    const totalRevenue = publications.reduce((sum, pub) => sum + pub.price, 0) * activeCustomers;
    const totalPublications = publications.length;
    
    return {
      activeCustomers,
      totalRevenue,
      totalPublications,
      pendingCustomers: customers.filter(c => c.status === "pending").length
    };
  };

  if (loading) return <Loading type="grid" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const stats = getStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing Overview</h1>
          <p className="text-sm text-gray-600 mt-1">
            Monitor your revenue and customer billing status
          </p>
        </div>
        <Button className="flex items-center mt-4 sm:mt-0">
          <ApperIcon name="FileText" size={16} className="mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold gradient-text">{stats.activeCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-success-100 to-success-200 rounded-lg flex items-center justify-center">
              <ApperIcon name="Users" size={24} className="text-success-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold gradient-text">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
              <ApperIcon name="DollarSign" size={24} className="text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Publications</p>
              <p className="text-2xl font-bold gradient-text">{stats.totalPublications}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-info-100 to-info-200 rounded-lg flex items-center justify-center">
              <ApperIcon name="BookOpen" size={24} className="text-info-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold gradient-text">{stats.pendingCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-warning-100 to-warning-200 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" size={24} className="text-warning-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Customers</h3>
            <Button variant="ghost" size="small">
              View All
            </Button>
          </div>
          
          {customers.length === 0 ? (
            <Empty
              icon="Users"
              title="No customers yet"
              description="Add customers to start billing"
              actionText="Add Customer"
            />
          ) : (
            <div className="space-y-3">
              {customers.slice(0, 5).map((customer) => (
                <div key={customer.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mr-3">
                      <ApperIcon name="User" size={16} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.phone}</p>
                    </div>
                  </div>
                  <Badge variant={customer.status === "active" ? "success" : customer.status === "pending" ? "warning" : "error"}>
                    {customer.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Publication Prices</h3>
            <Button variant="ghost" size="small">
              View All
            </Button>
          </div>
          
          {publications.length === 0 ? (
            <Empty
              icon="BookOpen"
              title="No publications yet"
              description="Add publications to manage pricing"
              actionText="Add Publication"
            />
          ) : (
            <div className="space-y-3">
              {publications.slice(0, 5).map((publication) => (
                <div key={publication.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-info-100 to-info-200 rounded-full flex items-center justify-center mr-3">
                      <ApperIcon name="BookOpen" size={16} className="text-info-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{publication.name}</p>
                      <p className="text-xs text-gray-500">{publication.frequency}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ${publication.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </motion.div>
  );
};

export default Billing;