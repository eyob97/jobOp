"use client";
import { useState } from "react";

const faqs = [
  {
    question: "Morbi fringilla metus ac lacus dapibus.",
    answer: "Nam sit amet neque auctor, dignissim augue eu, condimentum justo. Fusce fermentum tempus sapien, a sagittis tellus mattis id. Cras et enim ex. Suspendisse potenti. Vivamus convallis malesuada eros vel semper.",
  },
  {
    question: "What we like to do & what we don’t like to do",
    answer: "Nam sit amet neque auctor, dignissim augue eu, condimentum justo. Fusce fermentum tempus sapien, a sagittis tellus mattis id. Cras et enim ex. Suspendisse potenti. Vivamus convallis malesuada eros vel semper.",
  },
  {
    question: "Aliquam fermentum odio nec gravida varius.",
    answer: "Nam sit amet neque auctor, dignissim augue eu, condimentum justo. Fusce fermentum tempus sapien, a sagittis tellus mattis id. Cras et enim ex. Suspendisse potenti. Vivamus convallis malesuada eros vel semper.",
  },
  {
    question: "Quisque quis ex eleifend dolor maximus lacinia.",
    answer: "Nam sit amet neque auctor, dignissim augue eu, condimentum justo. Fusce fermentum tempus sapien, a sagittis tellus mattis id. Cras et enim ex. Suspendisse potenti. Vivamus convallis malesuada eros vel semper.",
  },
];

const FAQComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index:any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faqs">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm col-lg-4">
            <div className="img-explore-jpg"></div>
          </div>
          <div className="col-sm col-lg-8">
            <div className="row mb-3">
              <div className="features-ask text-left">
                <h1>Frequently Ask</h1>
                <p className="heading-3-create-account text-left">Questions</p>
              </div>
              {faqs.map((faq, index) => (
                <div key={index} className={`accordion ${activeIndex === index ? "active" : ""}`}>
                  <div className="accordion-header" onClick={() => handleToggle(index)}>
                    <span className="accordion-question">{faq.question}</span>
                    <div className="icon">{activeIndex === index ? "✕" : "+"}</div>
                  </div>
                  {activeIndex === index && (
                    <div className="accordion-body">
                      <span className="accordion-answer">{faq.answer}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;
