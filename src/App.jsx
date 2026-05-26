import { useState } from 'react';
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

function App() {
  const [page, setPage] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setPage('home');
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
      image: '/assets/product_checkered_shirt.png'
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
    setPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setSearchQuery('');
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCategory = () => {
    setSearchQuery('');
    setPage('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToLogin = () => {
    setPage('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToSignup = () => {
    setPage('signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCart = () => {
    setPage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage('category');
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

  if (!isAuthenticated) {
    if (page === 'signup') {
      return <Signup onBack={() => setPage('login')} onSwitch={() => setPage('login')} hideBack={true} />;
    }
    return <Login onBack={handleLoginSuccess} onSwitch={() => setPage('signup')} hideBack={true} />;
  }

  const isAuthPage = page === 'login' || page === 'signup';
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {!isAuthPage && (
        <Navbar 
          onLogoClick={goHome} 
          onShopClick={goToCategory} 
          onAccountClick={goToLogin} 
          onCartClick={goToCart}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onSuggestionClick={goToDetail}
          cartCount={cartCount}
        />
      )}

      {page === 'home' && (
        <main>
          <Hero onShopNowClick={goToCategory} />
          <Brands />
          <ProductSection title="New Arrivals" products={data.newArrivals} onCardClick={goToDetail} onViewAllClick={goToCategory} />
          <ProductSection title="Top Selling" products={data.topSelling} onCardClick={goToDetail} onViewAllClick={goToCategory} />
          <DressStyle onCategoryClick={goToCategory} />
          <Testimonials />
          <Newsletter />
        </main>
      )}

      {page === 'category' && (
        <main>
          <Category 
            onProductClick={goToDetail} 
            onBackHome={goHome} 
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
          />
          <Newsletter />
        </main>
      )}

      {page === 'detail' && (
        <main>
          <ProductDetail 
            productId={selectedProductId} 
            onBack={goToCategory}
            onBackHome={goHome}
            onAddToCart={handleAddToCart}
            onProductClick={goToDetail}
          />
          <Newsletter />
        </main>
      )}

      {page === 'cart' && (
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
      )}

      {page === 'login' && (
        <Login onBack={goHome} onSwitch={goToSignup} />
      )}

      {page === 'signup' && (
        <Signup onBack={goHome} onSwitch={goToLogin} />
      )}

      {!isAuthPage && <Footer onLogoClick={goHome} />}
    </>
  );
}

export default App;
