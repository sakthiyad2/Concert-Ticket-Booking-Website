import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const emptyForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

function AuthPage() {
  const { currentUser: user, loginUser, logoutUser } = useBooking();
  const [mode, setMode] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(user));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const isLogin = mode === 'login';

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function saveUser(newUser) {
    loginUser(newUser);
    setForm(emptyForm);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsAuthenticated(true);
  }

  function handleLogout() {
    logoutUser();
    setForm(emptyForm);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsAuthenticated(false);
    setMode('login');
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setForm(emptyForm);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isLogin) {
      const accounts = JSON.parse(window.localStorage.getItem('concertly-accounts') || '[]');
      const storedUser = accounts.find(
        (account) => account.email.toLowerCase() === form.email.toLowerCase()
      );

      if (!storedUser) {
        alert('No account found for this email. Please create an account first.');
        setMode('signup');
        return;
      }

      if (storedUser.password !== form.password) {
        alert('Incorrect password. Please try again.');
        return;
      }

      saveUser(storedUser);
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const accounts = JSON.parse(window.localStorage.getItem('concertly-accounts') || '[]');
    const emailExists = accounts.some(
      (account) => account.email.toLowerCase() === form.email.toLowerCase()
    );

    if (emailExists) {
      alert('An account with this email already exists. Please sign in instead.');
      setMode('login');
      return;
    }

    const nextUser = {
      name: form.name,
      email: form.email,
      password: form.password
    };

    saveUser(nextUser);
    setMode('login');
    setForm(emptyForm);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  if (isAuthenticated && user) {
    return (
      <main className="auth-page">
        <div className="auth-shell success-shell">
          <div className="auth-visual">
            <div className="auth-badge">Welcome aboard</div>
            <h1>Hello, {user.name || 'there'}!</h1>
            <p>
              Your account is ready. Start exploring live concerts, saving favorites, and managing tickets.
            </p>

            <ul className="auth-benefits">
              <li>Access your wishlist instantly</li>
              <li>Track your digital tickets</li>
              <li>Book future events faster</li>
            </ul>
          </div>

          <div className="auth-card welcome-card">
            <div className="welcome-box">
              <div className="success-pill">Signed in</div>
              <h2>{user.email}</h2>
              <p>You are now ready to explore concerts and reserve tickets.</p>
            </div>

            <div className="welcome-actions">
              <Link to="/concerts" className="primary-btn auth-submit">Browse Concerts</Link>
              <button type="button" className="secondary-btn" onClick={handleLogout}>Log Out</button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <div className="auth-visual">
          <div className="auth-badge">Live events, made easy</div>
          <h1>{isLogin ? 'Sign in to your account' : 'Create your account'}</h1>
          <p>
            Book tickets, save your favorite concerts, and keep every digital pass in one place.
          </p>

          <ul className="auth-benefits">
            <li>Fast checkout with UPI and digital ticket access</li>
            <li>Wishlist for every concert you love</li>
            <li>Track bookings and live event updates</li>
          </ul>
        </div>

        <div className="auth-card">
          <div className="auth-tabs">
            <button
              type="button"
              className={isLogin ? 'active' : ''}
              onClick={() => switchMode('login')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={!isLogin ? 'active' : ''}
              onClick={() => switchMode('signup')}
            >
              Create Account
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="field-row">
                <label>
                  Full Name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </label>
              </div>
            )}

            <div className="field-row">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <div className="field-row">
              <label>
                Password
                <div className="password-field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </label>
            </div>

            {!isLogin && (
              <div className="field-row">
                <label>
                  Confirm Password
                  <div className="password-field">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </label>
              </div>
            )}

            {isLogin && (
              <div className="form-meta">
                <label className="remember-me">
                  <input type="checkbox" />
                  Remember me
                </label>
                <button type="button" className="text-link">Forgot password?</button>
              </div>
            )}

            <button type="submit" className="primary-btn auth-submit">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="auth-divider"><span>or continue with</span></p>

          <div className="auth-socials">
            <button type="button">Google</button>
            <button type="button">Apple</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AuthPage;
