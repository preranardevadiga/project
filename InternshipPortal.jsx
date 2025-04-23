import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function InternshipPortal() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const highlightSection = (section) => {
    setActiveSection(section);
    setTimeout(() => setActiveSection(null), 1500);
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000`}
    >
      {/* Header */}
      <header
        className={`bg-gray-900 text-white p-4 ${
          isLoaded ? "translate-y-0" : "-translate-y-full"
        } transform transition-transform duration-700`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-xl font-medium flex items-center">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v15"
                  />
                </svg>
              </span>
              <span className="animate-pulse">Internship Portal</span>
            </div>
          </div>
          <nav className="flex items-center space-x-4">
            <Link
              to="/student-login"
              className="hover:underline transform hover:scale-105 transition-transform duration-300"
            >
              Student Login
            </Link>
            <Link
              to="/faculty-login"
              className="hover:underline transform hover:scale-105 transition-transform duration-300"
            >
              Faculty Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className={`bg-gray-100 py-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-all duration-1000`}
      >
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h1
            className={`text-5xl font-bold text-gray-800 mb-4 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            } transition-all duration-700`}
          >
            Internship Portal
          </h1>
          <p
            className={`text-xl text-gray-600 mb-6 max-w-xl ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            } transition-all duration-700 delay-300`}
          >
            Platform for students to find internships exclusively available for
            your college!
          </p>
          <button
            className={`border border-gray-400 text-gray-600 px-6 py-2 rounded hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-105 hover:shadow-lg ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            } transition-all duration-500`}
          >
            Know More
          </button>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Students Section */}
          <div
            className={`bg-gray-800 text-white p-8 rounded-lg ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0"
            } ${
              activeSection === "students" ? "ring-4 ring-blue-500" : ""
            } transform transition-all duration-700`}
            onClick={() => highlightSection("students")}
          >
            <h2 className="text-3xl font-bold mb-4 text-center">
              For Students
            </h2>
            <p className="text-center mb-12">
              Browse and apply for the internship of your choice!
            </p>

            <div className="bg-white text-gray-800 p-8 rounded-lg text-center transform transition-transform duration-300 hover:scale-105">
              <p className="mb-2">New here?</p>
              <p className="text-2xl mb-6">Create an account now!</p>
              <Link to="/student-signup">
                <button className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-blue-600 hover:scale-105 hover:shadow-lg transition-all duration-300">
                  Create Account
                </button>
              </Link>
            </div>
          </div>

          {/* Faculties Section */}
          <div
            className={`bg-white p-8 rounded-lg ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            } ${
              activeSection === "faculties" ? "ring-4 ring-blue-500" : ""
            } transform transition-all duration-700 delay-300`}
            onClick={() => highlightSection("faculties")}
          >
            <h2 className="text-3xl font-bold mb-4 text-center">
              For Faculties
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Add internships and select perfect applicant for the role!
            </p>

            <div className="bg-gray-800 text-white p-8 rounded-lg text-center transform transition-transform duration-300 hover:scale-105">
              <p className="mb-2">New here?</p>
              <p className="text-2xl mb-6">Create an account now!</p>
              <Link to="/faculty-signup">
                <button className="bg-white text-gray-800 px-6 py-2 rounded hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300">
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`mt-auto py-8 bg-white ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        } transition-all duration-1000 delay-500`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v15"
                  />
                </svg>
                <span className="font-medium">Internship Portal</span>
              </div>
              <span className="text-sm text-gray-500">© 2025</span>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-medium mb-2">About</h3>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
              >
                Author
              </a>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-medium mb-2">Code</h3>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
              >
                View on GitHub
              </a>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="font-medium mb-2">Tutorial</h3>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
              >
                View on YouTube
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
