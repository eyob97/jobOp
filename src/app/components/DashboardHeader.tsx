"use client";

import React, { useRef, useState } from "react";
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
import { updateUser } from "../redux/authSlice";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.auth?.user);
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/sign-in");
  };

  const handleNavigation = (tab: string, path: string) => {
    onTabChange(tab);
    router.push(path);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && user) {
      console.log("Selected file:", file);
      try {
        await dispatch(updateUser({ id: user.id, image: file }));
        alert("Image uploaded successfully!");
      } catch (error) {
        console.log("error", error);
        alert("Failed to upload image. Please try again.");
      }
    }
  };

  const linkClasses = (tab: string) => ({
    color: activeTab === tab ? "rgba(255, 196, 36, 1)" : "white",
    transform: activeTab === tab ? "translateY(-2px)" : "none",
    transition: "transform 0.2s, color 0.2s",
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
                <>
                  <NavbarLink
                    href="/dashboard#post"
                    style={linkClasses("post")}
                    onClick={() => handleNavigation("post", "/dashboard#post")}
                  >
                    Jobs
                  </NavbarLink>
                  <NavbarLink
                    href="/dashboard#upload-job"
                    style={linkClasses("upload-job")}
                    onClick={() =>
                      handleNavigation("upload-job", "/dashboard#upload-job")
                    }
                  >
                    Job Post
                  </NavbarLink>

                  <NavbarLink
                    href="/dashboard#applicants"
                    style={linkClasses("applicants")}
                    onClick={() =>
                      handleNavigation("applicants", "/dashboard#applicants")
                    }
                  >
                    Applications
                  </NavbarLink>
                </>
              )}
            </ul>
          </NavbarCollapse>
        </div>
        <div className="flex items-center relative">
          {user ? (
            <Dropdown
              label={
                user?.image ? (
                  <Avatar
                    img={user?.image}
                    alt={`${user?.first_name} ${user?.last_name}`}
                    rounded
                    style={{ width: "31px", height: "26px" }}
                  />
                ) : (
                  <svg
                    width="31"
                    height="26"
                    viewBox="0 0 31 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5003 15.2981C14.2224 15.2981 12.9731 14.9277 11.9105 14.2337C10.8479 13.5397 10.0197 12.5533 9.53064 11.3992C9.04158 10.2452 8.91362 8.97529 9.16294 7.75015C9.41226 6.525 10.0277 5.39964 10.9313 4.51636C11.835 3.63308 12.9863 3.03156 14.2397 2.78786C15.4932 2.54417 16.7924 2.66924 17.9731 3.14727C19.1537 3.62529 20.1629 4.4348 20.8729 5.47343C21.5829 6.51206 21.9619 7.73315 21.9619 8.9823C21.96 10.6568 21.2786 12.2621 20.0672 13.4462C18.8559 14.6302 17.2135 15.2962 15.5003 15.2981ZM15.5003 5.47352C14.7903 5.47352 14.0963 5.67931 13.506 6.06486C12.9156 6.45041 12.4555 6.9984 12.1838 7.63955C11.9121 8.28069 11.841 8.98619 11.9796 9.66682C12.1181 10.3475 12.46 10.9727 12.962 11.4634C13.464 11.9541 14.1037 12.2883 14.8 12.4236C15.4963 12.559 16.2181 12.4895 16.8741 12.224C17.53 11.9584 18.0906 11.5087 18.4851 10.9317C18.8795 10.3547 19.0901 9.67627 19.0901 8.9823C19.0901 8.05171 18.7119 7.15924 18.0387 6.50122C17.3655 5.8432 16.4524 5.47352 15.5003 5.47352Z"
                      fill="white"
                    />
                    <path
                      d="M23.3978 29.3332H7.60289C7.22207 29.3332 6.85684 29.1853 6.58756 28.9221C6.31827 28.6589 6.16699 28.3019 6.16699 27.9297V23.7191C6.16927 21.8587 6.92641 20.075 8.27233 18.7594C9.61825 17.4439 11.4431 16.7038 13.3465 16.7016H17.6542C19.5576 16.7038 21.3824 17.4439 22.7283 18.7594C24.0742 20.075 24.8314 21.8587 24.8337 23.7191V27.9297C24.8337 28.3019 24.6824 28.6589 24.4131 28.9221C24.1438 29.1853 23.7786 29.3332 23.3978 29.3332ZM9.03879 26.5262H21.9619V23.7191C21.9619 22.6024 21.508 21.5315 20.7002 20.7418C19.8923 19.9522 18.7966 19.5086 17.6542 19.5086H13.3465C12.204 19.5086 11.1083 19.9522 10.3005 20.7418C9.49263 21.5315 9.03879 22.6024 9.03879 23.7191V26.5262Z"
                      fill="white"
                    />
                  </svg>
                )
              }
              arrowIcon={false}
              inline
            >
              <DropdownHeader className="overflow-visible">
                <span className="block text-sm">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </DropdownHeader>
              <DropdownItem onClick={handleUploadClick}>
                Upload photo
              </DropdownItem>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
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
