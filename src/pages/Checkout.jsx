import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "cod",
  });

  const [submitted, setSubmitted] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.phone) {
      alert("Please fill in all fields");
      return;
    }
    setFinalTotal(total);
    clearCart();
    setSubmitted(true);
  };

  const formatPrice = (value) =>
    value.toLocaleString("en-PH", { minimumFractionDigits: 2 });

  // ================= RECEIPT VIEW =================
  if (submitted) {
    return (
      <div className="container my-5 d-flex justify-content-center">
        <div
          className="bg-white p-4 shadow"
          style={{
            maxWidth: "400px",
            width: "100%",
            fontFamily: "monospace",
          }}
        >
          {/* HEADER */}
          <div className="text-center mb-3">
            <h5 className="fw-bold mb-1">Picky Finders</h5>
            <small>Official Receipt</small>
            <br />
            <small>{new Date().toLocaleString()}</small>
          </div>

          <hr style={{ borderTop: "1px dashed black" }} />

          {/* CUSTOMER */}
          <div className="mb-2">
            <div><strong>Name:</strong> {form.name}</div>
            <div><strong>Phone:</strong> {form.phone}</div>
            <div><strong>Payment:</strong> {form.payment.toUpperCase()}</div>
          </div>

          <hr style={{ borderTop: "1px dashed black" }} />

          {/* ITEMS */}
          {cart.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="d-flex justify-content-between">
                <span>{item.name}</span>
                <span>₱{formatPrice(item.price * item.qty)}</span>
              </div>
              <small className="text-muted">
                {item.qty} x ₱{formatPrice(item.price)}
              </small>
            </div>
          ))}

          <hr style={{ borderTop: "1px dashed black" }} />

          {/* TOTAL */}
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>₱{formatPrice(finalTotal / 1.12)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>VAT (12%)</span>
            <span>₱{formatPrice(finalTotal - finalTotal / 1.12)}</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between fw-bold">
            <span>TOTAL</span>
            <span>₱{formatPrice(finalTotal)}</span>
          </div>

          <hr style={{ borderTop: "1px dashed black" }} />

          <div className="text-center mt-3">
            <small>Thank you for your purchase!</small>
          </div>
        </div>
      </div>
    );
  }

  // ================= FORM VIEW =================
  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold text-danger">Checkout</h2>

      <div className="row g-4">
        {/* FORM */}
        <div className="col-lg-6">
          <div className="card shadow-sm p-4">
            <h4 className="mb-4 fw-bold">Customer Information</h4>
            <form onSubmit={handleSubmit}>
              {["name", "email", "address", "phone"].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label text-capitalize">{field}</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    className="form-control"
                    value={form[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="mb-4">
                <label className="form-label">Payment Method</label>
                <select
                  name="payment"
                  className="form-select"
                  onChange={handleChange}
                  value={form.payment}
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="gcash">GCash</option>
                  <option value="card">Credit Card</option>
                </select>
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold">
                Place Order
              </button>
            </form>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="col-lg-6">
          <div className="card shadow-sm p-4">
            <h4 className="mb-4 fw-bold text-danger">Order Summary</h4>

            {cart.map((item) => (
              <div key={item.id} className="d-flex justify-content-between mb-2">
                <span>{item.name} x {item.qty}</span>
                <span>₱{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₱{formatPrice(subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>VAT (12%)</span>
              <span>₱{formatPrice(tax)}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold text-danger">
              <span>Total</span>
              <span>₱{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;