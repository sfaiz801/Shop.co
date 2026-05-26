import { useState, useMemo } from 'react';
import styles from '../../styles/Auth.module.scss';
import { FaStar } from 'react-icons/fa';
import { FiMail, FiLock, FiUser, FiArrowLeft, FiCheck, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Signup = ({ onBack, onSwitch, hideBack = false }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [termsTouched, setTermsTouched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const isFirstNameValid = useMemo(() => firstName.trim().length > 0, [firstName]);
  const isLastNameValid = useMemo(() => lastName.trim().length > 0, [lastName]);

  const isEmailValid = useMemo(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }, [email]);

  const isPasswordValid = useMemo(() => password.length >= 8, [password]);

  const isConfirmPasswordValid = useMemo(() => {
    return confirmPassword === password && confirmPassword.length > 0;
  }, [confirmPassword, password]);

  const strengthScore = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);

  const strengthLabel = useMemo(() => {
    if (!password) return '';
    if (strengthScore <= 1) return 'Weak';
    if (strengthScore === 2) return 'Fair';
    if (strengthScore === 3) return 'Good';
    return 'Strong';
  }, [password, strengthScore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFirstNameTouched(true);
    setLastNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);
    setTermsTouched(true);

    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !acceptTerms
    ) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        onSwitch && onSwitch();
      }, 2000);
    }, 1200);
  };

  const renderValidation = (touched, isValid) => {
    if (!touched) return null;
    return (
      <span className={styles.valIcon}>
        {isValid ? (
          <FiCheck size={18} color="#01AB31" strokeWidth={3} />
        ) : (
          <FiX size={18} color="#FF3333" strokeWidth={3} />
        )}
      </span>
    );
  };

  return (
    <div className={styles.container}>
      {/* ── Success Toast ── */}
      <div className={`${styles.toast} ${showToast ? styles.toastShow : ''}`}>
        <FiCheck size={20} />
        <strong>Account created successfully! Redirecting to login...</strong>
      </div>

      {/* ── Left Panel (Desktop Only) ── */}
      <div className={styles.leftPanel}>
        <div className={styles.leftHeader}>
          <div className={styles.logo} onClick={hideBack ? null : onBack} style={{ cursor: hideBack ? 'default' : 'pointer' }}>
            SHOP.CO
          </div>
        </div>

        <div className={styles.leftMain}>
          <h1 className={styles.heading}>
            Start Your <br />
            <span className={styles.outlineText}>Journey.</span>
          </h1>
          <p className={styles.desc}>
            Join SHOP.CO today to save your favorites, unlock members-only discounts, and enjoy a faster, fully-tailored shopping checkout!
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
            "Creating an account took under a minute. The custom recommendation engine is incredibly accurate and fun to use!"
          </p>
          <div className={styles.authorRow}>
            <div className={styles.authorDetails}>
              <strong>Sarah M.</strong>
              <span>Verified Customer</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className={styles.rightPanel}>
        
        <div className={styles.formBox}>
          {/* Mobile Back Button */}
          {!hideBack && (
            <button className={styles.mobileBackBtn} onClick={onBack}>
              <FiArrowLeft size={18} style={{ marginRight: '4px' }} />
              Back to Shop
            </button>
          )}

          <div className={styles.formHeader}>
            <h2>Sign Up</h2>
            <p>Create your profile below to start your e-commerce adventure.</p>
          </div>

          {/* Google Login */}
          <button className={styles.googleBtn} onClick={(e) => { e.preventDefault(); alert("Google Sign-Up Triggered"); }}>
            <FcGoogle size={18} />
            Continue with Google
          </button>

          <div className={styles.orDivider}>
            <span>or sign up with email</span>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            
            {/* First & Last Name side by side */}
            <div className={styles.rowFields}>
              {/* First Name */}
              <div className={styles.inputGroup}>
                <label htmlFor="firstName">First Name</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <FiUser size={18} />
                  </span>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={() => setFirstNameTouched(true)}
                    className={`${styles.input} ${
                      firstNameTouched ? (isFirstNameValid ? styles.inputValid : styles.inputInvalid) : ''
                    }`}
                    disabled={isLoading}
                  />
                  {renderValidation(firstNameTouched, isFirstNameValid)}
                </div>
                {firstNameTouched && !isFirstNameValid && (
                  <span className={styles.errorText}>Required.</span>
                )}
              </div>

              {/* Last Name */}
              <div className={styles.inputGroup}>
                <label htmlFor="lastName">Last Name</label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}>
                    <FiUser size={18} />
                  </span>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() => setLastNameTouched(true)}
                    className={`${styles.input} ${
                      lastNameTouched ? (isLastNameValid ? styles.inputValid : styles.inputInvalid) : ''
                    }`}
                    disabled={isLoading}
                  />
                  {renderValidation(lastNameTouched, isLastNameValid)}
                </div>
                {lastNameTouched && !isLastNameValid && (
                  <span className={styles.errorText}>Required.</span>
                )}
              </div>
            </div>

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
                {renderValidation(emailTouched, isEmailValid)}
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
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <FiLock size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="At least 8 characters"
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

              {/* Password Strength Meter */}
              {password && (
                <>
                  <div className={styles.strengthMeter}>
                    {[1, 2, 3, 4].map((barIndex) => (
                      <div
                        key={barIndex}
                        className={`${styles.bar} ${
                          strengthScore >= barIndex
                            ? strengthScore <= 1
                              ? styles.barWeak
                              : strengthScore === 2
                              ? styles.barFair
                              : strengthScore === 3
                              ? styles.barGood
                              : styles.barStrong
                            : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={styles.strengthText}
                    style={{
                      color:
                        strengthScore <= 1
                          ? '#FF3333'
                          : strengthScore === 2
                          ? '#FBBC05'
                          : strengthScore === 3
                          ? '#F79E1B'
                          : '#01AB31'
                    }}
                  >
                    Password Strength: {strengthLabel}
                  </span>
                </>
              )}

              {passwordTouched && !password && (
                <span className={styles.errorText}>Password is required.</span>
              )}
              {passwordTouched && password && !isPasswordValid && (
                <span className={styles.errorText}>Password must be at least 8 characters.</span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <FiLock size={18} />
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setConfirmPasswordTouched(true)}
                  className={`${styles.input} ${
                    confirmPasswordTouched ? (isConfirmPasswordValid ? styles.inputValid : styles.inputInvalid) : ''
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className={styles.eyeIcon}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {confirmPasswordTouched && !confirmPassword && (
                <span className={styles.errorText}>Please confirm your password.</span>
              )}
              {confirmPasswordTouched && confirmPassword && !isConfirmPasswordValid && (
                <span className={styles.errorText}>Passwords do not match.</span>
              )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className={styles.inputGroup}>
              <label className={styles.checkboxWrap}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  onBlur={() => setTermsTouched(true)}
                  disabled={isLoading}
                />
                <span>
                  I accept the <a href="#" onClick={(e) => { e.preventDefault(); alert("Terms of Service"); }}>Terms & Conditions</a>
                </span>
              </label>
              {termsTouched && !acceptTerms && (
                <span className={styles.errorText}>You must accept the terms & conditions.</span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className={styles.spinner} />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Switch Link */}
          <div className={styles.switchAuth}>
            Already have an account?
            <button onClick={onSwitch} disabled={isLoading}>
              Sign In
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
