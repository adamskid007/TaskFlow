import { useState,useContext } from "react";
import { login } from "../services/authService";
import {AuthContext} from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css"

function Login() {
  const {setUser} = useContext(AuthContext);
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError("")
      const data = await login(formData);

      localStorage.setItem("token", data.token);

      localStorage.setItem("user",JSON.stringify(data.user));
      setUser(data.user);
      navigate("/dashboard")

    } catch (err) {
      setError(err?.response?.data?.message)
    }
  }
  return (

            <div className="auth-container">
          <div className="auth-card">

            <div className="auth-logo">
              <h1> TaskFlow</h1>
            </div>

            <h2>Welcome Back</h2>

            <p className="auth-subtitle">
              Login to continue
            </p>

                <form onSubmit={handleSubmit} className="auth-form">
                <h1>Login</h1>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit" className="auth-btn">Login</button>

                {error && <p>{error}</p>}
              </form>

            <div className="auth-footer">
              Don't have an account?
              {" "} <Link to="/register">              Sign Up
              </Link>

            </div>

          </div>
        </div>

  )
}

export default Login;