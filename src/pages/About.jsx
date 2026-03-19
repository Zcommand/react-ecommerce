import aboutImg from "../assets/images/about.svg";

const About = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">

        {/* Text Section */}
        <div className="col-lg-6 mb-4">
          <h2 className="mb-3">About Picky Finders</h2>

          <p>
            Our store was built with one goal in mind — to make technology and
            quality products more accessible to everyone. We carefully select
            trusted brands and reliable products to ensure that every purchase
            meets high standards of performance and value.
          </p>

          <p>
            From powerful gaming laptops to essential accessories, we aim to
            provide solutions that match different lifestyles, whether you are
            a student, professional, or tech enthusiast.
          </p>

          <p>
            Using modern web technologies like <strong>React</strong>,
            <strong> Bootstrap</strong>, and <strong>FontAwesome</strong>, our
            platform is designed to be fast, responsive, and easy to use across
            all devices.
          </p>
        </div>

        {/* Image / Card Section */}
        <div className="col-lg-6">
          <div className="card shadow-lg card-hover border-0">
            <img
              src={aboutImg}
              className="card-img-top"
              alt="About our store"
            />
            <div className="card-body">
              <h5 className="card-title">Why Shop With Us?</h5>

              <ul className="list-unstyled mb-0">
                <li className="mb-2">✔ Carefully selected and trusted products</li>
                <li className="mb-2">✔ Competitive pricing and great deals</li>
                <li className="mb-2">✔ Clean, modern, and user-friendly interface</li>
                <li className="mb-2">✔ Built for speed, reliability, and convenience</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;