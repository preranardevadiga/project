import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../utils/api";

export default function FacultySignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    facultyId: "",
    department: "",
    designation: "",
    specialization: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.facultyId) newErrors.facultyId = "Faculty ID is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/signup`, formData);
        alert("Signup successful!");
        console.log(res.data);
      } catch (error) {
        alert(error.response?.data?.message || "Signup failed");
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Faculty Signup
        </h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Faculty ID", name: "facultyId", type: "text" },
            {
              label: "Specialization (Optional)",
              name: "specialization",
              type: "text",
              optional: true,
            },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
            },
          ].map(({ label, name, type }) => (
            <div className="mb-4" key={name}>
              <label className="block text-gray-700 mb-2">{label}</label>
              <input
                className={`w-full px-3 py-2 border rounded ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                }`}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Department</label>
            <select
              name="department"
              className={`w-full px-3 py-2 border rounded ${
                errors.department ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Business Administration">
                Business Administration
              </option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm">{errors.department}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Designation</label>
            <select
              name="designation"
              className={`w-full px-3 py-2 border rounded ${
                errors.designation ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.designation}
              onChange={handleChange}
            >
              <option value="">Select Designation</option>
              <option value="Professor">Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Lecturer">Lecturer</option>
              <option value="Instructor">Instructor</option>
            </select>
            {errors.designation && (
              <p className="text-red-500 text-sm">{errors.designation}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
