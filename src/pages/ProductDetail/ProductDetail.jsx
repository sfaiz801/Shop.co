import { useState, useMemo } from 'react';
import data from '../../data/data';
import styles from '../../styles/ProductDetail.module.scss';
import ProductCard from '../../components/ProductSection/ProductCard';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FiMinus, FiPlus, FiMoreHorizontal, FiFilter, FiChevronDown } from 'react-icons/fi';

const StarRating = ({ rating, size = 18 }) => (
  <div className={styles.stars}>
    {[1, 2, 3, 4, 5].map((s) => {
      if (s <= Math.floor(rating)) {
        return <FaStar key={s} size={size} color="#FFC633" />;
      } else if (s - 0.5 <= rating) {
        return <FaStarHalfAlt key={s} size={size} color="#FFC633" />;
      }
      return <FaRegStar key={s} size={size} color="#e0e0e0" />;
    })}
    <span className={styles.ratingText}>{rating}/5</span>
  </div>
);

const ReviewCard = ({ review }) => (
  <div className={styles.reviewCard}>
    <div className={styles.reviewTop}>
      <StarRating rating={review.rating} size={16} />
      <button className={styles.moreBtn}><FiMoreHorizontal size={18} /></button>
    </div>
    <div className={styles.reviewerRow}>
      <strong className={styles.reviewerName}>{review.name}</strong>
      <span className={styles.verifiedDot} title="Verified" />
    </div>
    <p className={styles.reviewText}>"{review.text}"</p>
    <span className={styles.reviewDate}>Posted on {review.date}</span>
  </div>
);

const buildCatalog = () => {
  const items = [...data.newArrivals, ...data.topSelling, ...data.relatedProducts];
  const map = new Map();
  for (const item of items) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }
  return map;
};

const catalogMap = buildCatalog();

// Color name lookup
const colorNames = {
  '#4A4A2E': 'Olive Green',
  '#2E3D2E': 'Dark Olive',
  '#1A2A4A': 'Navy Blue',
  '#34A853': 'Green',
  '#EB001B': 'Red',
  '#FBBC05': 'Yellow',
  '#F79E1B': 'Orange',
  '#00C3F8': 'Light Blue',
  '#003087': 'Deep Blue',
  '#7F00FF': 'Purple',
  '#FF1493': 'Pink',
  '#FFFFFF': 'White',
  '#000000': 'Black',
};

