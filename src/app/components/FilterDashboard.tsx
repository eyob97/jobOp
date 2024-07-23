"use client";

import { TextInput, Button } from "flowbite-react";

const FilterDashboard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Find Job</h2>
      <TextInput placeholder="Search by: Job title, Position, Keyword..." className="mb-4" />
      <TextInput placeholder="City, state or zip code" className="mb-4" />
      <div className="flex justify-between">
        <Button gradientDuoTone="greenToBlue">Filters</Button>
        <Button gradientDuoTone="yellowToGreen">Find Job</Button>
      </div>
    </div>
  );
};

export default FilterDashboard;
