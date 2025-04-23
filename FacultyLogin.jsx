import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FacultyLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        const response = await loginFaculty(formData);
        alert("Login successful!");
        navigate("/faculty-dashboard");
      } catch (error) {
        setApiError(error.message || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const loginFaculty = async ({ email, password }) => {
    const response = await fetch("http://localhost:5000/api/faculty/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }

    const data = await response.json();
    return data;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#CAF0F8]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-[#ADE8F4]">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#03045E]">
          Faculty Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#023E8A] mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "border-[#90E0EF]"
              } focus:ring-[#48CAE4]`}
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-[#023E8A] mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : "border-[#90E0EF]"
              } focus:ring-[#48CAE4]`}
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

          <button
            type="submit"
            className="w-full bg-[#023E8A] hover:bg-[#0077B6] text-white font-bold py-2 px-4 rounded transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-4 text-center text-sm text-[#0077B6]">
            Don’t have an account?{" "}
            <Link
              to="/faculty-signup"
              className="text-[#0096C7] hover:underline font-semibold"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
