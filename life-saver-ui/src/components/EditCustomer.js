import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    status: "",
    kyc: "",
    aadhaar: "",
    pan: ""
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // 🔹 Fetch existing customer data
  useEffect(() => {
      api
      .get(`/customer/api/v1/customers/${id}`)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        console.error("Error fetching customer:", err);
      });
  }, [id]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle file change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // 🔹 Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", customer.name);
    formData.append("phone", customer.phone);
    formData.append("status", customer.status);
    formData.append("kyc", customer.kyc);
    formData.append("aadhaar", customer.aadhaar);
    formData.append("pan", customer.pan);

    if (selectedFile) {
      formData.append("photo", selectedFile);
    }

    try {
      await api.put(
        `/customer/api/v1/customers/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Customer updated successfully!");
      navigate("/"); // change if your route is different
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating customer");
    }
  };

  return (
    <div>
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <input
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />

        <input
          type="text"
          name="status"
          value={customer.status}
          onChange={handleChange}
          placeholder="Status"
          required
        />

        <input
          type="text"
          name="kyc"
          value={customer.kyc}
          onChange={handleChange}
          placeholder="KYC"
          required
        />

        <input
          type="text"
          name="aadhaar"
          value={customer.aadhaar}
          onChange={handleChange}
          placeholder="Aadhaar"
        />

        <input
          type="text"
          name="pan"
          value={customer.pan}
          onChange={handleChange}
          placeholder="PAN"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit">Update</button>
        <button onClick={() => navigate(-1)}>⬅ Back</button>
      </form>
    </div>
    
  );
};

export default EditCustomer;