const Policies = () => {
  return (

<div className="container py-5">
  <h2 className="mb-4">Policies & Terms & Conditions</h2>

  <div className="accordion" id="policyAccordion">

    {/* Orders & Payments */}
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#policy1"
        >
          Orders & Payments
        </button>
      </h2>
      <div
        id="policy1"
        className="accordion-collapse collapse show"
        data-bs-parent="#policyAccordion"
      >
        <div className="accordion-body">
          <p>
            All orders placed on our store are subject to availability and
            confirmation. Prices are displayed in Philippine Peso (PHP) unless
            stated otherwise.
          </p>
          <p>
            Payments must be completed in full before an order is processed and
            shipped. We reserve the right to cancel orders with incomplete or
            suspicious payment activity.
          </p>
        </div>
      </div>
    </div>

    {/* Returns & Refunds */}
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#policy2"
        >
          Returns & Refunds
        </button>
      </h2>
      <div
        id="policy2"
        className="accordion-collapse collapse"
        data-bs-parent="#policyAccordion"
      >
        <div className="accordion-body">
          <p>
            We accept returns within <strong>7 days</strong> from the date of
            delivery for items that are defective, damaged, or incorrect.
          </p>
          <p>
            Products must be returned in their original packaging and condition.
            Refunds will be processed after inspection and approval.
          </p>
        </div>
      </div>
    </div>

    {/* Shipping & Delivery */}
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#policy3"
        >
          Shipping & Delivery
        </button>
      </h2>
      <div
        id="policy3"
        className="accordion-collapse collapse"
        data-bs-parent="#policyAccordion"
      >
        <div className="accordion-body">
          <p>
            Delivery times may vary depending on your location and courier
            availability. Estimated delivery dates are provided for reference
            only.
          </p>
          <p>
            We are not responsible for delays caused by external factors such as
            weather conditions or courier issues.
          </p>
        </div>
      </div>
    </div>

    {/* Store Rules */}
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#policy4"
        >
          Store Rules & Usage
        </button>
      </h2>
      <div
        id="policy4"
        className="accordion-collapse collapse"
        data-bs-parent="#policyAccordion"
      >
        <div className="accordion-body">
          <ul className="mb-0">
            <li>Accurate and truthful information must be provided.</li>
            <li>Misuse of the platform is strictly prohibited.</li>
            <li>We reserve the right to update policies without prior notice.</li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</div>
    
    
  );
};

export default Policies;