"use client";

import React, { useEffect, useRef, useState } from "react";
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
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { AppDispatch } from "../redux/store";
import { fetchFiles } from "../redux/letterSlice";
import { updateUserPhoto } from "../utils/api";
import { getAuthDataFromLocalStorage } from "../utils/localstorage";

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
  const { user } = getAuthDataFromLocalStorage();

  const [resume, setResume] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.image);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/sign-in");
  };

  const handleNavigation = (tab: string) => {
    onTabChange(tab);
  };

  useEffect(() => {
    setProfileImage(user?.image);

    dispatch(fetchFiles())
      .unwrap()
      .then((data) => {
        if (data.some((file: any) => file.file_type === "Resume")) {
          setResume(true);
        }
      })
      .catch((err) => console.error(err));
  }, [dispatch, user?.image]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && user) {
      try {
        const updatedUser = await updateUserPhoto(user.id, file);
        setProfileImage(updatedUser.image);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.log("error", error);
        alert("Failed to upload image. Please try again.");
      }
    } else {
      console.log("No file selected or user is undefined");
    }
  };
  const linkClasses = (tab: string) => ({
    color: activeTab === tab ? "rgba(255, 196, 36, 1)" : "white",
    transform: activeTab === tab ? "translateY(-2px)" : "none",
    transition: "transform 0.2s, color 0.2s",
    backgroundColor: "transparent",
    "&:hover": {
      color: activeTab === tab ? "rgba(255, 196, 36, 1)" : "white",
      backgroundColor: "transparent",
    },
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
                  <Link href="/dashboard#find-job" passHref legacyBehavior>
                    <NavbarLink
                      style={linkClasses("filter")}
                      onClick={() => handleNavigation("filter")}
                    >
                      Filter Dashboard
                    </NavbarLink>
                  </Link>
                  <Link href="/dashboard#upload-cv" passHref legacyBehavior>
                    <NavbarLink
                      style={linkClasses("upload")}
                      onClick={() => handleNavigation("upload")}
                    >
                      {resume ? "My CV" : "Upload CV"}
                    </NavbarLink>
                  </Link>
                  <Link href="/dashboard#documents" passHref legacyBehavior>
                    <NavbarLink
                      style={linkClasses("documents")}
                      onClick={() => handleNavigation("documents")}
                    >
                      Documents
                    </NavbarLink>
                  </Link>
                  <Link href="/dashboard#applications" passHref legacyBehavior>
                    <NavbarLink
                      style={linkClasses("applications")}
                      onClick={() => handleNavigation("applications")}
                    >
                      Applications
                    </NavbarLink>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard#post" passHref legacyBehavior>
                    <NavbarLink
                      style={linkClasses("post")}
                      onClick={() => handleNavigation("post")}
                    >
                      Jobs
                    </NavbarLink>
                  </Link>
                  <Link href="/dashboard#upload-job" passHref legacyBehavior>
                    <NavbarLink
                      style={linkClasses("upload-job")}
                      onClick={() => handleNavigation("upload-job")}
                    >
                      Job Post
                    </NavbarLink>
                  </Link>
                  <Link href="/dashboard#applicants" passHref legacyBehavior>
                    <NavbarLink
                      style={linkClasses("applicants")}
                      onClick={() => handleNavigation("applicants")}
                    >
                      Applications
                    </NavbarLink>
                  </Link>
                </>
              )}
            </ul>
          </NavbarCollapse>
        </div>
        <div className="flex items-center relative">
          {user ? (
            <Dropdown
              label={
                profileImage ? (
                  <Avatar
                    img={profileImage}
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
                      d="M15.5003 15.2981C14.2224 15.2981 12.9731 14.9277 11.9105 14.2337C10.8479 13.5397 10.0197 12.5533 9.53064 11.3992C9.04158 10.2452 8.91362 8.97529 9.16294 7.75015C9.41226 6.525 10.0277 5.39964 10.9313 4.51636C11.835 3.63308 12.9863 3.03156 14.2397 2.78786C15.4932 2.54417 16.7924 2.66924 17.9731 3.14727C19.1537 3.62529 20.1629 4.4348 20.8729 5.47343C21.5829 6.51206 21.9619 7.73315 21.9619 8.9823C21.96 10.6568 21.2786 12.2621 20.0672 13.4462C18.8559 14.6302 17.2135 15.2962 15.5003 15.2981ZM15.5003 5.47352C14.7903 5.47352 14.0963 5.67931 13.506 6.06486C12.9156 6.45041 12.4555 6.9984 12.1838 7.63955C11.9121 8.28069 11.841 8.98619 11.9796 9.66682C12.1181 10.3475 12.46 10.9727 12.962 11.4634C13.464 11.9541 14.1037 12.2883 14.8 12.4236C15.4963 12.559 16.2181 12.4895 16.8741 12.224C17.53 11.9584 18.0906 11.5087 18.4851 10.9317C18.8795 10.3547 19.0901 9.67627 19.0901 8.9823C19.0901 8.05171 18.7119 7.15924 18.0387 6.50122C17.3655 5.8432 16.4524 5.47352 15.5003 5.47352ZM26.5814 25.8195H4.41912C3.41015 25.8195 2.44249 25.4226 1.73147 24.7102C1.02046 23.9979 0.623535 23.0298 0.623535 22.0196C0.624612 18.3014 2.28736 15.4043 5.20334 13.8452C8.1188 12.2871 11.7124 12.2871 14.6278 13.8452C15.1256 14.0966 15.7006 14.2312 16.2848 14.2312C16.869 14.2312 17.444 14.0966 17.9417 13.8452C20.8572 12.2871 24.4508 12.2871 27.3662 13.8452C30.2822 15.4043 31.9449 18.3014 31.946 22.0196C31.946 23.0298 31.5491 23.9979 30.8381 24.7102C30.1271 25.4226 29.1594 25.8195 28.1505 25.8195H26.5814Z"
                      fill="white"
                    />
                  </svg>
                )
              }
              arrowIcon={false}
              inline={true}
            >
              <DropdownHeader className="overflow-visible">
                <span className="block text-sm">
                  {user?.first_name} {user?.last_name}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </DropdownHeader>
              <DropdownItem onClick={handleUploadClick} disabled={true}>
                Upload photo
              </DropdownItem>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
              />
              <DropdownDivider />
              <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
            </Dropdown>
          ) : (
            <Button onClick={() => router.push("/auth/sign-in")}>
              Sign In
            </Button>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </Navbar>
  );
};

export default DashboardHeader;
function setSelectedTab(tab: string): any {
  throw new Error("Function not implemented.");
}
