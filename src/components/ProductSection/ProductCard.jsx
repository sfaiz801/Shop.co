import styles from '../../styles/ProductSection.module.scss';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => (
  <div className={styles.stars}>
    {[1, 2, 3, 4, 5].map((star) => {
      if (star <= Math.floor(rating)) {
        return <FaStar key={star} size={14} color="#FFC633" />;
      } else if (star - 0.5 <= rating) {
        return <FaStarHalfAlt key={star} size={14} color="#FFC633" />;
      }
      return <FaRegStar key={star} size={14} color="#e0e0e0" />;
    })}
    <span className={styles.ratingText}>{rating}/5</span>
  </div>
);

const ProductCard = ({ product, onClick }) => (
  <div 
    className={styles.card} 
    onClick={() => onClick && onClick(product.id)} 
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    <div className={styles.imageWrap}>
      <img src={product.image} alt={product.name} loading="lazy" />
      {product.discount && (
        <span className={styles.discountBadge}>-{product.discount}%</span>
      )}
    </div>
    <div className={styles.cardInfo}>
      <h3 className={styles.cardName}>{product.name}</h3>
      <StarRating rating={product.rating} />
      <div className={styles.priceRow}>
        <span className={styles.price}>${product.price}</span>
        {product.originalPrice && (
          <span className={styles.originalPrice}>${product.originalPrice}</span>
        )}
      </div>
    </div>
  </div>
);

export default ProductCard;
