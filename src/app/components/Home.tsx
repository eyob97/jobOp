"use client";

import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("header-scrolled");
        } else {
          header.classList.remove("header-scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo">
          <a href="#home" style={{ display: "flex", alignItems: "center" }}>
            <img 
              src="/landing_assets/vectors/group3_x2.svg"
              alt="Logo"
            />
          </a>
        </h1>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a className="nav-link scrollto active" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#about">
                About Us
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#how-it-works">
                How It Works
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#pricing">
                Pricing
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#contact">
                Contact
              </a>
            </li>
            <div className="form-container ml-3">
              <a href="#" className="btn btn-warning rounded fw-bold text-dark p-1">
                Sign Up
              </a>
            </div>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};

export default Header;
