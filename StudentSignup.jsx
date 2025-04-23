import React, { useState } from "react";

export default function StudentSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    usn: "",
    section: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    const { name, email, usn, section, password, confirmPassword } = formData;

    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      errors.email = "Invalid email format.";

    if (!usn) errors.usn = "USN is required.";
    if (!section) errors.section = "Section is required.";

    if (!password) errors.password = "Password is required.";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters.";

    if (!confirmPassword) errors.confirmPassword = "Confirm your password.";
    else if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSuccessMsg("Account created successfully!");
      setFormData({
        name: "",
        email: "",
        usn: "",
        section: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Student Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">USN</label>
            <input
              type="text"
              name="usn"
              value={formData.usn}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {formErrors.usn && (
              <p className="text-red-500 text-sm">{formErrors.usn}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {formErrors.section && (
              <p className="text-red-500 text-sm">{formErrors.section}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Signup
          </button>
          {successMsg && (
            <p className="text-green-600 text-center mt-2">{successMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
