"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Link from "next/link";

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

    const handleToggleMenu = () => {
      const navbar = document.getElementById("navbar");
      const toggleIcon = document.querySelector(".mobile-nav-toggle");

      if (navbar && toggleIcon) {
        navbar.classList.toggle("navbar-mobile");
        toggleIcon.classList.toggle("bi-list");
        toggleIcon.classList.toggle("bi-x");
      }
    };

    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener("click", handleToggleMenu);
    }

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listeners on component unmount
    return () => {
      if (mobileNavToggle) {
        mobileNavToggle.removeEventListener("click", handleToggleMenu);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignUpClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth/sign-up");
    }
  };

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo">
          <Link href="#home" style={{ display: "flex", alignItems: "center" }}>
            <img src="/landing_assets/vectors/group3_x2.svg" alt="Logo" />
          </Link>
        </h1>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <Link className="nav-link scrollto active" href="#home">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#how-it-works">
                How It Works
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="#contact">
                Contact
              </Link>
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
