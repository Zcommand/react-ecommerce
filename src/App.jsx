import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import About from './pages/About';
import Contact from './pages/Contact';
import Policies from "./pages/Policies";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";       // ✅ Added
import ComparePage from "./pages/ComparePage"; 

function App() {
  return (
    <Router>
      {/* Always full width */}
      <Header />
      <Navbar />
      {/* Main content wrapper - full width, no shrinking */}
      <div className="container-fluid px-4 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />       {/* ✅ Wishlist */}
          <Route path="/compare" element={<ComparePage />} />    {/* ✅ ComparePage */}
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;