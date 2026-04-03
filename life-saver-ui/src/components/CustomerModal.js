import React, { useState } from "react";
import "./CustomerModal.css";

function CustomerModal({ customer, isEditing, onClose, onSave }) {
  const [editedCustomer, setEditedCustomer] = useState(customer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({
      ...editedCustomer,
      [name]: value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Customer Details</h3>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={editedCustomer.name}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={editedCustomer.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={editedCustomer.status}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <label>KYC:</label>
        <input
          type="text"
          name="kyc"
          value={editedCustomer.kyc}
          onChange={handleChange}
          disabled={!isEditing}
        />

        <div style={{ marginTop: "15px" }}>
          {isEditing && (
            <button onClick={() => onSave(editedCustomer)}>
              💾 Save
            </button>
          )}

          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerModal;