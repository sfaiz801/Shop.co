import data from '../../data/data';
import styles from '../../styles/DressStyle.module.scss';

const DressStyle = ({ onCategoryClick }) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <h2 className={styles.title}>BROWSE BY DRESS STYLE</h2>

          <div className={styles.grid}>
            {data.dressStyles.map((style) => (
              <div key={style.id} className={styles.card} onClick={onCategoryClick}>
                <img src={style.image} alt={style.label} loading="lazy" />
                <span className={styles.label}>{style.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressStyle;
