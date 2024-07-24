"use client";

import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { AppDispatch, RootState } from "../redux/store";

const DashboardHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth?.user);

  console.log("User:", user); // Console log the user information

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/sign-in");
  };

  return (
    <Navbar fluid className="bg-green-800">
      <div className="flex items-center justify-between w-full">
        <NavbarBrand href="/">
          <img
            src="/landing_assets/vectors/group3_x2.svg"
            alt="JobOp Logo"
            className="h-24"
          />
        </NavbarBrand>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a className="nav-link scrollto active" href="#find-job">
                Find Job
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#documents">
                Documents
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="#applications">
                Applications
              </a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
        <div className="flex items-center relative"> 
          {user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex items-center">
                  <Avatar
                    img="https://example.com/path/to/avatar.jpg" 
                    rounded
                  />
                  <span className="text-white ml-2">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              }
            >
              <DropdownHeader>
                <span className="block text-sm">
                  {user.firstName} {user.lastName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </DropdownHeader>
              <DropdownItem>Upload photo</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
            </Dropdown>
          ) : (
            <button
              className="bg-yellow-400 text-black rounded-full px-4 py-2"
              onClick={() => router.push("/auth/sign-up")}
            >
              Sign Up
            </button>
          )}
          <NavbarToggle />
        </div>
      </div>
      <NavbarCollapse className="lg:hidden">
        <NavbarLink href="#find-job" className="text-white hover:underline active">
          Find Job
        </NavbarLink>
        <NavbarLink href="#documents" className="text-white hover:underline">
          Documents
        </NavbarLink>
        <NavbarLink href="#applications" className="text-white hover:underline">
          Applications
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default DashboardHeader;
