import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube"; // YouTube optimized
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { booksData, categoriesData, featuredData } from "./Common/constant";

// const BACKEND_URL =
//   process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";

// Home Page Component
function HomePage({ books, featuredBooks, categories, onBookSelect }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filterBooks = () => {
    if (selectedCategory === "all") {
      return books;
    }
    return books.filter((book) => book.category === selectedCategory);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 className="hero-title">Welcome to Literary Depot</h2>
          <p className="hero-subtitle">
            Discover extraordinary books that inspire, educate, and entertain
          </p>
          <Link to="/categories" className="hero-cta">
            Explore Our Collection
          </Link>
        </div>
      </section>
      {/* Featured Books */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Books</h2>
          <div className="featured-grid">
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                featured={true}
                onSelect={onBookSelect}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Quick Browse */}
      <section className="quick-browse-section">
        <div className="container">
          <h2 className="section-title">Quick Browse</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/categories?category=${encodeURIComponent(category)}`}
                className="category-card"
              >
                <h3>{category}</h3>
                <p>
                  {books.filter((book) => book.category === category).length}{" "}
                  books
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Categories Page Component
function CategoriesPage({ books, categories, onBookSelect }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get("category");

  useEffect(() => {
    if (categoryFromUrl) {
      debugger;
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);
  console.log("categories", selectedCategory);

  const filterBooks = () => {
    if (selectedCategory === "all") {
      return books;
    }

    return books.filter((book) => book.category === selectedCategory);
  };

  const categoryVideos = {
    action_thriller: "https://youtube.com/shorts/0ywoYTdBx0U",
    business_self_help: "https://youtube.com/shorts/NWOwxQcxD2Q",
    legal: "https://youtube.com/shorts/77MR4BcX0GE",
    young: "https://youtu.be/uGDuMy8Xwk4",
    young2: "https://youtu.be/QdtPwwqSbtQ",
    midnight: "https://youtube.com/shorts/NWOwxQcxD2Q",
    midnight2: "https://youtu.be/JqcQCKN_r6Y",
  };

  return (
    <div className="page-content">
      <div className="container">
        <h1 className="page-title">Browse by Category</h1>

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={`category-btn ${
              selectedCategory === "all" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All Books ({books.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category} (
              {books.filter((book) => book.category === category).length})
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="books-grid">
          {filterBooks().map((book) => (
            <BookCard key={book.id} book={book} onSelect={onBookSelect} />
          ))}
        </div>

        {/* ✅ ReactPlayer */}
        {selectedCategory === "Legal Information" && (
          <div className="video-wrapper">
            <ReactPlayer
              url={categoryVideos.young2}
              controls
              width="100%"
              height="400px"
              className="react-player"
            />
          </div>
        )}

        {selectedCategory === "Action & Thriller" && (
          <div className="video-wrapper">
            <ReactPlayer
              url={categoryVideos.midnight}
              controls
              width="100%"
              height="400px"
              className="react-player"
            />
          </div>
        )}

        {selectedCategory === "Action & Thriller" && (
          <div className="video-wrapper">
            <ReactPlayer
              url={categoryVideos.midnight2}
              controls
              width="100%"
              height="400px"
              className="react-player"
            />
          </div>
        )}

        {selectedCategory !== "all" ? (
          <div className="video-wrapper">
            <ReactPlayer
              url={
                selectedCategory === "Action & Thriller"
                  ? categoryVideos.action_thriller
                  : selectedCategory === "Business & Self-Help"
                  ? categoryVideos.business_self_help
                  : selectedCategory === "Legal Information"
                  ? categoryVideos.legal
                  : selectedCategory === "Young Readers"
                  ? categoryVideos.young
                  : categoryVideos.young2
              }
              controls
              width="100%"
              height="400px"
              className="react-player"
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

// Featured Page Component
function FeaturedPage({ featuredBooks, onBookSelect }) {
  return (
    <div className="page-content">
      <div className="container">
        <h1 className="page-title">Featured Books</h1>
        <p className="page-subtitle">
          Discover our hand-picked selection of exceptional reads
        </p>

        <div className="featured-grid">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              featured={true}
              onSelect={onBookSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Upload Page Component
function UploadPage({ books, onUploadSuccess }) {
  return (
    <div className="page-content">
      <div className="container">
        <h1 className="page-title">Upload Book Covers</h1>
        <p className="page-subtitle">
          Customize your book collection with beautiful cover images
        </p>

        <BookUpload books={books} onUploadSuccess={onUploadSuccess} />
      </div>
    </div>
  );
}

// About Page Component
function AboutPage() {
  return (
    <div className="page-content">
      <div className="container">
        <div className="about-content">
          <h1 className="page-title">About Literary Depot</h1>

          <div className="mission-section">
            <h2>Our Mission</h2>
            <p className="mission-text">
              At Literary Depot, we believe that books have the power to
              transform lives, open minds, and create lasting connections. Our
              carefully curated collection spans across genres and ages,
              offering something special for every reader.
            </p>
          </div>

          <div className="story-section">
            <h2>Our Story</h2>
            <p>
              Founded with a passion for literature and learning, Literary Depot
              is more than just a bookstore – we're a gateway to knowledge,
              adventure, and personal growth. From heartwarming children's tales
              like the beloved Bubble Bear series to life-changing business and
              self-help guides, our collection represents the finest in
              contemporary literature.
            </p>
          </div>

          <div className="authors-section">
            <h2>Featured Authors</h2>
            <div className="authors-grid">
              <div className="author-card">
                <h3>Garry Jordan</h3>
                <p>
                  Master storyteller behind the Bubble Bear series and
                  transformational business guides like "Think Rich and Grow
                  Rich"
                </p>
              </div>
              <div className="author-card">
                <h3>Preston Rockefeller</h3>
                <p>
                  Financial wisdom from one of America's most prominent
                  families, sharing generational wealth-building secrets
                </p>
              </div>
              <div className="author-card">
                <h3>Dr. Orion Vexel</h3>
                <p>
                  Leading expert on AI and modern wealth creation, author of
                  "The AI Millionaire"
                </p>
              </div>
              <div className="author-card">
                <h3>Garry Wiggins</h3>
                <p>
                  Versatile author spanning business strategy, legal guidance,
                  and thrilling fiction
                </p>
              </div>
            </div>
          </div>

          <div className="values-section">
            <h2>Why Choose Literary Depot?</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>📚 Curated Collection</h3>
                <p>
                  Every book in our collection is carefully selected for
                  quality, impact, and reader satisfaction
                </p>
              </div>
              <div className="value-item">
                <h3>🎯 Diverse Genres</h3>
                <p>
                  From children's adventures to business mastery, legal guides
                  to thrilling fiction
                </p>
              </div>
              <div className="value-item">
                <h3>🛒 Easy Purchase</h3>
                <p>
                  Seamless ordering through Amazon ensures fast, reliable
                  delivery right to your door
                </p>
              </div>
              <div className="value-item">
                <h3>💡 Life-Changing Content</h3>
                <p>
                  Books that don't just entertain, but educate, inspire, and
                  transform
                </p>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h2>Connect With Us</h2>
            <p>
              Have questions about our collection or need a recommendation?
              We're here to help you find your next great read.
            </p>
            <div className="contact-info">
              <p>📧 Email: winterparkpublications@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// pages/gallery.js or components/GalleryPage.js

export function GalleryPage({ onImageSelect }) {
  const images = Array.from({ length: 25 }, (_, i) => `/assets/i${i + 1}.jpg`);

  return (
    <div className="page-content">
      <div className="container">
        <h1 className="page-title">Gallery</h1>
        <div className="gallery-grid">
          {images.map((url, index) => (
            <div key={index} className="gallery-item">
              <img
                src={url}
                alt={`Gallery Image ${index + 1}`}
                onClick={() => onImageSelect(url)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles or move to CSS file */}
      <style jsx>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        .gallery-item img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .gallery-item img:hover {
          transform: scale(1.03);
        }
        .page-title {
          text-align: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

// Book Card Component
function BookCard({ book, featured = false, onSelect }) {
  return (
    <div
      className={`book-card ${featured ? "featured-book" : ""}`}
      onClick={() => onSelect(book)}
    >
      <div className="book-image-container">
        <img src={book.image_url} alt={book.title} className="book-image" />
        <div className="book-overlay">
          <button className="view-details-btn">View Details</button>
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-category">{book.category}</p>
        <p className="book-price">${book.price}</p>
      </div>
    </div>
  );
}

// Book Modal Component
function BookModal({ book, onClose }) {
  const handleAmazonClick = () => {
    // Open Amazon link directly
    const amazonUrl =
      book.amazon_link ||
      `https://www.amazon.com/s?k=${encodeURIComponent(
        book.title + " " + book.author
      )}`;
    window.location.href = amazonUrl;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <div className="modal-image-section">
            <img
              src={book.image_url}
              alt={book.title}
              className="modal-image"
            />
          </div>
          <div className="modal-info">
            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">by {book.author}</p>
            <p className="modal-category">{book.category}</p>
            <p className="modal-description">{book.description}</p>
            <div className="modal-price-section">
              <p className="modal-price">${book.price}</p>
              <a
                href={
                  book.amazon_link ||
                  `https://www.amazon.com/s?k=${encodeURIComponent(
                    book.title + " " + book.author
                  )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="purchase-btn"
              >
                🛒 Buy on Amazon
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageModal({ book, onImageClose }) {
  return (
    <div className="image-modal-overlay" onClick={onImageClose}>
      <img src={book} alt="books" className="image-modal-full" />
      <style jsx>{`
        .image-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: black;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: zoom-out;
        }

        .image-modal-full {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}

// Main App Component
function App() {
  const books = booksData;
  const featuredBooks = featuredData;
  const categories = categoriesData;

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Router>
      <div className="App">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <Link to="/" className="logo">
              📚 Literary Depot
            </Link>
            <nav className="nav">
              <Link to="/">Home</Link>
              <Link to="/categories">Categories</Link>
              <Link to="/featured">Featured</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/about">About</Link>
            </nav>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                books={books}
                featuredBooks={featuredBooks}
                categories={categories}
                onBookSelect={setSelectedBook}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <CategoriesPage
                books={books}
                categories={categories}
                onBookSelect={setSelectedBook}
              />
            }
          />
          <Route
            path="/featured"
            element={
              <FeaturedPage
                featuredBooks={featuredBooks}
                onBookSelect={setSelectedBook}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/gallery"
            element={<GalleryPage onImageSelect={setSelectedImage} />}
          />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h3>📚 Literary Depot</h3>
                <p>
                  Your gateway to extraordinary books and transformative reading
                  experiences
                </p>
              </div>
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/categories">Categories</Link>
                  </li>
                  <li>
                    <Link to="/featured">Featured</Link>
                  </li>
                  <li>
                    <Link to="/gallery">Gallery</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Book Categories</h4>
                <ul>
                  {categories.slice(0, 4).map((category) => (
                    <li key={category}>
                      <Link
                        to={`/categories?category=${encodeURIComponent(
                          category
                        )}`}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-section">
                <h4>Contact Us</h4>
                <p>📧 winterparkpublications@gmail.com</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>
                &copy; 2025 Literary Depot. All books available through Amazon.
              </p>
            </div>
          </div>
        </footer>

        {/* Book Modal */}
        {selectedBook && (
          <BookModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
        {selectedImage && (
          <ImageModal
            book={selectedImage}
            onImageClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
