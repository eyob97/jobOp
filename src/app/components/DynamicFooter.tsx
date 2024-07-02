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
      <footer>
      
        <div className="container-fluid">
          <div className="row contact-form">
            <div className="col-lg-6">
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
            <div className="col-lg-6">
              <div className="heading-3-subscribe-newsletter">
                Contact Information
              </div>
              <div className="contact-input">
                <div className="span-wpcf-7-form-control-wrap">
                  <input
                    type="email"
                    placeholder="Email* "
                    className="input"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="span-wpcf-7-form-control-wrap-1">
                  <input
                    type="tel"
                    placeholder="Phone* "
                    className="input"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className=" input-send text-white btn "
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default DynamicFooter;
