import { useEffect, useState } from "react";
import api from "../services/api";

function CustomerList() {

  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    api.get("/customer/api/v1/customers")
      .then(res => {
        console.log("Fetched customers:", res.data) ;
        setCustomers(res.data);
      })
      .catch(err => console.error(err));
  };

  // ✅ ADD CUSTOMER
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      api.put(`/customer/api/v1/customers/${editingId}`, { name })
        .then(() => {
          setEditingId(null);
          setName("");
          fetchCustomers();
        });
    } else {
      // CREATE
      api.post("/customer/api/v1/customers", { name })
        .then(() => {
          setName("");
          fetchCustomers();
        });
    }
  };

  // ✅ DELETE
  const deleteCustomer = (id) => {
    api.delete(`/customer/api/v1/customers/${id}`)
      .then(() => fetchCustomers());
  };

  // ✅ EDIT
  const editCustomer = (customer) => {
    setEditingId(customer.id);
    setName(customer.name);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer List</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      {/* List */}
      {customers.map((customer) => (
        <div key={customer.id} style={{ marginBottom: "10px" }}>
          {customer.name}
          <button onClick={() => editCustomer(customer)} style={{ marginLeft: "10px" }}>
            Edit
          </button>
          <button onClick={() => deleteCustomer(customer.id)} style={{ marginLeft: "5px" }}>
            Delete
          </button>
        </div>
      ))}

    </div>
  );

}

export default CustomerList;