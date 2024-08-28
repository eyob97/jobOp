"use client";

import React from "react";

import Header from "./LandingPage/HeaderV2";
import DynamicFooter from "./LandingPage/Footer";

const PrivacyPolicyComponent: React.FC = () => {
  return (
    <>
      <Header />
      <div className="bg-[#116034d9] h-28"></div>
      <main>
        <section id="terms-of-service">
          <div className="container">
            <div className="max-w-1xl mx-auto p-4 sm:p-6 lg:p-8">
              <h1 className="text-3xl font-bold mb-4">JobOp Privacy Policy</h1>
              <p className="text-sm text-gray-500 mb-6">
                Effective Date: August 28, 2024
              </p>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Welcome to JobOp (“we,” “us,” or “our”). We are committed to
                  protecting your personal information and your right to
                  privacy. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your personal information when you use
                  our services through WhatsApp and our website{" "}
                  <a
                    href="http://www.jobop.co.za"
                    className="text-blue-600 hover:underline"
                  >
                    www.jobop.co.za
                  </a>{" "}
                  (collectively, the "Service").
                </p>
                <p className="text-gray-700">
                  By accessing or using our Service, you signify that you have
                  read, understood, and agree to our collection, storage, use,
                  and disclosure of your personal information as described in
                  this Privacy Policy.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  2. Information We Collect
                </h2>
                <p className="text-gray-700 mb-4">
                  We collect various types of information to provide and improve
                  our Service to you. The information we may collect includes:
                </p>
                <h3 className="text-xl font-semibold mb-2">
                  2.1. Personal Information
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>a. Information Provided by You</strong>
                </p>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                  <li>
                    <strong>Contact Information:</strong> Name, email address,
                    phone number.
                  </li>
                  <li>
                    <strong>Professional Information:</strong> Curriculum Vitae
                    (CV), employment history, education background, skills,
                    certifications, and other job-related information.
                  </li>
                  <li>
                    <strong>Demographic Information:</strong> Age, gender,
                    location.
                  </li>
                  <li>
                    <strong>Communication:</strong> Any messages or
                    communications you send to us via WhatsApp or other
                    channels.
                  </li>
                </ul>
                <p className="text-gray-700 mb-4">
                  <strong>b. Information Collected Automatically</strong>
                </p>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                  <li>
                    <strong>Usage Data:</strong> Details of your interactions
                    with our Service, including date and time stamps, pages
                    viewed, and other usage patterns.
                  </li>
                  <li>
                    <strong>Device Information:</strong> Information about the
                    device you use to access our Service, including device type,
                    operating system, and browser type.
                  </li>
                  <li>
                    <strong>Location Data:</strong> Approximate location
                    information based on your IP address or device settings.
                  </li>
                </ul>
                <h3 className="text-xl font-semibold mb-2">
                  2.2. Cookies and Similar Technologies
                </h3>
                <p className="text-gray-700">
                  We may use cookies and similar tracking technologies to track
                  the activity on our Service and hold certain information.
                  Cookies are files with a small amount of data stored on your
                  device. You can instruct your browser to refuse all cookies or
                  to indicate when a cookie is being sent; however, some parts
                  of our Service may not function properly without cookies.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  3. How We Use Your Information
                </h2>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                  <li>
                    <strong>Providing and Improving Our Service:</strong> To
                    match job seekers with suitable employment opportunities,
                    communicate with you regarding job offers, updates, and
                    notifications, process and manage your subscription and
                    payments, and personalize your experience.
                  </li>
                  <li>
                    <strong>Communication:</strong> To send you informational
                    and promotional messages about our services and offers, and
                    respond to your inquiries and support needs.
                  </li>
                  <li>
                    <strong>Analytics and Research:</strong> To monitor and
                    analyze usage and trends, develop new features, services,
                    and products.
                  </li>
                  <li>
                    <strong>Legal and Security:</strong> To detect, prevent, and
                    address technical issues, fraud, and abuse, and to comply
                    with legal obligations.
                  </li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  4. Sharing Your Information
                </h2>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                  <li>
                    <strong>With Potential Employers:</strong> We share your
                    professional information and CV with employers and
                    recruiters.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> We may engage
                    third-party companies and individuals to facilitate our
                    Service. These third parties are obligated not to disclose
                    or use your information for any other purpose.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose your
                    information if required by law or public authorities.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In the event of a
                    merger, acquisition, or asset sale, your information may be
                    transferred with notice.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> We may disclose your
                    information with your explicit consent.
                  </li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  5. Your Rights and Choices
                </h2>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                  <li>
                    <strong>Access and Update:</strong> You have the right to
                    access and update your personal information.
                  </li>
                  <li>
                    <strong>Withdrawal of Consent:</strong> You may withdraw
                    your consent at any time.
                  </li>
                  <li>
                    <strong>Deletion:</strong> You can request that we delete
                    your personal information.
                  </li>
                  <li>
                    <strong>Opt-Out of Communications:</strong> You can opt-out
                    of receiving promotional communications.
                  </li>
                  <li>
                    <strong>Lodging a Complaint:</strong> You have the right to
                    lodge a complaint with the relevant supervisory authority.
                  </li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  6. Data Security
                </h2>
                <p className="text-gray-700 mb-4">
                  We take the security of your personal information seriously
                  and implement appropriate measures to protect it against
                  unauthorized access, alteration, disclosure, or destruction.
                  These measures include encryption, access controls, and
                  regular monitoring. However, no method of transmission or
                  electronic storage is completely secure.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  7. Data Retention
                </h2>
                <p className="text-gray-700">
                  We will retain your personal information only for as long as
                  necessary for the purposes set out in this Privacy Policy.
                  When no longer required, we will delete or anonymize it
                  securely.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  8. International Data Transfers
                </h2>
                <p className="text-gray-700">
                  Your information may be transferred to and maintained on
                  servers located outside of your jurisdiction. By using our
                  Service, you consent to such transfers.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  9. Third-Party Links and Services
                </h2>
                <p className="text-gray-700">
                  Our Service may contain links to third-party websites or
                  services. This Privacy Policy does not apply to those third
                  parties, and we recommend reviewing their privacy policies.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  10. Children's Privacy
                </h2>
                <p className="text-gray-700">
                  Our Service is not intended for individuals under the age of
                  18. If you become aware that a child has provided us with
                  personal information, please contact us immediately. We will
                  take steps to remove such information if we become aware of
                  it.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  11. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website and updating the "Effective Date" at the top of this policy. We encourage you to review this Privacy Policy periodically for any changes. Your continued use of the Service after any changes signifies your acceptance of the updated Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  12. Contact Information
                </h2>
                <p className="text-gray-700">
                  If you have any questions or concerns about these Terms,
                  please contact us at:
                </p>
                <p className="text-gray-700 mt-4">
                  <strong>JobOp Support</strong>
                </p>
                <p className="text-gray-700">
                  Email:{" "}
                  <a
                    href="mailto:support@jobop.co.za"
                    className="text-blue-600 hover:underline"
                  >
                    support@jobop.co.za
                  </a>
                </p>
                <p className="text-gray-700">
                  WhatsApp: [Your WhatsApp number]
                </p>
                <p className="text-gray-700">Address: [Insert Physical Address]</p>
              </section>
            </div>
          </div>
        </section>
        {/* <Faqs /> */}
        {/* <Newsletter /> */}
      </main>
      <DynamicFooter />
    </>
  );
};

export default PrivacyPolicyComponent;
