"use client";

import React from "react";
import { Button, Table, Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { HiArrowDown, HiDownload, HiPlus } from "react-icons/hi";

const JobPosts: React.FC = () => {
  const jobs = [
    { name: "Professional cleaner", postDate: "Apr 23, 2024", applicants: 23, status: "Active", dueDate: "May 23, 2024" },
    { name: "Cleaner", postDate: "Apr 23, 2024", applicants: 11, status: "Deactivated", dueDate: "May 23, 2024" },
    { name: "Waiter", postDate: "Apr 18, 2024", applicants: 80, status: "Active", dueDate: "May 18, 2024" },
    { name: "Bartender", postDate: "Apr 15, 2024", applicants: 15, status: "Active", dueDate: "May 15, 2024" },
    { name: "Bartender", postDate: "Apr 15, 2024", applicants: 20, status: "Active", dueDate: "May 15, 2024" },
    { name: "Waiter", postDate: "Apr 11, 2024", applicants: 80, status: "Deactivated", dueDate: "May 11, 2024" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Job Posts</h2>
        <div className="flex space-x-4">
          <Button color="gray" className="flex items-center">
            <HiDownload className="mt-1" />
            Upload PDF
          </Button>
          <Button color="yellow" className="flex items-center">
            <HiPlus className="mt-1"  />
            Create Job Post
          </Button>
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Job Name</Table.HeadCell>
          <Table.HeadCell>Post Date</Table.HeadCell>
          <Table.HeadCell>Applicants</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Due Date</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {jobs.map((job, index) => (
            <Table.Row key={index}>
              <Table.Cell>{job.name}</Table.Cell>
              <Table.Cell>{job.postDate}</Table.Cell>
              <Table.Cell>
                <Avatar.Group>
                  {/* {Array.from({ length: job.applicants > 5 ? 5 : job.applicants }, (_, i) => (
                    <Avatar key={i} img={`path-to-avatar-${i + 1}`} rounded />
                  ))} */}
                  {/* {job.applicants > 5 && (
                    <Avatar.GroupCounter>{`+${job.applicants - 5}`}</Avatar.GroupCounter>
                  )} */}
                </Avatar.Group>
              </Table.Cell>
              <Table.Cell>
                <span
                  className={`px-2 py-1 rounded text-white ${job.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {job.status}
                </span>
              </Table.Cell>
              <Table.Cell>{job.dueDate}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default JobPosts;
