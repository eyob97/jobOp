import React, { useState } from "react";
import { Dropdown, Button, TextInput } from "flowbite-react";
import {
  HiSearch,
  HiOutlineLocationMarker,
  HiOutlineAdjustments,
} from "react-icons/hi";
import CustomButton from "./CustomButton";

interface SearchBarProps {
  onSearch: (criteria: {
    jobTitle: string;
    location: string;
    filter: string;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ jobTitle, location, filter });
  };

  const handleFilterSelect = (value: string) => {
    setFilter(value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <form
      className="max-w-7xl mx-auto p-4 bg-white shadow-md rounded-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-center"
      onSubmit={handleSearch}
    >
      <div className="relative col-span-1 sm:col-span-1 lg:col-span-4 min-w-0">
        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
        <TextInput
          id="job-title"
          type="search"
          placeholder="Search by: Job title, position, keyword..."
          className="pl-10 pr-4 py-2 rounded-full border-none w-full"
          style={{ backgroundColor: "transparent", boxShadow: "none" }}
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      <div className="relative col-span-1 sm:col-span-1 lg:col-span-4 min-w-0">
        <HiOutlineLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
        <TextInput
          id="location"
          type="search"
          placeholder="City, state or zip code"
          className="pl-10 pr-4 py-2 rounded-full border-none w-full"
          style={{ backgroundColor: "transparent", boxShadow: "none" }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="relative col-span-1 sm:col-span-1 lg:col-span-2 min-w-0 flex justify-center">
        <div className="inline-block relative">
          <Button
            className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full  lg:w-auto border-none focus:outline-none focus:ring-0 active:outline-none active:ring-0"
            onClick={toggleDropdown}
            type="button"
          >
            <HiOutlineAdjustments className="mt-1" />
            <span>{filter ? filter : "Filters"}</span>
          </Button>
          {isDropdownOpen && (
            <div className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-full lg:w-auto">
              <ul className="py-1 text-gray-700">
                <li
                  onClick={() => handleFilterSelect("Full Time")}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  Full Time
                </li>
                <li
                  onClick={() => handleFilterSelect("Part Time")}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  Part Time
                </li>
                <li
                  onClick={() => handleFilterSelect("Remote")}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  Remote
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1 sm:col-span-1 lg:col-span-2 flex justify-center w-full">
        <CustomButton type="submit">Find Job</CustomButton>
      </div>
    </form>
  );
};

export default SearchBar;
