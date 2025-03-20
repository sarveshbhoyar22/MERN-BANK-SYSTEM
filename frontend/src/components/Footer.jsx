import React from "react";
import { useAuthContext } from "../context/AuthContext";
import useScreenSize from "../hooks/Usescreensize";
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const { authUser: user } = useAuthContext();
  const { width } = useScreenSize();

  return (
    <footer className="bg-gradient-to-t from-gray-800 to-black text-white py-10">
      <div className="divider"></div>
      <div className="container mx-auto px-6 md:px-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-20 h-20 rounded-full shadow-lg"
            />
            <p className="mt-3 text-gray-400 text-sm">
              Auth-Bank Ltd. <br />
              Providing reliable Web-dev since 2025.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-lg font-semibold mb-3">Services</h6>
            <ul className="space-y-2">
              <li>
                <Link to="/branding" className="text-gray-400 hover:text-white transition">
                  Branding
                </Link>
              </li>
              <li>
                <Link
                  to="/design"
                  className="text-gray-400 hover:text-white transition"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  to="/marketing"
                  className="text-gray-400 hover:text-white transition"
                >
                  Marketing
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  Advertisement
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h6 className="text-lg font-semibold mb-3">Company</h6>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-gray-400 hover:text-white transition"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/presskit"
                  className="text-gray-400 hover:text-white transition"
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social Media */}
          <div>
            <h6 className="text-lg font-semibold mb-3">Legal</h6>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          <p>© 2025 Auth-Bank Ltd. All rights reserved.</p>
          <p>Created by Sarvesh Bhoyar (IIT(ISM) Dhanbad)</p>
        </div>

        <div className="text-center flex gap-4 justify-center m-2">
          <a href="https://github.com/sarveshbhoyar22">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/sarvesh-bhoyar-711818239/">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/sarvesh_bhoyar_/profilecard/?igsh=MXExd3I1enNkcXloNQ==">
            <FaInstagram />
          </a>
          <a>
            <FaDiscord />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
