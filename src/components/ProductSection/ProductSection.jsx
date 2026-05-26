import ProductCard from './ProductCard';
import styles from '../../styles/ProductSection.module.scss';

const ProductSection = ({ title, products, onCardClick, onViewAllClick }) => (
  <section className={styles.section}>
    <div className="container">
      <h2 className={`section-title ${styles.title}`}>{title}</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={onCardClick} />
        ))}
      </div>
      <button className="view-all-btn" onClick={onViewAllClick}>View All</button>
    </div>
  </section>
);

export default ProductSection;
