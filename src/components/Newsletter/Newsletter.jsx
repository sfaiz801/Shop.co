import { useState } from 'react';
import styles from '../../styles/Newsletter.module.scss';
import { FiMail } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <h2 className={styles.title}>
            STAY UPTO DATE ABOUT<br />OUR LATEST OFFERS
          </h2>

          <div className={styles.formWrap}>
            <div className={styles.inputBox}>
              <FiMail size={16} />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className={styles.subBtn} onClick={handleSubmit}>
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
