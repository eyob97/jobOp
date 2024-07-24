'use client';

import { useState } from "react";
import JobCard from "./JobCard";
import SearchBar from "./SearchForm";

interface SearchCriteria {
  jobTitle: string;
  location: string;
  filter: string;
}

const FilterDashboard = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({ jobTitle: "", location: "", filter: "" });

  const handleSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
  };

  return (
    <div className="w-full h-full p-4">
      <SearchBar onSearch={handleSearch} />
      <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Jobs for you</h2>
      <JobCard searchCriteria={searchCriteria} /></div>
    </div>
  );
};

export default FilterDashboard;
