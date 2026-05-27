import styles from '../../styles/Hero.module.scss';

const Hero = ({ onShopNowClick }) => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className="row align-items-center w-100 g-4">
          {/* Left Content */}
          <div className={`${styles.heroContent} col-12 col-lg-6`}>
            <h1 className={styles.heroTitle}>
              FIND CLOTHES<br />
              THAT MATCHES<br />
              YOUR STYLE
            </h1>

            <p className={styles.heroDesc}>
              Browse through our diverse range of meticulously crafted garments, designed
              to bring out your individuality and cater to your sense of style.
            </p>

            <button className={styles.shopBtn} onClick={onShopNowClick}>Shop Now</button>

            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>200+</span>
                <span className={styles.statLabel}>International Brands</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.statItem}>
                <span className={styles.statNumber}>2,000+</span>
                <span className={styles.statLabel}>High-Quality Products</span>
              </div>
              <div className={styles.divider} />
              <div className={styles.statItem}>
                <span className={styles.statNumber}>30,000+</span>
                <span className={styles.statLabel}>Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className={`${styles.heroImageWrap} col-12 col-lg-6`}>
            <img
              src="/assets/hero_model.png"
              alt="Fashion models"
              className={styles.heroImage}
            />

            <svg 
              className={`${styles.star} ${styles.starTop}`} 
              viewBox="0 0 104 104" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M52 0C52 28.7183 75.2817 52 104 52C75.2817 52 52 75.2817 52 104C52 75.2817 28.7183 52 0 52C28.7183 52 52 28.7183 52 0Z" 
                fill="black"
              />
            </svg>
            <svg 
              className={`${styles.star} ${styles.starBottom}`} 
              viewBox="0 0 104 104" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M52 0C52 28.7183 75.2817 52 104 52C75.2817 52 52 75.2817 52 104C52 75.2817 28.7183 52 0 52C28.7183 52 52 28.7183 52 0Z" 
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
