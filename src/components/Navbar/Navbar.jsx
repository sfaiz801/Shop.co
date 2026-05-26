import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Navbar.module.scss';
import data from '../../data/data';
import { 
  FiSearch, 
  FiShoppingCart, 
  FiUser, 
  FiX,
  FiChevronDown,
  FiArrowLeft
} from 'react-icons/fi';

const Navbar = ({ onLogoClick, onShopClick, onAccountClick, onCartClick, onSearch, searchQuery, onSuggestionClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        // Don't close if clicking the mobile search toggle button
        if (!e.target.closest(`.${styles.searchIconMobile}`)) {
          setMobileSearchOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compile all products for suggestions
  const allProducts = [...data.newArrivals, ...data.topSelling, ...data.relatedProducts];
  const uniqueProducts = [];
  const seenIds = new Set();
  for (const p of allProducts) {
    if (!seenIds.has(p.id)) {
      seenIds.add(p.id);
      uniqueProducts.push(p);
    }
  }

  // Filter suggestions based on input
  const suggestions = localSearch.trim().length > 0
    ? uniqueProducts.filter((p) => {
        const q = localSearch.toLowerCase().trim();
        return p.name.toLowerCase().includes(q);
      }).slice(0, 5)
    : [];

  const handleShopLink = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    onShopClick && onShopClick();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      setMobileSearchOpen(false);
      onSearch && onSearch(localSearch);
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setMobileSearchOpen(false);
    }
  };

  const handleSearchSubmit = () => {
    setShowSuggestions(false);
    setMobileSearchOpen(false);
    onSearch && onSearch(localSearch);
  };

  const handleSuggestionClick = (productId) => {
    setShowSuggestions(false);
    setMobileSearchOpen(false);
    setLocalSearch('');
    onSuggestionClick && onSuggestionClick(productId);
  };

  const handleInputChange = (e) => {
    setLocalSearch(e.target.value);
    setShowSuggestions(e.target.value.trim().length > 0);
  };

  const renderSuggestions = (isMobile = false) => {
    if (suggestions.length === 0 && localSearch.trim().length > 0) {
      return (
        <div className={`${styles.suggestionsDropdown} ${isMobile ? styles.suggestMobile : ''}`}>
          <div className={styles.noResults}>
            <span>No products found for "{localSearch}"</span>
            <button onClick={handleSearchSubmit} className={styles.searchAllBtn}>
              Search all results →
            </button>
          </div>
        </div>
      );
    }
    if (suggestions.length === 0) return null;
    return (
      <div className={`${styles.suggestionsDropdown} ${isMobile ? styles.suggestMobile : ''}`}>
        {suggestions.map((product) => (
          <button
            key={product.id}
            className={styles.suggestionItem}
            onClick={() => handleSuggestionClick(product.id)}
          >
            <div className={styles.suggestImg}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.suggestInfo}>
              <span className={styles.suggestName}>{product.name}</span>
              <span className={styles.suggestPrice}>${product.price}</span>
            </div>
            <FiArrowLeft className={styles.suggestArrow} size={14} style={{ transform: 'rotate(180deg)' }} />
          </button>
        ))}
        {localSearch.trim().length > 0 && (
          <button className={styles.viewAllResults} onClick={handleSearchSubmit}>
            View all results for "{localSearch}"
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Top Announcement Bar */}
      {announcementVisible && (
        <div className={styles.announcement}>
          <p>
            Sign up and get 20% off to your first order.{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onAccountClick && onAccountClick(); }}>Sign Up Now</a>
          </p>
          <button
            className={styles.closeBtn}
            onClick={() => setAnnouncementVisible(false)}
            aria-label="Close announcement"
          >
            <FiX size={16} />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <nav className={styles.navbar}>
        {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
        <div className={`container ${styles.navInner}`}>
          {/* Hamburger (Mobile) */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); onLogoClick&&onLogoClick(); }} className={styles.logo}>SHOP.CO</a>

          {/* Desktop Nav Links */}
          <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
            {/* Close Button (Mobile Only) */}
            <button
              className={styles.closeMenuBtn}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
            <li>
              <a href="#" onClick={handleShopLink}>
                Shop <FiChevronDown size={12} className={styles.arrow} />
              </a>
            </li>
            <li><a href="#" onClick={handleShopLink}>On Sale</a></li>
            <li><a href="#" onClick={handleShopLink}>New Arrivals</a></li>
            <li><a href="#" onClick={handleShopLink}>Brands</a></li>
          </ul>

          {/* Search + Icons */}
          <div className={styles.navRight}>
            {/* Desktop Search */}
            <div className={styles.searchBox} ref={searchRef}>
              <button className={styles.searchBoxBtn} onClick={handleSearchSubmit} aria-label="Submit search">
                <FiSearch size={16} />
              </button>
              <input 
                type="text" 
                placeholder="Search for products..." 
                value={localSearch}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => localSearch.trim().length > 0 && setShowSuggestions(true)}
              />
              {showSuggestions && renderSuggestions()}
            </div>

            {/* Mobile Search Button */}
            <button 
              className={`${styles.iconBtn} ${styles.searchIconMobile}`} 
              aria-label="Search"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <FiSearch size={20} />
            </button>

            <button className={styles.iconBtn} aria-label="Cart" onClick={onCartClick}>
              <FiShoppingCart size={22} />
            </button>

            <button className={styles.iconBtn} aria-label="Account" onClick={onAccountClick}>
              <FiUser size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {mobileSearchOpen && (
          <div className={styles.mobileSearchOverlay} ref={mobileSearchRef}>
            <div className={styles.mobileSearchInner}>
              <FiSearch size={18} className={styles.mobileSearchIcon} />
              <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
                className={styles.mobileSearchInput}
              />
              <button 
                className={styles.mobileSearchClose} 
                onClick={() => { setMobileSearchOpen(false); setLocalSearch(''); }}
                aria-label="Close search"
              >
                <FiX size={18} />
              </button>
            </div>
            {renderSuggestions(true)}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
