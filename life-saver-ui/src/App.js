import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import CustomerManagement from "./pages/CustomerManagement";
import AddCustomer from "./pages/AddCustomer";
import CustomerDetails from "./pages/CustomerDetails";
import EditCustomer from "./components/EditCustomer";
import ProtectedRoute from "./utils/ProtectedRoute";
import AccountsTable from "./pages/AccountsTable";
import AccountTransactions from "./pages/AccountTransactions";
import LoanPage from "./pages/LoanPage";
import ApplyLoanPage from "./pages/ApplyLoanPage";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/customers"
          element={
            <ProtectedRoute allowedRoles={["ADMIN","VERIFIER","MANAGER","REPRESENTATIVE"]}>
              <CustomerManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute allowedRoles={["REPRESENTATIVE","ADMIN"]}>
              <AddCustomer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/:id"
          element={
            <ProtectedRoute allowedRoles={["VERIFIER","MANAGER","ADMIN"]}>
              <CustomerDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["REPRESENTATIVE","ADMIN"]}>
              <EditCustomer />
            </ProtectedRoute>
          }
        />

        {/* ACCOUNTS */}
        <Route
          path="/accounts/:accountNumber"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}>
              <AccountsTable />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions/:accountNumber"
          element={<AccountTransactions />}
        />

        {/* LOAN FLOW */}
        <Route
          path="/apply-loan/:accountNumber"
          element={<ApplyLoanPage />}
        />

        <Route
          path="/loans/:accountNumber"
          element={<LoanPage />}
        />

      </Routes>
    </Router>
  );
}

export default App;