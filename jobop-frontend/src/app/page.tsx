"use client";
import { useEffect } from 'react';


export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".menu-link");

    const handleScroll = () => {
      let current: string | null = null;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href")?.includes(current!)) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href")!.slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });

      const navLinks = document.querySelectorAll<HTMLAnchorElement>(".menu-link");
      navLinks.forEach(link => link.classList.remove("active"));
      e.currentTarget.classList.add("active");
    }
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="rectangle-4">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <img className="logo-img" src="/landing_assets/vectors/group3_x2.svg" alt="Logo" />
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto ">
                  <li className="nav-item">
                    <a href="#home" className="menu-link nav-link" onClick={handleClick}>Home</a>
                  </li>
                  <li className="nav-item">
                    <a href="#about" className="menu-link nav-link" onClick={handleClick}>About Us</a>
                  </li>
                  <li className="nav-item">
                    <a href="#how-it-works" className="menu-link nav-link" onClick={handleClick}>How It Works</a>
                  </li>
                  <li className="nav-item">
                    <a href="#pricing" className="menu-link nav-link" onClick={handleClick}>Pricing</a>
                  </li>
                  <li className="nav-item">
                    <a href="#contact" className="menu-link nav-link" onClick={handleClick}>Contact</a>
                  </li>
                  <li className="nav-item">
                    <a href="/ui/sign-up" className="btn btn-warning rounded-corner sub-btn fw-bold mt-1">Sign Up</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="row" id="home">
            <div className="col-sm-6">
              <div className="banner-left">
                <div className="display-1 slogan">
                  Empowering South Africa's Workforce
                </div>
                <span className="slogan-text">
                  Connecting workers with meaningful job opportunities through a
                  simple WhatsApp interface
                </span>
                <div className="row subscribe">
                  <div className="col-4">
                    <a href="#" className="btn btn-warning rounded-corner sub-btn fw-bold">Subscribe</a>
                  </div>
                  <div className="col-4 text-white">Join Free for 30 Days</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 d-flex justify-content-center">
              <img src="/landing_assets/images/phone_chat.png" alt="Phone Chat" className="phone-chat"/>
            </div>
          </div>
        </div>
      </div>
      <section id="how-it-works">
        <div className="container">
          <div className="row mb-3">
            <div className="text-center features">
              <h1>How It's Work?</h1>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-sm-4">
              <div className="div-icon-box ">
                <div className="step-001-svg">
                  <div>
                    <img src="/landing_assets/images/rectangle1.png" alt="" className="rectangle"/>
                  </div>
                </div>
                <div className="container-11">
                  <span className="heading-3-complete-your-profile">
                    1
                  </span>
                </div>
              </div>
              <p className="heading-3-create-account text-center">
                Sign Up
              </p>
              <p className="hiw-text">
                Sign up in seconds using your mobile number. Start your 30-day free trial today!
              </p>
            </div>
            <div className="col-sm-4">
              <div className="div-icon-box ">
                <div className="step-001-svg">
                  <div>
                    <img src="/landing_assets/images/rectangle.png" alt="" className="rectangle"/>
                  </div>
                </div>
                <div className="container-11">
                  <span className="heading-3-complete-your-profile">
                    2
                  </span>
                </div>
              </div>
              <p className="heading-3-create-account text-center">
                Receive Job Alerts
              </p>
              <p className="hiw-text">
                Get personalized job alerts directly through WhatsApp based on your skills and preferences.
              </p>
            </div>
            <div className="col-sm-4">
              <div className="div-icon-box ">
                <div className="step-001-svg">
                  <div>
                    <img src="/landing_assets/images/rectangle2.png" alt="" className="rectangle"/>
                  </div>
                </div>
                <div className="container-11">
                  <span className="heading-3-complete-your-profile">
                    3
                  </span>
                </div>
              </div>
              <p className="heading-3-create-account text-center">
                Apply Easily
              </p>
              <p className="hiw-text">
                Reply with interest directly to recruiters and secure your next job opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="container">
          <div className="row text-center features">
            <h1>Features and Benefits</h1>
          </div>
          <div className="row">
            <div className="col-sm">
              <div className="feature-box">
                <div className="div-num-box-1">
                  <div className="span-number-1">
                    <img className="vector-80" src="/landing_assets/vectors/vector20_x2.svg" />
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
                    <img className="vector-80" src="/landing_assets/vectors/vector2_x2.svg" />
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
                    <img className="vector-80" src="/landing_assets/vectors/vector35_x2.svg" />
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

      <section id="testimonials">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <span className="testimonials"> Testimonials </span>
            </div>
            <div className="col-sm d-flex justify-content-end">
              <div className="button-1" role="button" aria-label="Previous Testimonial">
                <img className="vector-77" src="/landing_assets/vectors/vector40_x2.svg" />
              </div>
              <div className="button-2"  role="button" aria-label="Next Testimonial">
                <img className="vector-78" src="/landing_assets/vectors/vector56_x2.svg" />
              </div>
            </div>
          </div>
          <div className="row testimonial-container">
            <div className="col-sm col-lg-6 testimonial active" data-index="0">
              <div className="tabpanel-blockquote">
                <div className="tabpanel-quote">
                  "Jobop.co.za has transformed our hiring process. The platform is user-friendly and very effective."
                </div>
                <div className="cite">
                  <div className="img-client-01-jpg"></div>
                  <div className="strong-linda-willimeson">Linda Willimeson</div>
                  <span className="marketing-manager">Marketing Manager</span>
                </div>
              </div>
            </div>
            <div className="col-sm col-lg-6 testimonial" data-index="1">
              <div className="tabpanel-blockquote-1">
                <div className="tabpanel-quote">
                  "Finding the right job has never been easier. I received job alerts tailored to my skills and landed a
                  job
                  within weeks!"
                </div>
                <div className="cite-1">
                  <div className="img-client-02-jpg"></div>
                  <div className="strong-jakki-robbert">Jakki Robbert</div>
                  <span className="marketing-manager-1">Marketing Manager</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="progress-nav">
              <div className="tab-1-of-2"></div>
              <div className="tab-2-of-2"></div>
              <div className="tab-3-of-2"></div>
              <div className="tab-4-of-2"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <div className="row price">
            <div className="col-sm col-lg-8">
              <div className="price-text">
                <p className="r-10-per-month-billed-monthly-after-your-free-trial-cancel-anytime">
                  <span className="r-10-per-month-billed-monthly-after-your-free-trial-cancel-anytime-sub-0">R10 per month,
                  </span>
                  <span className="r-10-per-month-billed-monthly-after-your-free-trial-cancel-anytime-sub-4">billed monthly
                    after
                    your free trial.</span><span> Cancel anytime.</span>
                </p>
                <div className="list-out-benefits-such-as-unlimited-job-alerts-priority-support-and-additional-resources">
                  List out benefits such as unlimited job alerts, priority support,
                  and additional resources.
                </div>
                <div className="item-link">
                  <a href="#" className="btn btn-warning rounded-corner fw-bold">Subscribe</a>
                </div>
              </div>
            </div>
            <div className="col-sm col-lg-4">
              <div className="before"></div>
              <div className="image-circle-png"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs">
        <div className="container">
          <div className="row">
            <div className="col-sm col-lg-3">
              <div className="img-explore-jpg"></div>
            </div>
            <div className="col-sm col-lg-9">
              <div className="faqs-1">
                <div className="col-sm">
                  <span className="testimonials"> Frequently Ask Questions </span>
                </div>
                <div className="accordians">

                  <span className="morbi-fringilla-metus-ac-lacus-dapibus">
                    Morbi fringilla metus ac lacus dapibus.
                  </span>
                  <div className="regular-plus">
                    <img className="plus" src="/landing_assets/vectors/plus4_x2.svg" />
                  </div>
                </div>
                <div className="accordians-1">
                  <div className="heading">
                    <span className="what-we-like-to-do-what-we-dont-like-to-do">
                      What we like to do &amp; what we don’t like to do
                    </span>
                    <div className="duotone-x">
                      <img className="x" src="/landing_assets/vectors/x1_x2.svg" />
                    </div>
                  </div>
                  <div className="line-6"></div>
                  <span
                    className="nam-sit-amet-neque-auctor-dignissim-augue-eu-condimentum-justo-fusce-fermentum-tempus-sapien-asagittis-tellus-mattis-id-cras-et-enim-ex-suspendisse-potenti-vivamus-convallis-malesuada-eros-vel-semper">
                    Nam sit amet neque auctor, dignissim augue eu, condimentum
                    justo. Fusce fermentum tempus sapien, a sagittis tellus mattis
                    id. Cras et enim ex. Suspendisse potenti. Vivamus convallis
                    malesuada eros vel semper.
                  </span>
                </div>
                <div className="accordians">
                  <span className="morbi-fringilla-metus-ac-lacus-dapibus">
                    Aliquam fermentum odio nec gravida varius.
                  </span>
                  <div className="regular-plus">
                    <img className="plus" src="/landing_assets/vectors/plus5_x2.svg" />
                  </div>
                </div>
                <div className="accordians">
                  <span className="morbi-fringilla-metus-ac-lacus-dapibus">
                    Quisque quis ex eleifend dolor maximus lacinia.
                  </span>
                  <div className="regular-plus">
                    <img className="plus" src="/landing_assets/vectors/plus_x2.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white" id="contact">
        <div className="row contact-form">
          <div className="row bg-dark form-main">
            <div className="col-lg">
              <div className="policy-term">
                <span className="item-link-about-us"> Privacy Policy </span>
                <span className="item-link-carrer"> Terms of Service </span>
              </div>
              <div className="career-blog">
                <span className="item-link-blogs"> Careers </span>
                <span className="item-link-faqs"> Blog </span>
              </div>
              <div className="social-media">
                <img className="social-link" src="/landing_assets/vectors/group7_x2.svg" />
                <img className="social-link" src="/landing_assets/vectors/group2_x2.svg" />
                <img className="social-link" src="/landing_assets/vectors/group1_x2.svg" />
              </div>
            </div>
            <div className="col-lg">
              <div className="heading-3-subscribe-newsletter">
                Contact Information
              </div>
              <div className="contact-input">
                <div className="span-wpcf-7-form-control-wrap">
                  <div className="input">
                    <span className="email"> Email* </span>
                  </div>
                </div>
                  <div className="span-wpcf-7-form-control-wrap">
                    <div className="input">
                      <span className="email"> Phone* </span>
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
            <span className="enter-your-number"> Enter Your Number </span>
            <div className="input-3">
              <span className="enter-your-number"> Enter Your Number </span>
            </div>
            <div className="button">
              <span className="subscribe-btn"> Subscribe </span>
            </div>
          </div>
        </div>
        <div className="img-newsletter-png"></div>
      </div>
    </div>
  );
}
