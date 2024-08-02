"use client";

import React from "react";
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
  userType: string; 
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onTabChange, activeTab, userType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/sign-in");
  };

  const handleNavigation = (tab: string, path: string) => {
    onTabChange(tab);
    router.push(path);
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
          <ul className="flex space-x-4">
            {userType === 'Job Seeker' ? (
              <>
                <li>
                  <a
                    className={`nav-link scrollto ${activeTab === 'filter' ? 'active' : ''}`}
                    onClick={() => handleNavigation('filter', '/dashboard#find-job')}
                  >
                    Filter Dashboard
                  </a>
                </li>
                <li>
                  <a
                    className={`nav-link scrollto ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => handleNavigation('upload', '/dashboard#upload-cv')}
                  >
                    Upload CV
                  </a>
                </li>
                <li>
                  <a
                    className={`nav-link scrollto ${activeTab === 'documents' ? 'active' : ''}`}
                    onClick={() => handleNavigation('documents', '/dashboard#documents')}
                  >
                    Documents
                  </a>
                </li>
                <li>
                  <a
                    className={`nav-link scrollto ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => handleNavigation('applications', '/dashboard#applications')}
                  >
                    Applications
                  </a>
                </li>
              </>
            ) : (
              <li>
                <a
                  className={`nav-link scrollto ${activeTab === 'post' ? 'active' : ''}`}
                  onClick={() => handleNavigation('post', '/dashboard#post')}
                >
                  Job Post
                </a>
              </li>
            )}
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
        </div>
      </div>
      <NavbarCollapse className="lg:hidden">
        {userType === 'Job Seeker' ? (
          <>
            <NavbarLink
              href="#find-job"
              className={`text-white hover:underline ${activeTab === 'filter' ? 'active' : ''}`}
              onClick={() => handleNavigation('filter', '/find-job')}
            >
              Filter Dashboard
            </NavbarLink>
            <NavbarLink
              href="#upload-cv"
              className={`text-white hover:underline ${activeTab === 'upload' ? 'active' : ''}`}
              onClick={() => handleNavigation('upload', '/upload-cv')}
            >
              Upload CV
            </NavbarLink>
            <NavbarLink
              href="#documents"
              className={`text-white hover:underline ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => handleNavigation('documents', '/documents')}
            >
              Documents
            </NavbarLink>
            <NavbarLink
              href="#applications"
              className={`text-white hover:underline ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => handleNavigation('applications', '/applications')}
            >
              Applications
            </NavbarLink>
          </>
        ) : (
          <NavbarLink
            href="#documents"
            className={`text-white hover:underline ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => handleNavigation('documents', '/documents')}
          >
            Documents
          </NavbarLink>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default DashboardHeader;
