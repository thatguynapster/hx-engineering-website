import React from "react";

const PaymentPolicyPage = () => {
  return (
    <>
      <h1 className="text-primary text-5xl font-bold uppercase text-center">
        payment policy
      </h1>

      <div className="max-w-3xl mx-auto">
        <p>
          We offer flexible payment options to suit our customers' needs. We
          accept major credit cards (Visa, Mastercard, Amex) for payment, as
          well as bank transfer and cash payment options.
        </p>

        <br />

        <p>
          For large orders, financing options or installment plans are
          available. Please contact our sales team for more information.
        </p>

        <br />

        <p>
          Payments are due within 15 days of the invoice date, unless otherwise
          agreed upon. Late payments may incur additional fees and penalties.
        </p>
      </div>
    </>
  );
};

export default PaymentPolicyPage;
