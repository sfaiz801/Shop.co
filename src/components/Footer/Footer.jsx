import data from '../../data/data';
import styles from '../../styles/Footer.module.scss';
import { 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaGithub
} from 'react-icons/fa';

const socialIcons = {
  twitter: <FaTwitter size={14} />,
  facebook: <FaFacebookF size={14} />,
  instagram: <FaInstagram size={14} />,
  github: <FaGithub size={14} />
};

const Footer = ({ onLogoClick }) => {
  const { footerLinks } = data;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.topRow}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <h3 className={styles.logo} onClick={onLogoClick} style={{ cursor: 'pointer' }}>SHOP.CO</h3>
            <p className={styles.tagline}>
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className={styles.socials}>
              {['twitter', 'facebook', 'instagram', 'github'].map((s) => (
                <a key={s} href="#" className={styles.socialLink} aria-label={s}>
                  {socialIcons[s]}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className={styles.linkCol}>
              <h4 className={styles.colTitle}>{category.toUpperCase()}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            Shop.co © 2000–2023, All Rights Reserved
          </p>
          <div className={styles.paymentIcons}>
            <span className={styles.payIcon} aria-label="Visa">
              <img src="/assets/visa.svg" alt="Visa" className={styles.brandImg} />
            </span>
            <span className={styles.payIcon} aria-label="Mastercard">
              <img src="/assets/mastercard.svg" alt="Mastercard" className={styles.brandImg} />
            </span>
            <span className={styles.payIcon} aria-label="PayPal">
              <img src="/assets/paypal.svg" alt="PayPal" className={styles.brandImg} />
            </span>
            <span className={styles.payIcon} aria-label="Apple Pay">
              <img src="/assets/applepay.svg" alt="Apple Pay" className={styles.brandImg} />
            </span>
            <span className={styles.payIcon} aria-label="Google Pay">
              <img src="/assets/googlepay.svg" alt="Google Pay" className={styles.brandImg} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
