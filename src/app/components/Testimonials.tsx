"use client";
import { useState } from "react";

const testimonials = [
  {
    text: "Jobop.co.za has transformed our hiring process. The platform is user-friendly and very effective.",
    name: "Linda Willimeson",
    position: "Marketing Manager",
    imgSrc: "/landing_assets/images/imgClient01Jpg.jpeg",
  },
  {
    text: "Finding the right job has never been easier. I received job alerts tailored to my skills and landed a job within weeks!",
    name: "Jakki Robbert",
    position: "Marketing Manager",
    imgSrc: "/landing_assets/images/imgClient02Jpg.jpeg",
  },
  {
    text: "This platform made the job search process so much easier. Highly recommend!",
    name: "Sarah Johnson",
    position: "HR Specialist",
    imgSrc: "/landing_assets/images/imgClient02Jpg.jpeg",
  },
  {
    text: "A wonderful experience! I found my dream job within days.",
    name: "Mike Brown",
    position: "Software Developer",
    imgSrc: "/landing_assets/images/imgClient01Jpg.jpeg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 2 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials">
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="text-center features">
            <h1>Testimonials</h1>
          </div>

          <div className="col-sm d-flex justify-content-end">
            <div
              className={`button-1 ${currentIndex !== 0 ? 'active' : ''}`}
              role="button"
              aria-label="Previous Testimonial"
              onClick={handlePrev}
            >
              <img
                className="vector-77"
                src="/landing_assets/vectors/vector40_x2.svg"
              />
            </div>
            <div
              className={`button-2 ${currentIndex + 2 < testimonials.length ? 'active' : ''}`}
              role="button"
              aria-label="Next Testimonial"
              onClick={handleNext}
            >
              <img
                className="vector-78"
                src="/landing_assets/vectors/vector56_x2.svg"
              />
            </div>
          </div>
        </div>
        <div className="row testimonial-container">
          {[0, 1].map((offset) => (
            <div
              key={offset}
              className={`col-sm col-lg-6 testimonial ${
                offset === 0 ? "left" : "right"
              } ${currentIndex % 2 === offset ? "active" : ""}`}
              style={{
                display:
                  currentIndex % 2 === offset ||
                  currentIndex % 2 === (offset + 1) % 2
                    ? "block"
                    : "none",
              }}
            >
              <div className={`tabpanel-blockquote${offset === 1 ? "-1" : ""}`}>
                <div className="tabpanel-quote">
                  {
                    testimonials[(currentIndex + offset) % testimonials.length]
                      .text
                  }
                </div>
                <div className={`cite${offset === 1 ? "-1" : ""}`}>
                  <div
                    className={`img-client-0${offset + 1}-jpg`}
                    style={{
                      backgroundImage: `url(${
                        testimonials[
                          (currentIndex + offset) % testimonials.length
                        ].imgSrc
                      })`,
                    }}
                  ></div>
                  <div className="testimonial-name">
                    {
                      testimonials[
                        (currentIndex + offset) % testimonials.length
                      ].name
                    }
                  </div>
                  <span className="testimonial-position">
                    {
                      testimonials[
                        (currentIndex + offset) % testimonials.length
                      ].position
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="progress-nav">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
              (_, index) => (
                <div
                  key={index}
                  className={`tab-${index + 1}-of-${Math.ceil(
                    testimonials.length / 2
                  )}`}
                  style={{
                    backgroundColor:
                      Math.floor(currentIndex / 2) === index ? "#116034" : "#E5E5E5",
                  }}
                ></div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
