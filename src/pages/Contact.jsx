import Store from "../assets/images/contact.svg";
import Map from "../assets/images/Map.png"

const Contact = () => {
  return (
    <div className="container my-5">
      <div className="row">

        {/* LEFT COLUMN */}
        <div className="col-md-6">
          <h2 className="mb-3">Contact Us</h2>

          {/* FORM */}
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="4"></textarea>
            </div>

            <button className="btn btn-primary" type="submit">
              <i className="fas fa-paper-plane me-2"></i>
              Send Message
            </button>
          </form>

          <div className="card shadow-sm border-0 my-4">
            <img
              src={Map}
              className="card-img-top"
              alt="Store map"
            />
            <div className="card-body">
              <h5 className="card-title" >Our Main Location</h5>
              <ul className="list-unstyled mb-0">
                <li>🕘 Mon–Sat: 12AM–6AM</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-md-5 offset-md-1">
          <div className="card shadow-lg border-0">
            <img
              src={Store}
              className="card-img-top"
              alt="Contact our store"
            />
            <div className="card-body border-0" style={{ backgroundColor: "#b20303d6", color: "#FFF" }}>
              <h5 className="card-title ">Visit our Physical Store</h5>
              <ul className="list-unstyled mb-0">
                <li>📍 Metro Manila</li>
                <li>📍 Bulacan</li>
                <li>📍 New York Cubao</li>
                <li>📞 +63 9XX XXX XXXX</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;