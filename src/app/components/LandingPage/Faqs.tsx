"use client";
import { useState } from "react";

const faqs = [
  {
    question: "What is JobOp?",
    answer: "JobOp is a job matching platform that connects job seekers with potential employers in South Africa. The platform is designed to streamline the recruitment process, making it easier for job seekers to find job opportunities and for employers to find qualified candidates.",
  },
  {
    question: "How does JobOp work?",
    answer: "JobOp works by allowing job seekers to subscribe to our service via WhatsApp. Once subscribed, they can upload their CV, and our AI technology reads, extracts, and organizes the data. Job seekers receive daily job offers that match their profile. They can apply for jobs directly by responding to the messages.",
  },
  {
    question: "How do I register for JobOp?",
    answer: "You can register by sending a message to our JobOp WhatsApp number. If you're not an existing member, you'll receive a link to complete a 2-step VAS subscription. After successfully subscribing, you'll be prompted to upload your CV to start the job matching process",
  },
  {
    question: "What is the subscription fee for JobOp?",
    answer: "The subscription fee is 10 ZAR per week. This fee allows you to receive daily job offers and apply directly through WhatsApp.",
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
      <div className="col-sm-12 col-md-4">
        <img src="/landing_assets/images/imgExploreJpg.jpeg" alt="Explore" className="img-fluid img-explore-jpg" />
      </div>
      <div className="col-sm-12 col-md-8">
        <div className="row mb-3">
          <div className="features-ask text-left">
            <h1 className="frequently-ask-questions">Frequently Ask</h1>
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
