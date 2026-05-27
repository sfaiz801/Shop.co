import { useState } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.scss';
import data from './data/data';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Brands from './components/Brands/Brands';
import ProductSection from './components/ProductSection/ProductSection';
import DressStyle from './components/DressStyle/DressStyle';
import Testimonials from './components/Testimonials/Testimonials';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Category from './pages/Category/Category';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Cart from './pages/Cart/Cart';

// Wrapper component to bridge dynamic React Router parameters to the original ProductDetail component
function ProductDetailWrapper({ onAddToCart, onBackHome }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const goToDetail = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCategory = () => {
    navigate('/category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ProductDetail 
      productId={Number(id)} 
      onBack={goToCategory}
      onBackHome={onBackHome}
      onAddToCart={onAddToCart}
      onProductClick={goToDetail}
    />
  );
}

function App() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Persistent Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('shop_co_auth') === 'true';
  });
  
  const [shopFilter, setShopFilter] = useState(null);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('shop_co_auth', 'true');
    toast.success("Welcome to SHOP.CO! Logged in successfully. 🎉", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate('/');
  };
  
  // Global cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 'cart-1',
      productId: 10,
      name: 'Gradient Graphic T-shirt',
      size: 'Large',
      color: 'White',
      price: 145,
      quantity: 1,
      image: '/assets/product_gradient_tshirt.png'
    },
    {
      id: 'cart-2',
      productId: 3,
      name: 'Checkered Shirt',
      size: 'Medium',
      color: 'Red',
      price: 180,
      quantity: 1,
      image: '/assets/product_checkered_shirt.png'
    },
    {
      id: 'cart-3',
      productId: 2,
      name: 'Skinny Fit Jeans',
      size: 'Large',
      color: 'Blue',
      price: 240,
      quantity: 1,
      image: '/assets/product_skinny_jeans.png'
    }
  ]);

  const goToDetail = (productId) => {
    setSelectedProductId(productId || null);
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setSearchQuery('');
    setShopFilter(null);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCategory = () => {
    setSearchQuery('');
    setShopFilter(null);
    navigate('/category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToSale = () => {
    setSearchQuery('');
    setShopFilter('sale');
    navigate('/category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNewArrivals = () => {
    setSearchQuery('');
    setShopFilter('new');
    navigate('/category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToBrands = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('brands-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      const el = document.getElementById('brands-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const goToLogin = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('shop_co_auth');
    toast.info("Logged out successfully. See you soon! 👋", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate('/login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToSignup = () => {
    navigate('/signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCart = () => {
    navigate('/cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate('/category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to Cart handler
  const handleAddToCart = (product, size, color, quantity) => {
    // Check if item with same product+size+color already exists
    const existingIndex = cartItems.findIndex(
      (item) => item.productId === product.id && item.size === size && item.color === color
    );

    if (existingIndex >= 0) {
      // Increase quantity
      setCartItems((prev) =>
        prev.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Add new item
      const newItem = {
        id: `cart-${Date.now()}`,
        productId: product.id,
        name: product.name,
        size,
        color,
        price: product.price,
        quantity,
        image: product.image
      };
      setCartItems((prev) => [...prev, newItem]);
    }

    // Add Toast Notification
    toast.success(`${product.name} (${size}, ${color}) x ${quantity} added to Cart! 🛒`, {
      position: "top-right",
      autoClose: 3000,
    });

    // Navigate to cart
    goToCart();
  };

  // Cart quantity update
  const handleUpdateQty = (cartId, change) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === cartId) {
          const newQty = item.quantity + change;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  // Cart item removal
  const handleRemoveItem = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <ToastContainer />
      {isAuthenticated && (
        <Navbar 
          onLogoClick={goHome} 
          onShopClick={goToCategory} 
          onAccountClick={goToLogin} 
          onCartClick={goToCart}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onSuggestionClick={goToDetail}
          cartCount={cartCount}
          onOnSaleClick={goToSale}
          onNewArrivalsClick={goToNewArrivals}
          onBrandsClick={goToBrands}
        />
      )}

      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/signup" element={<Signup onBack={() => navigate('/login')} onSwitch={() => navigate('/login')} hideBack={true} />} />
            <Route path="*" element={<Login onBack={handleLoginSuccess} onSwitch={goToSignup} hideBack={true} />} />
          </>
        ) : (
          <>
            <Route path="/" element={
              <main>
                <Hero onShopNowClick={goToCategory} />
                <div id="brands-section"><Brands /></div>
                <ProductSection title="New Arrivals" products={data.newArrivals} onCardClick={goToDetail} onViewAllClick={goToCategory} />
                <ProductSection title="Top Selling" products={data.topSelling} onCardClick={goToDetail} onViewAllClick={goToCategory} />
                <DressStyle onCategoryClick={goToCategory} />
                <Testimonials />
                <Newsletter />
              </main>
            } />

            <Route path="/category" element={
              <main>
                <Category 
                  onProductClick={goToDetail} 
                  onBackHome={goHome} 
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                  initialFilter={shopFilter}
                  onClearInitialFilter={() => setShopFilter(null)}
                />
                <Newsletter />
              </main>
            } />

            <Route path="/product/:id" element={
              <main>
                <ProductDetailWrapper 
                  onAddToCart={handleAddToCart}
                  onBackHome={goHome}
                />
                <Newsletter />
              </main>
            } />

            <Route path="/cart" element={
              <main>
                <Cart 
                  cartItems={cartItems}
                  onUpdateQty={handleUpdateQty}
                  onRemoveItem={handleRemoveItem}
                  onProductClick={goToDetail} 
                  onBackHome={goHome}
                  onContinueShopping={goToCategory}
                />
                <Newsletter />
              </main>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>

      {isAuthenticated && <Footer onLogoClick={goHome} />}
    </>
  );
}

export default App;
