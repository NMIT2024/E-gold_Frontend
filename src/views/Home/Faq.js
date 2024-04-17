import React from 'react';
import './Faq.css';
import Header from '../Header/Header';
 
const Faq = () => {
  const faqData = [
    {
      question: "What is the eligibility criteria for DigiGold?",
      answer: "Any resident Indian with a valid PAN Card/Form 60/ Aadhar Card and a Bank Account in their name can enroll for DigiGold.",
    },
    {
      question: "Do you charge for storage of my gold?",
      answer: "DigiGold offers free storage for up to 5 years, after which we reserve the right to charge a yearly nominal fee for the storage of your gold, which would be in the range of around 0.3 - 0.4% (per annum) of your gold balance.",
    },
    {
      question: "Is it mandatory to upload my PAN card?",
      answer: "It is not mandatory to upload your PAN card, however, you may be prompted to do so if you wish to purchase gold that is worth more than ₹ 500.",
    },
    {
      question: "Why is KYC needed?",
      answer: "The safety and security of your gold is always our highest priority, and we are continuously working to improve these aspects. We have upgraded the DigiGold experience to prevent the misuse of your account or unauthorized access to your gold. This will ensure a much safer experience for you, while also allowing you to buy or sell more gold than before.",
    },
    {
      question: "What is the Purity of Gold offered under DigiGold?",
      answer: "DigiGold offers 24 Karat Gold of 9999 purity (99.99% pure).",
    },
    {
      question: "What are the various tenures available under DigiGold?",
      answer: "Customer is not obligated to make any fixed or periodic payments unless enrolled in a Gold Savings Plan.",
    },
    {
      question: "What is the minimum & maximum amount needed to buy gold on DigiGold?",
      answer: "The minimum amount of purchase is 10. There is no limit on the maximum amount as long as KYC requirements are complied with. In case of Gold Savings Plan, a customer has to invest in at least 100 worth of gold.",
    },
    {
      question: "How can I get my holding statement?",
      answer: "An online statement will be available at all times which you can view online by clicking on Transaction History link. A quarterly balance statement will also be sent to customers through email.",
    },
    {
      question: "Can I have a joint account for this plan?",
      answer: "No, you cannot have a joint account for DigiGold.",
    },
    {
      question: "Is nomination mandatory for DigiGold?",
      answer: "Nomination norms will be followed as per the distributor’s standards for their product.",
    }
  ];
 
  return (
    <>
    <Header/>
    <div className="faq-container">
      <b className="faq-heading">Frequently Asked Questions</b>
      <div className="faq-scroll">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};
 
 
export default Faq;