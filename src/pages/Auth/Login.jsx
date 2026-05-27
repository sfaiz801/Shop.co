import { useState, useMemo } from 'react';
import styles from '../../styles/Auth.module.scss';
import { FaStar } from 'react-icons/fa';
import { FiMail, FiLock, FiArrowLeft, FiCheck, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Login = ({ onBack, onSwitch, hideBack = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formError, setFormError] = useState('');

  const isEmailValid = useMemo(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }, [email]);

  const isPasswordValid = useMemo(() => {
    return password.length >= 8;
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    setFormError('');

    if (!email || !isEmailValid || !password || !isPasswordValid) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
            if (email.trim().toLowerCase() === 'faiz@gmail.com' && password === 'Faiz@123') {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          onBack && onBack();
        }, 1800);
      } else {
        setFormError('Invalid email or password.');
      }
    }, 1200);
  };

  return (
    <div className={`${styles.container} container-fluid p-0`}>
      {/* Success Toast */}
      <div className={`${styles.toast} ${showToast ? styles.toastShow : ''}`}>
        <FiCheck size={20} />
        <strong>Success! Welcome back to SHOP.CO.</strong>
      </div>

      <div className="row g-0 w-100 min-vh-100">
        {/* Left Panel */}
        <div className={`${styles.leftPanel} col-lg-6 d-none d-lg-flex`}>
          <div className={styles.leftHeader}>
            <div className={styles.logo} onClick={hideBack ? null : onBack} style={{ cursor: hideBack ? 'default' : 'pointer' }}>
              SHOP.CO
            </div>
          </div>

          <div className={styles.leftMain}>
            <h1 className={styles.heading}>
              Welcome Back to <br />
              <span className={styles.outlineText}>Fashion.</span>
            </h1>
            <p className={styles.desc}>
              Sign in to unlock your personalized feed, track orders, and discover tailored recommendations built specifically for your style.
            </p>
          </div>

          {/* Testimonial Card */}
          <div className={styles.testimonialCard}>
            <div className={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <FaStar key={s} size={16} color="#FFC633" />
              ))}
            </div>
            <p className={styles.quote}>
              "SHOP.CO completely transformed my shopping experience. The style recommendations are spot-on, and the quality is absolutely unmatched!"
            </p>
            <div className={styles.authorRow}>
              <div className={styles.authorDetails}>
                <strong>Sarah M.</strong>
                <span>Verified Customer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className={`${styles.rightPanel} col-12 col-lg-6 d-flex align-items-center justify-content-center`}>
          <div className={styles.formBox}>
          {/* Mobile Logo Branding */}
          <div className={styles.mobileLogo} onClick={hideBack ? null : onBack}>
            SHOP.CO
          </div>

          {/* Mobile Back Button */}
          {!hideBack && (
            <button className={styles.mobileBackBtn} onClick={onBack}>
              <FiArrowLeft size={18} style={{ marginRight: '4px' }} />
              Back to Shop
            </button>
          )}

          <div className={styles.formHeader}>
            <h2>Sign In</h2>
            <p>Enter your details below to continue your journey.</p>
          </div>

          {/* Google Login */}
          <button className={styles.googleBtn} onClick={(e) => { e.preventDefault(); alert("Google Sign-In Triggered"); }}>
            <FcGoogle size={18} />
            Continue with Google
          </button>

          <div className={styles.orDivider}>
            <span>or sign in with email</span>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            
            {/* Email Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <FiMail size={18} />
                </span>
                
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  className={`${styles.input} ${
                    emailTouched ? (isEmailValid ? styles.inputValid : styles.inputInvalid) : ''
                  }`}
                  disabled={isLoading}
                />

                {emailTouched && (
                  <span className={styles.valIcon}>
                    {isEmailValid ? (
                      <FiCheck size={18} color="#01AB31" strokeWidth={3} />
                    ) : (
                      <FiX size={18} color="#FF3333" strokeWidth={3} />
                    )}
                  </span>
                )}
              </div>
              {emailTouched && !email && (
                <span className={styles.errorText}>Email is required.</span>
              )}
              {emailTouched && email && !isEmailValid && (
                <span className={styles.errorText}>Please enter a valid email address.</span>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="password">Password</label>
                <a href="#" className={styles.forgotLink} onClick={(e) => { e.preventDefault(); alert("Password reset link sent!"); }}>
                  Forgot password?
                </a>
              </div>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <FiLock size={18} />
                </span>
                
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  className={`${styles.input} ${
                    passwordTouched ? (isPasswordValid ? styles.inputValid : styles.inputInvalid) : ''
                  }`}
                  disabled={isLoading}
                />

                <button
                  type="button"
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {passwordTouched && !password && (
                <span className={styles.errorText}>Password is required.</span>
              )}
              {passwordTouched && password && !isPasswordValid && (
                <span className={styles.errorText}>Password must be at least 8 characters long.</span>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <label className={styles.checkboxWrap}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>

            {formError && (
              <div className={styles.errorText} style={{ margin: '8px 0 0 0', fontSize: '14px', textAlign: 'center' }}>
                {formError}
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className={styles.spinner} />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Switch Link */}
          <div className={styles.switchAuth}>
            Don't have an account?
            <button onClick={onSwitch} disabled={isLoading}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
