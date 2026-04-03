import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeader } from "../utils/auth";
import { useParams, useNavigate } from "react-router-dom";

function AccountsTable() {
  const { accountNumber } = useParams();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [balances, setBalances] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get("http://localhost:8082/accounts");
      if (accountNumber) {
  const filtered = res.data.filter(
    (acc) => acc.accountNumber === accountNumber
  );
  setAccounts(filtered);
} else {
  setAccounts(res.data);
}

      res.data.forEach(async (acc) => {
        const balRes = await axios.get(
          `http://localhost:8082/accounts/${acc.accountNumber}/balance`
        );
        setBalances((prev) => ({
          ...prev,
          [acc.accountNumber]: balRes.data,
        }));
      });
    } catch (err) {
      console.error(err);
    }
  };

  // CREDIT
  const credit = async (accountNumber) => {
    try {
      const amount = amounts[accountNumber];

      if (!amount || amount <= 0) {
        alert("Enter valid amount");
        return;
      }

      await axios.post(
        `http://localhost:8082/accounts/${accountNumber}/credit`,
        { amount: Number(amount) },
        { headers: getAuthHeader() }
      );

      alert("Credited successfully");
      fetchAccounts();

      setAmounts({ ...amounts, [accountNumber]: "" });

    } catch (error) {
      console.error(error);
      alert("Credit failed");
    }
  };

  // DEBIT
  const debit = async (accountNumber) => {
    try {
      const amount = amounts[accountNumber];
      const currentBalance = balances[accountNumber];

      if (!amount || amount <= 0) {
        alert("Enter valid amount");
        return;
      }

      if (Number(amount) > currentBalance) {
        alert("Insufficient balance ❌");
        return;
      }

      await axios.post(
        `http://localhost:8082/accounts/${accountNumber}/debit`,
        { amount: Number(amount) },
        { headers: getAuthHeader() }
      );

      alert("Debited successfully");
      fetchAccounts();

      setAmounts({ ...amounts, [accountNumber]: "" });

    } catch (error) {
      console.error(error);
      alert("Debit failed");
    }
  };

  // TRANSACTIONS
  const fetchTransactions = async (accountNumber) => {
    try {
      const res = await axios.get(
        `http://localhost:8082/accounts/${accountNumber}/transactions`,
        { headers: getAuthHeader() }
      );

      setTransactions(res.data);
      setSelectedAccount(accountNumber);

    } catch (error) {
      console.error(error);
      alert("Failed to fetch transactions");
    }
  };

  //Interest Calculation
  const applyInterest = async (accountNumber) => {
  try {
    const res = await axios.post(
      `http://localhost:8082/accounts/${accountNumber}/interest`,
      {},
      {
        headers: getAuthHeader()
      }
    );

    const updatedAccount = res.data;

    // ✅ Update only that account in UI
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.accountNumber === accountNumber
          ? { ...acc, balance: updatedAccount.balance }
          : acc
      )
    );

    alert("Interest applied successfully");

  } catch (error) {
    console.error(error);
    alert("Interest failed");
  }
};

  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>

        <h2>Accounts Dashboard</h2>

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead style={{ backgroundColor: "#2c3e50", color: "white" }}>
            <tr>
              <th>Account Number</th>
              <th>Customer ID</th>
              <th>Status</th>
              <th>Balance</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

         <tbody>
  {accounts.map((acc) => (
    <tr key={acc.id}>
      
      {/* ✅ UPDATED THIS */}
      <td
        style={{
          textAlign: "center",
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline"
        }}
        onClick={() =>
          navigate(`/transactions/${acc.accountNumber}`)
        }
      >
        {acc.accountNumber}
      </td>

      <td style={{ textAlign: "center" }}>{acc.customerId}</td>
      <td style={{ textAlign: "center" }}>{acc.status}</td>

      <td style={{
        textAlign: "center",
        color: balances[acc.accountNumber] < 0 ? "red" : "green",
        fontWeight: "bold"
      }}>
        ₹ {balances[acc.accountNumber] || 0}
      </td>

      <td style={{ textAlign: "center" }}>
        <input
          type="number"
          placeholder="Amount"
          value={amounts[acc.accountNumber] || ""}
          onChange={(e) =>
            setAmounts({
              ...amounts,
              [acc.accountNumber]: e.target.value
            })
          }
          style={{
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100px"
          }}
        />
      </td>

      <td style={{ textAlign: "center" }}>
        <button
          onClick={() => credit(acc.accountNumber)}
          style={{
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            padding: "8px 12px",
            marginRight: "5px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Credit
        </button>

        <button
          onClick={() => debit(acc.accountNumber)}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            padding: "8px 12px",
            marginRight: "5px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Debit
        </button>

        <button
          onClick={() => fetchTransactions(acc.accountNumber)}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Transactions
        </button>

        <button
          onClick={() => applyInterest(acc.accountNumber)}
          style={{
            marginLeft: "10px",
            background: "#9b59b6",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Interest
        </button>

        <button
  onClick={() => navigate(`/loans/${acc.accountNumber}`)}
  style={{
    marginLeft: "5px",
    background: "#f39c12",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Loan
</button>

<button
  onClick={() => navigate(`/apply-loan/${accountNumber}`,{state:{customerId:acc.customerId}})}
  style={{
    marginLeft: "5px",
    background: "#f39c12",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Apply Loan
</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>


        {/* TRANSACTIONS TABLE */}
        {selectedAccount && (
          <div style={{ marginTop: "30px" }}>
            <h3>Transactions for {selectedAccount}</h3>

            <table border="1" cellPadding="10" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="3">No transactions found</td>
                  </tr>
                ) : (
                  transactions.map((txn, index) => (
                    <tr key={index}>
                      <td>{txn.transactionType}</td>
                      <td>{txn.amount}</td>
                      <td>{txn.transactionDateTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
<button onClick={() => navigate(-1)}>⬅ Back</button>
      </div>
    </div>
  );
}

export default AccountsTable;