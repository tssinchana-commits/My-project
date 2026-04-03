import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]= useState("REPRESENTATIVE");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:4000/generate-token",
        {
          username,
          password,
          role
        }
      );

      const token = res.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      navigate("/customers");

    } catch (error) {

      alert("Invalid login");

    }

  };

  return (

    <div style={{ width: "300px", margin: "100px auto", textAlign: "center" }}>

      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <label>Select Role</label>

<select
  value={role}
  onChange={(e) => setRole(e.target.value)}
>

<option value="REPRESENTATIVE">REPRESENTATIVE</option>
<option value="VERIFIER">VERIFIER</option>
<option value="MANAGER">MANAGER</option>
<option value="ADMIN">ADMIN</option>

</select>

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          background: "#3498db",
          color: "white",
          border: "none"
        }}
      >
        Login
      </button>

    </div>

  );
}

export default Login;