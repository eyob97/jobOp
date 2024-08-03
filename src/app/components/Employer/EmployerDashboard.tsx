"use client";

import React from "react";
import { Button, Table } from "flowbite-react";
import { HiDownload, HiPlus } from "react-icons/hi";

const EmployerDashboard: React.FC = () => {
  const jobs = [
    {
      name: "Professional cleaner",
      postDate: "Apr 23, 2024",
      applicants: 23,
      status: "Active",
      dueDate: "May 23, 2024",
    },
    {
      name: "Cleaner",
      postDate: "Apr 23, 2024",
      applicants: 11,
      status: "Deactivated",
      dueDate: "May 23, 2024",
    },
    {
      name: "Waiter",
      postDate: "Apr 18, 2024",
      applicants: 80,
      status: "Active",
      dueDate: "May 18, 2024",
    },
    {
      name: "Bartender",
      postDate: "Apr 15, 2024",
      applicants: 15,
      status: "Active",
      dueDate: "May 15, 2024",
    },
    {
      name: "Bartender",
      postDate: "Apr 15, 2024",
      applicants: 20,
      status: "Active",
      dueDate: "May 15, 2024",
    },
    {
      name: "Waiter",
      postDate: "Apr 11, 2024",
      applicants: 80,
      status: "Deactivated",
      dueDate: "May 11, 2024",
    },
  ];

  return (
    <>
        <div className="bg-[rgba(214,235,223,1)] min-h-screen">
      <div className="p-6">
        <div className="w-full flex justify-between items-center bg-white p-4 shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-2">My job posts</h2>
          <div className="flex space-x-4">
            <Button
              type="button"
              className="rounded-full text-black flex items-center"
              style={{ backgroundColor: "#fff", color: "#000" }}
            >
              <HiDownload className="mt-1 mr-1" />
              Upload PDF
            </Button>
            <Button
              type="button"
              className="rounded-full text-black flex items-center"
              style={{ backgroundColor: "#FFC424", color: "#000" }}
            >
              <HiPlus className="mt-1 mr-1" />
              Create Job Post
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      </div>
    </div></>

  );
};

export default EmployerDashboard;
