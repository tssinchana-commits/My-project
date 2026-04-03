import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddCustomer() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    customerStatus: "CREATED",
    kyc: "",
    aadhaar: "",
    pan: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", customer.name);
      formData.append("phone", customer.phone);
      formData.append("customerStatus", "CREATED"); // default
      formData.append("kyc", customer.kyc);
      formData.append("aadhaar", customer.aadhaar);
      formData.append("pan", customer.pan);

      if (selectedFile) {
        formData.append("photo", selectedFile);
      }

      await api.post(
        "/customer/api/v1/customers",
        formData
      );

      alert("Customer Added Successfully!");
      navigate("/"); // back to main page

    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Error adding customer");
    }
  };

  return (
    <div style={{
      width: "50%",
      margin: "40px auto",
      background: "#f5f5f5",
      padding: "20px",
      borderRadius: "8px"
    }}>
      <h2>Add New Customer</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="kyc"
          value={customer.kyc}
          onChange={handleChange}
          placeholder="KYC"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="aadhaar"
          value={customer.aadhaar}
          onChange={handleChange}
          placeholder="Aadhaar"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="pan"
          value={customer.pan}
          onChange={handleChange}
          placeholder="PAN"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: "15px" }}
        />

        <br />

        <button type="submit"
          style={{
            background: "#2ecc71",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Save
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            marginLeft: "10px",
            padding: "8px 15px"
          }}
        >
          Cancel
        </button>

<button onClick={() => navigate(-1)}>⬅ Back</button>
      </form>
    </div>
  );
}

export default AddCustomer;