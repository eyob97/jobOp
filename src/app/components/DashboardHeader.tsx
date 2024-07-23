"use client";

import { Dropdown, Avatar, Button } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { AppDispatch, RootState } from "../redux/store";

const DashboardHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="w-full bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="logo">
          <a href="#home" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/landing_assets/vectors/group3_x2.svg"
              alt="Logo"
              className="h-8 w-8"
            />
          </a>
        </h1>
        <h1 className="text-lg font-bold">
          <Link href="/" legacyBehavior>
            <a className="text-green-800">Home</a>
          </Link>
        </h1>
        <div className="flex items-center">
          {user ? (
            <Dropdown
              className="text-black"
              label={
                <Avatar
                  alt="User settings"
                  img="https://example.com/path/to/avatar.jpg" // Replace with actual user avatar URL
                  rounded={true}
                />
              }
              inline={true}
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.firstName}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button
              className="text-black"
              onClick={() => router.push("/logout")}
              gradientDuoTone="greenToBlue"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
