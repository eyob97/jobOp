"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const Header = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

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

  const handleSignUpClick = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth/sign-up');
    }
  };

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
              <button 
                className="btn btn-warning rounded-more fw-bold text-dark p-2"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};

export default Header;
