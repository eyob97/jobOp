"use client";

import React, { useState } from "react";
import {
  Avatar,
  Button,
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

interface DashboardHeaderProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onTabChange, activeTab }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth?.user);

  console.log("User:", user);

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
            className="h-20 ml-10"
          />
        </NavbarBrand>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a
                className={`nav-link scrollto ${activeTab === 'filter' ? 'active' : ''}`}
                href="#find-job"
                onClick={() => onTabChange('filter')}
              >
                Filter Dashboard
              </a>
            </li>
            <li>
              <a
                className={`nav-link scrollto ${activeTab === 'upload' ? 'active' : ''}`}
                href="#upload-cv"
                onClick={() => onTabChange('upload')}
              >
                Upload CV
              </a>
            </li>
            <li>
              <a
                className={`nav-link scrollto ${activeTab === 'documents' ? 'active' : ''}`}
                href="#documents"
                onClick={() => onTabChange('documents')}
              >
                Documents
              </a>
            </li>
            <li>
              <a
                className={`nav-link scrollto ${activeTab === 'applications' ? 'active' : ''}`}
                href="#applications"
                onClick={() => onTabChange('applications')}
              >
                Applications
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center relative">
          {user ? (
            <Dropdown
              label={
                <Avatar
                  alt="Profile"
                  img="/landing_assets/images/xmlid85.png"
                  size="sm"
                  rounded
                />
              }
              arrowIcon={false}
              inline
            >
              <DropdownHeader className="overflow-visible">
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
            <Button
              className="text-black"
              onClick={() => router.push("/auth/sign-in")}
              gradientDuoTone="greenToBlue"
            >
              Sign in
            </Button>
          )}
          <NavbarToggle />
        </div>
      </div>
      <NavbarCollapse className="lg:hidden">
        <NavbarLink
          href="#find-job"
          className={`text-white hover:underline ${activeTab === 'filter' ? 'active' : ''}`}
          onClick={() => onTabChange('filter')}
        >
          Filter Dashboard
        </NavbarLink>
        <NavbarLink
          href="#upload-cv"
          className={`text-white hover:underline ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => onTabChange('upload')}
        >
          Upload CV
        </NavbarLink>
        <NavbarLink
          href="#documents"
          className={`text-white hover:underline ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => onTabChange('documents')}
        >
          Documents
        </NavbarLink>
        <NavbarLink
          href="#applications"
          className={`text-white hover:underline ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => onTabChange('applications')}
        >
          Applications
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default DashboardHeader;
