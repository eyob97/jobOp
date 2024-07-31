"use client"
import React from 'react';
import { NextPageContext } from 'next';
import { Button } from 'flowbite-react';
import Link from 'next/link';

interface ErrorProps {
  statusCode: number;
}

const ErrorPage = ({ statusCode }: ErrorProps) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</h1>
      <p>We're sorry for the inconvenience. Please try again later.</p>
      <p>If you need further assistance, please contact us</p>
      <Link href="/" legacyBehavior>
        <Button color="black" className="justify-center ">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
