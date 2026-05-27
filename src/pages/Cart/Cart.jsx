import { useState, useMemo } from 'react';
import styles from '../../styles/Cart.module.scss';
import { FiMinus, FiPlus, FiTrash2, FiShoppingCart, FiTag, FiArrowRight } from 'react-icons/fi';

const Cart = ({ cartItems, onUpdateQty, onRemoveItem, onProductClick, onBackHome, onContinueShopping }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Apply promo code validation
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    if (promoCode.toUpperCase() === 'SHOP20') {
      setAppliedPromo(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "SHOP20".');
      setAppliedPromo(false);
    }
  };

  // Calculation metrics
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const discount = useMemo(() => {
    const rate = appliedPromo ? 0.25 : 0.20;
    return Math.round(subtotal * rate);
  }, [subtotal, appliedPromo]);

  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="container">
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <span onClick={onBackHome} className={styles.crumbLink}>Home</span>
        <span className={styles.separator}>&gt;</span>
        <span className={styles.crumbCurrent}>Cart</span>
      </div>

      <h1 className={styles.pageTitle}>YOUR CART</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <FiShoppingCart size={64} strokeWidth={1.5} />
          <h2>Your cart is empty</h2>
          <p>Browse our products and find clothes that match your style.</p>
          <button className={styles.shopNowBtn} onClick={onContinueShopping || onBackHome}>Shop Now</button>
        </div>
      ) : (
        <div className={`${styles.cartInner} row g-4`}>
          {/* Items List */}
          <div className={`${styles.itemsList} col-12 col-lg-7`}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.itemCard}>
                <div 
                  className={styles.itemImageWrap} 
                  onClick={() => onProductClick && onProductClick(item.productId)}
                >
                  <img src={item.image} alt={item.name} />
                </div>

                <div className={styles.itemDetails}>
                  <div className={styles.itemHeader}>
                    <h3 
                      className={styles.itemName} 
                      onClick={() => onProductClick && onProductClick(item.productId)}
                    >
                      {item.name}
                    </h3>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>

                  <p className={styles.itemMeta}>Size: <span>{item.size}</span></p>
                  <p className={styles.itemMeta}>Color: <span>{item.color}</span></p>

                  <div className={styles.itemFooter}>
                    <span className={styles.itemPrice}>${item.price}</span>
                    
                    <div className={styles.qtyController}>
                      <button onClick={() => onUpdateQty(item.id, -1)} aria-label="Decrease quantity">
                        <FiMinus size={16} />
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} aria-label="Increase quantity">
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={`${styles.summaryCard} col-12 col-lg-5`}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span className={styles.rowLabel}>Subtotal</span>
                <span className={styles.rowValue}>${subtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.rowLabel}>Discount ({appliedPromo ? '-25%' : '-20%'})</span>
                <span className={`${styles.rowValue} ${styles.rowDiscount}`}>-${discount}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.rowLabel}>Delivery Fee</span>
                <span className={styles.rowValue}>${deliveryFee}</span>
              </div>
              
              <div className={styles.divider} />

              <div className={`${styles.summaryRow} ${styles.rowTotal}`}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>${total}</span>
              </div>
            </div>

            {/* Promo Code Form */}
            <form className={styles.promoForm} onSubmit={handleApplyPromo}>
              <div className={styles.promoInputWrap}>
                <span className={styles.tagIcon}>
                  <FiTag size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={appliedPromo}
                />
              </div>
              <button 
                type="submit" 
                className={styles.promoBtn}
                disabled={appliedPromo || !promoCode.trim()}
              >
                {appliedPromo ? 'Applied' : 'Apply'}
              </button>
            </form>
            {promoError && <p className={styles.promoError}>{promoError}</p>}
            {appliedPromo && <p className={styles.promoSuccess}>SHOP20 code applied successfully!</p>}

            {/* Checkout CTA */}
            <button 
              className={styles.checkoutBtn} 
              onClick={() => alert('Order Placed Successfully! 🎉')}
            >
              Go to Checkout
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
