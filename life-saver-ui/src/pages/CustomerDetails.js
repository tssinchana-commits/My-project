import React, { useEffect, useState } from "react";
import { canVerify, canReject, canActivate, canManagerReject } from "../utils/permissions";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = location.state?.role || "VERIFIER";

  const [customer, setCustomer] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    api.get(`/customer/api/v1/customers/${id}`)
      .then(res => setCustomer(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const updateStatus = async (newStatus) => {
    try {
      await api.put(
        `/customer/api/v1/customers/${id}/status`,
        {
          status: newStatus,
          role: userRole,
          username: "Sinchana",
          remarks: remarks
        }
      );

      alert("Status Updated Successfully");
      const updated = await api.get(`/customer/api/v1/customers/${id}`);
      setCustomer(updated.data);
      setRemarks("");

    } catch (error) {
      console.error(error);
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div style={{
      width: "70%",
      margin: "40px auto",
      background: "#f5f5f5",
      padding: "20px",
      borderRadius: "8px"
    }}>

      <h2>CUSTOMER: {customer.name}</h2>

      <div style={{ display: "flex", gap: "30px" }}>

        {/* LEFT SIDE IMAGE */}
        <div>
          {customer.imagePath && (
            <img
              src={`http://localhost:8080/${customer.imagePath}`}
              alt="Customer"
              width="180"
              style={{ borderRadius: "8px" }}
            />
          )}
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div>
          <p><b>Name:</b> {customer.name}</p>
          <p><b>Phone:</b> {customer.phone}</p>
          <p><b>Status:</b> {customer.customerStatus}</p>
          <p><b>KYC:</b> {customer.kyc}</p>
          <p><b>Aadhaar:</b> {customer.aadhaar}</p>
          <p><b>PAN:</b> {customer.pan}</p>
        </div>
      </div>

      <hr />

      <h3>Audit Info</h3>
      <p><b>Created By:</b> {customer.createdBy || "-"}</p>
      <p><b>Verified By:</b> {customer.verifiedBy || "-"}</p>
      <p><b>Approved By:</b> {customer.approvedBy || "-"}</p>
      <p><b>Remarks:</b> {customer.remarks || "-"}</p>

      <hr />

      <p><b>Current Role:</b> {userRole}</p>

      <textarea
        placeholder="Enter remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        style={{ width: "100%", marginBottom: "15px" }}
      />

      {/* ROLE BASED BUTTONS */}

      {canVerify(userRole, customer.customerStatus) && (
        <button onClick={() => updateStatus("VERIFIED")}>
          Verify
        </button>
      )}

      {canReject(userRole, customer.customerStatus) && (
        <button onClick={() => updateStatus("REJECTED")}>
          Reject
        </button>
      )}

      {canActivate(userRole, customer.customerStatus) && (
        <button onClick={() => updateStatus("ACTIVE")}>
          Activate
        </button>
      )}

      {canManagerReject(userRole, customer.customerStatus) && (
        <button onClick={() => updateStatus("MANAGER_REJECTED")}>
          Manager Reject
        </button>
      )}

      <br /><br />

      <button onClick={() => navigate(-1)}>⬅ Back</button>

    </div>
  );
}

export default CustomerDetails;