const ProductDetail = ({ productId, onBack, onBackHome, onAddToCart, onProductClick }) => {
  // Resolve product — use static detail data or synthesize from catalog
  const product = useMemo(() => {
    const staticDetail = data.productDetail;
    
    // If no productId or it matches static detail, use static data
    if (!productId || productId === staticDetail.id) {
      return staticDetail;
    }

    // Find from catalog
    const catalogProduct = catalogMap.get(productId);
    if (!catalogProduct) return staticDetail;

    // Synthesize PDP-level data from catalog product
    const descriptions = [
      'This versatile piece is crafted from premium materials for all-day comfort. Perfect for casual outings and everyday wear.',
      'A timeless wardrobe essential designed with attention to detail. Soft fabric blend ensures a comfortable fit throughout the day.',
      'Elevate your style with this carefully designed piece. Made from high-quality materials that feel as good as they look.',
    ];

    const colors = ['#4A4A2E', '#2E3D2E', '#1A2A4A'];
    const sizes = ['Small', 'Medium', 'Large', 'X-Large'];

    return {
      ...catalogProduct,
      reviewCount: catalogProduct.reviews || 120,
      originalPrice: catalogProduct.originalPrice || Math.round(catalogProduct.price * 1.25),
      discount: catalogProduct.discount || 20,
      description: descriptions[catalogProduct.id % descriptions.length],
      colors,
      sizes,
      images: [
        catalogProduct.image,
        data.newArrivals[0]?.image || catalogProduct.image,
        data.topSelling[0]?.image || catalogProduct.image,
      ],
      details: '100% premium fabric. Machine washable. Regular fit. Modern design. Available in multiple sizes.',
      faqs: 'How do I choose my size? Please refer to our size guide. Can I return this item? Yes, returns accepted within 30 days.',
    };
  }, [productId]);

  const reviews = data.productReviews;
  const related = data.relatedProducts;

  const [mainImg, setMainImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');
  const [addedToCart, setAddedToCart] = useState(false);

  // Reset state when product changes
  useMemo(() => {
    setMainImg(0);
    setSelectedColor(0);
    setSelectedSize(product.sizes?.[2] || 'Large');
    setQty(1);
    setAddedToCart(false);
  }, [productId]);

  const handleAddToCart = () => {
    if (onAddToCart) {
      const colorHex = product.colors?.[selectedColor] || '#000000';
      const colorName = colorNames[colorHex] || 'Black';
      onAddToCart(product, selectedSize, colorName, qty);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className={styles.page}>

      {}
      <div className={styles.breadcrumbWrap}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <button onClick={onBackHome || onBack} className={styles.breadLink}>Home</button>
            <span className={styles.chevron}>›</span>
            <button onClick={onBack} className={styles.breadLink}>Shop</button>
            <span className={styles.chevron}>›</span>
            <span className={styles.breadCurrent}>{product.name}</span>
          </nav>
        </div>
      </div>

      {}
      <section className={styles.productSection}>
        <div className="container">
          <div className={styles.productGrid}>

            {/* Left: Gallery */}
            <div className={styles.gallery}>
              {/* Thumbnails */}
              <div className={styles.thumbs}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${mainImg === i ? styles.thumbActive : ''}`}
                    onClick={() => setMainImg(i)}
                  >
                    <img src={img} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className={styles.mainImgWrap}>
                <img
                  src={product.images[mainImg]}
                  alt={product.name}
                  className={styles.mainImg}
                />
              </div>
            </div>

            {/* Right: Info */}
            <div className={styles.info}>
              <h1 className={styles.productName}>{product.name.toUpperCase()}</h1>

              <StarRating rating={product.rating} />

              {/* Price row */}
              <div className={styles.priceRow}>
                <span className={styles.price}>${product.price}</span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>${product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className={styles.discountBadge}>-{product.discount}%</span>
                )}
              </div>

              <p className={styles.desc}>{product.description}</p>

              <div className={styles.divider} />

              {/* Color selector */}
              <div className={styles.optionGroup}>
                <span className={styles.optionLabel}>Select Colors</span>
                <div className={styles.colorRow}>
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      className={`${styles.colorBtn} ${selectedColor === i ? styles.colorSelected : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(i)}
                      aria-label={colorNames[color] || `Color ${i + 1}`}
                    >
                      {selectedColor === i && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.divider} />

              {/* Size selector */}
              <div className={styles.optionGroup}>
                <span className={styles.optionLabel}>Choose Size</span>
                <div className={styles.sizeRow}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.divider} />

              {/* Qty + Add to Cart */}
              <div className={styles.cartRow}>
                <div className={styles.qtyControl}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className={styles.qtyNum}>{qty}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty((q) => q + 1)}
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
                <button 
                  className={`${styles.addToCart} ${addedToCart ? styles.addedToCart : ''}`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className={styles.tabsSection}>
        <div className="container">
          <div className={styles.tabs}>
            {['details', 'reviews', 'faqs'].map((tab) => {
              const labels = { details: 'Product Details', reviews: 'Rating & Reviews', faqs: 'FAQs' };
              return (
                <button
                  key={tab}
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          {activeTab === 'details' && (
            <div className={styles.tabContent}>
              <p>{product.details}</p>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className={styles.tabContent}>
              <p>{product.faqs}</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.reviewsSection}>
              {/* Reviews header */}
              <div className={styles.reviewsHeader}>
                <h3 className={styles.reviewsTitle}>
                  All Reviews <span className={styles.reviewCount}>({product.reviewCount})</span>
                </h3>
                <div className={styles.reviewsActions}>
                  <button className={styles.filterBtn}>
                    <FiFilter size={20} />
                  </button>
                  <button className={styles.latestBtn}>
                    Latest <FiChevronDown size={14} />
                  </button>
                  <button className={styles.writeReviewBtn}>Write a Review</button>
                </div>
              </div>

              {/* Review cards grid */}
              <div className={styles.reviewsGrid}>
                {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>

              <div className={styles.loadMoreWrap}>
                <button className={styles.loadMoreBtn}>Load More Reviews</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {}
      <section className={styles.relatedSection}>
        <div className="container">
          <h2 className={styles.relatedTitle}>YOU MIGHT ALSO LIKE</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
