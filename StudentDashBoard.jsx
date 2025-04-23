import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaCog, FaSignOutAlt, FaUserCircle, FaUserPlus } from "react-icons/fa";

export default function StudentDashboard() {
  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    certificate: null,
  });

  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const studentProfile = {
    name: "John Doe",
    email: "john@example.com",
    course: "",
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.certificate) return alert("Please upload a certificate!");

    const newInternship = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      certificateURL: URL.createObjectURL(formData.certificate),
    };

    setInternships([newInternship, ...internships]);
    setFormData({ title: "", description: "", certificate: null });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Navbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      ></motion.div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-64 bg-white p-6 shadow-md z-10 fixed top-0 left-0 bottom-0 flex flex-col"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FaUserCircle className="text-5xl text-gray-500 mb-2" />
          </motion.div>
          <h2 className="text-lg font-semibold">{studentProfile.name}</h2>
          <p className="text-sm text-gray-500">{studentProfile.email}</p>
          <p className="text-sm text-gray-400">{studentProfile.course}</p>
        </div>

        <nav className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all"
          >
            <FaCog /> Settings
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all"
          >
            <FaUserPlus /> Sign Up
          </motion.button>
        </nav>

        {settingsMenuOpen && (
          <div className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <button className="text-blue-600 hover:text-blue-800">
                Change Password
              </button>
              <button className="text-blue-600 hover:text-blue-800">
                Privacy Settings
              </button>
              <button className="text-blue-600 hover:text-blue-800">
                Logout
                <FaSignOutAlt className="inline ml-2" />
              </button>
            </motion.div>
          </div>
        )}
      </motion.aside>

      {/* Main Content + Footer */}
      <div className="flex-1 flex flex-col ml-64">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-grow p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Upload Internship</h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 shadow rounded"
          >
            <input
              type="text"
              name="title"
              placeholder="Internship Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <input
              type="file"
              name="certificate"
              accept=".pdf"
              onChange={handleChange}
              className="w-full"
              required
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Upload
            </motion.button>
          </form>

          <h3 className="text-xl font-semibold mt-8 mb-4">My Internships</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {internships.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="border rounded shadow p-4 bg-white transition"
              >
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <a
                  href={item.certificateURL}
                  download={`${item.title}-certificate.pdf`}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Download Certificate
                </a>
              </motion.div>
            ))}
          </div>
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white text-center text-sm text-gray-500 py-4 border-t"
        >
          © {new Date().getFullYear()} Internship Portal. All rights reserved.
        </motion.footer>
      </div>
    </div>
  );
}
