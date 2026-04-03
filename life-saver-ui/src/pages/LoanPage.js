import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function LoanPage() {
  const { accountNumber } = useParams();
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [amount, setAmount] = useState("");
  const [role, setRole] = useState("VERIFIER");

  // ✅ FIXED (useCallback to remove warning)
  const fetchLoans = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8082/loans");

      const filtered = res.data.filter(
        (loan) => String(loan.accountNumber) === String(accountNumber)
      );

      setLoans(filtered);
    } catch (error) {
      console.error("Error fetching loans:", error);
      alert("Backend error while fetching loans ❌");
    }
  }, [accountNumber]);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  const verifyLoan = async (id) => {
    try {
      await axios.put(`http://localhost:8082/loans/${id}/verify`);
      fetchLoans();
    } catch (err) {
      console.error(err);
    }
  };

  const disburseLoan = async (id) => {
    try {
      await axios.put(`http://localhost:8082/loans/${id}/disburse`);
      fetchLoans();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadDocs = async (id) => {
    try {
      await axios.put(`http://localhost:8082/loans/${id}/upload`);
      fetchLoans();
    } catch (err) {
      console.error(err);
    }
  };

  const submitDocs = async (id) => {
    try {
      await axios.put(`http://localhost:8082/loans/${id}/submit-documents`);
      fetchLoans();
    } catch (err) {
      console.error(err);
    }
  };

  const requestDocs = async (id) => {
    try {
      await axios.put(`http://localhost:8082/loans/${id}/request-documents`);
      fetchLoans();
    } catch (err) {
      console.error(err);
    }
  };

  const applyLoan = async () => {
    try {
      if (!amount) {
        alert("Enter amount");
        return;
      }

      await axios.post("http://localhost:8082/loans", {
        customerId: 18, // TEMP (fix later)
        accountNumber: accountNumber,
        amount: Number(amount),
      });

      setAmount("");
      fetchLoans();
    } catch (error) {
      console.error("Apply loan error:", error);
      alert("Error applying loan ❌");
    }
  };

  const approveLoan = async (id) => {
    try {
      await axios.post(`http://localhost:8082/loans/${id}/approve`);
      fetchLoans();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Loan Management</h2>

      <input
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={applyLoan} style={{ marginLeft: "10px" }}>
        Apply Loan
      </button>

      <hr />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="VERIFIER">Verifier</option>
        <option value="REPRESENTATIVE">Representative</option>
        <option value="MANAGER">Manager</option>
      </select>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Account</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.accountNumber}</td>
              <td>{loan.amount}</td>
              <td>{loan.status}</td>
              <td>

                {role === "REPRESENTATIVE" && loan.status === "DOCUMENTS_REQUESTED" && (
                  <button onClick={() => uploadDocs(loan.id)}>Upload Docs</button>
                )}

                {role === "REPRESENTATIVE" && loan.status === "DOCUMENTS_UPLOADED" && (
                  <button onClick={() => submitDocs(loan.id)}>Submit</button>
                )}

                {role === "VERIFIER" && loan.status === "APPLICATION_SUBMITTED" && (
                  <button onClick={() => requestDocs(loan.id)}>Request Docs</button>
                )}

                {role === "VERIFIER" && loan.status === "DOCUMENTS_UPLOADED" && (
                  <button onClick={() => verifyLoan(loan.id)}>Verify</button>
                )}

                {role === "MANAGER" && loan.status === "VERIFICATION_COMPLETE" && (
                  <button onClick={() => approveLoan(loan.id)}>Approve</button>
                )}

                {role === "MANAGER" && loan.status === "APPROVED" && (
                  <button onClick={() => disburseLoan(loan.id)}>Disburse</button>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}

export default LoanPage;