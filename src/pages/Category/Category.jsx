import { useState, useMemo, useEffect } from 'react';
import data from '../../data/data';
import styles from '../../styles/Category.module.scss';
import ProductCard from '../../components/ProductSection/ProductCard';
import { 
  FiChevronRight, 
  FiChevronDown, 
  FiChevronLeft, 
  FiX, 
  FiSliders 
} from 'react-icons/fi';

const Category = ({ onProductClick, onBackHome, searchQuery, onClearSearch, initialFilter, onClearInitialFilter }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSize, setActiveSize] = useState('Large');
  const [activeColor, setActiveColor] = useState('#003087');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeDressStyle, setActiveDressStyle] = useState(null);
  const [priceMax, setPriceMax] = useState(200);
  const [currentFilter, setCurrentFilter] = useState(initialFilter || null);

  useEffect(() => {
    setCurrentFilter(initialFilter);
  }, [initialFilter]);

  // Compile all 12 products and deterministically assign tags
  const allProducts = useMemo(() => {
    const items = [...data.newArrivals, ...data.topSelling, ...data.relatedProducts];
    const unique = [];
    const map = new Map();
    for (const item of items) {
      if(!map.has(item.id)) {
        map.set(item.id, true);
        
        // Deterministic sizes
        let sizes = ['Small', 'Medium', 'Large'];
        if (item.id % 2 === 0) sizes.push('X-Large');
        if (item.id % 3 === 0) sizes.push('XX-Large');
        if (item.id % 4 === 0) sizes = ['Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large'];
        if (item.id % 5 === 0) sizes = ['XX-Small', 'X-Small', 'Small', 'Medium'];

        // Deterministic colors
        let colorsList = ['#34A853', '#003087', '#000000'];
        if (item.id % 2 === 0) colorsList = ['#EB001B', '#F79E1B', '#FFFFFF'];
        if (item.id % 3 === 0) colorsList = ['#FBBC05', '#00C3F8', '#7F00FF'];
        if (item.id % 4 === 0) colorsList = ['#FF1493', '#000000', '#003087'];

        // Deterministic category
        let category = 'T-shirts';
        const nameLower = item.name.toLowerCase();
        if (nameLower.includes('jeans')) category = 'Jeans';
        else if (nameLower.includes('shirt')) category = 'Shirts';
        else if (nameLower.includes('shorts')) category = 'Shorts';
        else if (nameLower.includes('hoodie')) category = 'Hoodie';

        unique.push({
          ...item,
          sizes,
          colors: colorsList,
          category
        });
      }
    }
    return unique;
  }, []);

  // Filter products in real-time
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory) {
          return false;
        }
      }
      if (currentFilter === 'sale' && !product.originalPrice) {
        return false;
      }
      if (currentFilter === 'new') {
        const isNew = data.newArrivals.some(item => item.id === product.id);
        if (!isNew) return false;
      }
      if (activeCategory && product.category !== activeCategory) {
        return false;
      }
      if (product.price > priceMax) {
        return false;
      }
      if (activeColor && !product.colors.includes(activeColor)) {
        return false;
      }
      if (activeSize && !product.sizes.includes(activeSize)) {
        return false;
      }
      return true;
    });
  }, [allProducts, activeCategory, priceMax, activeColor, activeSize, searchQuery, currentFilter]);

  // Reset pagination page to 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [activeCategory, priceMax, activeColor, activeSize, searchQuery, currentFilter]);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
  const colors = [
    { code: '#34A853', name: 'Green' },
    { code: '#EB001B', name: 'Red' },
    { code: '#FBBC05', name: 'Yellow' },
    { code: '#F79E1B', name: 'Orange' },
    { code: '#00C3F8', name: 'Light Blue' },
    { code: '#003087', name: 'Deep Blue' },
    { code: '#7F00FF', name: 'Purple' },
    { code: '#FF1493', name: 'Pink' },
    { code: '#FFFFFF', name: 'White' },
    { code: '#000000', name: 'Black' },
  ];

  const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const clearAllFilters = () => {
    setActiveCategory(null);
    setActiveColor(null);
    setActiveSize(null);
    setPriceMax(200);
    setActiveDressStyle(null);
    setCurrentFilter(null);
    onClearInitialFilter && onClearInitialFilter();
  };

  const renderFilters = () => (
    <div className={styles.filterBox}>
      {/* Title / Header */}
      <div className={styles.filterHeader}>
        <h3>Filters</h3>
        <button className={styles.clearBtn} onClick={clearAllFilters}>Clear All</button>
      </div>

      <div className={styles.divider} />

      {/* Category List */}
      <div className={styles.filterGroup}>
        <ul className={styles.catList}>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              >
                <span>{cat}</span>
                <FiChevronRight size={14} className={styles.arrow} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.divider} />

      {/* Price Selector */}
      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>
          <span>Price</span>
          <FiChevronDown size={14} className={styles.toggle} />
        </div>
        <div className={styles.priceWrap}>
          <div className={styles.sliderTrack}>
            <div className={styles.sliderFill} style={{ left: '0%', width: `${((priceMax - 50) / 150) * 100}%` }} />
            <input 
              type="range" 
              min="50" 
              max="200" 
              value={priceMax} 
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className={styles.rangeInput}
            />
          </div>
          <div className={styles.priceLabels}>
            <span>$50</span>
            <span>${priceMax}</span>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Colors Selector */}
      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>
          <span>Colors</span>
          <FiChevronDown size={14} className={styles.toggle} />
        </div>
        <div className={styles.colorsGrid}>
          {colors.map((color) => (
            <button
              key={color.code}
              className={`${styles.colorCircle} ${activeColor === color.code ? styles.colorSelected : ''}`}
              style={{
                backgroundColor: color.code,
                border: color.code === '#FFFFFF' ? '1px solid #ccc' : '1px solid transparent'
              }}
              onClick={() => setActiveColor(activeColor === color.code ? null : color.code)}
              aria-label={color.name}
            >
              {activeColor === color.code && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color.code === '#FFFFFF' ? 'black' : 'white'} strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      {/* Sizes Selector */}
      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>
          <span>Size</span>
          <FiChevronDown size={14} className={styles.toggle} />
        </div>
        <div className={styles.sizesRow}>
          {sizes.map((size) => (
            <button
              key={size}
              className={`${styles.sizeBtn} ${activeSize === size ? styles.sizeActive : ''}`}
              onClick={() => setActiveSize(activeSize === size ? null : size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      {/* Dress Styles */}
      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>
          <span>Dress Style</span>
          <FiChevronDown size={14} className={styles.toggle} />
        </div>
        <ul className={styles.catList}>
          {dressStyles.map((style) => (
            <li key={style}>
              <button
                className={`${styles.catBtn} ${activeDressStyle === style ? styles.catActive : ''}`}
                onClick={() => setActiveDressStyle(activeDressStyle === style ? null : style)}
              >
                <span>{style}</span>
                <FiChevronRight size={14} className={styles.arrow} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className={styles.applyBtn} onClick={() => setIsFilterOpen(false)}>
        Apply Filter
      </button>
    </div>
  );

  return (
    <div className={styles.page}>
      {}
      <div className={styles.breadcrumbWrap}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <button onClick={onBackHome} className={styles.breadLink}>Home</button>
            <span className={styles.chevron}>›</span>
            <span className={styles.breadCurrent}>
              {searchQuery ? 'Search' : (activeCategory || 'Casual')}
            </span>
          </nav>
        </div>
      </div>

      {}
      <section className={styles.mainSection}>
        <div className="container">
          <div className={`${styles.layoutGrid} row g-4`}>
            
            {/* Desktop Left Sidebar */}
            <aside className={`${styles.sidebar} col-12 col-lg-3 d-none d-lg-block`}>
              {renderFilters()}
            </aside>

            {/* Mobile Filter Slide-up Drawer */}
            {isFilterOpen && (
              <div className={styles.backdrop} onClick={() => setIsFilterOpen(false)} />
            )}
            <div className={`${styles.mobileDrawer} ${isFilterOpen ? styles.drawerOpen : ''}`}>
              <div className={styles.drawerHeader}>
                <h3>Filters</h3>
                <button className={styles.closeDrawerBtn} onClick={() => setIsFilterOpen(false)} aria-label="Close filters">
                  <FiX size={20} />
                </button>
              </div>
              <div className={styles.drawerContent}>
                {renderFilters()}
              </div>
            </div>

            {/* Right Products Area */}
            <div className={`${styles.productsArea} col-12 col-lg-9`}>
              
              {/* Search Query Chip Indicator */}
              {searchQuery && (
                <div className={styles.searchBanner}>
                  <span>Showing results for &quot;<strong>{searchQuery}</strong>&quot;</span>
                  <button onClick={onClearSearch} className={styles.clearSearchBtn} aria-label="Clear search">
                    <FiX size={14} /> Clear Search
                  </button>
                </div>
              )}

              {/* Dynamic Initial Filter Chip Indicator */}
              {currentFilter && (
                <div className={styles.searchBanner}>
                  <span>Showing results for <strong>{currentFilter === 'sale' ? 'On Sale Items' : 'New Arrivals'}</strong></span>
                  <button 
                    onClick={() => { setCurrentFilter(null); onClearInitialFilter && onClearInitialFilter(); }} 
                    className={styles.clearSearchBtn} 
                    aria-label="Clear filter"
                  >
                    <FiX size={14} /> Clear Filter
                  </button>
                </div>
              )}

              {/* Products Area Header */}
              <div className={styles.areaHeader}>
                <div className={styles.titleInfo}>
                  <h1 className={styles.title}>
                    {searchQuery ? 'Search Results' : (currentFilter === 'sale' ? 'On Sale' : (currentFilter === 'new' ? 'New Arrivals' : (activeCategory || 'Casual')))}
                  </h1>
                  <span className={styles.productCount}>
                    Showing {displayedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Products
                  </span>
                </div>

                <div className={styles.headerActions}>
                  <span className={styles.sortBy}>
                    Sort by: <strong>Most Popular <FiChevronDown size={12} style={{ verticalAlign: 'middle' }} /></strong>
                  </span>
                  
                  {/* Mobile Filter Toggle Button */}
                  <button className={styles.filterToggleBtn} onClick={() => setIsFilterOpen(true)} aria-label="Filters">
                    <FiSliders size={18} />
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              {displayedProducts.length > 0 ? (
                <div className={`${styles.productsGrid} row g-4`}>
                  {displayedProducts.map((product) => (
                    <div key={product.id} className="col-6 col-md-4">
                      <ProductCard
                        product={product}
                        onClick={onProductClick}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noProducts}>
                  <p>No products match your active filters.</p>
                  <button onClick={clearAllFilters} className={styles.resetBtn}>Reset Filters</button>
                </div>
              )}

              <div className={styles.divider} style={{ margin: '40px 0 24px' }} />

              {/* Premium Pagination Row */}
              {totalPages > 1 && (
                <div className={styles.paginationRow}>
                  <button
                    className={`${styles.pagBtn} ${styles.prevBtn}`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <FiChevronLeft size={14} style={{ marginRight: '6px' }} />
                    Previous
                  </button>

                  <div className={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`${styles.pageNumber} ${currentPage === pageNum ? styles.pageActive : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    className={`${styles.pagBtn} ${styles.nextBtn}`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <FiChevronRight size={14} style={{ marginLeft: '6px' }} />
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Category;
