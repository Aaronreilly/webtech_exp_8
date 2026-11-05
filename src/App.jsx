
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "./App.css";

// Product Details
const products = [
  { id: 1, name: "Laptop", category: "Laptops", price: 65000, icon: "💻" },
  { id: 2, name: "Smartphone", category: "Smartphones", price: 30000, icon: "📱" },
  { id: 3, name: "Headphones", category: "Headphones", price: 2500, icon: "🎧" },
  { id: 4, name: "Smartwatch", category: "Accessories", price: 5000, icon: "⌚" },
  { id: 5, name: "Camera", category: "Accessories", price: 45000, icon: "📷" },
  { id: 6, name: "Gaming Console", category: "Accessories", price: 35000, icon: "🎮" }
];

// Navigation Bar
function Navbar() {
  return (
    <header>
      <h1>NEOTECH.</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/register">Register</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

// Footer
function Footer() {
  return (
    <footer>
      <h3>NEOTECH.</h3>
      <p>Your World of Technology</p>
      <p>© 2026 NEOTECH. All Rights Reserved.</p>
    </footer>
  );
}

// Product Card
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-icon">{product.icon}</div>
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <h3 className="price">
        ₹{product.price.toLocaleString("en-IN")}
      </h3>
    </div>
  );
}

// Home Page
function Home() {
  return (
    <>
      <section className="hero">
        <p className="tagline">THE FUTURE OF TECHNOLOGY</p>
        <h2>Discover Technology.<br />Experience Innovation.</h2>
        <p>
          Explore the latest laptops, smartphones,
          gadgets and accessories.
        </p>
        <Link to="/products" className="button">
          Explore Products →
        </Link>
      </section>

      <section className="section">
        <h2>Featured Products</h2>
        <p>Explore our latest technology collection.</p>
        <div className="products">
          {products.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/products" className="button">
          View All Products
        </Link>
      </section>
    </>
  );
}

// Products Page
function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || product.category === category)
  );

  return (
    <section className="section">
      <h2>Explore Our Products</h2>
      <p>Find the perfect technology for your needs.</p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Laptops">Laptops</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Headphones">Headphones</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </section>
  );
}

// Registration Page
function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    mobile: "",
    gender: "",
    state: ""
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setSubmitted(false);
  };

  // Validation
  const errors = {
    name: !/^[A-Za-z ]+$/.test(form.name.trim()),
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    password: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password),
    age: !/^\d+$/.test(form.age) ||
         Number(form.age) < 18 ||
         Number(form.age) > 30,
    mobile: !/^\d{10}$/.test(form.mobile),
    gender: !form.gender,
    state: !form.state
  };

  const valid =
    form.name.trim() !== "" && !errors.name &&
    form.email !== "" && !errors.email &&
    form.password !== "" && !errors.password &&
    form.age !== "" && !errors.age &&
    form.mobile !== "" && !errors.mobile &&
    !errors.gender && !errors.state;

  const showError = (field) =>
    touched[field] && (!form[field].trim() || errors[field]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (valid) {
      setSubmitted(true);
    }
  };

  return (
    <div className="card">
      <h2>Create Your Account</h2>
      <p className="subtitle">Join the NEOTECH community.</p>

      <form onSubmit={handleSubmit} noValidate>

        <label>Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={updateField}
          onBlur={() => setTouched({...touched, name: true})}
          placeholder="Enter your full name"
        />
        {showError("name") &&
          <small>Name must contain letters and spaces only.</small>}

        <label>Email Address</label>
        <input
          name="email"
          value={form.email}
          onChange={updateField}
          onBlur={() => setTouched({...touched, email: true})}
          placeholder="Enter your email"
        />
        {showError("email") &&
          <small>Enter a valid email address.</small>}

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={updateField}
          onBlur={() => setTouched({...touched, password: true})}
          placeholder="Minimum 8 characters"
        />
        {showError("password") &&
          <small>Use uppercase, lowercase, a number and 8 characters.</small>}

        <label>Age</label>
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={updateField}
          onBlur={() => setTouched({...touched, age: true})}
          placeholder="Enter age (18–30)"
        />
        {showError("age") &&
          <small>Age must be between 18 and 30.</small>}

        <label>Mobile Number</label>
        <input
          name="mobile"
          value={form.mobile}
          onChange={updateField}
          onBlur={() => setTouched({...touched, mobile: true})}
          placeholder="10-digit mobile number"
        />
        {showError("mobile") &&
          <small>Enter exactly 10 digits.</small>}

        <label>Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={updateField}
          onBlur={() => setTouched({...touched, gender: true})}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {showError("gender") &&
          <small>Please select gender.</small>}

        <label>State</label>
        <select
          name="state"
          value={form.state}
          onChange={updateField}
          onBlur={() => setTouched({...touched, state: true})}
        >
          <option value="">Select State</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
        </select>
        {showError("state") &&
          <small>Please select state.</small>}

        <button type="submit" disabled={!valid}>
          Create Account
        </button>

        {submitted && (
          <p className="success">
            Registration Completed Successfully!
          </p>
        )}
      </form>
    </div>
  );
}

// About Page
function About() {
  return (
    <div className="card">
      <h2>About NEOTECH</h2>
      <p>
        NEOTECH is a modern technology product showcase
        platform designed to explore the latest electronic
        products in one destination.
      </p>
      <p>
        Discover laptops, smartphones, headphones,
        cameras and smart accessories.
      </p>
    </div>
  );
}

// Contact Page
function Contact() {
  return (
    <div className="card">
      <h2>Contact Us</h2>
      <p>Email: support@neotech.com</p>
      <p>Phone: 9876543210</p>
      <p>Location: Coimbatore, Tamil Nadu</p>
    </div>
  );
}

// Main App
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
