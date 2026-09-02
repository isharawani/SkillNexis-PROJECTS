import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear old errors
    setLoginError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(
        "Password must be at least 6 characters"
      );
      isValid = false;
    }

    // Stop if validation fails
    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token using Context API
      login(response.data.token);

      // Go to protected task page
      navigate("/tasks");
    } catch (error) {
      setLoginError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <p>Week 3 — Login</p>
      </header>

      <main>
        <form
          onSubmit={handleLogin}
          className="task-form"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Login</h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {emailError && (
            <p style={{ color: "red" }}>
              {emailError}
            </p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {passwordError && (
            <p style={{ color: "red" }}>
              {passwordError}
            </p>
          )}

          {/* Login button */}
          <button type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Backend login error */}
          {loginError && (
            <p style={{ color: "red" }}>
              {loginError}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}

export default Login;