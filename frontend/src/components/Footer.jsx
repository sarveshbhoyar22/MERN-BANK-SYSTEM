import React from "react";
import { useAuthContext } from "../context/AuthContext";
import useScreenSize from "../hooks/Usescreensize";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
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
                <a
                  href="/branding"
                  className="text-gray-400 hover:text-white transition"
                >
                  Branding
                </a>
              </li>
              <li>
                <a
                  href="/design"
                  className="text-gray-400 hover:text-white transition"
                >
                  Design
                </a>
              </li>
              <li>
                <a
                  href="/marketing"
                  className="text-gray-400 hover:text-white transition"
                >
                  Marketing
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  Advertisement
                </a>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h6 className="text-lg font-semibold mb-3">Company</h6>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/jobs"
                  className="text-gray-400 hover:text-white transition"
                >
                  Jobs
                </a>
              </li>
              <li>
                <a
                  href="/presskit"
                  className="text-gray-400 hover:text-white transition"
                >
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Social Media */}
          <div>
            <h6 className="text-lg font-semibold mb-3">Legal</h6>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  Cookie Policy
                </a>
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
          <a href="https://www.instagram.com/sarvesh_bhoyar_/profilecard/?igsh=MXExd3I1enNkcXloNQ==https://www.instagram.com/sarvesh_bhoyar_/profilecard/?igsh=MXExd3I1enNkcXloNQ==">
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
