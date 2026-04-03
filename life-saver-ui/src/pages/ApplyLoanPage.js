import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function ApplyLoanPage() {
  const { accountNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const customerId = location.state?.customerId; // Get customerId from state
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const applyLoan = async () => {
    try {
      if (!amount || amount <= 0) {
        alert("Please enter valid amount");
        return;
      }

      setLoading(true);

      await axios.post("http://localhost:8082/loans", {
        customerId: customerId, 
        accountNumber: accountNumber,
        amount: Number(amount),
      });

      alert("Loan applied successfully ✅");

      navigate(`/loans/${accountNumber}`); // go to approval page

    } 
   catch (error) {
  console.error(error);

  const message =
    error.response?.data?.message || "Loan application failed ❌";

  alert(message);
}
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          width: "400px",
          margin: "auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Apply Loan</h2>

        <p>
          <strong>Account Number:</strong> {accountNumber}
        </p>

        <input
          type="number"
          placeholder="Enter Loan Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            marginTop: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={applyLoan}
          disabled={loading}
          style={{
            marginTop: "20px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            padding: "10px",
            width: "100%",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Applying..." : "Apply Loan"}
        </button>

        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "10px",
            backgroundColor: "#95a5a6",
            color: "white",
            border: "none",
            padding: "8px",
            width: "100%",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ApplyLoanPage;