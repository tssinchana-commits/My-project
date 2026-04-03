import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const selectedRole = localStorage.getItem("role");

  let username = "";
  let role = "";

  if (token) {
    const decoded = jwtDecode(token);
    username = decoded.username;
    role = decoded.roles ? decoded.roles[0] : "";
  }

  // ⭐ CHECK TOKEN EXPIRY
  useEffect(() => {

    if (token) {

      const decoded = jwtDecode(token);

      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {

        alert("Session expired. Please login again.");

        localStorage.removeItem("token");

        navigate("/");
      }

    }

  }, [navigate, token]);

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 25px",
        background: "#2c3e50",
        color: "white"
      }}
    >

      <h2 style={{ margin: 0 }}>LIFE SAVER FINANCE</h2>

      <div style={{ display: "flex", alignItems: "center" }}>

        <span style={{ marginRight: "15px" }}>
          Logged in as: <b>{username}</b>
        </span>

        <span
          style={{
            marginRight: "20px",
            background: "#3498db",
            padding: "4px 10px",
            borderRadius: "5px",
            fontSize: "14px"
          }}
        >
          Role: {selectedRole}
        </span>

        <button
          onClick={handleLogout}
          style={{
            background: "#e74c3c",
            border: "none",
            color: "white",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;