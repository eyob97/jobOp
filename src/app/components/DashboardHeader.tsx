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

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onTabChange,
  activeTab,
  userType,
}) => {
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

  const linkClasses = (tab: string) => ({
    color: activeTab === tab ? "rgba(255, 196, 36, 1)" : "white",
    transform: activeTab === tab ? "translateY(-2px)" : "none",
    transition: "transform 0.2s, color 0.2s"
  });

  return (
    <Navbar fluid className="bg-green-800">
      <div className="flex items-center justify-between w-full px-4">
        <NavbarBrand href="/" className="flex items-center">
          <img
            src="/landing_assets/vectors/group3_x2.svg"
            alt="JobOp Logo"
            className="h-20"
          />
        </NavbarBrand>
        <div className="flex items-center">
          <NavbarToggle className="lg:hidden" />
          <NavbarCollapse>
            <ul className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 lg:items-center">
              {userType === "Job Seeker" ? (
                <>
                  <NavbarLink
                    href="/dashboard#find-job"
                    style={linkClasses("filter")}
                    onClick={() =>
                      handleNavigation("filter", "/dashboard#find-job")
                    }
                  >
                    Filter Dashboard
                  </NavbarLink>
                  <NavbarLink
                    href="/dashboard#upload-cv"
                    style={linkClasses("upload")}
                    onClick={() =>
                      handleNavigation("upload", "/dashboard#upload-cv")
                    }
                  >
                    Upload CV
                  </NavbarLink>
                  <NavbarLink
                    href="/dashboard#documents"
                    style={linkClasses("documents")}
                    onClick={() =>
                      handleNavigation("documents", "/dashboard#documents")
                    }
                  >
                    Documents
                  </NavbarLink>
                  <NavbarLink
                    href="/dashboard#applications"
                    style={linkClasses("applications")}
                    onClick={() =>
                      handleNavigation(
                        "applications",
                        "/dashboard#applications"
                      )
                    }
                  >
                    Applications
                  </NavbarLink>
                </>
              ) : (
                <NavbarLink
                  href="/dashboard#post"
                  style={linkClasses("post")}
                  onClick={() => handleNavigation("post", "/dashboard#post")}
                >
                  Job Post
                </NavbarLink>
              )}
            </ul>
          </NavbarCollapse>
        </div>
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
              gradientDuoTone="greenToYellow"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default DashboardHeader;
