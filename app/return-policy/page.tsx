import React from "react";

const ReturnPolicyPage = () => {
  return (
    <>
      <h1 className="text-primary text-5xl font-bold uppercase text-center">
        return policy
      </h1>

      <div className="max-w-3xl mx-auto">
        <p>
          We understand that sometimes our customers may need to return a
          product. That's why we offer a 30-day money-back guarantee. Returns
          are only accepted if the product delivered is different from what is
          advertised on our platform.
        </p>

        <br />

        <p>
          Please note that returns are not accepted for customer-induced defects
          or damage. To be eligible for a return, the product must be in its
          original condition with all packaging, accessories, and tags included.
        </p>

        <br />

        <p>
          Refunds will be issued within 14 business days of receiving the
          returned product. Please note that return shipping costs are the
          customer's responsibility, unless the product is defective or
          different from what was advertised.
        </p>
      </div>
    </>
  );
};

export default ReturnPolicyPage;
