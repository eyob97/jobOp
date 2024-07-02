"use client";
import { useState } from "react";

const Newsletter = () => {
  const [subscribeNumber, setSubscribeNumber] = useState("");

  const handleSubscribeChange = (e:any) => setSubscribeNumber(e.target.value);

  const handleSubmit = () => {
    console.log("Subscribe Number:", subscribeNumber);
  };

  return (
    <div className="row">
        <div className="section row">
          <div className="col-md-6 div-textbox">
            <div className="heading-3-subscribe-newsletter-1">
              Subscribe Newsletter
            </div>
            <div className="well-keep-you-updated-with-the-best-new-jobs">
              We'll keep you updated with the best new jobs.
            </div>
            <div className="form">
              <input
                type="tel"
                value={subscribeNumber}
                onChange={handleSubscribeChange}
                placeholder="Enter Your Number"
                className="input-3"
              />
              <div className="button">
                <button onClick={handleSubmit} className="text-white btn">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 img-newsletter-png"></div>
        </div>
      </div>
  );
};

export default Newsletter;
