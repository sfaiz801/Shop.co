import data from '../../data/data';
import styles from '../../styles/Brands.module.scss';

const Brands = () => {
  return (
    <section className={styles.brands}>
      <div className={`container ${styles.brandsInner}`}>
        {data.brands.map((brand, index) => (
          <img key={index} src={brand.image} alt={brand.name} className={styles.brandLogo} />
        ))}
      </div>
    </section>
  );
};

export default Brands;
