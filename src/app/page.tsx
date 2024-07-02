"use client";

import DynamicFooter from "./components/DynamicFooter";
import Faqs from "./components/Faqs";
import Header from "./components/Home";
import Newsletter from "./components/Newsletter";
import Testimonials from "./components/Testimonials";

export default function Home() {
  const policyLinks = ["Privacy Policy", "Terms of Service"];
  const careerLinks = ["Careers", "Blog"];
  const socialMediaLinks = [
    "/landing_assets/vectors/group7_x2.svg",
    "/landing_assets/vectors/group2_x2.svg",
    "/landing_assets/vectors/group1_x2.svg",
  ];
  const subscribeText = "We'll keep you updated with the best new jobs.";

  return (
    <>
      <Header />
      <div
        className="hero route bg-image bg-color-black"
        id="home"
        style={{
          backgroundImage: `url("/landing_assets/images/rectangle3.png")`,
        }}
      >
        <div className="rectangle-4"></div>
        <div className="hero-content d-table">
          <div className="d-table-cell align-middle">
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-lg-7">
                  <h1 className="text-white text-left empowering-text">
                    Empowering South Africa's Workforce
                  </h1>
                  <div className="text-white text-left">
                    Connecting workers with meaningful job opportunities through
                    a simple WhatsApp interface
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-2">
                      <a
                        href="#"
                        className="btn btn-warning rounded fw-bold text-black w-100"
                      >
                        Subscribe
                      </a>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 text-white text-left mt-2">
                      Join Free for 30 Days
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 text-center">
                  <img
                    src="/landing_assets/images/Group 1057.svg"
                    alt="Phone Chat"
                    className="phone-chat img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main>
        <section id="how-it-works">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="text-center features">
                <h1>How It Works?</h1>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-sm-4">
                <div className="div-icon-box">
                  <div className="step-001-svg">
                    <div>
                      <img
                        src="/landing_assets/images/rectangle1.png"
                        alt=""
                        className="rectangle"
                      />
                    </div>
                  </div>
                  <div className="container-11">
                    <span className="heading-3-complete-your-profile">1</span>
                  </div>
                </div>
                <p className="heading-3-create-account text-center">Sign Up</p>
                <p className="hiw-text">
                  Sign up in seconds using your mobile number. Start your 30-day
                  free trial today!
                </p>
              </div>
              <div className="col-sm-4">
                <div className="div-icon-box">
                  <div className="step-001-svg">
                    <div>
                      <img
                        src="/landing_assets/images/rectangle.png"
                        alt=""
                        className="rectangle"
                      />
                    </div>
                  </div>
                  <div className="container-11">
                    <span className="heading-3-complete-your-profile">2</span>
                  </div>
                </div>
                <p className="heading-3-create-account text-center">
                  Receive Job Alerts
                </p>
                <p className="hiw-text">
                  Get personalized job alerts directly through WhatsApp based on
                  your skills and preferences.
                </p>
              </div>
              <div className="col-sm-4">
                <div className="div-icon-box">
                  <div className="step-001-svg">
                    <div>
                      <img
                        src="/landing_assets/images/rectangle2.png"
                        alt=""
                        className="rectangle"
                      />
                    </div>
                  </div>
                  <div className="container-11">
                    <span className="heading-3-complete-your-profile">3</span>
                  </div>
                </div>
                <p className="heading-3-create-account text-center">
                  Apply Easily
                </p>
                <p className="hiw-text">
                  Reply with interest directly to recruiters and secure your
                  next job opportunity.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="text-center features">
                <h1>Features and Benefits</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <div className="feature-box">
                  <div className="div-num-box-1">
                    <div className="span-number-1">
                      <img
                        className="vector-80"
                        src="/landing_assets/vectors/vector20_x2.svg"
                        alt="Vector"
                      />
                    </div>
                  </div>
                  <div className="feature-header" id="about">
                    <div className="accessible">Cost-Effective</div>
                    <span className="feature-content">
                      Only R10 a month after your free trial. <br />
                      No hidden fees.
                    </span>
                  </div>
                </div>
                <div className="feature-box">
                  <div className="div-num-box-1">
                    <div className="span-number-1">
                      <img
                        className="vector-80"
                        src="/landing_assets/vectors/vector2_x2.svg"
                        alt="Vector"
                      />
                    </div>
                  </div>
                  <div className="feature-header">
                    <div className="accessible">Accessible</div>
                    <span className="feature-content">
                      Accessible on any mobile device, anywhere, anytime.
                    </span>
                  </div>
                </div>
                <div className="feature-box">
                  <div className="div-num-box-1">
                    <div className="span-number-1">
                      <img
                        className="vector-80"
                        src="/landing_assets/vectors/vector35_x2.svg"
                        alt="Vector"
                      />
                    </div>
                  </div>
                  <div className="feature-header">
                    <div className="accessible">Personalized</div>
                    <span className="feature-content">
                      Job matches that fit your skills and career goals.
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="visual-image-png"></div>
              </div>
            </div>
          </div>
        </section>
        <Testimonials />
        <section id="pricing">
          <div className="container-fluid">
            <div className="row price">
              <div className="col-sm col-lg-6">
                <div className="price-text">
                  <p className="pricing-info">
                    <span className="bold-text">R10 per month,</span>
                    <span className="light-text">
                      {" "}
                      billed monthly after your free trial.
                    </span>
                    <span className="bold-text"> Cancel anytime.</span>
                  </p>
                  <div className="list-out-benefits-such-as-unlimited-job-alerts-priority-support-and-additional-resources">
                    List out benefits such as unlimited job alerts, priority
                    support, and additional resources.
                  </div>
                  <div className="item-link">
                    <a
                      href="#"
                      className="btn btn-warning rounded-corner fw-bold"
                    >
                      Subscribe
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 position-relative">
                <img
                  src="/landing_assets/images/before1.png"
                  alt="Background"
                  className="img-fluid before-img"
                />
                <img
                  src="/landing_assets/images/imageCirclePng.png"
                  alt="Foreground"
                  className="img-fluid image-circle-img"
                />
              </div>
            </div>
          </div>
        </section>
        <Faqs />
        <Newsletter/>
              </main>
      <DynamicFooter />
    </>
  );
}
