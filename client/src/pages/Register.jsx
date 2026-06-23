import { useState } from "react";
import { register } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const data = await register(formData)
      console.log(data);
     navigate("/login")
      
    } catch (err) {
      setError(err?.response?.data?.message || "Registration Failed");
    }finally{
      setLoading(false)
    }
  }
  return (

    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-logo">
          <h1>TaskFlow</h1>
        </div>
        <p className="auth-subtitle">
          Sign up here to continue
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <h1>Register</h1>
          <input type="text" name={formData.name} placeholder="Enter username..." onChange={(e) =>{ setFormData({...formData, name:e.target.value})}}/>
          <input type="email" name={formData.email} placeholder="Enter Email..." onChange={(e) =>{ setFormData({...formData, email:e.target.value})}}/>
          <input type="password" name={formData.password} placeholder="Enter Password..." onChange={(e) =>{ setFormData({...formData, password:e.target.value})}}/>
          <button type="submit" className="auth-btn" disabled={loading}>{loading ? "Creating Account..." : "Register"}</button>

          {error && <p> {error}</p>}
        </form>

        <div className="auth-footer">
          Already have an account?
          {" "} <Link to="/login"> Login here</Link>
          
        </div>

      </div>
    </div>

  )
}

export default Register;