import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AccountTransactions() {

  const { accountNumber } = useParams();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    console.log("Account Number:",accountNumber);
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
        console.log("Calling API...");
      const res = await axios.get(
        `http://localhost:8082/accounts/${accountNumber}/transactions`
      );

      console.log("API Response:",res.data);
      setTransactions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <h2>Transaction History</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.transactionType}</td>
              <td>{txn.amount}</td>
              <td>{txn.transactionDateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountTransactions;