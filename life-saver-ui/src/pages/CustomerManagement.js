import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { canAddCustomer, canEditCustomer } from "../utils/permissions"; 
import { getUserRole, isTokenExpired, logout } from "../utils/auth";
import Navbar from "../components/Navbar";
import axios from "axios";

function CustomerManagement() {

  const [customers, setCustomers] = useState([]);
  const [accountsMap, setAccountsMap] = useState({});

  const navigate = useNavigate();
  const role = getUserRole();

  useEffect(() => {

    if (isTokenExpired()) {
      alert("Session expired. Please login again.");
      logout();
      navigate("/");
      return;
    }

    fetchCustomers();
    fetchAccounts();

  }, []);

  const fetchCustomers = () => {
    api
      .get("/customer/api/v1/customers")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
      });
  };

  // ✅ FIXED ACCOUNT MAPPING
  const fetchAccounts = async () => {
    try {
      const res = await axios.get("http://localhost:8082/accounts");

      console.log("Accounts API:", res.data); // DEBUG

      const map = {};
      res.data.forEach(acc => {
        map[String(acc.customerId)] = acc.accountNumber; // 🔥 safer
      });

      console.log("Accounts Map:", map); // DEBUG

      setAccountsMap(map);

    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const getFilteredCustomers = () => {

    if (role === "VERIFIER") {
      return customers.filter((c) => c.customerStatus === "CREATED");
    }

    if (role === "MANAGER") {
      return customers.filter((c) => c.customerStatus === "VERIFIED");
    }

    if (role === "REPRESENTATIVE") {
      return customers;
    }

    return customers;
  };

  const filteredCustomers = getFilteredCustomers();

  const getStatusBadge = (status) => {

    const style = {
      padding: "4px 10px",
      borderRadius: "12px",
      color: "white",
      fontSize: "12px",
      fontWeight: "bold"
    };

    switch (status) {
      case "CREATED":
      case "SUBMITTED":
        return <span style={{ ...style, background: "#f39c12" }}>{status}</span>;

      case "VERIFIED":
        return <span style={{ ...style, background: "#3498db" }}>{status}</span>;

      case "ACTIVE":
        return <span style={{ ...style, background: "#2ecc71" }}>{status}</span>;

      case "REJECTED":
        return <span style={{ ...style, background: "#e74c3c" }}>{status}</span>;

      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div>

      <Navbar />

      <div style={{ width: "90%", margin: "40px auto" }}>

        <h2>Customer Management</h2>

        <div style={{ marginBottom: "20px" }}>
          {canAddCustomer(role) && (
            <button
              onClick={() => navigate("/add")}
              style={{
                background: "#2ecc71",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              + Add New Customer
            </button>

            
          )}
        </div>

        <h3>Customer List</h3>

        <table
          border="1"
          width="100%"
          cellPadding="10"
          style={{ borderCollapse: "collapse" }}
        >
          <thead style={{ background: "#f0f0f0" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Account</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="6" align="center">
                  No Customers Available For {role}
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => {

                const accountNumber = accountsMap[String(customer.id)];

                return (
                  <tr key={customer.id}>

                    <td>{customer.id}</td>

                    {/* NAME CLICK */}
                    <td
                      style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                      onClick={() =>
                        navigate(`/customer/${customer.id}`, {
                          state: { role: role }
                        })
                      }
                    >
                      {customer.name}
                    </td>

                    <td>{customer.phone}</td>
                    <td>{getStatusBadge(customer.customerStatus)}</td>

                    {/* ✅ ACCOUNT COLUMN FIXED */}
                    <td>
                      {accountNumber ? (
                        <span
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() =>
                            navigate(`/accounts/${accountsMap[String(customer.id)]}`)
                          }
                        >
                          {accountNumber}
                        </span>
                      ) : (
                        "No Account"
                      )}
                    </td>

                    <td>
                      {canEditCustomer(role) && (
                        <button
                          onClick={() =>
                            navigate(`/customer/${customer.id}/edit`, {
                              state: { role: role }
                            })
                          }
                        >
                          Edit
                        </button>
                      )}
                    </td>

                  </tr>
                );
              })
            )}

          </tbody>
        </table>

      </div>
    </div>
  );
}

export default CustomerManagement;