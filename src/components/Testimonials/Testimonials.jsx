import { useState } from 'react';
import data from '../../data/data';
import styles from '../../styles/Testimonials.module.scss';
import { FaStar } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { GoVerified } from 'react-icons/go';

const StarRating = ({ count }) => (
  <div className={styles.stars}>
    {Array.from({ length: count }).map((_, i) => (
      <FaStar key={i} size={18} color="#FFC633" />
    ))}
  </div>
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = data.testimonials.length;

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>OUR HAPPY CUSTOMERS</h2>
          <div className={styles.controls}>
            <button onClick={prev} className={styles.arrowBtn} aria-label="Previous">
              <FiArrowLeft size={24} />
            </button>
            <button onClick={next} className={styles.arrowBtn} aria-label="Next">
              <FiArrowRight size={24} />
            </button>
          </div>
        </div>

        <div className={styles.cardsWrap}>
          {data.testimonials.map((t, idx) => (
            <div
              key={t.id}
              className={`${styles.card} ${idx === activeIndex ? styles.active : ''}`}
            >
              <StarRating count={t.rating} />
              <div className={styles.nameRow}>
                <strong>{t.name}</strong>
                <span className={styles.verifiedBadge}>
                  <GoVerified size={19} color="#01AB31" />
                </span>
              </div>
              <p className={styles.text}>&quot;{t.text}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
