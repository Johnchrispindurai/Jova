import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, CreditCard, LogOut, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useWishlistQuery, useAddToWishlistMutation, useProductsMapQuery, normalizeProduct } from '../hooks/useWishlist';
import { useAddToCartMutation } from '../hooks/useCart';
import { useToastStore } from '../store/useToastStore';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import type { ShippingAddress, Product } from '../types';

export const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // If redirected with a specific tab state (e.g. from navbar wishlist click)
  const initialTab = (location.state as any)?.tab || 'orders';

  // Stores
  const {
    user,
    orders,
    isAuthenticated,
    login,
    signup,
    logout,
    updateProfile,
    addAddress,
    authStep,
    pendingRegisterEmail,
    pendingLoginEmail,
    setAuthStep,
    verifyRegisterOtp,
    resendRegisterOtp,
    verifyLoginOtp,
    resendLoginOtp,
    pendingCartAction,
    pendingWishlistAction
  } = useUserStore();
  const { data: rawWishlistItems = [] } = useWishlistQuery();
  const wishlistItems = rawWishlistItems.map((item: any) => normalizeProduct(item.product));
  const { data: productsMapData } = useProductsMapQuery();
  const addToWishlistMutation = useAddToWishlistMutation();
  const addToCartMutation = useAddToCartMutation();
  const addToast = useToastStore((state) => state.addToast);

  // Profile tabs state
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Authentication page state (Login vs Register)
  const [isLoginTab, setIsLoginTab] = useState(true);

  // Login inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  // OTP inputs
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpAttemptsLeft, setOtpAttemptsLeft] = useState(3);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Address modal/form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newZip, setNewZip] = useState('');
  const [newCountry, setNewCountry] = useState('France');

  // Profile details update inputs
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Sync profile edits
  useEffect(() => {
    if (user) {
      setProfileName(user.name);
      setProfilePhone(user.phone || '');
    }
  }, [user]);

  // Cooldown countdown timer for OTP resends
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setInterval(() => {
      setOtpCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  // Restore OTP session details on authStep changes
  useEffect(() => {
    const pendingGeneratedAt = sessionStorage.getItem('pendingOtpGeneratedAt');
    const pendingAttempts = sessionStorage.getItem('pendingOtpAttempts');
    if (pendingAttempts) {
      setOtpAttemptsLeft(parseInt(pendingAttempts, 10));
    }
    if (pendingGeneratedAt) {
      const elapsed = Math.floor((Date.now() - parseInt(pendingGeneratedAt, 10)) / 1000);
      if (elapsed < 60) {
        setOtpCountdown(60 - elapsed);
      } else {
        setOtpCountdown(0);
      }
    }
  }, [authStep]);

  // Auto-focus first input when OTP screen opens
  useEffect(() => {
    if (authStep !== 'idle') {
      setTimeout(() => {
        const firstInput = document.getElementById('otp-input-0');
        firstInput?.focus();
      }, 50);
    }
  }, [authStep]);

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.slice(-1);
    if (digit && !/^\d$/.test(digit)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    if (digit && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const newDigits = [...otpDigits];
      if (!otpDigits[index] && index > 0) {
        newDigits[index - 1] = '';
        setOtpDigits(newDigits);
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        prevInput?.focus();
      } else {
        newDigits[index] = '';
        setOtpDigits(newDigits);
      }
    }
  };

  const handleDigitPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pastedData)) return;

    const newDigits = pastedData.split('');
    setOtpDigits(newDigits);

    const lastInput = document.getElementById('otp-input-5');
    lastInput?.focus();
  };

  // Global guest intent restoration listener upon successful auth
  useEffect(() => {
    if (isAuthenticated && productsMapData) {
      const restoreIntents = async () => {
        // Restore wishlist intent
        const pendingProduct = useUserStore.getState().pendingWishlistAction;
        if (pendingProduct) {
          const mapping = productsMapData?.mapping;
          const dbId = mapping ? mapping[pendingProduct.name.toLowerCase().trim()] : null;
          if (dbId) {
            try {
              await addToWishlistMutation.mutateAsync(dbId);
            } catch (e) {
              console.error('Failed to restore wishlist intent:', e);
            }
          }
          useUserStore.getState().setPendingWishlistAction(null);
        }

        // Restore cart intent
        const pendingCart = useUserStore.getState().pendingCartAction;
        if (pendingCart) {
          const mapping = productsMapData?.mapping;
          const dbId = mapping ? mapping[pendingCart.product.name.toLowerCase().trim()] : null;
          if (dbId) {
            try {
              await addToCartMutation.mutateAsync({
                productId: dbId,
                color: pendingCart.color,
                size: pendingCart.size,
                quantity: pendingCart.quantity,
              });

              // If checkoutIntent is present, redirect to checkout
              const checkoutIntent = sessionStorage.getItem('checkoutIntent');
              if (checkoutIntent === 'true') {
                sessionStorage.removeItem('checkoutIntent');
                navigate('/checkout');
              }
            } catch (e) {
              console.error('Failed to restore cart intent:', e);
            }
          }
          useUserStore.getState().setPendingCartAction(null);
        }
      };
      restoreIntents();
    }
  }, [isAuthenticated, productsMapData, navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError('Please fill in all details.');
      return;
    }
    
    if (loginPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    try {
      await login(loginEmail, loginPassword);
      setOtpDigits(['', '', '', '', '', '']);
    } catch (err: any) {
      setAuthError(err.response?.data?.message || 'Incorrect email or password');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim() || !regConfirm.trim()) {
      setAuthError('Please fill in all details.');
      return;
    }

    if (regPassword !== regConfirm) {
      setAuthError('Passwords do not match.');
      return;
    }

    if (regPassword.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    try {
      await signup(regName, regEmail, regPassword);
      setOtpDigits(['', '', '', '', '', '']);
    } catch (err: any) {
      setAuthError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const code = otpDigits.join('');
    if (code.length !== 6) {
      setAuthError('Please enter a valid 6-digit verification code');
      return;
    }
    setIsVerifyingOtp(true);
    try {
      if (authStep === 'registerOtp' && pendingRegisterEmail) {
        await verifyRegisterOtp(pendingRegisterEmail, code);
      } else if (authStep === 'loginOtp' && pendingLoginEmail) {
        await verifyLoginOtp(pendingLoginEmail, code);
      }
    } catch (err: any) {
      const nextAttempts = Math.max(0, otpAttemptsLeft - 1);
      setOtpAttemptsLeft(nextAttempts);
      sessionStorage.setItem('pendingOtpAttempts', nextAttempts.toString());
      setAuthError(err.response?.data?.message || 'Verification failed');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (otpCountdown > 0) return;
    setAuthError('');
    try {
      if (authStep === 'registerOtp' && pendingRegisterEmail) {
        await resendRegisterOtp(pendingRegisterEmail);
      } else if (authStep === 'loginOtp' && pendingLoginEmail) {
        await resendLoginOtp(pendingLoginEmail);
      }
      setOtpCountdown(60);
      setOtpDigits(['', '', '', '', '', '']);
      setTimeout(() => {
        const firstInput = document.getElementById('otp-input-0');
        firstInput?.focus();
      }, 50);
    } catch (err: any) {
      setAuthError(err.response?.data?.message || 'Failed to resend code');
    }
  };

  const handleBackToLoginClick = () => {
    setAuthStep('idle');
    setAuthError('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) return;
    updateProfile({ name: profileName, phone: profilePhone });
    setIsEditingProfile(false);
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim() || !newCity.trim() || !newZip.trim()) {
      addToast('Please complete all address fields.', 'error');
      return;
    }

    const addressObj: ShippingAddress = {
      firstName: user?.name.split(' ')[0] || '',
      lastName: user?.name.split(' ')[1] || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: newStreet,
      city: newCity,
      postalCode: newZip,
      country: newCountry,
      deliveryMethod: 'Standard Courier'
    };

    addAddress(addressObj);
    setShowAddressForm(false);
    
    // Clear inputs
    setNewStreet('');
    setNewCity('');
    setNewZip('');
  };

  // ================= RENDER AUTHENTICATION VIEW (IF LOGGED OUT) =================
  if (!isAuthenticated || !user) {
    const activeOtpEmail = authStep === 'registerOtp' ? pendingRegisterEmail : pendingLoginEmail;
    const isOtpStep = authStep !== 'idle';

    const hasPendingAction = pendingCartAction || pendingWishlistAction;
    let actionText = "";
    if (pendingCartAction) {
      actionText = `Please sign in to continue. Your selected ${pendingCartAction.product.name.toLowerCase()} will be automatically added to your cart.`;
    } else if (pendingWishlistAction) {
      actionText = `Please sign in to continue. Your selected ${pendingWishlistAction.name.toLowerCase()} will be automatically added to your wishlist.`;
    }

    return (
      <div 
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4 py-20 font-sans text-primary select-none overflow-hidden"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1600&auto=format&fit=crop')` 
        }}
      >
        {/* Dark subtle overlay for depth */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px]"></div>

        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl border border-luxury-border/30 p-8 md:p-10 flex flex-col gap-6 relative z-10 animate-fade-in my-auto">
          {/* JOVA Serif Logo */}
          <div className="text-center mt-2">
            <h1 className="font-serif tracking-[0.25em] text-4xl font-light text-[#111111] uppercase select-none">JOVA</h1>
          </div>

          {/* Gold alert banner */}
          {hasPendingAction && (
            <div className="bg-gradient-to-r from-[#8b6b37] via-[#a38148] to-[#8b6b37] border border-[#a27838]/30 text-white rounded-lg p-4 text-[11px] tracking-wider text-center leading-relaxed font-medium shadow-md shadow-amber-900/10">
              {actionText}
            </div>
          )}

          {isOtpStep ? (
            /* Premium OTP verification screen */
            <div className="flex flex-col gap-6 animate-fade-in">
              <h2 className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#111111] text-center font-sans">
                Verification Required
              </h2>
              
              <p className="text-[11px] text-center text-primary-muted font-sans leading-relaxed font-light">
                We've sent a verification code to your email.<br />
                <strong className="text-primary font-semibold">{activeOtpEmail}</strong>
              </p>

              {authError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 p-3 text-[11px] font-sans flex items-center gap-2 animate-fade-in rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#111111] text-center block mb-3 font-sans">Enter 6-Digit Code</label>
                  <div className="flex justify-between gap-2">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                        onPaste={idx === 0 ? handleDigitPaste : undefined}
                        className="w-11 h-14 bg-white border border-[#cccccc] focus:border-black text-center text-lg font-bold font-sans outline-none transition-all duration-300 focus:ring-1 focus:ring-black rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-sans text-primary-muted font-light uppercase tracking-wider">
                  <span>Attempts left: <strong className="text-primary font-semibold">{otpAttemptsLeft}</strong></span>
                  {otpCountdown > 0 ? (
                    <span>Resend in <strong className="text-primary font-semibold">{otpCountdown}s</strong></span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#c5a880] hover:text-[#111111] font-bold uppercase tracking-wider underline cursor-pointer bg-transparent border-none p-0"
                    >
                      Resend Code
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isVerifyingOtp}
                  className="w-full bg-[#1c1c1c] hover:bg-black text-white border border-[#1c1c1c] hover:border-black py-3.5 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 rounded-full cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  {isVerifyingOtp ? 'Verifying...' : 'Verify & Log In'}
                </button>

                <button
                  type="button"
                  onClick={handleBackToLoginClick}
                  className="w-full text-center text-[10px] text-primary-muted hover:text-[#111111] transition-colors font-sans mt-2 underline uppercase tracking-widest font-bold bg-transparent border-none cursor-pointer"
                >
                  Back to Login
                </button>
              </form>
            </div>
          ) : (
            /* Normal Login/Register screen */
            <div className="flex flex-col gap-6 animate-fade-in">
              <h2 className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#111111] text-center font-sans">
                {isLoginTab ? 'SIGN IN TO YOUR JOVA ACCOUNT' : 'CREATE YOUR JOVA ACCOUNT'}
              </h2>

              {authError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 p-3 text-[11px] font-sans flex items-center gap-2 animate-fade-in rounded-lg">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {isLoginTab ? (
                /* SIGN IN FORM */
                <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="login-email" className="text-[10px] uppercase font-bold tracking-widest text-[#111111] mb-1.5 block font-sans">Email Address</label>
                    <input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-white border border-[#cccccc] px-4 py-3 text-sm focus:border-black focus:outline-none transition-colors font-sans rounded-md text-primary"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <label htmlFor="login-password" className="text-[10px] uppercase font-bold tracking-widest text-[#111111] block font-sans">Password</label>
                      <span className="text-[10px] text-primary-muted hover:text-[#111111] cursor-pointer uppercase tracking-wider font-semibold font-sans underline">Forgot Password?</span>
                    </div>
                    <div className="relative">
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-white border border-[#cccccc] pl-4 pr-12 py-3 text-sm focus:border-black focus:outline-none transition-colors font-sans rounded-md text-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-primary-muted hover:text-[#111111] font-sans font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                      >
                        {showPassword ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Show</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1c1c1c] hover:bg-black text-white border border-[#1c1c1c] hover:border-black py-3.5 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 rounded-full cursor-pointer shadow-md shadow-black/10 active:scale-[0.99] mt-2"
                  >
                    Sign In
                  </button>
                </form>
              ) : (
                /* CREATE ACCOUNT FORM */
                <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="reg-name" className="text-[10px] uppercase font-bold tracking-widest text-[#111111] mb-1.5 block font-sans">Full Name</label>
                    <input
                      id="reg-name"
                      type="text"
                      placeholder="Jean Dupont"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full bg-white border border-[#cccccc] px-4 py-3 text-sm focus:border-black focus:outline-none transition-colors font-sans rounded-md text-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-email" className="text-[10px] uppercase font-bold tracking-widest text-[#111111] mb-1.5 block font-sans">Email Address</label>
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="jean.dupont@atelier.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full bg-white border border-[#cccccc] px-4 py-3 text-sm focus:border-black focus:outline-none transition-colors font-sans rounded-md text-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-password" className="text-[10px] uppercase font-bold tracking-widest text-[#111111] mb-1.5 block font-sans">Password</label>
                    <div className="relative">
                      <input
                        id="reg-password"
                        type={showRegPassword ? "text" : "password"}
                        placeholder="At least 6 characters"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full bg-white border border-[#cccccc] pl-4 pr-12 py-3 text-sm focus:border-black focus:outline-none transition-colors font-sans rounded-md text-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-primary-muted hover:text-[#111111] font-sans font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                      >
                        {showRegPassword ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Show</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="reg-confirm" className="text-[10px] uppercase font-bold tracking-widest text-[#111111] mb-1.5 block font-sans font-medium">Confirm Password</label>
                    <div className="relative">
                      <input
                        id="reg-confirm"
                        type={showRegConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={regConfirm}
                        onChange={(e) => setRegConfirm(e.target.value)}
                        className="w-full bg-white border border-[#cccccc] pl-4 pr-12 py-3 text-sm focus:border-black focus:outline-none transition-colors font-sans rounded-md text-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegConfirm(!showRegConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-primary-muted hover:text-[#111111] font-sans font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                      >
                        {showRegConfirm ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Show</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1c1c1c] hover:bg-black text-white border border-[#1c1c1c] hover:border-black py-3.5 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 rounded-full cursor-pointer shadow-md shadow-black/10 active:scale-[0.99] mt-2"
                  >
                    Create Account
                  </button>
                </form>
              )}

              {/* Google OAuth Option */}
              <div className="flex flex-col gap-3">
                {/* Divider */}
                <div className="flex items-center my-1">
                  <div className="flex-grow border-t border-[#e5e7eb]"></div>
                  <span className="px-3 text-[9px] uppercase tracking-widest text-[#111111]/40 font-bold font-sans">or</span>
                  <div className="flex-grow border-t border-[#e5e7eb]"></div>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="w-full bg-white text-[#111111] border border-[#cccccc] hover:border-[#111111] py-3.5 px-4 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 flex items-center justify-center gap-2 rounded-full cursor-pointer hover:bg-luxury-cream/10 active:scale-[0.99] shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
              </div>

              {/* Bottom Toggle Link */}
              <div className="text-[10px] text-center text-primary-muted font-sans uppercase tracking-widest mt-1">
                {isLoginTab ? (
                  <>
                    Don't have an account?{' '}
                    <span 
                      onClick={() => { setIsLoginTab(false); setAuthError(''); }}
                      className="text-[#111111] font-bold cursor-pointer underline hover:text-black ml-1"
                    >
                      CREATE ONE
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <span 
                      onClick={() => { setIsLoginTab(true); setAuthError(''); }}
                      className="text-[#111111] font-bold cursor-pointer underline hover:text-black ml-1"
                    >
                      SIGN IN
                    </span>
                  </>
                )}
              </div>

              {/* Guest link */}
              <div className="text-center mt-1">
                <span 
                  onClick={() => navigate('/')}
                  className="text-[11px] text-center text-primary-muted hover:text-[#111111] cursor-pointer font-sans underline block transition-colors font-medium"
                >
                  Continue as Guest
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= RENDER USER PROFILE DASHBOARD (IF LOGGED IN) =================
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-24 page-transition-container">
      
      {/* Profile Header Banner */}
      <div className="bg-luxury-cream border border-luxury-border p-6 md:p-10 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary text-white flex items-center justify-center font-serif text-xl font-bold uppercase rounded-full shadow-inner">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl uppercase font-serif tracking-widest font-semibold text-primary">{user.name}</h2>
            <p className="text-xs text-primary-muted font-sans mt-0.5">{user.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 border border-luxury-border bg-white text-primary-muted hover:text-primary hover:border-primary py-2.5 px-5 text-[10px] uppercase tracking-widest font-sans font-bold transition-all duration-300 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Navigation Sidebar Panel (3 Cols) */}
        <aside className="lg:col-span-3 flex flex-col gap-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left p-4 text-xs uppercase tracking-widest font-sans font-bold border-l-2 flex items-center gap-3 transition-all ${
              activeTab === 'orders'
                ? 'border-primary bg-luxury-cream text-primary font-semibold shadow-sm'
                : 'border-transparent text-primary-muted hover:bg-luxury-cream/30 hover:text-primary'
            }`}
          >
            <Package className="w-4 h-4 stroke-[1.5]" /> Order History ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full text-left p-4 text-xs uppercase tracking-widest font-sans font-bold border-l-2 flex items-center gap-3 transition-all ${
              activeTab === 'wishlist'
                ? 'border-primary bg-luxury-cream text-primary font-semibold shadow-sm'
                : 'border-transparent text-primary-muted hover:bg-luxury-cream/30 hover:text-primary'
            }`}
          >
            <Heart className="w-4 h-4 stroke-[1.5]" /> Wishlist ({wishlistItems.length})
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left p-4 text-xs uppercase tracking-widest font-sans font-bold border-l-2 flex items-center gap-3 transition-all ${
              activeTab === 'addresses'
                ? 'border-primary bg-luxury-cream text-primary font-semibold shadow-sm'
                : 'border-transparent text-primary-muted hover:bg-luxury-cream/30 hover:text-primary'
            }`}
          >
            <MapPin className="w-4 h-4 stroke-[1.5]" /> Addresses ({user.addresses.length})
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`w-full text-left p-4 text-xs uppercase tracking-widest font-sans font-bold border-l-2 flex items-center gap-3 transition-all ${
              activeTab === 'cards'
                ? 'border-primary bg-luxury-cream text-primary font-semibold shadow-sm'
                : 'border-transparent text-primary-muted hover:bg-luxury-cream/30 hover:text-primary'
            }`}
          >
            <CreditCard className="w-4 h-4 stroke-[1.5]" /> Saved Cards ({user.savedCards.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('details');
              setProfileName(user.name);
              setProfilePhone(user.phone);
            }}
            className={`w-full text-left p-4 text-xs uppercase tracking-widest font-sans font-bold border-l-2 flex items-center gap-3 transition-all ${
              activeTab === 'details'
                ? 'border-primary bg-luxury-cream text-primary font-semibold shadow-sm'
                : 'border-transparent text-primary-muted hover:bg-luxury-cream/30 hover:text-primary'
            }`}
          >
            <User className="w-4 h-4 stroke-[1.5]" /> Profile Details
          </button>
        </aside>

        {/* Tab Content Panels (9 Cols) */}
        <main className="lg:col-span-9 bg-white border border-luxury-border p-6 md:p-8 min-h-[50vh]">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in flex flex-col gap-6">
              <h3 className="text-sm uppercase tracking-widest font-bold border-b border-luxury-border pb-4 mb-2">Order History</h3>
              {orders.length === 0 ? (
                <EmptyState type="order" />
              ) : (
                <div className="flex flex-col gap-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-luxury-border p-5 flex flex-col gap-4">
                      {/* Top bar info */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-luxury-border pb-3 gap-2">
                        <div className="text-xs font-sans">
                          <span className="text-primary-muted uppercase tracking-wider block">Order ID</span>
                          <strong className="text-primary text-sm font-semibold">{order.id}</strong>
                        </div>
                        <div className="text-xs font-sans">
                          <span className="text-primary-muted uppercase tracking-wider block">Placed on</span>
                          <strong className="text-primary font-semibold">{order.date}</strong>
                        </div>
                        <div className="text-xs font-sans">
                          <span className="text-primary-muted uppercase tracking-wider block">Total paid</span>
                          <strong className="text-accent text-sm font-bold">₹{order.totalAmount.toLocaleString('en-IN')}</strong>
                        </div>
                        <span className={`px-3 py-1 text-[9px] uppercase tracking-widest font-sans font-bold border ${
                          order.status === 'Delivered'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-amber-200 bg-amber-50 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      {/* Items details */}
                      <div className="flex flex-col gap-3">
                        {order.items.length === 0 ? (
                          <p className="text-xs text-primary-muted font-sans italic">Sample Order (Pre-loaded Mock Order details)</p>
                        ) : (
                          order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center justify-between">
                              <div className="flex gap-3 items-center">
                                <div className="w-10 aspect-[3/4] overflow-hidden bg-luxury-cream border border-luxury-border/50">
                                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-xs font-sans">
                                  <h4 className="font-semibold text-primary uppercase max-w-[200px] truncate">{item.product.name}</h4>
                                  <p className="text-[10px] text-primary-muted uppercase mt-0.5">Size: {item.selectedSize} &bull; QTY: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="text-xs font-semibold font-sans">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="animate-fade-in">
              <h3 className="text-sm uppercase tracking-widest font-bold border-b border-luxury-border pb-4 mb-8">My Wishlist</h3>
              {wishlistItems.length === 0 ? (
                <EmptyState type="wishlist" />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-10">
                  {wishlistItems.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="animate-fade-in flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-luxury-border pb-4 mb-2">
                <h3 className="text-sm uppercase tracking-widest font-bold">Shipping Addresses</h3>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="text-xs text-accent uppercase font-bold tracking-widest underline hover:text-primary"
                >
                  {showAddressForm ? 'Cancel' : '+ Add Address'}
                </button>
              </div>

              {/* Address Addition Form */}
              {showAddressForm && (
                <form onSubmit={handleAddAddressSubmit} className="bg-luxury-cream/50 p-6 border border-luxury-border flex flex-col gap-4 animate-fade-in">
                  <h4 className="text-xs uppercase tracking-widest font-bold mb-2">New Address Details</h4>
                  
                  <div>
                    <label htmlFor="new-street" className="premium-label">Street Address</label>
                    <input
                      id="new-street"
                      type="text"
                      placeholder="12 Baker St"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      className="premium-input bg-white/50 px-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="new-city" className="premium-label">City</label>
                      <input
                        id="new-city"
                        type="text"
                        placeholder="London"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="premium-input bg-white/50 px-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="new-zip" className="premium-label">Zip Code</label>
                      <input
                        id="new-zip"
                        type="text"
                        placeholder="NW1 6XE"
                        value={newZip}
                        onChange={(e) => setNewZip(e.target.value)}
                        className="premium-input bg-white/50 px-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="new-country" className="premium-label font-medium">Country</label>
                    <select
                      id="new-country"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      className="w-full bg-transparent border-b border-luxury-border py-3 px-1 text-sm focus:border-primary focus:outline-none transition-colors duration-300 font-sans cursor-pointer"
                    >
                      <option value="France">France</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Italy">Italy</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-primary text-white border border-primary hover:bg-transparent hover:text-primary py-3 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 cursor-pointer"
                  >
                    Save Address
                  </button>
                </form>
              )}

              {/* Saved Address list */}
              {user.addresses.length === 0 ? (
                <p className="text-xs text-primary-muted font-sans italic">No saved addresses found. Please add a shipping destination.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {user.addresses.map((addr, idx) => (
                    <div key={idx} className="border border-luxury-border p-5 bg-luxury-cream/10 relative">
                      <span className="absolute top-4 right-4 text-[9px] uppercase tracking-widest font-bold font-sans text-accent">
                        {idx === 0 ? 'Primary' : ''}
                      </span>
                      <h4 className="text-xs uppercase tracking-wider font-bold mb-3">{addr.firstName} {addr.lastName}</h4>
                      <div className="text-xs text-primary-muted font-sans leading-relaxed flex flex-col gap-1">
                        <p>{addr.address}</p>
                        <p>{addr.city}, {addr.postalCode}</p>
                        <p>{addr.country}</p>
                        <p className="mt-2 text-primary">TEL: {addr.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CARDS */}
          {activeTab === 'cards' && (
            <div className="animate-fade-in flex flex-col gap-6">
              <h3 className="text-sm uppercase tracking-widest font-bold border-b border-luxury-border pb-4 mb-2">Saved Cards</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.savedCards.map((card) => (
                  <div
                    key={card.id}
                    className="relative aspect-[1.586/1] w-full rounded-xl p-6 text-white flex flex-col justify-between shadow-xl overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1f1f1f 0%, #111111 100%)' }}
                  >
                    {/* Background visual gloss */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                    
                    {/* Header: Brand name & Card type */}
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-serif uppercase tracking-widest font-medium">JOVA</span>
                      <span className="text-xs font-sans font-bold italic tracking-wide text-white/80">{card.brand}</span>
                    </div>

                    {/* Card chip */}
                    <div className="w-9 h-6 bg-amber-200/20 border border-amber-200/30 rounded-md" />

                    {/* Card Number */}
                    <div className="text-lg md:text-xl font-mono tracking-widest text-center my-3 text-white/90">
                      {card.cardNumber}
                    </div>

                    {/* Bottom: Holder & Expiry */}
                    <div className="flex justify-between items-center text-[10px] tracking-widest font-mono text-white/50 uppercase">
                      <div>
                        <span className="block text-[8px] text-white/30 mb-0.5">Card Holder</span>
                        {card.cardHolder}
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] text-white/30 mb-0.5">Expires</span>
                        {card.expiry}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DETAILS */}
          {activeTab === 'details' && (
            <div className="animate-fade-in flex flex-col gap-6">
              <h3 className="text-sm uppercase tracking-widest font-bold border-b border-luxury-border pb-4 mb-2">Account Details</h3>

              <form onSubmit={handleSaveProfile} className="max-w-md flex flex-col gap-5">
                <div>
                  <label htmlFor="prof-name" className="premium-label">Full Name</label>
                  <input
                    id="prof-name"
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className={`premium-input ${isEditingProfile ? 'bg-luxury-cream/30 px-2 border-primary' : 'bg-transparent text-primary-muted'}`}
                  />
                </div>

                <div>
                  <label className="premium-label">Email Address (Cannot change)</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="premium-input bg-transparent text-primary-muted/50 cursor-not-allowed border-luxury-border/30"
                  />
                </div>

                <div>
                  <label htmlFor="prof-phone" className="premium-label">Phone Number</label>
                  <input
                    id="prof-phone"
                    type="tel"
                    disabled={!isEditingProfile}
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className={`premium-input ${isEditingProfile ? 'bg-luxury-cream/30 px-2 border-primary' : 'bg-transparent text-primary-muted'}`}
                  />
                </div>

                {isEditingProfile ? (
                  <div className="flex gap-4 mt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-white border border-primary hover:bg-transparent hover:text-primary py-3 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 cursor-pointer"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingProfile(false);
                        setProfileName(user.name);
                        setProfilePhone(user.phone);
                      }}
                      className="flex-1 border border-luxury-border bg-white text-primary hover:border-primary py-3 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(true)}
                    className="w-full bg-primary text-white border border-primary hover:bg-transparent hover:text-primary py-3.5 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 mt-2 cursor-pointer"
                  >
                    Edit Profile Details
                  </button>
                )}
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
