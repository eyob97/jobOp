import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import { Inter } from "next/font/google";
import "./globals.css";
import { flowbiteTheme } from "./theme";
import Header from "./components/Home";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  const metaData = {
    title: "Jobop.co.za | Connecting South Africa's Workforce",
    description: "Jobop.co.za is a transformative online platform connecting job seekers with employment opportunities tailored to their skills and experience. Join us to find your next job or recruit top talent in South Africa.",
    keywords: "job search, employment opportunities, South Africa, unskilled workforce, semi-skilled workforce, job matching, recruitment platform, AI technology, affordable recruitment, WhatsApp communication, job alerts",
    author: "Jobop.co.za Team",
    robots: "index, follow",
    canonicalUrl: "https://www.jobop.co.za/",
    og: {
      title: "Jobop.co.za | Connecting South Africa's Workforce",
      description: "Jobop.co.za is a transformative online platform connecting job seekers with employment opportunities tailored to their skills and experience. Join us to find your next job or recruit top talent in South Africa.",
      image: "https://www.jobop.co.za/landing_assets/favicon.ico",
      url: "https://www.jobop.co.za/",
    },
    twitter: {
      card: "summary_large_image",
      site: "@JobopSA",
      title: "Jobop.co.za | Connecting South Africa's Workforce",
      description: "Jobop.co.za is a transformative online platform connecting job seekers with employment opportunities tailored to their skills and experience. Join us to find your next job or recruit top talent in South Africa.",
      image: "https://www.jobop.co.za/landing_assets/favicon.ico",
    },
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta name="author" content={metaData.author} />
        <meta name="robots" content={metaData.robots} />
        <link rel="canonical" href={metaData.canonicalUrl} />
        <meta property="og:title" content={metaData.og.title} />
        <meta property="og:description" content={metaData.og.description} />
        <meta property="og:image" content={metaData.og.image} />
        <meta property="og:url" content={metaData.og.url} />
        <meta name="twitter:card" content={metaData.twitter.card} />
        <meta name="twitter:site" content={metaData.twitter.site} />
        <meta name="twitter:title" content={metaData.twitter.title} />
        <meta name="twitter:description" content={metaData.twitter.description} />
        <meta name="twitter:image" content={metaData.twitter.image} />
        <title>{metaData.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap" rel="stylesheet" />
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/landing_assets/css/styles.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.3/font/bootstrap-icons.min.css" />
        <link rel="icon" type="image/x-icon" href="/landing_assets/favicon.ico" />
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <Flowbite theme={{ theme: flowbiteTheme }}>{children}</Flowbite>
        <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></Script>
        <Script src="/landing_assets/main.js"></Script>
      </body>
    </html>
  );
};

export default RootLayout;
