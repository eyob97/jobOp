import React, { useState } from "react";
import { Dropdown, Button, TextInput } from "flowbite-react";
import {
  HiSearch,
  HiOutlineLocationMarker,
  HiOutlineAdjustments,
} from "react-icons/hi";
import CustomButton from "./CustomButton";

interface SearchBarProps {
  onSearch: (criteria: { jobTitle: string; location: string; filter: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ jobTitle, location, filter });
  };

  const handleFilterSelect = (value: string) => {
    setFilter(value);
  };

  return (
    <form
      className="max-w-7xl mx-auto p-2 bg-white shadow-md rounded-full  grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-center"
      onSubmit={handleSearch}
    >
      <div className="relative flex-grow min-w-[200px] col-span-1 sm:col-span-1 lg:col-span-4">
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
      <div className="relative flex-grow min-w-[200px] col-span-1 sm:col-span-1 lg:col-span-4">
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
      <div className="flex-shrink-0 min-w-[120px] col-span-1 sm:col-span-1 lg:col-span-2">
        <Dropdown
          label={
            <Button className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full  w-full lg:w-auto">
              <HiOutlineAdjustments className="mt-1" />
              <span>{filter ? filter : "Filters"}</span>
            </Button>
          }
          inline={true}
          className="relative lg:w-auto"
        >
          <Dropdown.Item onClick={() => handleFilterSelect('Full-time')}>Full Time</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterSelect('Part-time')}>Part Time</Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterSelect('Remote')}>Remote</Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex-shrink-0  w-full col-span-1 sm:col-span-1 lg:col-span-2">
        <CustomButton type="submit">Find Job</CustomButton>
      </div>
    </form>
  );
};

export default SearchBar;
