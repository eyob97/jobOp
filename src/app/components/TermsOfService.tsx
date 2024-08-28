"use client";

import React from "react";
import Header from "./LandingPage/Header";
import DynamicFooter from "./LandingPage/Footer";

const TermsOfServiceComponent: React.FC = () => {
  return (
    <>
      <Header />
      <div className="bg-[#116034d9] h-28"></div>
      <main>
        <section id="terms-of-service">
          <div className="container">
            <div className="max-w-1xl mx-auto p-4 sm:p-6 lg:p-8">
              <h1 className="text-3xl font-bold mb-4">
                JobOp Terms of Service
              </h1>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700">
                  By accessing or using the JobOp platform (referred to as "the
                  Service"), you agree to comply with and be bound by the
                  following terms and conditions (the "Terms"). If you do not
                  agree to these Terms, you may not use the Service. JobOp
                  reserves the right to modify these Terms at any time, and your
                  continued use of the Service constitutes your acceptance of
                  any changes.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  2. Description of Service
                </h2>
                <p className="text-gray-700">
                  JobOp provides a job matching service that connects job
                  seekers with potential employers via a WhatsApp-based
                  platform. The Service includes but is not limited to job
                  recommendations, job application facilitation, and CV
                  management. JobOp does not guarantee employment or the
                  accuracy of job offers provided.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. Eligibility</h2>
                <p className="text-gray-700">
                  To use the Service, you must be at least 18 years old and
                  legally able to enter into binding contracts. By using the
                  Service, you represent and warrant that you meet these
                  requirements.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  4. Registration and Subscription
                </h2>
                <p className="text-gray-700">
                  To access certain features of the Service, you must subscribe
                  and pay a weekly fee of 10 ZAR. The subscription is
                  non-refundable and will automatically renew each week unless
                  you cancel the Service. You are responsible for providing
                  accurate and up-to-date information during registration.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  5. User Responsibilities
                </h2>
                <p className="text-gray-700">
                  You agree to use the Service in accordance with all applicable
                  laws and regulations. You are solely responsible for the
                  content you submit, including your CV and any communications
                  with potential employers. You agree not to engage in any
                  illegal, harmful, or disruptive activities that may affect the
                  Service or other users.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  6. Privacy Policy
                </h2>
                <p className="text-gray-700">
                  Your privacy is important to us. Please review our{" "}
                  <a
                    href="/privacy-policy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  , which explains how we collect, use, and protect your
                  personal information. By using the Service, you consent to the
                  collection and use of your information as described in the
                  Privacy Policy.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  7. Payment and Billing
                </h2>
                <p className="text-gray-700">
                  By subscribing to the Service, you agree to pay the weekly
                  subscription fee of 10 ZAR. Payments are processed through the
                  supported mobile billing methods (MTN, Vodacom, CellC,
                  Telkom). JobOp reserves the right to change the subscription
                  fee, and any changes will be communicated to you in advance.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  8. Cancellation and Termination
                </h2>
                <p className="text-gray-700">
                  You may cancel your subscription at any time by sending a
                  message to our WhatsApp number with the option to 'Stop
                  Service.' Upon cancellation, you will no longer be billed for
                  the following week. JobOp reserves the right to terminate your
                  access to the Service for any violation of these Terms.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  9. Limitation of Liability
                </h2>
                <p className="text-gray-700">
                  JobOp provides the Service "as is" and does not make any
                  warranties regarding the reliability, accuracy, or
                  availability of the Service. JobOp shall not be liable for any
                  direct, indirect, incidental, or consequential damages
                  resulting from your use of the Service.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  10. Intellectual Property
                </h2>
                <p className="text-gray-700">
                  All content, trademarks, and intellectual property associated
                  with the Service are the property of JobOp or its licensors.
                  You may not reproduce, distribute, or create derivative works
                  from any content provided through the Service without prior
                  written consent.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  11. Governing Law
                </h2>
                <p className="text-gray-700">
                  These Terms are governed by and construed in accordance with
                  the laws of South Africa. Any disputes arising from or related
                  to these Terms or the Service shall be resolved in the courts
                  of South Africa.
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
              </section>
            </div>
          </div>
        </section>
      </main>
      <DynamicFooter />
    </>
  );
};

export default TermsOfServiceComponent;
