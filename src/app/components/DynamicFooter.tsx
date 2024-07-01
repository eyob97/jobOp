"use client";
import { useState, FC } from "react";

const DynamicFooter = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [subscribeNumber, setSubscribeNumber] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);
  const handleSubscribeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSubscribeNumber(e.target.value);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Subscribe Number:", subscribeNumber);
  };

  return (
    <>
      <footer className="bgr-dark text-white" id="contact">
        <div className="row contact-form">
          <div className="row bgr-dark form-main">
            <div className="col-lg-9 ">
              <div className="policy-term">
                <span className="item-link-about-us"> Privacy Policy </span>
                <span className="item-link-carrer"> Terms of Service </span>
              </div>
              <div className="career-blog">
                <span className="item-link-blogs"> Careers </span>
                <span className="item-link-faqs"> Blog </span>
              </div>
              <div className="social-media">
                <img
                  className="social-link"
                  src="/landing_assets/vectors/group7_x2.svg"
                />
                <img
                  className="social-link"
                  src="/landing_assets/vectors/group2_x2.svg"
                />
                <img
                  className="social-link"
                  src="/landing_assets/vectors/group1_x2.svg"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="heading-3-subscribe-newsletter">
                Contact Information
              </div>
              <div className="contact-input">
                <div className="span-wpcf-7-form-control-wrap">
                  <div className="input">
                  <input
                type="tel"
                placeholder="Email* "
              />
                  </div>
                </div>
                <div className="span-wpcf-7-form-control-wrap">
                  <div className="input">
                  <input
                type="tel"
                placeholder="Phone* "
              />
                  </div>
                </div>
              </div>
              <div className="input-send">
                <span className="send text-white fw-bold"> Send </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="section">
        <div className="div-textbox">
          <div className="heading-3-subscribe-newsletter-1">
            Subscribe Newsletter
          </div>
          <div className="well-keep-you-updated-with-the-best-new-jobs">
            We'll keep you updated with the best new jobs.
          </div>
          <div className="form">
            <div className="input-3">
              <input
                type="tel"
                value={subscribeNumber}
                onChange={handleSubscribeChange}
                placeholder="Enter Your Number"
                className="input-3"
              />
            </div>
            <div className="button">
              <button
                onClick={handleSubmit}
                className="subscribe-btn text-white btn "
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="img-newsletter-png"></div>
      </div>
    </>
  );
};

export default DynamicFooter;
