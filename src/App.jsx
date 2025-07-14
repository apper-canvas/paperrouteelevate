import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/organisms/Layout";
import Customers from "@/components/pages/Customers";
import Publications from "@/components/pages/Publications";
import Billing from "@/components/pages/Billing";

const App = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Customers />} />
          <Route path="customers" element={<Customers />} />
          <Route path="publications" element={<Publications />} />
          <Route path="billing" element={<Billing />} />
        </Route>
      </Routes>
    </motion.div>
  );
};

export default App;